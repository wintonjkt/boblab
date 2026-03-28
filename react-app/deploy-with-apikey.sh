#!/bin/bash

################################################################################
# IBM Code Engine Deployment Script with API Key Authentication
#
# This script automates the deployment process using API key from .env file:
# 1. Loads environment variables from parent directory's .env file
# 2. Validates all required variables
# 3. Authenticates to IBM Cloud using API key (non-interactive)
# 4. Targets the correct region and resource group
# 5. Selects or creates Code Engine project
# 6. Builds container image with Podman
# 7. Pushes to IBM Container Registry
# 8. Deploys or updates Code Engine application
# 9. Shows deployment URL
#
# Prerequisites:
# - IBM Cloud CLI installed (https://cloud.ibm.com/docs/cli)
# - Code Engine plugin installed (ibmcloud plugin install code-engine)
# - Container Registry plugin installed (ibmcloud plugin install container-registry)
# - Podman installed and running
# - .env file in parent directory with IBM_CLOUD_API_KEY
################################################################################

set -e  # Exit on error
set -o pipefail  # Catch errors in pipes

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color
BOLD='\033[1m'

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
ENV_FILE="$PROJECT_ROOT/.env"

################################################################################
# Helper Functions
################################################################################

print_header() {
    echo ""
    echo -e "${BOLD}${CYAN}═══════════════════════════════════════════════════════════════${NC}"
    echo -e "${BOLD}${CYAN}  $1${NC}"
    echo -e "${BOLD}${CYAN}═══════════════════════════════════════════════════════════════${NC}"
    echo ""
}

print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

print_step() {
    echo ""
    echo -e "${MAGENTA}▶${NC} ${BOLD}$1${NC}"
}

