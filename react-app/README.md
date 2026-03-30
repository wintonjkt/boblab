# Bob Lab - React Application

Modern React/TypeScript implementation of the Bob Lab interactive learning platform for IBM watsonx Code Assistant.

## Tech Stack

- **Runtime**: Bun
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Carbon Design System (@carbon/react)
- **Routing**: React Router DOM
- **Internationalization**: react-i18next
- **Diagrams**: Mermaid.js

## Project Structure

```
react-app/
├── public/
│   ├── translations/     # i18n translation files (9 languages)
│   └── samples/          # Code samples and resources
├── src/
│   ├── components/
│   │   ├── layout/       # Layout components (Navbar, Footer, etc.)
│   │   └── common/       # Reusable common components
│   ├── pages/
│   │   ├── Home.tsx      # Landing page with lab cards
│   │   ├── Narrative.tsx # Narrative content page
│   │   └── labs/         # Individual lab pages (13 labs)
│   ├── contexts/
│   │   ├── ThemeContext.tsx  # Theme management (light/dark)
│   │   └── I18nContext.tsx   # Internationalization
│   ├── hooks/
│   │   ├── useTheme.ts       # Theme hook
│   │   ├── useI18n.ts        # i18n hook
│   │   └── useProgress.ts    # Progress tracking hook
│   ├── styles/
│   │   ├── global.css        # Global styles
│   │   └── narrative.css     # Narrative page styles
│   ├── types/
│   │   └── index.ts          # TypeScript type definitions
│   ├── App.tsx               # Root component
│   └── main.tsx              # Application entry point
├── index.html                # HTML entry point
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your system

### Installation

```bash
# Install dependencies
bun install
```

### Development

```bash
# Start development server (http://localhost:3000)
bun run dev
```

### Build

```bash
# Build for production
bun run build

# Preview production build
bun run preview
```

### Type Checking

```bash
# Run TypeScript type checking
bun run type-check
```

## Features

- ✅ 13 interactive lab modules
- ✅ Multi-language support (9 languages)
- ✅ Light/Dark theme toggle
- ✅ Progress tracking with localStorage
- ✅ Responsive design with Carbon Design System
- ✅ Code syntax highlighting
- ✅ Mermaid.js diagram support
- ✅ Search functionality
- ✅ Breadcrumb navigation

## Supported Languages

- English (en)
- Korean (ko)
- Simplified Chinese (zh-CN)
- Traditional Chinese (zh-TW)
- Hindi (hi)
- Malay (ms)
- Vietnamese (vi)
- Thai (th)
- Indonesian (id)

## Labs

1. Getting Started
2. Walkthrough
3. Bob Rules
4. Custom Modes
5. MCP (Model Context Protocol)
6. Bob Shell
7. Spec-Driven Development
8. SDLC (Software Development Lifecycle)
9. Carbon React
10. COBOL to Java
11. Application Modernization
12. IBM i
13. Watsonx Orchestrate

## Deployment to IBM Code Engine


> **Note**: The Dockerfile has been optimized to use AWS ECR Public Gallery (public.ecr.aws) instead of Docker Hub to avoid timeout and rate limiting issues. All base images are pulled from AWS ECR Public Gallery for excellent reliability and fast downloads. See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for details.

The application is containerized and ready for deployment to IBM Code Engine. It uses a multi-stage container build with Bun for building and nginx for serving, compatible with both Podman and Docker.

### Quick Start: Automated Deployment with API Key

**NEW**: Deploy automatically using API key authentication from your `.env` file!

1. **Set up your `.env` file** in the project root with IBM Cloud credentials:
   ```bash
   IBM_CLOUD_API_KEY=your_api_key_here
   IBM_CLOUD_REGION=us-south
   IBM_CLOUD_RESOURCE_GROUP=default
   CODE_ENGINE_PROJECT=bob-lab-project
   CODE_ENGINE_APP_NAME=bob-lab-app
   CONTAINER_REGISTRY_NAMESPACE=your_namespace_here
   ```

2. **Run the automated deployment script**:
   ```bash
   cd react-app
   ./deploy-with-apikey.sh
   ```

That's it! The script will:
- ✅ Authenticate using your API key
- ✅ Build and push the container image with Podman
- ✅ Deploy to Code Engine
- ✅ Show you the application URL

📖 **For detailed setup instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**

### Prerequisites

Before deploying, ensure you have:

1. **IBM Cloud CLI** - [Installation Guide](https://cloud.ibm.com/docs/cli)
   ```bash
   # macOS
   curl -fsSL https://clis.cloud.ibm.com/install/osx | sh
   
   # Linux
   curl -fsSL https://clis.cloud.ibm.com/install/linux | sh
   ```

2. **Code Engine Plugin**
   ```bash
   ibmcloud plugin install code-engine
   ```

3. **Container Registry Plugin**
   ```bash
   ibmcloud plugin install container-registry
   ```

4. **Podman** - [Installation Guide](https://podman.io/getting-started/installation)
   
   **Note**: Podman is a drop-in replacement for Docker. It's daemonless and runs rootless by default, making it more secure and lightweight.

5. **IBM Cloud Account** - [Sign up](https://cloud.ibm.com/registration)

6. **IBM Cloud API Key** - [Create one](https://cloud.ibm.com/iam/apikeys)

### Configuration

1. **Login to IBM Cloud**
   ```bash
   ibmcloud login
   ```

2. **Set Environment Variables**
   
   Create or update your shell profile (~/.bashrc, ~/.zshrc, etc.):
   ```bash
   export IBM_CLOUD_REGION="us-south"              # or your preferred region
   export IBM_CLOUD_RESOURCE_GROUP="default"       # or your resource group
   export IBM_CLOUD_REGISTRY_NAMESPACE="your-namespace"  # REQUIRED
   export CODE_ENGINE_PROJECT="bob-lab-project"    # or your project name
   ```

3. **Create Container Registry Namespace** (if not exists)
   ```bash
   ibmcloud cr namespace-add your-namespace
   ```

4. **Create Code Engine Project** (if not exists)
   ```bash
   ibmcloud ce project create --name bob-lab-project
   ```

5. **Update code-engine.yaml**
   
   Edit `code-engine.yaml` and replace `YOUR_NAMESPACE` with your actual namespace:
   ```yaml
   imageReference: us.icr.io/YOUR_NAMESPACE/bob-lab:latest
   ```

### Deployment Methods

#### Method 1: Automated Deployment with API Key (Recommended)

The easiest and most secure way to deploy using API key authentication:

```bash
# Deploy using API key from .env file
./deploy-with-apikey.sh
```

**Features:**
- ✅ Non-interactive authentication with API key
- ✅ Automatic project and namespace creation
- ✅ Comprehensive error handling
- ✅ Colored output for better UX
- ✅ Idempotent (safe to run multiple times)
- ✅ Loads configuration from parent directory's `.env` file

**See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for complete setup instructions.**

#### Method 2: Manual Deployment Script

For manual control with interactive login:

```bash
# Requires manual IBM Cloud login first
ibmcloud login

