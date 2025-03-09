// import { Sequelize } from "sequelize";
// import dotenv from "dotenv";
// const config = require("../db/config/dbConfig");
// // const {development as dev} = require("../config/dbConfig")

// dotenv.config();

// const dev = config.development;

// const sequelize = new Sequelize(dev.database, dev.username, dev.password, {
//   host: dev.host,
//   dialect: dev.dialect,
//   logging: false
// });

// // Test the connection
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Database connection established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

// // const sequelize = new Sequelize(dev.database, dev.username, dev.password, {
// //   host: dev.host,
// //   dialect: dev.dialect,
// //   logging: console.log,
// // });

// export default sequelize;
