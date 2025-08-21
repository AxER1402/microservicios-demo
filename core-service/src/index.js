const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { pool, init } = require('./db');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Endpoint raíz
app.get('/', (req,res) => res.send({ ok:true, message:'Core Service activo 🚀' }));

// Health check
app.get('/health', (_, res) => res.send({ status: 'ok' }));

// Listar todas las órdenes
app.get('/orders', async (_, res) => {
  const [rows] = await pool.query('SELECT * FROM orders ORDER BY id');
  res.send(rows);
});

// Crear nueva orden
app.post('/orders', async (req, res) => {
  const { user_id, product, amount } = req.body;

  // Validar usuario en Users Service
  try {
    await axios.get(`http://localhost:3001/users/${user_id}`);
  } catch (err) {
    return res.status(400).send({ error: 'Usuario no existe' });
  }

  // Crear orden en core_db
  const [rows] = await pool.query(
    'INSERT INTO orders(user_id, product, amount) VALUES(?,?,?)',
    [user_id, product, amount]
  );

  // Enviar notificación
  await axios.post('http://localhost:3003/notify', {
    user_id,
    message: `Nueva orden creada: ${product} por $${amount}`
  });

  res.status(201).send({ id: rows.insertId, user_id, product, amount });
});

// Levantar servicio
app.listen(3002, async () => {
  await init();
  console.log('✅ Core Service corriendo en puerto 3002');
});
