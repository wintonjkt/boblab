#!/bin/bash

# Deployment Verification Script for Bob Lab React Application
# This script verifies that the deployed application is working correctly

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
BASE_URL="${1:-http://localhost:4173}"
TIMEOUT=10
FAILED_TESTS=0
PASSED_TESTS=0

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Bob Lab Deployment Verification${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "Testing URL: ${YELLOW}${BASE_URL}${NC}\n"

# Function to test HTTP endpoint
test_endpoint() {
    local url="$1"
    local description="$2"
    local expected_status="${3:-200}"
    
    echo -n "Testing ${description}... "
    
    http_code=$(curl -s -o /dev/null -w "%{http_code}" --max-time $TIMEOUT "${BASE_URL}${url}" 2>/dev/null)
    
    if [ "$http_code" = "$expected_status" ]; then
        echo -e "${GREEN}✓ PASS${NC} (HTTP $http_code)"
        ((PASSED_TESTS++))
        return 0
    else
        echo -e "${RED}✗ FAIL${NC} (HTTP $http_code, expected $expected_status)"
        ((FAILED_TESTS++))
        return 1
    fi
}

# Function to test content
test_content() {
    local url="$1"
    local description="$2"
    local search_string="$3"
    
    echo -n "Testing ${description}... "
    
    content=$(curl -s --max-time $TIMEOUT "${BASE_URL}${url}" 2>/dev/null)
    
    if echo "$content" | grep -iq "$search_string"; then
        echo -e "${GREEN}✓ PASS${NC} (content found)"
        ((PASSED_TESTS++))
        return 0
    else
        echo -e "${RED}✗ FAIL${NC} (content not found)"
        ((FAILED_TESTS++))
        return 1
    fi
}

# Function to check if server is reachable
check_server() {
    echo -n "Checking if server is reachable... "
    if curl -s --max-time 5 "${BASE_URL}" > /dev/null 2>&1; then
        echo -e "${GREEN}✓ Server is reachable${NC}\n"
        return 0
    else
        echo -e "${RED}✗ Server is not reachable${NC}"
        echo -e "${RED}Please ensure the application is running at ${BASE_URL}${NC}"
        exit 1
    fi
}

# Main test execution
echo -e "${BLUE}1. Server Health Check${NC}"
echo -e "${BLUE}========================================${NC}"
check_server

echo -e "${BLUE}2. Main Routes${NC}"
echo -e "${BLUE}========================================${NC}"
test_endpoint "/" "Home page"
test_endpoint "/narrative" "Narrative page"
test_endpoint "/labs" "Labs index page"
echo ""

echo -e "${BLUE}3. Lab Pages${NC}"
echo -e "${BLUE}========================================${NC}"
test_endpoint "/labs/getting-started" "Getting Started lab"
test_endpoint "/labs/ibmi" "IBM i lab"
test_endpoint "/labs/mcp" "MCP lab"
test_endpoint "/labs/sdlc" "SDLC lab"
test_endpoint "/labs/appmod" "AppMod lab"
test_endpoint "/labs/cobol2java" "Cobol2Java lab"
test_endpoint "/labs/bobshell" "BobShell lab"
test_endpoint "/labs/bob-rules" "Bob Rules lab"
test_endpoint "/labs/carbon-react" "Carbon React lab"
test_endpoint "/labs/custom-modes" "Custom Modes lab"
test_endpoint "/labs/spec-driven-development" "Spec-Driven Development lab"
test_endpoint "/labs/walkthrough" "Walkthrough lab"
test_endpoint "/labs/wxo-orchestrate" "WXO Orchestrate lab"
echo ""

echo -e "${BLUE}4. Static Assets${NC}"
echo -e "${BLUE}========================================${NC}"
# Note: Asset filenames may change with each build due to content hashing
# This section tests that the main HTML loads and references assets
test_content "/" "HTML structure" "<!doctype html>"
test_content "/" "CSS reference" ".css"
test_content "/" "JS reference" ".js"
echo ""

echo -e "${BLUE}5. Content Verification${NC}"
echo -e "${BLUE}========================================${NC}"
test_content "/" "React root element" "root"
test_content "/labs" "Labs page content" "Labs"
echo ""

echo -e "${BLUE}6. Error Handling${NC}"
echo -e "${BLUE}========================================${NC}"
# Test that invalid routes return the SPA (which will handle 404 internally)
test_endpoint "/invalid-route-12345" "Invalid route handling" "200"
echo ""

# Summary
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Test Summary${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "Passed: ${GREEN}${PASSED_TESTS}${NC}"
echo -e "Failed: ${RED}${FAILED_TESTS}${NC}"
echo -e "Total:  $((PASSED_TESTS + FAILED_TESTS))"
echo ""

if [ $FAILED_TESTS -eq 0 ]; then
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}✓ All tests passed!${NC}"
    echo -e "${GREEN}Deployment verification successful.${NC}"
    echo -e "${GREEN}========================================${NC}"
    exit 0
else
    echo -e "${RED}========================================${NC}"
    echo -e "${RED}✗ Some tests failed!${NC}"
    echo -e "${RED}Please review the failures above.${NC}"
    echo -e "${RED}========================================${NC}"
    exit 1
fi

# Made with Bob
