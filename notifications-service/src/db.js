const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'noti_db',
  waitForConnections: true,
  connectionLimit: 10,
});

async function init() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS notifications(
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

module.exports = { pool, init };