# Deploy with 'latest' tag
./deploy.sh

# Deploy with specific version
./deploy.sh v1.0.0
```

The script will:
1. ✅ Check all prerequisites
2. ✅ Build the Docker image
3. ✅ Push to IBM Container Registry
4. ✅ Deploy to Code Engine
5. ✅ Display the application URL

#### Method 3: Complete Manual Deployment

If you prefer complete manual control:

1. **Build the container image**
   ```bash
   podman build -t bob-lab:latest .
   ```

2. **Tag for IBM Container Registry**
   ```bash
   podman tag bob-lab:latest us.icr.io/your-namespace/bob-lab:latest
   ```

3. **Login to Container Registry**
   ```bash
   ibmcloud cr login
   ```

4. **Push the image**
   ```bash
   podman push us.icr.io/your-namespace/bob-lab:latest
   ```

5. **Deploy to Code Engine**
   ```bash
   # Select your project
   ibmcloud ce project select --name bob-lab-project
   
   # Create or update application
   ibmcloud ce app create --name bob-lab-app \
     --image us.icr.io/your-namespace/bob-lab:latest \
     --port 8080 \
     --min-scale 1 \
     --max-scale 5 \
     --cpu 0.25 \
     --memory 512M
   ```

6. **Get the application URL**
   ```bash
   ibmcloud ce app get --name bob-lab-app
   ```

### Example .env Configuration

Create a `.env` file in the project root (`/Users/yingkitw/Desktop/ceproject/boblab/.env`):

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

**Important Security Notes:**
- ⚠️ Never commit `.env` files to version control
- ⚠️ The `.env` file is already in `.gitignore`
- ⚠️ Keep your API key secure and rotate it regularly
- ⚠️ See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for security best practices

### Local Container Testing

Test the container image locally before deploying:

```bash
# Build the image
podman build -t bob-lab:test .

# Run locally
podman run -p 8080:8080 bob-lab:test

