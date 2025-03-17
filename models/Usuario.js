const mongoose = require('mongoose');

// Esquema para las direcciones de los usuarios
const direccionSchema = new mongoose.Schema({
  calle: { type: String, required: true },
  ciudad: { type: String, required: true },
  pais: { type: String, required: true },
  codigo_postal: { type: String, required: true }
});

// Esquema principal para el usuario
const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  edad: { type: Number },
  fecha_creacion: { type: Date, default: Date.now },
  direcciones: [direccionSchema]  // Campo que almacena las direcciones como un array de objetos
});

// Crea el modelo de Usuario basado en el esquema definido
const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
