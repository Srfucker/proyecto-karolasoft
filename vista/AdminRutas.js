const express = require('express');
const ARutas = require('../controlador/AdminControlador');
const router = express.Router();

router.post('/admin', ARutas.crearUsuario);

module.exports = router; 