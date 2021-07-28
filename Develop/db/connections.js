//credentials boilerplate
const mysql = require("mysql2");
const Sequelize = require("sequelize");
require("dotenv").config();

const db = mysql.createDbConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "password",
    database: "employees_db",
  },
  console.log(`Connected to the database.`)
);

module.exports = db;