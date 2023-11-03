# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose a port if your application needs to run on a specific port (e.g., 3000)
# EXPOSE 3000

# Define the command to run your application
CMD ["npm", "run", "start:prod"]
