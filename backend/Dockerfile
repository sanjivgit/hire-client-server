# Use Node.js base image
FROM node:22

# Set working directory
WORKDIR /backend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all other source code
COPY . .

# Expose port (change if your app uses a different one)
EXPOSE 2000

# Start the app
CMD ["sh", "-c", "npx sequelize-cli db:migrate && npm start"]
