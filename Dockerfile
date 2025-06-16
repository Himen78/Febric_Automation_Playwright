# Use the official Playwright image
FROM mcr.microsoft.com/playwright:v1.52.0-jammy

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy all test files and configs
COPY . .
