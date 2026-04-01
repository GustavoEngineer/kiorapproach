const express = require('express');
const cors = require('cors');
const diarioRoutes = require('./routes/diarioRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/diario', diarioRoutes);

// Manejo de errores 404
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint no encontrado'
    });
});

module.exports = app;
