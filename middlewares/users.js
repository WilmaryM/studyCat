import jwt from 'jsonwebtoken'

export function verifyToken (req, res, next) {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1] // Espera: Bearer <token>

  if (!token) return res.status(401).json({ error: 'Acceso denegado. Token requerido.' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded // Esto agrega los datos del usuario a la solicitud
    next()
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido o expirado.' })
  }
}
// Este middleware verifica el token JWT en las solicitudes protegidas
// y asegura que el usuario esté autenticado antes de acceder a las rutas protegidas
