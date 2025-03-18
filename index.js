require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(' Conectado a MongoDB'))
    .catch(err => console.error(' Error de conexión:', err));

// Ruta raíz para la prueba
app.get('/', (req, res) => {
    res.send('¡El backend está funcionando!');
});

// Rutas de usuarios
app.use('/usuarios', require('./routes/usuarios'));

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Servidor corriendo en http://localhost:${PORT}`));
