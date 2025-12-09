# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Install build dependencies for native modules
RUN apk add --no-cache python3 make g++ libc6-compat

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci || npm install

# Explicitly install rollup native bindings for the platform
RUN npm install @rollup/rollup-linux-arm64-musl --save-optional || \
    npm install @rollup/rollup-linux-x64-musl --save-optional || \
    npm install @rollup/rollup-darwin-arm64 --save-optional || true

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

