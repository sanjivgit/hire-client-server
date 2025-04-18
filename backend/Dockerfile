# Build Stage
FROM node:22 as builder

WORKDIR /backend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production Stage
FROM node:22
WORKDIR /backend
ENV NODE_ENV=production

COPY package*.json ./
RUN npm install --only=production
COPY --from=builder /backend/dist ./dist

EXPOSE 2001
CMD ["sh", "-c", "npx sequelize-cli db:migrate && npm start"]

