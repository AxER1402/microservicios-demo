const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'core_db',
  waitForConnections: true,
  connectionLimit: 10,
});

async function init() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS orders(
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      product VARCHAR(100) NOT NULL,
      amount DECIMAL(10,2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

module.exports = { pool, init };
