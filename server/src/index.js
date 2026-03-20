const express = require('express');
const cors = require('cors');
const {PORT} = require('./config/env');

const app = express();

// Middleware básico
app.use(cors());
app.use(express.json());

// Prueba
app.get('/', (req, res) => {
    res.send('Servidor funcionando 🚀');
});

app.listen(PORT, () => {
    console.log('Servidor escuchando en http://localhost:${PORT}');
});