# Visit http://localhost:8080
```

**Note**: On macOS, ensure Podman machine is running:
```bash
podman machine start
```

### Environment Variables

The application supports the following environment variables (configured in Code Engine):

- `NODE_ENV` - Set to `production` for production builds
- `TZ` - Timezone (default: UTC)
- `VITE_API_BASE_URL` - API base URL (if using external APIs)
- `VITE_APP_VERSION` - Application version for display

To set environment variables in Code Engine:

```bash
# Create a configmap
ibmcloud ce configmap create --name bob-lab-config \
  --from-literal NODE_ENV=production \
  --from-literal TZ=UTC

# Update app to use configmap
ibmcloud ce app update --name bob-lab-app \
  --env-from-configmap bob-lab-config
```

### Monitoring and Management

#### View Application Status
```bash
ibmcloud ce app get --name bob-lab-app
```

#### View Logs
```bash
# Real-time logs
ibmcloud ce app logs --name bob-lab-app --follow

# Recent logs
ibmcloud ce app logs --name bob-lab-app --tail 100
```

#### Scale Application
```bash
ibmcloud ce app update --name bob-lab-app \
  --min-scale 2 \
  --max-scale 10
```

#### Update Resources
```bash
ibmcloud ce app update --name bob-lab-app \
  --cpu 0.5 \
  --memory 1G
```

#### Delete Application
```bash
ibmcloud ce app delete --name bob-lab-app
```

### Troubleshooting

#### Issue: Image pull errors
**Solution**: Ensure your Code Engine project has access to the Container Registry
```bash
ibmcloud ce registry create --name icr-access \
  --server us.icr.io \
  --username iamapikey \
  --password YOUR_API_KEY
```

#### Issue: Application not starting
**Solution**: Check logs for errors
```bash
ibmcloud ce app logs --name bob-lab-app --tail 100
```

#### Issue: 502 Bad Gateway
**Solution**: Verify the application is listening on port 8080 and health checks are passing
```bash
# Check application events
ibmcloud ce app events --name bob-lab-app
```

#### Issue: Build fails
**Solution**: Test the container build locally
```bash
podman build -t bob-lab:test .
podman run -p 8080:8080 bob-lab:test
```

#### Issue: Slow performance
**Solution**: Increase resources or scale up
```bash
ibmcloud ce app update --name bob-lab-app \
  --cpu 1 \
  --memory 1G \
  --min-scale 2
```

### CI/CD Integration

For automated deployments, you can integrate the deployment script into your CI/CD pipeline:

```yaml
# Example GitHub Actions workflow
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
          ibmcloud plugin install code-engine
          ibmcloud plugin install container-registry
      - name: Login to IBM Cloud
        run: ibmcloud login --apikey ${{ secrets.IBM_CLOUD_API_KEY }}
      - name: Deploy
        run: ./deploy.sh
        env:
          IBM_CLOUD_REGISTRY_NAMESPACE: ${{ secrets.REGISTRY_NAMESPACE }}
```

### Cost Optimization

- **Use appropriate scaling**: Set `min-scale` to 0 for development environments
- **Right-size resources**: Start with minimal CPU/memory and scale up as needed
- **Monitor usage**: Use IBM Cloud monitoring to track resource consumption
- **Clean up unused resources**: Delete test deployments when not needed

### Security Best Practices

1. **Use API keys**: Never commit credentials to version control
2. **Enable HTTPS**: Code Engine provides HTTPS by default
3. **Set security headers**: Already configured in nginx.conf
4. **Regular updates**: Keep base images and dependencies updated
5. **Least privilege**: Use minimal IAM permissions for deployments

### Production Checklist

Before deploying to production:

- [ ] Update `code-engine.yaml` with correct namespace
- [ ] Set appropriate resource limits
- [ ] Configure environment variables
- [ ] Set up monitoring and alerts
- [ ] Test the application locally with Docker
- [ ] Review security headers in nginx.conf
- [ ] Set up CI/CD pipeline
- [ ] Document custom configuration
- [ ] Plan for zero-downtime deployments
- [ ] Set up backup and disaster recovery

### Build Output

For local builds:
```bash
bun run build
```

The production build will be in the `dist/` directory.

## TODO

- [ ] Implement component logic for all layout components
- [ ] Create individual lab page components
- [ ] Set up i18next configuration and load translations
- [ ] Implement theme persistence and system theme detection
- [ ] Add progress tracking with localStorage
- [ ] Implement search functionality
- [ ] Add code syntax highlighting
- [ ] Integrate Mermaid.js for diagrams
- [ ] Create responsive layouts for all pages
- [ ] Add unit tests with Vitest
- [ ] Set up E2E tests

## Contributing

Follow the project's coding standards and best practices:
- Use TypeScript strict mode
- Follow Carbon Design System guidelines
- Write modular, reusable components
- Add proper TypeScript types
- Document complex logic with comments

## License

IBM Corporation. All rights reserved.
