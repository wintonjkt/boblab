#!/bin/bash

################################################################################
# Debug Script for IBM Cloud Deployment Environment
#
# This script helps diagnose issues with:
# - Environment variable loading
# - IBM Cloud CLI installation and configuration
# - Network connectivity
# - API key validation
# - Proxy settings
################################################################################

set -e

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'
BOLD='\033[1m'

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
ENV_FILE="$PROJECT_ROOT/.env"

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
    echo -e "${BOLD}$1${NC}"
}

# Check .env file
check_env_file() {
    print_header "Checking .env File"
    
    if [ ! -f "$ENV_FILE" ]; then
        print_error ".env file not found at: $ENV_FILE"
        return 1
    fi
    
    print_success ".env file found at: $ENV_FILE"
    
    # Load environment variables
    while IFS='=' read -r key value; do
        [[ $key =~ ^#.*$ ]] && continue
        [[ -z $key ]] && continue
        key=$(echo "$key" | xargs)
        value=$(echo "$value" | xargs)
        if [ -n "$key" ] && [ -n "$value" ]; then
            export "$key=$value"
        fi
    done < "$ENV_FILE"
    
    print_success "Environment variables loaded"
    
    # Check required variables
    print_step "Required Variables:"
    
    local all_ok=true
    
    if [ -n "$IBM_CLOUD_API_KEY" ]; then
        print_success "IBM_CLOUD_API_KEY: ${IBM_CLOUD_API_KEY:0:4}****${IBM_CLOUD_API_KEY: -4}"
    else
        print_error "IBM_CLOUD_API_KEY: NOT SET"
        all_ok=false
    fi
    
    if [ -n "$IBM_CLOUD_REGION" ]; then
        print_success "IBM_CLOUD_REGION: $IBM_CLOUD_REGION"
    else
        print_error "IBM_CLOUD_REGION: NOT SET"
        all_ok=false
    fi
    
    if [ -n "$CODE_ENGINE_PROJECT" ]; then
        print_success "CODE_ENGINE_PROJECT: $CODE_ENGINE_PROJECT"
    else
        print_error "CODE_ENGINE_PROJECT: NOT SET"
        all_ok=false
    fi
    
    if [ -n "$CODE_ENGINE_APP_NAME" ]; then
        print_success "CODE_ENGINE_APP_NAME: $CODE_ENGINE_APP_NAME"
    else
        print_error "CODE_ENGINE_APP_NAME: NOT SET"
        all_ok=false
    fi
    
    if [ -n "$CONTAINER_REGISTRY_NAMESPACE" ]; then
        print_success "CONTAINER_REGISTRY_NAMESPACE: $CONTAINER_REGISTRY_NAMESPACE"
    else
        print_error "CONTAINER_REGISTRY_NAMESPACE: NOT SET"
        all_ok=false
    fi
    
    if [ "$all_ok" = true ]; then
        print_success "All required variables are set"
        return 0
    else
        print_error "Some required variables are missing"
        return 1
    fi
}

# Check IBM Cloud CLI
check_ibmcloud_cli() {
    print_header "Checking IBM Cloud CLI"
    
    if ! command -v ibmcloud &> /dev/null; then
        print_error "IBM Cloud CLI is not installed"
        print_info "Install from: https://cloud.ibm.com/docs/cli"
        return 1
    fi
    
    print_success "IBM Cloud CLI is installed"
    
    local version=$(ibmcloud version 2>/dev/null | head -1)
    print_info "Version: $version"
    
    # Check plugins
    print_step "Checking Plugins:"
    
    if ibmcloud plugin list 2>/dev/null | grep -q "code-engine"; then
        print_success "Code Engine plugin installed"
    else
        print_warning "Code Engine plugin not installed"
        print_info "Install with: ibmcloud plugin install code-engine"
    fi
    
    if ibmcloud plugin list 2>/dev/null | grep -q "container-registry"; then
        print_success "Container Registry plugin installed"
    else
        print_warning "Container Registry plugin not installed"
        print_info "Install with: ibmcloud plugin install container-registry"
    fi
    
    return 0
}

# Check network connectivity
check_network() {
    print_header "Checking Network Connectivity"
    
    print_step "Testing IBM Cloud endpoints:"
    
    # Test cloud.ibm.com
    if curl -s --connect-timeout 5 https://cloud.ibm.com > /dev/null 2>&1; then
        print_success "cloud.ibm.com is reachable"
    else
        print_error "cloud.ibm.com is NOT reachable"
        print_warning "This may indicate network or proxy issues"
    fi
    
    # Test IAM endpoint
    if curl -s --connect-timeout 5 https://iam.cloud.ibm.com > /dev/null 2>&1; then
        print_success "iam.cloud.ibm.com is reachable"
    else
        print_error "iam.cloud.ibm.com is NOT reachable"
        print_warning "This may indicate network or proxy issues"
    fi
    
    # Check proxy settings
    print_step "Proxy Settings:"
    
    if [ -n "$HTTP_PROXY" ]; then
        print_info "HTTP_PROXY: $HTTP_PROXY"
    else
        print_info "HTTP_PROXY: not set"
    fi
    
    if [ -n "$HTTPS_PROXY" ]; then
        print_info "HTTPS_PROXY: $HTTPS_PROXY"
    else
        print_info "HTTPS_PROXY: not set"
    fi
    
    if [ -n "$NO_PROXY" ]; then
        print_info "NO_PROXY: $NO_PROXY"
    else
        print_info "NO_PROXY: not set"
    fi
}

# Check Podman
check_podman() {
    print_header "Checking Podman"
    
    if ! command -v podman &> /dev/null; then
        print_error "Podman is not installed"
        print_info "Install from: https://podman.io/getting-started/installation"
        return 1
    fi
    
    print_success "Podman is installed"
    
    local version=$(podman version --format "{{.Version}}" 2>/dev/null)
    print_info "Version: $version"
    
    # Check if Podman is running
    if podman info &> /dev/null; then
        print_success "Podman is running"
        
        # Check Podman machine status (macOS)
        if [[ "$OSTYPE" == "darwin"* ]]; then
            print_step "Podman Machine Status:"
            podman machine list 2>/dev/null || print_warning "Could not get machine status"
        fi
    else
        print_error "Podman is not running"
        
        if [[ "$OSTYPE" == "darwin"* ]]; then
            print_info "On macOS, start with: podman machine start"
        fi
        
        return 1
    fi
    
    return 0
}

# Test IBM Cloud login
test_ibm_cloud_login() {
    print_header "Testing IBM Cloud Login"
    
    if [ -z "$IBM_CLOUD_API_KEY" ]; then
        print_error "IBM_CLOUD_API_KEY not set, skipping login test"
        return 1
    fi
    
    print_info "Attempting to login to IBM Cloud..."
    print_info "Region: $IBM_CLOUD_REGION"
    
    # Try login with timeout
    if timeout 30 ibmcloud login --apikey "$IBM_CLOUD_API_KEY" -r "$IBM_CLOUD_REGION" 2>&1 | tee /tmp/ibmcloud-login.log; then
        print_success "Successfully logged in to IBM Cloud"
        
        # Show current target
        print_step "Current Target:"
        ibmcloud target 2>/dev/null || true
        
        return 0
    else
        print_error "Failed to login to IBM Cloud"
        
        print_step "Error Details:"
        cat /tmp/ibmcloud-login.log
        
        print_step "Possible Issues:"
        echo "  1. Invalid API key"
        echo "  2. Network connectivity issues"
        echo "  3. Proxy configuration needed"
        echo "  4. Region name incorrect"
        
        return 1
    fi
}

# Main execution
main() {
    print_header "IBM Cloud Deployment Environment Debug"
    
    local exit_code=0
    
    check_env_file || exit_code=1
    check_ibmcloud_cli || exit_code=1
    check_network || exit_code=1
    check_podman || exit_code=1
    
    if [ $exit_code -eq 0 ]; then
        test_ibm_cloud_login || exit_code=1
    fi
    
    echo ""
    if [ $exit_code -eq 0 ]; then
        print_header "All Checks Passed ✓"
        print_success "Your environment is ready for deployment!"
        echo ""
        print_info "Run the deployment with: ./deploy-with-apikey.sh"
    else
        print_header "Some Checks Failed ✗"
        print_warning "Please fix the issues above before deploying"
    fi
    echo ""
    
    return $exit_code
}

# Run main
main

# Made with Bob