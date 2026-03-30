# IBM Code Engine Deployment Guide


## Important: Container Registry Changes

**Updated: March 2026**

This deployment has been optimized to use AWS ECR Public Gallery (public.ecr.aws) instead of Docker Hub (docker.io) to avoid timeout and rate limiting issues:

- **Alpine Linux**: `public.ecr.aws/docker/library/alpine:3.19` (AWS ECR Public Gallery)
- **nginx**: `public.ecr.aws/docker/library/nginx:1.27-alpine` (AWS ECR Public Gallery)
- **Bun**: Installed directly from official source (https://bun.sh/install)

Using AWS ECR Public Gallery provides excellent reliability, fast downloads, and no rate limiting for public images. See the [Container Registry Troubleshooting](#issue-container-registry-timeout-or-failed-to-pull-image) section for more details.

---

Complete guide for deploying the Bob Lab React application to IBM Code Engine using automated API key authentication.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Configuration](#configuration)
4. [Deployment](#deployment)
5. [Verification](#verification)
6. [Management](#management)
7. [Troubleshooting](#troubleshooting)
8. [Security Best Practices](#security-best-practices)
9. [Advanced Configuration](#advanced-configuration)

---

## Prerequisites

### Required Tools

1. **IBM Cloud CLI**
   ```bash
   # macOS
   curl -fsSL https://clis.cloud.ibm.com/install/osx | sh
   
   # Linux
   curl -fsSL https://clis.cloud.ibm.com/install/linux | sh
   
   # Windows (PowerShell as Administrator)
   iex(New-Object Net.WebClient).DownloadString('https://clis.cloud.ibm.com/install/powershell')
   ```
   
   Verify installation:
   ```bash
   ibmcloud --version
   ```

2. **Podman**
   - Download from: https://podman.io/getting-started/installation
   - Podman is a daemonless container engine (no Docker Desktop required)
   
   **macOS Users**: Podman requires a Podman machine (Linux VM) to run containers. See [PODMAN_SETUP.md](./PODMAN_SETUP.md) for detailed setup instructions.
   
   Quick setup:
   ```bash
   # Install Podman
   brew install podman
   
   # Initialize and start Podman machine (macOS only)
   podman machine init
   podman machine start
   
   # Verify installation
   podman --version
   podman info
   ```
   
   **Note**: The deployment script automatically starts the Podman machine on macOS if it's not running. See [PODMAN_SETUP.md](./PODMAN_SETUP.md) for troubleshooting and advanced configuration.

3. **IBM Cloud Account**
   - Sign up at: https://cloud.ibm.com/registration
   - Verify your email address

### Required IBM Cloud Plugins

Install the Code Engine and Container Registry plugins:

```bash
# Install Code Engine plugin
ibmcloud plugin install code-engine

# Install Container Registry plugin
ibmcloud plugin install container-registry

# Verify plugins are installed
ibmcloud plugin list
```

---

## Initial Setup

### Step 1: Get Your IBM Cloud API Key

1. **Login to IBM Cloud Console**
   - Go to: https://cloud.ibm.com/
   - Sign in with your IBM Cloud account

2. **Create an API Key**
   - Navigate to: https://cloud.ibm.com/iam/apikeys
   - Click **"Create an IBM Cloud API key"**
   - Enter a name (e.g., "bob-lab-deployment")
   - Add a description (e.g., "API key for Bob Lab Code Engine deployment")
   - Click **"Create"**
   - **IMPORTANT**: Copy the API key immediately - you won't be able to see it again!

3. **Save Your API Key Securely**
   - Store it in a password manager
   - Never commit it to version control
   - Never share it publicly

### Step 2: Create Container Registry Namespace

A namespace is required to store your Docker images.

1. **Via IBM Cloud Console**
   - Go to: https://cloud.ibm.com/registry/namespaces
   - Click **"Create"**
   - Enter a unique namespace name (e.g., "boblab-yourname")
   - Select your region (e.g., "us-south")
   - Click **"Create"**

2. **Via CLI**
   ```bash
   # Login first
   ibmcloud login --apikey YOUR_API_KEY
   
   # Set region
   ibmcloud cr region-set us-south
   
   # Create namespace
   ibmcloud cr namespace-add your-namespace-name
   
   # Verify
   ibmcloud cr namespace-list
   ```

### Step 3: Create Code Engine Project (Optional)

The deployment script can create the project automatically, but you can create it manually:

1. **Via IBM Cloud Console**
   - Go to: https://cloud.ibm.com/codeengine/projects
   - Click **"Create project"**
   - Enter project name (e.g., "bob-lab-project")
   - Select your region
   - Select resource group (default is fine)
   - Click **"Create"**

2. **Via CLI**
   ```bash
   ibmcloud ce project create --name bob-lab-project
   ```

---

## Configuration

### Step 1: Set Up Environment Variables

1. **Navigate to Project Root**
   ```bash
   cd /Users/yingkitw/Desktop/ceproject/boblab
   ```

2. **Create or Update .env File**
   
   If `.env` doesn't exist, create it:
   ```bash
   touch .env
   ```
   
   Add the following variables (replace with your actual values):
   ```bash
   # IBM Cloud Authentication
   IBM_CLOUD_API_KEY=your_actual_api_key_here
   
   # IBM Cloud Configuration
   IBM_CLOUD_REGION=us-south
   IBM_CLOUD_RESOURCE_GROUP=default
   
   # Code Engine Configuration
   CODE_ENGINE_PROJECT=bob-lab-project
   CODE_ENGINE_APP_NAME=bob-lab-app
   
   # Container Registry Configuration
   CONTAINER_REGISTRY_NAMESPACE=your_namespace_here
   CONTAINER_IMAGE_NAME=bob-lab
   CONTAINER_IMAGE_TAG=latest
   ```

3. **Verify .env is in .gitignore**
   ```bash
   # Check if .env is ignored
   grep -q "^\.env$" .gitignore && echo "✓ .env is in .gitignore" || echo "✗ Add .env to .gitignore"
   ```

### Step 2: Review Configuration

Check your configuration:

```bash
# View your .env file (be careful not to share this!)
cat .env

# Verify all required variables are set
grep -E "IBM_CLOUD_API_KEY|IBM_CLOUD_REGION|CODE_ENGINE_PROJECT|CODE_ENGINE_APP_NAME|CONTAINER_REGISTRY_NAMESPACE" .env
```

### Available Regions

Choose the region closest to your users:

- `us-south` - Dallas, USA
- `us-east` - Washington DC, USA
- `eu-gb` - London, UK
- `eu-de` - Frankfurt, Germany
- `jp-tok` - Tokyo, Japan
- `jp-osa` - Osaka, Japan
- `au-syd` - Sydney, Australia
- `ca-tor` - Toronto, Canada
- `br-sao` - São Paulo, Brazil

---

## Deployment

### Automated Deployment (Recommended)

Use the automated deployment script with API key authentication:

```bash
# Navigate to react-app directory
cd react-app

# Run the deployment script
./deploy-with-apikey.sh
```

The script will:
1. ✅ Load environment variables from `../.env`
2. ✅ Validate all required variables
3. ✅ Check prerequisites (IBM Cloud CLI, Docker, plugins)
4. ✅ Login to IBM Cloud using API key
5. ✅ Select or create Code Engine project
6. ✅ Build Docker image
7. ✅ Push image to IBM Container Registry
8. ✅ Deploy or update Code Engine application
9. ✅ Display application URL
10. ✅ Clean up local Docker images

### Manual Deployment

If you prefer manual control, use the original script:

```bash
# Login to IBM Cloud first
ibmcloud login

# Run manual deployment script
./deploy.sh
```

### First-Time Deployment

On first deployment, the script will:
- Create the Code Engine project (if it doesn't exist)
- Create the Container Registry namespace (if it doesn't exist)
- Create a new Code Engine application
- Configure the application with default settings

### Subsequent Deployments

On subsequent deployments, the script will:
- Update the existing application with the new image
- Maintain existing configuration (unless you modify the script)
- Perform a rolling update with zero downtime

---

## Verification

### Check Deployment Status

After deployment completes, verify your application:

1. **Visit the Application URL**
   
   The deployment script displays the URL at the end:
   ```
   Application URL: https://bob-lab-app.xxxxx.us-south.codeengine.appdomain.cloud
   ```
   
   Open this URL in your browser to verify the application is running.

2. **Check Application Status**
   ```bash
   ibmcloud ce app get --name bob-lab-app
   ```
   
   Look for:
   - Status: `Ready`
   - URL: Your application URL
   - Running instances: Should be > 0

3. **View Application Logs**
   ```bash
   # Real-time logs
   ibmcloud ce app logs --name bob-lab-app --follow
   
   # Recent logs
   ibmcloud ce app logs --name bob-lab-app --tail 100
   ```

4. **Test Application Endpoints**
   ```bash
   # Test the home page
   curl -I https://your-app-url.codeengine.appdomain.cloud
   
   # Should return HTTP 200 OK
   ```

---

## Management

### View Application Details

```bash
# Get application information
ibmcloud ce app get --name bob-lab-app

# List all applications in project
ibmcloud ce app list

# Get application events
ibmcloud ce app events --name bob-lab-app
```

### Scale Application

```bash
# Scale up
ibmcloud ce app update --name bob-lab-app \
  --min-scale 2 \
  --max-scale 10

# Scale down (for cost savings)
ibmcloud ce app update --name bob-lab-app \
  --min-scale 0 \
  --max-scale 3
```

### Update Resources

```bash
# Increase CPU and memory
ibmcloud ce app update --name bob-lab-app \
  --cpu 0.5 \
  --memory 1G

# Decrease for cost savings
ibmcloud ce app update --name bob-lab-app \
  --cpu 0.25 \
  --memory 512M
```

### Update Environment Variables

```bash
# Create a configmap
ibmcloud ce configmap create --name bob-lab-config \
  --from-literal NODE_ENV=production \
  --from-literal TZ=UTC

# Update app to use configmap
ibmcloud ce app update --name bob-lab-app \
  --env-from-configmap bob-lab-config

# Or set individual variables
ibmcloud ce app update --name bob-lab-app \
  --env NODE_ENV=production \
  --env TZ=UTC
```

### Redeploy Application

To deploy a new version:

```bash
# Simply run the deployment script again
./deploy-with-apikey.sh
```

### Delete Application

```bash
# Delete the application
ibmcloud ce app delete --name bob-lab-app --force

# Delete the project (removes all resources)
ibmcloud ce project delete --name bob-lab-project --force
```

---

## Troubleshooting

### Common Issues and Solutions

#### Issue: "IBM_CLOUD_API_KEY is not set"

**Cause**: Missing or incorrect .env file

**Solution**:
1. Verify `.env` file exists in project root: `/Users/yingkitw/Desktop/ceproject/boblab/.env`
2. Check that `IBM_CLOUD_API_KEY` is set in the file
3. Ensure no extra spaces around the `=` sign
4. Verify the API key is valid (not expired or revoked)

#### Issue: "Failed to login to IBM Cloud"

**Cause**: Invalid API key or network issues

**Solution**:
1. Verify your API key is correct
2. Check your internet connection
3. Try logging in manually:
   ```bash
   ibmcloud login --apikey YOUR_API_KEY
   ```
4. If behind a corporate proxy, configure proxy settings

#### Issue: "Namespace does not exist"

**Cause**: Container Registry namespace not created

**Solution**:
```bash
# Create the namespace
ibmcloud cr namespace-add your-namespace-name

# Verify
ibmcloud cr namespace-list
```

#### Issue: "Podman is not running"

**Cause**: Podman is not properly configured

**Solution**:
1. Verify Podman is installed: `podman --version`
2. Check Podman status: `podman info`
3. On macOS, ensure Podman machine is running:
   ```bash
   podman machine start
   ```
4. On Linux, Podman runs rootless by default (no daemon needed)

#### Issue: "Image pull errors" in Code Engine

**Cause**: Code Engine can't access Container Registry

**Solution**:
```bash
# Create registry access
ibmcloud ce registry create --name icr-access \
  --server us-south.icr.io \
  --username iamapikey \
  --password YOUR_API_KEY

# Update app to use registry access
ibmcloud ce app update --name bob-lab-app \
  --registry-secret icr-access
```

#### Issue: "Application not starting" or "502 Bad Gateway"

**Cause**: Application error or incorrect port configuration

**Solution**:
1. Check application logs:
   ```bash
   ibmcloud ce app logs --name bob-lab-app --tail 100
   ```
2. Verify the application listens on port 8080
3. Check for errors in the build or startup
4. Test the container image locally:
   ```bash
   podman build -t bob-lab:test .
   podman run -p 8080:8080 bob-lab:test
   # Visit http://localhost:8080
   ```

#### Issue: "Build fails" during deployment

**Cause**: Container build errors

**Solution**:
1. Test the build locally:
   ```bash
   cd react-app
   podman build -t bob-lab:test .
   ```
2. Check for missing dependencies in package.json
3. Verify Dockerfile is correct (Podman-compatible)
4. Check for sufficient disk space
5. On macOS, ensure Podman machine has enough resources:
   ```bash
   podman machine stop
   podman machine rm
   podman machine init --cpus 4 --memory 8192 --disk-size 50
   podman machine start
   ```
#### Issue: "Container registry timeout" or "Failed to pull image"

**Cause**: Docker Hub (docker.io) rate limiting or network timeouts

**Solution**:

The Dockerfile has been updated to use alternative container registries that are more reliable:

1. **Alpine base image**: Uses official Alpine Linux registry (mirrored on multiple CDNs)
2. **nginx image**: Uses `quay.io/nginx/nginx` (Red Hat's Quay registry)

**Alternative Registry Options**:

If you still experience issues, you can configure Podman to use registry mirrors:

```bash
# Create or edit registries.conf
mkdir -p ~/.config/containers
cat > ~/.config/containers/registries.conf << 'EOF'
unqualified-search-registries = ["docker.io"]

[[registry]]
prefix = "docker.io"
location = "docker.io"

[[registry.mirror]]
location = "mirror.gcr.io"

[[registry.mirror]]
location = "quay.io"
EOF
```

**Registry Fallback Strategy**:

The Dockerfile uses the following strategy:
1. **Alpine**: Official Alpine Linux (available on multiple mirrors)
2. **nginx**: `quay.io/nginx/nginx:1.27-alpine` (Red Hat's registry)
3. **Bun**: Installed from official source (https://bun.sh/install)

**Verify Registry Access**:

```bash
# Test pulling from alternative registries
podman pull quay.io/nginx/nginx:1.27-alpine
podman pull alpine:3.19

# Check registry configuration
podman info | grep -A 10 registries
```

**Why Alternative Registries?**:
- **quay.io**: Red Hat's container registry, highly reliable and fast
- **alpine official**: Distributed via CDN, no rate limiting
- **Direct installation**: Bun installed from official source, bypassing registry issues


#### Issue: "Permission denied" when running script

**Cause**: Script is not executable

**Solution**:
```bash
chmod +x deploy-with-apikey.sh
```

#### Issue: Slow performance or timeouts

**Cause**: Insufficient resources

**Solution**:
```bash
# Increase resources
ibmcloud ce app update --name bob-lab-app \
  --cpu 1 \
  --memory 2G \
  --min-scale 2

# Or scale horizontally
ibmcloud ce app update --name bob-lab-app \
  --max-scale 10
```

### Getting Help

If you encounter issues not covered here:

1. **Check IBM Cloud Status**
   - Visit: https://cloud.ibm.com/status

2. **View Detailed Logs**
   ```bash
   ibmcloud ce app logs --name bob-lab-app --follow
   ```

3. **Check Application Events**
   ```bash
   ibmcloud ce app events --name bob-lab-app
   ```

4. **IBM Cloud Support**
   - Documentation: https://cloud.ibm.com/docs/codeengine
   - Support: https://cloud.ibm.com/unifiedsupport/supportcenter

---

## Security Best Practices

### API Key Security

1. **Never Commit API Keys**
   - Always use `.env` files (which are in `.gitignore`)
   - Never hardcode API keys in scripts or code
   - Use environment variables for sensitive data

2. **Rotate API Keys Regularly**
   - Create new API keys periodically
   - Delete old API keys after rotation
   - Update `.env` file with new key

3. **Use Least Privilege**
   - Create service IDs with minimal required permissions
   - Don't use your personal API key for deployments
   - Use separate API keys for different environments

4. **Secure Storage**
   - Store API keys in a password manager
   - Use IBM Cloud Secrets Manager for production
   - Never share API keys via email or chat

### Application Security

1. **HTTPS Only**
   - Code Engine provides HTTPS by default
   - Never disable HTTPS in production

2. **Security Headers**
   - Already configured in `nginx.conf`
   - Includes CSP, HSTS, X-Frame-Options, etc.

3. **Regular Updates**
   - Keep dependencies updated: `bun update`
   - Update base Docker images regularly
   - Monitor for security vulnerabilities

4. **Access Control**
   - Use IBM Cloud IAM for access control
   - Implement authentication if needed
   - Use Code Engine's built-in security features

### Network Security

1. **Private Endpoints**
   - Use private endpoints for internal services
   - Configure network policies if needed

2. **Rate Limiting**
   - Configure rate limiting in Code Engine
   - Use IBM Cloud Internet Services for DDoS protection

---

## Advanced Configuration

### Custom Domain

To use a custom domain:

1. **Add Custom Domain in Code Engine**
   ```bash
   ibmcloud ce app update --name bob-lab-app \
     --domain-mapping your-domain.com
   ```

2. **Configure DNS**
   - Add CNAME record pointing to Code Engine URL
   - Wait for DNS propagation

### Environment-Specific Deployments

Create separate `.env` files for different environments:

```bash
# Development
.env.development

# Staging
.env.staging

# Production
.env.production
```

Modify the script to load the appropriate file:
```bash
ENV_FILE="$PROJECT_ROOT/.env.${ENVIRONMENT:-production}"
```

### CI/CD Integration

Example GitHub Actions workflow:

```yaml
name: Deploy to Code Engine
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install IBM Cloud CLI
        run: curl -fsSL https://clis.cloud.ibm.com/install/linux | sh
      
      - name: Install plugins
        run: |
          ibmcloud plugin install code-engine -f
          ibmcloud plugin install container-registry -f
      
      - name: Create .env file
        run: |
          cat > .env << EOF
          IBM_CLOUD_API_KEY=${{ secrets.IBM_CLOUD_API_KEY }}
          IBM_CLOUD_REGION=${{ secrets.IBM_CLOUD_REGION }}
          CODE_ENGINE_PROJECT=${{ secrets.CODE_ENGINE_PROJECT }}
          CODE_ENGINE_APP_NAME=${{ secrets.CODE_ENGINE_APP_NAME }}
          CONTAINER_REGISTRY_NAMESPACE=${{ secrets.CONTAINER_REGISTRY_NAMESPACE }}
          EOF
      
      - name: Deploy
        run: |
          cd react-app
          ./deploy-with-apikey.sh
```

### Monitoring and Alerts

Set up monitoring:

```bash
# Enable logging
ibmcloud ce app update --name bob-lab-app \
  --log-level info

# View metrics in IBM Cloud Console
# Go to: Code Engine > Projects > Your Project > Applications > bob-lab-app > Monitoring
```

### Cost Optimization

1. **Scale to Zero**
   ```bash
   ibmcloud ce app update --name bob-lab-app --min-scale 0
   ```

2. **Right-Size Resources**
   - Start small (0.25 CPU, 512M memory)
   - Monitor usage and scale up if needed

3. **Use Appropriate Regions**
   - Choose regions with lower costs
   - Consider data transfer costs

4. **Clean Up Unused Resources**
   ```bash
   # List all projects
   ibmcloud ce project list
   
   # Delete unused projects
   ibmcloud ce project delete --name old-project
   ```

---

## Quick Reference

### Essential Commands

```bash
# Deploy application
./deploy-with-apikey.sh

# View logs
ibmcloud ce app logs --name bob-lab-app --follow

# Get app status
ibmcloud ce app get --name bob-lab-app

# Scale application
ibmcloud ce app update --name bob-lab-app --min-scale 2 --max-scale 10

# Update resources
ibmcloud ce app update --name bob-lab-app --cpu 0.5 --memory 1G

# Delete application
ibmcloud ce app delete --name bob-lab-app
```

### Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `IBM_CLOUD_API_KEY` | Yes | - | IBM Cloud API key for authentication |
| `IBM_CLOUD_REGION` | Yes | - | IBM Cloud region (e.g., us-south) |
| `IBM_CLOUD_RESOURCE_GROUP` | No | default | Resource group name |
| `CODE_ENGINE_PROJECT` | Yes | - | Code Engine project name |
| `CODE_ENGINE_APP_NAME` | Yes | - | Application name in Code Engine |
| `CONTAINER_REGISTRY_NAMESPACE` | Yes | - | Container Registry namespace |
| `CONTAINER_IMAGE_NAME` | No | bob-lab | Docker image name |
| `CONTAINER_IMAGE_TAG` | No | latest | Docker image tag |

---

## Support

For questions or issues:

1. Check this guide first
2. Review [Troubleshooting](#troubleshooting) section
3. Check IBM Cloud documentation: https://cloud.ibm.com/docs/codeengine
4. Contact IBM Cloud support: https://cloud.ibm.com/unifiedsupport/supportcenter

---

**Made with Bob** 🤖