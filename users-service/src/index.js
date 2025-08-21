const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { pool, init } = require('./db');

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Endpoint raíz
app.get('/', (req,res) => res.send({ ok:true, message:'Users Service activo 🚀' }));

// Health check
app.get('/health', (_, res) => res.send({ status: 'ok' }));

// Crear usuario
app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const [result] = await pool.query(
      'INSERT INTO users(name,email) VALUES(?,?)',
      [name,email]
    );
    res.status(201).send({ id: result.insertId, name, email });
  } catch(err) {
    console.error(err);
    res.status(500).send({ error: 'Error al crear usuario' });
  }
});

// Listar todos los usuarios
app.get('/users', async (_, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users ORDER BY id');
    res.send(rows);
  } catch(err) {
    console.error(err);
    res.status(500).send({ error: 'Error al obtener usuarios' });
  }
});

// Obtener usuario por ID
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).send({ error: 'Usuario no existe' });
    res.send(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Error al obtener usuario' });
  }
});

// Levantar servicio
app.listen(3001, async () => {
  await init(); // asegura que la tabla exista
  console.log('✅ Users Service corriendo en puerto 3001');
});
