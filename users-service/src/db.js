const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'users_db',
  waitForConnections: true,
  connectionLimit: 10,
});

async function init() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL
    );
  `);
}

module.exports = { pool, init };
