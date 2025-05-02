const express = require('express');
const cors = require('cors');
/* const usuarioRoutes = require('./router/UsuarioRouter'); */
/* const articuloRoutes = require('./router/ArticuloRouter'); */
/* const loginRoutes = require('./router/LoginRouter'); */
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4545;

// Middleware
app.use(cors({
    origin: '*', // Cambiar ['http://tu.com', 'http://yo.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    credentials: true // Habilita el envío de credenciales si es necesario
}));

// Middleware para parseo de solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas 
/* app.use('/', usuarioRoutes);
app.use('/', articuloRoutes);
app.use('/', loginRoutes); */
// Middleware de manejo de errores


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});