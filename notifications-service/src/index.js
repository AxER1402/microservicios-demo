const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { pool, init } = require('./db');

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Endpoint raíz
app.get('/', (req,res) => res.send({ ok:true, message:'Notifications Service activo 🚀' }));

// Health check
app.get('/health', (_, res) => res.send({ status:'ok' }));

// Ver todas las notificaciones
app.get('/notifications', async (_, res) => {
  const [rows] = await pool.query('SELECT * FROM notifications ORDER BY id');
  res.send(rows);
});

// Crear notificación (llamado desde Core Service)
app.post('/notify', async (req, res) => {
  const { user_id, message } = req.body;
  const [rows] = await pool.query(
    'INSERT INTO notifications(user_id,message) VALUES(?,?)',
    [user_id, message]
  );
  res.status(201).send({ id: rows.insertId, user_id, message });
});

// Levantar servicio
app.listen(3003, async () => {
  await init(); // asegura que la tabla exista
  console.log('✅ Notifications Service corriendo en puerto 3003');
});
