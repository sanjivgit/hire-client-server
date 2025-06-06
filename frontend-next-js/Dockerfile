FROM node:22

# Set working directory
WORKDIR /frontend

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy rest of the project files
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port Next.js will run on
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "start"]