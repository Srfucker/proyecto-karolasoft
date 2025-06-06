const modelo = require('../modelo/loginAdminModelo');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

class LoginAdminControlador {
  // Validar correo y contraseña
  static async validarCredencial(req, res) {
    const { t1: email, t2: password } = req.body; // Renombramos t1 y t2 para mayor claridad

    if (!email || !password) {
      return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
    }

    try {
      const user = await modelo.validarCredenciales(email, password);
      
      if (!user) {
        return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
      }

      res.json({ mensaje: 'Inicio de sesión exitoso', usuario: user });
    } catch (err) {
      res.status(500).json({ error: `Hubo un error al validar las credenciales: ${err.message}` });
    }
  }

  static async solicitarRecuperacion(req, res) {
    const { email } = req.body;
    const usuario = await modelo.buscaCorreo(email);
    if (!usuario) return res.status(404).json({ error: 'Correo no encontrado' });

    const token = crypto.randomBytes(20).toString('hex');
    const expiracion = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

    await modelo.guardarTokenRecuperacion(email, token, expiracion);

    // Aquí deberías enviar un correo real con el enlace
    const link = `http://tusitio.com/reset-password/${token}`;
    console.log('🔗 Enlace de recuperación:', link);

    res.status(200).json({ mensaje: 'Se envió un enlace de recuperación a tu correo.' });
  }

  static async cambiarContrasena(req, res) {
    const { token, nuevaContrasena } = req.body;

    const usuario = await modelo.verificarToken(token);
    if (!usuario) return res.status(400).json({ error: 'Token inválido o expirado.' });

    const hashed = await bcrypt.hash(nuevaContrasena, 10);
    await modelo.actualizarContrasena(usuario.correo, hashed);

    res.status(200).json({ mensaje: 'Contraseña actualizada correctamente.' });
  }

  static async recuperarNombreUsuario(req, res) {
  const { email } = req.body;

  try {
    const nombreUsuario = await modelo.obtenerNombreUsuarioPorCorreo(email);
    if (!nombreUsuario) {
      return res.status(404).json({ error: 'Correo no registrado' });
    }

    // Aquí deberías enviar el nombre de usuario por correo
    console.log(`📨 Nombre de usuario enviado: ${nombreUsuario}`);
    res.status(200).json({ mensaje: 'Nombre de usuario enviado a tu correo' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

static async cerrarSesion(req, res) {
  try {
    // Solo se envía un mensaje, el frontend debe borrar el JWT
    return res.status(200).json({ mensaje: 'Sesión cerrada correctamente. El token ha sido eliminado del cliente.' });
  } catch (error) {
    return res.status(500).json({ error: 'Error al cerrar sesión.' });
  }
}



}

module.exports = LoginAdminControlador;
