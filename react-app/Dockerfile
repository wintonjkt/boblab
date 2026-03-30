# Multi-stage build for React SPA deployment to IBM Code Engine
# Compatible with both Podman and Docker
#
# Note: This Dockerfile follows OCI standards and works seamlessly with Podman.
# Podman is a daemonless container engine that's a drop-in replacement for Docker.
#
# Registry Strategy:
# - Node.js & nginx: AWS ECR Public Gallery (public.ecr.aws) - reliable, no rate limits
# - Using Node.js instead of Bun due to network connectivity issues with Bun sources
#
# Optimization: Using pre-built Node.js image from AWS ECR for fast, reliable builds
#
# Stage 1: Build the React application using Node.js
# Using Node.js Alpine from AWS ECR Public Gallery
FROM public.ecr.aws/docker/library/node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first (for better layer caching)
COPY package.json bun.lock* package-lock.json* ./

# Install dependencies
# Use npm install since we don't have package-lock.json yet
RUN npm install --prefer-offline --no-audit

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve with nginx
# Using nginx from AWS ECR Public Gallery
FROM public.ecr.aws/docker/library/nginx:1.27-alpine

# Install curl for health checks
RUN apk add --no-cache curl

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Create a non-root user for nginx
RUN addgroup -g 1001 -S nginx-app && \
    adduser -S -D -H -u 1001 -h /var/cache/nginx -s /sbin/nologin -G nginx-app -g nginx-app nginx-app && \
    chown -R nginx-app:nginx-app /usr/share/nginx/html && \
    chown -R nginx-app:nginx-app /var/cache/nginx && \
    chown -R nginx-app:nginx-app /var/log/nginx && \
    chown -R nginx-app:nginx-app /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx-app:nginx-app /var/run/nginx.pid

# Switch to non-root user
USER nginx-app

# Expose port 8080 (Code Engine default)
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]