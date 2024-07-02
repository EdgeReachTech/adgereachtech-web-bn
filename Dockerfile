# syntax=docker/dockerfile:1
# Use the official Node.js 20 base image
FROM node:20.12.1

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY tsconfig.json ./
COPY src /app/src/
COPY .env ./

# Build the TypeScript code
RUN npm run build

# Copy the build output
COPY dist /app/dist/

# Expose the application port
EXPOSE 5000

# Start the application
CMD ["npm", "run", "server"]
