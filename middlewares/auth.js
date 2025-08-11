import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export function verificarToken (req, res, next) {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1] // Extrae el token

  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded // Ahora puedes acceder a req.user.id
    next()
  } catch (err) {
    return res.status(403).json({ mensaje: 'Token inválido o expirado' })
  }
}
