const express = require('express');
const CRutas = require('../controlador/ClienteControlador');
const LCRutas = require('../controlador/LoginClienteControlador');
const router = express.Router();

router.post('/usuarios', CRutas.crearCliente);
router.post('/login', LCRutas.validarCredencial);

module.exports = router;