const express = require('express');
const ARutas = require('../controlador/AdminControlador');
const LARutas = require ('../controlador/LoginAdminControlador');
const router = express.Router();

router.post('/admin', ARutas.crearUsuario);

// Recuperar nombre de usuario
router.post('/recuperar-usuario', LARutas.recuperarNombreUsuario);

// Recuperar contraseña (token)
router.post('/recuperar-contrasena', LARutas.solicitarRecuperacion);

// Establecer nueva contraseña
router.post('/nueva-contrasena', LARutas.cambiarContrasena);

router.post('/cerrar-sesion', LARutas.cerrarSesion);



module.exports = router; 