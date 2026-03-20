const express = require('express');
const cors = require('cors');
const {PORT} = require('./config/env');
const taskRoutes = require('./routes/task.routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

// Middleware básico
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/v1/tasks', taskRoutes);

// Prueba
app.get('/', (req, res) => {
    res.send('Servidor funcionando 🚀');
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// Errores
app.use(errorHandler);