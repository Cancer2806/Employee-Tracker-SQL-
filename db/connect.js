// Call the required modules
const mysql = require('mysql2/promise');

// Use dotenv to secure details
require('dotenv').config();

// Connect to the database
async function connect() {
  return await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "employees_db",
  });
}

// Export the connection function
module.exports = { connect };