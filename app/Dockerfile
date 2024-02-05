# Stage 1: Build the React application
FROM node:16-alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Stage 2: Setup the server
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and other necessary files
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/public ./public
COPY --from=build /app/src ./src

# Expose the port the app runs on
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
