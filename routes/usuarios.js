const express = require('express');
const Usuario = require('../models/Usuario');
const router = express.Router();

// Ruta POST para crear un usuario
router.post('/', async (req, res) => {
  try {
    const { nombre, email, edad, direcciones } = req.body;
    if (!nombre || !email || !direcciones) {
      return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    if (!Array.isArray(direcciones)) {
      return res.status(400).json({ message: 'El campo direcciones debe ser un array' });
    }

    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }

    const usuario = new Usuario({ nombre, email, edad, direcciones });
    await usuario.save();
    res.status(201).json(usuario);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear el usuario', error: err });
  }
});

// Ruta GET para obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error: err });
  }
});

// Ruta GET para obtener un usuario por su ID
router.get('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(usuario);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el usuario', error: err });
  }
});

// Ruta PUT para actualizar un usuario por su ID
router.put('/:id', async (req, res) => {
  try {
    const { nombre, email, edad, direcciones } = req.body;
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, { nombre, email, edad, direcciones }, { new: true });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(usuario);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error: err });
  }
});

// Ruta DELETE para eliminar un usuario por su ID
router.delete('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar el usuario', error: err });
  }
});

// Ruta GET para buscar usuarios por ciudad
router.get('/buscar', async (req, res) => {
  try {
    const { ciudad } = req.query;
    if (!ciudad) {
      return res.status(400).json({ message: 'Se requiere una ciudad para la búsqueda' });
    }

    const usuarios = await Usuario.find({ 'direcciones.ciudad': ciudad });
    res.status(200).json(usuarios);
  } catch (err) {
    res.status(500).json({ message: 'Error al buscar usuarios', error: err });
  }
});

module.exports = router;
