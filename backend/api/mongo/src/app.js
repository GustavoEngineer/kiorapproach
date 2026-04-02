const express = require('express');
const cors = require('cors');
const diarioRoutes = require('./routes/diarioRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Pantalla de éxito en la raíz
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Kiorapimongo | API Online</title>
            <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&display=swap" rel="stylesheet">
            <style>
                :root {
                    --primary: #6366f1;
                    --secondary: #a855f7;
                    --bg: #0f172a;
                    --card-bg: rgba(30, 41, 59, 0.7);
                }
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                    font-family: 'Outfit', sans-serif;
                    background: radial-gradient(circle at top left, #1e1b4b, #0f172a);
                    color: white;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    overflow: hidden;
                }
                .container {
                    text-align: center;
                    background: var(--card-bg);
                    backdrop-filter: blur(12px);
                    padding: 3rem;
                    border-radius: 2rem;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                    transform: translateY(0);
                    animation: float 6s ease-in-out infinite;
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }
                .status-icon {
                    width: 80px;
                    height: 80px;
                    background: linear-gradient(135deg, var(--primary), var(--secondary));
                    border-radius: 50%;
                    margin: 0 auto 1.5rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 2.5rem;
                    box-shadow: 0 0 30px rgba(168, 85, 247, 0.4);
                }
                h1 {
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                    letter-spacing: -1px;
                    background: linear-gradient(to right, #fff, #94a3b8);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                p { color: #94a3b8; line-height: 1.6; }
                .badge {
                    display: inline-block;
                    margin-top: 1.5rem;
                    padding: 0.5rem 1rem;
                    background: rgba(34, 197, 94, 0.1);
                    border: 1px solid rgba(34, 197, 94, 0.2);
                    color: #4ade80;
                    border-radius: 9999px;
                    font-size: 0.8rem;
                    font-weight: 600;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="status-icon">🚀</div>
                <h1>Kiorapimongo API</h1>
                <p>El servidor está funcionando correctamente<br>y conectado a la base de datos.</p>
                <div class="badge">SISTEMA ONLINE</div>
            </div>
        </body>
        </html>
    `);
});

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
