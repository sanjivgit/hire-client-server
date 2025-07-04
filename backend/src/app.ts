import express from "express";
import cors from "cors";
import HireRoute from "./router";
import { swaggerSetup } from "./swagger-setup";
const db = require("../db/models/index");
import admin from 'firebase-admin';
import serviceAccount from './utils/serviceAccountKey.json'
import { ServiceAccount } from "firebase-admin";

const app = express();

app.use(express.json());
app.use("/public", express.static("public"));
app.use(cors());

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
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