# Load environment variables from .env file
load_env_file() {
    print_step "Loading environment variables from .env file"
    
    if [ ! -f "$ENV_FILE" ]; then
        print_error ".env file not found at: $ENV_FILE"
        print_info "Please create a .env file in the project root with your IBM Cloud credentials."
        print_info "See .env.example for required variables."
        exit 1
    fi
    
    # Load .env file, ignoring comments and empty lines
    while IFS='=' read -r key value; do
        # Skip comments and empty lines
        [[ $key =~ ^#.*$ ]] && continue
        [[ -z $key ]] && continue
        
        # Remove leading/trailing whitespace
        key=$(echo "$key" | xargs)
        value=$(echo "$value" | xargs)
        
        # Export the variable
        if [ -n "$key" ] && [ -n "$value" ]; then
            export "$key=$value"
        fi
    done < "$ENV_FILE"
    
    print_success "Environment variables loaded from $ENV_FILE"
}

# Validate required environment variables
validate_env_vars() {
    print_step "Validating required environment variables"
    
    local missing_vars=()
    
    # Check required variables
    [ -z "$IBM_CLOUD_API_KEY" ] && missing_vars+=("IBM_CLOUD_API_KEY")
    [ -z "$IBM_CLOUD_REGION" ] && missing_vars+=("IBM_CLOUD_REGION")
    [ -z "$CODE_ENGINE_PROJECT" ] && missing_vars+=("CODE_ENGINE_PROJECT")
    [ -z "$CODE_ENGINE_APP_NAME" ] && missing_vars+=("CODE_ENGINE_APP_NAME")
    [ -z "$CONTAINER_REGISTRY_NAMESPACE" ] && missing_vars+=("CONTAINER_REGISTRY_NAMESPACE")
    
    if [ ${#missing_vars[@]} -gt 0 ]; then
        print_error "Missing required environment variables:"
        for var in "${missing_vars[@]}"; do
            echo "  - $var"
        done
        print_info "Please add these variables to your .env file."
        print_info "See react-app/.env.example for reference."
        exit 1
    fi
    
    # Set defaults for optional variables
    export IBM_CLOUD_RESOURCE_GROUP="${IBM_CLOUD_RESOURCE_GROUP:-default}"
    export CONTAINER_IMAGE_NAME="${CONTAINER_IMAGE_NAME:-bob-lab}"
    export CONTAINER_IMAGE_TAG="${CONTAINER_IMAGE_TAG:-latest}"
    
    print_success "All required environment variables are set"
    print_info "Configuration:"
    echo "  Region: $IBM_CLOUD_REGION"
    echo "  Resource Group: $IBM_CLOUD_RESOURCE_GROUP"
    echo "  Project: $CODE_ENGINE_PROJECT"
    echo "  App Name: $CODE_ENGINE_APP_NAME"
    echo "  Registry Namespace: $CONTAINER_REGISTRY_NAMESPACE"
    echo "  Image: $CONTAINER_IMAGE_NAME:$CONTAINER_IMAGE_TAG"
}

# Check prerequisites
check_prerequisites() {
    print_step "Checking prerequisites"
    
    local missing_tools=()
    
    # Check if IBM Cloud CLI is installed
    if ! command -v ibmcloud &> /dev/null; then
        missing_tools+=("IBM Cloud CLI (https://cloud.ibm.com/docs/cli)")
    fi
    
    # Check if Podman is installed
    if ! command -v podman &> /dev/null; then
        missing_tools+=("Podman (https://podman.io/getting-started/installation)")
    fi
    
    if [ ${#missing_tools[@]} -gt 0 ]; then
        print_error "Missing required tools:"
        for tool in "${missing_tools[@]}"; do
            echo "  - $tool"
        done
        exit 1
    fi
    
    # Check if Podman is running (macOS requires Podman machine)
    if ! podman info &> /dev/null; then
        print_warning "Podman is not running. Checking Podman machine status..."
        
        # Check if we're on macOS (Podman requires a machine)
        if [[ "$OSTYPE" == "darwin"* ]]; then
            print_info "Detected macOS - checking Podman machine..."
            
            # Check if any machine exists
            if ! podman machine list &> /dev/null || [ -z "$(podman machine list --format '{{.Name}}' 2>/dev/null)" ]; then
                print_info "No Podman machine found. Initializing default machine..."
                if podman machine init; then
                    print_success "Podman machine initialized"
                else
                    print_error "Failed to initialize Podman machine"
                    print_info "Please run: podman machine init"
                    exit 1
                fi
            fi
            
            # Check if machine is running
            if ! podman machine list --format '{{.LastUp}}' 2>/dev/null | grep -q "Currently running"; then
                print_info "Starting Podman machine..."
                if podman machine start; then
                    print_success "Podman machine started successfully"
                    
                    # Wait a moment for the machine to be fully ready
                    print_info "Waiting for Podman to be ready..."
                    sleep 3
                    
                    # Verify Podman is now working
                    if ! podman info &> /dev/null; then
                        print_error "Podman machine started but Podman is still not responding"
                        print_info "Please check: podman machine list"
                        exit 1
                    fi
                else
                    print_error "Failed to start Podman machine"
                    print_info "Please run: podman machine start"
                    exit 1
                fi
            else
                print_success "Podman machine is already running"
            fi
        else
            print_error "Podman is not running or not properly configured."
            print_info "Please start Podman and try again."
            exit 1
        fi
    else
        print_success "Podman is running"
    fi
    
    # Check if Code Engine plugin is installed
    if ! ibmcloud plugin list | grep -q "code-engine"; then
        print_warning "Code Engine plugin not installed. Installing..."
        ibmcloud plugin install code-engine -f
    fi
    
    # Check if Container Registry plugin is installed
    if ! ibmcloud plugin list | grep -q "container-registry"; then
        print_warning "Container Registry plugin not installed. Installing..."
        ibmcloud plugin install container-registry -f
    fi
    
    print_success "All prerequisites met"
}

# Login to IBM Cloud using API key
login_to_ibm_cloud() {
    print_step "Logging in to IBM Cloud"
    
    # Login using API key (non-interactive)
    if ibmcloud login --apikey "$IBM_CLOUD_API_KEY" -r "$IBM_CLOUD_REGION" -g "$IBM_CLOUD_RESOURCE_GROUP" &> /dev/null; then
        print_success "Successfully logged in to IBM Cloud"
        print_info "Region: $IBM_CLOUD_REGION"
        print_info "Resource Group: $IBM_CLOUD_RESOURCE_GROUP"
    else
        print_error "Failed to login to IBM Cloud"
        print_info "Please check your API key and region settings in .env file"
        exit 1
    fi
}

# Select or create Code Engine project
setup_code_engine_project() {
    print_step "Setting up Code Engine project"
    
    # Check if project exists
    if ibmcloud ce project get --name "$CODE_ENGINE_PROJECT" &> /dev/null; then
        print_info "Project '$CODE_ENGINE_PROJECT' exists, selecting..."
        ibmcloud ce project select --name "$CODE_ENGINE_PROJECT"
        print_success "Project selected: $CODE_ENGINE_PROJECT"
    else
        print_info "Project '$CODE_ENGINE_PROJECT' does not exist, creating..."
        ibmcloud ce project create --name "$CODE_ENGINE_PROJECT"
        print_success "Project created: $CODE_ENGINE_PROJECT"
    fi
}

# Build container image with Podman
build_container_image() {
    print_step "Building container image with Podman"
    
    cd "$SCRIPT_DIR"
    
    print_info "Building image: $CONTAINER_IMAGE_NAME:$CONTAINER_IMAGE_TAG"
    
    if podman build -t "$CONTAINER_IMAGE_NAME:$CONTAINER_IMAGE_TAG" . ; then
        print_success "Container image built successfully"
    else
        print_error "Failed to build container image"
        exit 1
    fi
}

# Push image to IBM Container Registry
push_to_registry() {
    print_step "Pushing image to IBM Container Registry"
    
    # Set the registry region
    ibmcloud cr region-set "$IBM_CLOUD_REGION"
    
    # Login to IBM Container Registry
    print_info "Logging in to Container Registry..."
    ibmcloud cr login
    
    # Check if namespace exists, create if not
    if ! ibmcloud cr namespace-list | grep -q "$CONTAINER_REGISTRY_NAMESPACE"; then
        print_info "Namespace '$CONTAINER_REGISTRY_NAMESPACE' does not exist, creating..."
        ibmcloud cr namespace-add "$CONTAINER_REGISTRY_NAMESPACE"
        print_success "Namespace created: $CONTAINER_REGISTRY_NAMESPACE"
    fi
    
    # Full image path
    FULL_IMAGE_PATH="${IBM_CLOUD_REGION}.icr.io/${CONTAINER_REGISTRY_NAMESPACE}/${CONTAINER_IMAGE_NAME}:${CONTAINER_IMAGE_TAG}"
    
    print_info "Tagging image: $FULL_IMAGE_PATH"
    podman tag "$CONTAINER_IMAGE_NAME:$CONTAINER_IMAGE_TAG" "$FULL_IMAGE_PATH"
    
    print_info "Pushing image to registry..."
    if podman push "$FULL_IMAGE_PATH"; then
        print_success "Image pushed successfully: $FULL_IMAGE_PATH"
    else
        print_error "Failed to push image to registry"
        exit 1
    fi
}

# Deploy or update Code Engine application
deploy_application() {
    print_step "Deploying application to Code Engine"
    
    # Full image path
    FULL_IMAGE_PATH="${IBM_CLOUD_REGION}.icr.io/${CONTAINER_REGISTRY_NAMESPACE}/${CONTAINER_IMAGE_NAME}:${CONTAINER_IMAGE_TAG}"
    
    # Check if application exists
    if ibmcloud ce app get --name "$CODE_ENGINE_APP_NAME" &> /dev/null; then
        print_info "Application '$CODE_ENGINE_APP_NAME' exists, updating..."
        
        if ibmcloud ce app update --name "$CODE_ENGINE_APP_NAME" \
            --image "$FULL_IMAGE_PATH" \
            --port 8080 \
            --min-scale 1 \
            --max-scale 5 \
            --cpu 0.25 \
            --memory 512M \
            --wait \
            --quiet; then
            print_success "Application updated successfully"
        else
            print_error "Failed to update application"
            exit 1
        fi
    else
        print_info "Creating new application '$CODE_ENGINE_APP_NAME'..."
        
        if ibmcloud ce app create --name "$CODE_ENGINE_APP_NAME" \
            --image "$FULL_IMAGE_PATH" \
            --port 8080 \
            --min-scale 1 \
            --max-scale 5 \
            --cpu 0.25 \
            --memory 512M \
            --wait \
            --quiet; then
            print_success "Application created successfully"
        else
            print_error "Failed to create application"
            exit 1
        fi
    fi
}

# Get and display application URL
show_application_url() {
    print_step "Getting application URL"
    
    # Get the application URL
    APP_URL=$(ibmcloud ce app get --name "$CODE_ENGINE_APP_NAME" --output json 2>/dev/null | grep -o '"url":"[^"]*' | cut -d'"' -f4)
    
    if [ -n "$APP_URL" ]; then
        echo ""
        print_success "Deployment completed successfully!"
        echo ""
        echo -e "${BOLD}${GREEN}Application URL:${NC} ${CYAN}$APP_URL${NC}"
        echo ""
    else
        print_warning "Could not retrieve application URL"
        print_info "Run: ibmcloud ce app get --name $CODE_ENGINE_APP_NAME"
    fi
}

# Cleanup local Podman images
cleanup_local_images() {
    print_step "Cleaning up local Podman images"
    
    print_info "Removing dangling images..."
    podman image prune -f &> /dev/null || true
    
    print_success "Cleanup complete"
}

# Show next steps
show_next_steps() {
    echo ""
    print_header "Next Steps"
    
    echo -e "${BOLD}Monitor your application:${NC}"
    echo "  • View logs:    ibmcloud ce app logs --name $CODE_ENGINE_APP_NAME --follow"
    echo "  • Get status:   ibmcloud ce app get --name $CODE_ENGINE_APP_NAME"
    echo "  • List apps:    ibmcloud ce app list"
    echo ""
    echo -e "${BOLD}Manage your application:${NC}"
    echo "  • Scale up:     ibmcloud ce app update --name $CODE_ENGINE_APP_NAME --min-scale 2 --max-scale 10"
    echo "  • Update CPU:   ibmcloud ce app update --name $CODE_ENGINE_APP_NAME --cpu 0.5 --memory 1G"
    echo "  • Delete app:   ibmcloud ce app delete --name $CODE_ENGINE_APP_NAME"
    echo ""
    echo -e "${BOLD}Redeploy:${NC}"
    echo "  • Run this script again: ./deploy-with-apikey.sh"
    echo ""
}

################################################################################
# Main Execution
################################################################################

main() {
    print_header "IBM Code Engine Deployment with API Key"
    
    # Load and validate environment
    load_env_file
    validate_env_vars
    
    # Check prerequisites
    check_prerequisites
    
    # Login to IBM Cloud
    login_to_ibm_cloud
    
    # Setup Code Engine project
    setup_code_engine_project
    
    # Build and push image
    build_container_image
    push_to_registry
    
    # Deploy application
    deploy_application
    
    # Show results
    show_application_url
    
    # Cleanup
    cleanup_local_images
    
    # Show next steps
    show_next_steps
    
    print_success "All done! 🚀"
    echo ""
}

# Trap errors and show helpful message
trap 'print_error "Deployment failed. Check the error messages above."; exit 1' ERR

# Run main function
main

# Made with Bob