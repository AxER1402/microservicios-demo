const express = require('express');
const axios = require('axios');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req,res) => res.send({ok:true, message:'Gateway activo'}));

app.listen(3000, () => console.log('Gateway corriendo en puerto 3000'));
