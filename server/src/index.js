const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware básico
app.use(cors());
app.use(express.json());

// Prueba
app.get('/', (req, res) => {
    res.send('Servidor funcionando 🚀');
});

// Puerto desde .env
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Servidor escuchando en http://localhost:${PORT}');
});