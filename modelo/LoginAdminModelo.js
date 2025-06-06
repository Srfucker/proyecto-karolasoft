const dbService = require('./bd/conexion');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

class loginAdminModelo {
  // Buscar usuario por correo
  static async buscaCorreo(email) {
    const query = 'SELECT * FROM usuario WHERE correo = ?';
    try {
      const result = await dbService.query(query, [email]);
      return result.length ? result[0] : null;
    } catch (err) {
      throw new Error(`Error al buscar el usuario por correo: ${err.message}`);
    }
  }

  // Validar correo y contraseña
  static async validarCredenciales(email, password) {
    if (!email || !password) 
      return null;
    

    try {
      const usuario = await this.buscaCorreo(email); // Se busca el correo
      if (usuario.estado !== 'Activo') {
      return null; // Cuenta inactiva
    }
      // Comparar la contraseña encriptada
      const match = await bcrypt.compare(password, usuario.contrasena); // Cambiado a "contrasena"
      if (!match) {
        return null; // Contraseña incorrecta
      }

      return usuario; // Credenciales correctas
    } catch (err) {
      throw new Error(`Error al validar credenciales: ${err.message}`);
    }
  }

  static async guardarTokenRecuperacion(email, token, expiracion) {
    const query = `
      UPDATE usuarios SET token_recovery = ?, token_expiration = ? WHERE correo = ?
    `;
    try {
      await dbService.query(query, [token, expiracion, email]);
    } catch (err) {
      throw new Error('Error al guardar el token de recuperación: ' + err.message);
    }
  }

  static async verificarToken(token) {
    const query = `
      SELECT * FROM usuarios WHERE token_recovery = ? AND token_expiration > NOW()
    `;
    const result = await dbService.query(query, [token]);
    return result.length ? result[0] : null;
  }

  static async actualizarContrasena(email, nuevaClaveEncriptada) {
    const query = `
      UPDATE usuarios SET contrasena = ?, token_recovery = NULL, token_expiration = NULL WHERE correo = ?
    `;
    await dbService.query(query, [nuevaClaveEncriptada, email]);
  }

  static async obtenerNombreUsuarioPorCorreo(email) {
  const query = 'SELECT nombre_usuario FROM usuarios WHERE correo = ?';
  const result = await dbService.query(query, [email]);
  return result.length ? result[0].nombre_usuario : null;
}



}

module.exports = loginAdminModelo;