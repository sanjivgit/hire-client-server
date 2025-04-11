import express from "express";
import cors from "cors";
import HireRoute from "./router";
import { swaggerSetup } from "./swagger-setup";
import { DOCS_BASE_URL } from "./config";
const db = require("../db/models/index");
import admin from 'firebase-admin';
const serviceAccount = require("./utils/serviceAccountKey.json");

const app = express();

app.use(express.json());
app.use("/public", express.static("public"));
app.use(cors());

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

swaggerSetup(app);

async function test() {
  try {
    await db.sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
test();
// new HireRoute(app);
// create object of route class

new HireRoute(app)

export default app;
