const dbService = require('./bd/conexion');
const bcrypt = require('bcrypt');

class AdminModelo {
    // funcion para crear nuevos clientes
    static async crearUsuarios(doc, name, tel, email, contras, rol = "Admin") {
        const query = 'INSERT INTO usuario (documento, nombre, telefono, correo, contrasena, rol, fecha_registro, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

        try {
            // Generar el hash de la contraseña con bcrypt
            const salto = 10; // Nivel de seguridad de encriptación
            const contra = await bcrypt.hash(contras, salto);
            const fechaRegistro = new Date().toISOString(); // Formato ISO (puedes cambiarlo si necesitas otro formato)
            const estado = "Activo";

            return await dbService.query(query, [doc, name, tel, email, contra, rol, fechaRegistro, estado]);
        } catch (err) {
            throw new Error(`Error al crear su nueva cuenta: ${err.message}`);
        }
    }//cerrar crear cliente

    static async buscarPorCorreoODocumento(email, doc) {
        const query = 'SELECT * FROM usuario WHERE correo = ? OR documento = ?';
        const [result] = await dbService.query(query, [email, doc]);
        return result.length > 0;
    }

    
    static async actualizarPerfil(id, datos) {
    try {
      let { nombre, correo, contrasena } = datos;
      const campos = [];
      const valores = [];

      if (nombre) {
        campos.push('nombre = ?');
        valores.push(nombre);
      }

      if (correo) {
        campos.push('correo = ?');
        valores.push(correo);
      }

      if (contrasena) {
        const hash = await bcrypt.hash(contrasena, 10);
        campos.push('contrasena = ?');
        valores.push(hash);
      }

      if (campos.length === 0) {
        throw new Error('No hay datos para actualizar');
      }

      valores.push(id); // Para el WHERE

      const query = `UPDATE administradores SET ${campos.join(', ')} WHERE id = ?`;
      await db.query(query, valores);
      return { mensaje: 'Perfil actualizado correctamente' };
    } catch (error) {
      throw new Error(`Error al actualizar el perfil: ${error.message}`);
    }
  }

}

module.exports = AdminModelo;

/* const db = require('../bd/conexion');
const bcrypt = require('bcrypt');

class AdminModelo {
  
}

module.exports = AdminModelo;
 */