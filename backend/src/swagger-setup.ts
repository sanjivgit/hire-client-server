import { PORT } from "./config";
import { Application } from "express";

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

export const swaggerSetup = (app: Application) => {
  
  const swaggerDocument = {
    failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Hello World",
        version: "1.0.0",
      },
      servers: [
        {
          url: `http://localhost:${PORT}/api/v1`, 
          description: "development server through tunnel",
        },
      ]
    },
    apis: ["./src/**/*.yml"],
  };

  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerJsdoc(swaggerDocument))
  );
};
