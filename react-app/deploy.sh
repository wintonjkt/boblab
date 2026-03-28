#!/bin/bash

################################################################################
# IBM Code Engine Deployment Script for Bob Lab React App
#
# IMPORTANT: This script requires manual IBM Cloud login.
# For automated deployment with API key authentication, use:
#   ./deploy-with-apikey.sh
#
# This script automates the deployment process:
# 1. Builds the container image with Podman
# 2. Tags and pushes to IBM Container Registry
# 3. Deploys to IBM Code Engine
#
# Prerequisites:
# - IBM Cloud CLI installed (https://cloud.ibm.com/docs/cli)
# - Code Engine plugin installed (ibmcloud plugin install code-engine)
# - Container Registry plugin installed (ibmcloud plugin install container-registry)
# - Podman installed and running
# - Logged in to IBM Cloud (ibmcloud login)
################################################################################

set -e  # Exit on error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration variables
APP_NAME="bob-lab-app"
IMAGE_NAME="bob-lab"
VERSION="${1:-latest}"  # Use first argument as version, default to 'latest'

# IBM Cloud Configuration (update these values)
REGION="${IBM_CLOUD_REGION:-us-south}"
RESOURCE_GROUP="${IBM_CLOUD_RESOURCE_GROUP:-default}"
REGISTRY_NAMESPACE="${IBM_CLOUD_REGISTRY_NAMESPACE:-}"
CODE_ENGINE_PROJECT="${CODE_ENGINE_PROJECT:-bob-lab-project}"

################################################################################
# Helper Functions
################################################################################

print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

check_prerequisites() {
    print_info "Checking prerequisites..."
    
    # Check if .env file exists in parent directory
    SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
    ENV_FILE="$PROJECT_ROOT/.env"
    
    if [ -f "$ENV_FILE" ]; then
        echo ""
        print_warning "Found .env file with IBM Cloud credentials at: $ENV_FILE"
        print_info "For automated deployment with API key authentication, use:"
        echo ""
        echo -e "  ${GREEN}./deploy-with-apikey.sh${NC}"
        echo ""
        print_info "This script (deploy.sh) requires manual IBM Cloud login."
        echo ""
        read -p "Continue with manual deployment? (y/N) " -n 1 -r
        echo ""
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_info "Deployment cancelled. Use ./deploy-with-apikey.sh for automated deployment."
            exit 0
        fi
        echo ""
    fi
    
    # Check if IBM Cloud CLI is installed
    if ! command -v ibmcloud &> /dev/null; then
        print_error "IBM Cloud CLI is not installed. Please install it from https://cloud.ibm.com/docs/cli"
        exit 1
    fi
    
    # Check if Podman is installed
    if ! command -v podman &> /dev/null; then
        print_error "Podman is not installed. Please install it from https://podman.io/getting-started/installation"
        exit 1
    fi
    
    # Check if Podman is running
    if ! podman info &> /dev/null; then
        print_error "Podman is not running or not properly configured."
        exit 1
    fi
    
    # Check if logged in to IBM Cloud
    if ! ibmcloud target &> /dev/null; then
        print_error "Not logged in to IBM Cloud. Please run 'ibmcloud login'"
        print_info "Or use ./deploy-with-apikey.sh for automated login with API key"
        exit 1
    fi
    
    print_success "All prerequisites met"
}

validate_config() {
    print_info "Validating configuration..."
    
    if [ -z "$REGISTRY_NAMESPACE" ]; then
        print_error "IBM_CLOUD_REGISTRY_NAMESPACE is not set. Please set it in your environment or update the script."
        exit 1
    fi
    
    print_success "Configuration validated"
}

build_image() {
    print_info "Building container image with Podman..."
    
    # Build the container image
    podman build -t "${IMAGE_NAME}:${VERSION}" .
    
    if [ $? -eq 0 ]; then
        print_success "Container image built successfully"
    else
        print_error "Failed to build container image"
        exit 1
    fi
}

tag_and_push_image() {
    print_info "Tagging and pushing image to IBM Container Registry..."
    
    # Set the registry region
    ibmcloud cr region-set "${REGION}"
    
    # Login to IBM Container Registry
    ibmcloud cr login
    
    # Full image path
    FULL_IMAGE_PATH="${REGION}.icr.io/${REGISTRY_NAMESPACE}/${IMAGE_NAME}:${VERSION}"
    
    # Tag the image
    podman tag "${IMAGE_NAME}:${VERSION}" "${FULL_IMAGE_PATH}"
    
    # Push to registry
    podman push "${FULL_IMAGE_PATH}"
    
    if [ $? -eq 0 ]; then
        print_success "Image pushed to registry: ${FULL_IMAGE_PATH}"
    else
        print_error "Failed to push image to registry"
        exit 1
    fi
}

deploy_to_code_engine() {
    print_info "Deploying to IBM Code Engine..."
    
    # Target the Code Engine project
    ibmcloud ce project select --name "${CODE_ENGINE_PROJECT}"
    
    # Full image path
    FULL_IMAGE_PATH="${REGION}.icr.io/${REGISTRY_NAMESPACE}/${IMAGE_NAME}:${VERSION}"
    
    # Check if application exists
    if ibmcloud ce app get --name "${APP_NAME}" &> /dev/null; then
        print_info "Application exists, updating..."
        ibmcloud ce app update --name "${APP_NAME}" \
            --image "${FULL_IMAGE_PATH}" \
            --port 8080 \
            --min-scale 1 \
            --max-scale 5 \
            --cpu 0.25 \
            --memory 512M \
            --env-from-configmap bob-lab-config \
            --wait
    else
        print_info "Creating new application..."
        ibmcloud ce app create --name "${APP_NAME}" \
            --image "${FULL_IMAGE_PATH}" \
            --port 8080 \
            --min-scale 1 \
            --max-scale 5 \
            --cpu 0.25 \
            --memory 512M \
            --env-from-configmap bob-lab-config \
            --wait
    fi
    
    if [ $? -eq 0 ]; then
        print_success "Application deployed successfully"
        
        # Get the application URL
        APP_URL=$(ibmcloud ce app get --name "${APP_NAME}" --output json | grep -o '"url":"[^"]*' | cut -d'"' -f4)
        print_success "Application URL: ${APP_URL}"
    else
        print_error "Failed to deploy application"
        exit 1
    fi
}

cleanup_local_images() {
    print_info "Cleaning up local images..."
    
    # Remove untagged images
    podman image prune -f
    
    print_success "Local cleanup complete"
}

################################################################################
# Main Execution
################################################################################

main() {
    echo ""
    print_info "Starting deployment process for ${APP_NAME} (version: ${VERSION})"
    echo ""
    
    # Run deployment steps
    check_prerequisites
    validate_config
    build_image
    tag_and_push_image
    deploy_to_code_engine
    cleanup_local_images
    
    echo ""
    print_success "Deployment completed successfully!"
    echo ""
    print_info "Next steps:"
    echo "  1. Visit your application URL to verify deployment"
    echo "  2. Check logs: ibmcloud ce app logs --name ${APP_NAME}"
    echo "  3. Monitor application: ibmcloud ce app get --name ${APP_NAME}"
    echo ""
}

# Run main function
main

# Made with Bob
