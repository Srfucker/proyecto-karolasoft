const express = require('express');
const CRutas = require('../controlador/clienteControlador');
const router = express.Router();

router.post('/usuarios', CRutas.crearCliente);

module.exports = router;