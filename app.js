const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Para leer variables de entorno

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB usando Mongoose
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Importa las rutas
const usuarioRoutes = require('./routes/usuarios');

// Usa las rutas en tu aplicación
app.use('/usuarios', usuarioRoutes);

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
