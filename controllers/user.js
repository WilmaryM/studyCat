import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import db from '../db.js'

export function login (req, res) {
  const { email, password } = req.body

  const query = 'SELECT * FROM users WHERE email = ?'
  db.query(query, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Error en el servidor' })
    if (results.length === 0) return res.status(401).json({ error: 'Usuario no encontrado' })

    const user = results[0]
    const match = await bcrypt.compare(password, user.password)

    if (!match) return res.status(401).json({ error: 'Contraseña incorrecta' })

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.json({ message: 'Inicio de sesión exitoso', token })
  })
}
