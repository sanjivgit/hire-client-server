const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: "db",
    port: 5432,
    dialect: "postgres",
    // dialectOptions: {
    //   bigNumberStrings: true,
    // },
  },
  test: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres",
    // dialectOptions: {
    //   bigNumberStrings: true,
    // },
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: "db",
    port: 5432,
    dialect: "postgres",
    // dialectOptions: {
    //   bigNumberStrings: true,
    //   ssl: {
    //     ca: fs.readFileSync(__dirname + '/postgres-ca-main.crt'),
    //   },
    // },
  },
};
