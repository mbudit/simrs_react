const mysql = require('mysql2');

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true, // Ensures connections are queued if the pool is full
  connectionLimit: 10, // Maximum number of connections in the pool
  queueLimit: 0 // Unlimited queueing for connection requests
});

// Test the connection
db.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database');
  connection.release(); // Release the connection back to the pool
});

module.exports = db;