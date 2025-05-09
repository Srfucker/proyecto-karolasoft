const dbService = require('./bd/conexion');
const bcrypt = require('bcrypt');

class ClienteModelo {
    // funcion para crear nuevos clientes
    static async crearClientes(doc, name, tel, email, contras) {
        const query = 'INSERT INTO usuario (documento, nombre, correo, telefono, contrasena, fecha_registro) VALUES (?, ?, ?, ?, ?, ?)';

        try {
        // Generar el hash de la contraseña con bcrypt
        const salto = 10; // Nivel de seguridad de encriptación
        const contra = await bcrypt.hash(contras, salto);

        return await dbService.query(query, [doc, name, email, tel, contra, new Date()]);
        } catch (err) {
        throw new Error(`Error al crear su nueva cuenta: ${err.message}`);
        }
    }//cerrar crear cliente
    
}

module.exports = ClienteModelo;