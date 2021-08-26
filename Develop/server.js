const express = require('express');
const inquirer = require('inquirer');
const mysql = require("mysql2"); 
const Sequelize = require("sequelize");
require("dotenv").config();

const db = mysql.createConnection(
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

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//app.get("/api/movies", (req, res) => {
  // const sql = `SELECT id, movie_name AS title FROM movies`;
  const sql = 'USE employees_db';

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
// });


// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});