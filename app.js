const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));


const usuarioRoutes = require('./routes/usuarios');


app.use('/usuarios', usuarioRoutes);


app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
