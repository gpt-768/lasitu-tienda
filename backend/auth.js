import jwt from 'jsonwebtoken'

// Crea un token: un "carnet" firmado con el secreto del servidor.
// Guarda quién es la persona y su rol, y caduca a las 8 horas.
export function crearToken(usuario) {
  return jwt.sign(
    { id: usuario._id, usuario: usuario.usuario, rol: usuario.rol },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  )
}

// Middleware: se ejecuta ANTES de la ruta. Si el token es válido,
// deja pasar con next(). Si no, responde con error y la ruta nunca se ejecuta.
export function soloVendedores(req, res, next) {
  // El token llega en la cabecera: Authorization: Bearer <token>
  const cabecera = req.headers.authorization || ''
  const token = cabecera.replace('Bearer ', '')

  try {
    const datos = jwt.verify(token, process.env.JWT_SECRET)

    if (datos.rol !== 'admin' && datos.rol !== 'vendedor') {
      return res.status(403).json({ mensaje: 'No tienes permiso para hacer esto' })
    }

    req.usuario = datos
    next()
  } catch {
    res.status(401).json({ mensaje: 'Debes iniciar sesión' })
  }
}