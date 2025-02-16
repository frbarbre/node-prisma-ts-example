# Use Node.js 22 as the base image
FROM node:22-alpine

# Install required packages including OpenSSL
RUN apk add --no-cache \
    openssl \
    openssl-dev \
    libc6-compat

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Build TypeScript
RUN npm run build

# Generate Prisma Client
RUN npm run prisma:generate

# Expose the port your app runs on
EXPOSE 8000

# Start the application from the compiled JavaScript in dist
CMD [ "npm", "run", "start" ]