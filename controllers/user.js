/* eslint-disable camelcase */
import db from '../js/db.js' // asegúrate que este archivo existe
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
console.log('JWT_SECRET:', process.env.JWT_SECRET)

export function login (req, res) {
  const { user_handle, password } = req.body

  const query = 'SELECT * FROM users WHERE user_handle = ?'
  db.query(query, [user_handle], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Error en el servidor' })
    if (results.length === 0) return res.status(401).json({ error: 'Usuario no encontrado' })

    const user = results[0]
    const match = await bcrypt.compare(password, user.user_password)

    if (!match) return res.status(401).json({ error: 'Contraseña incorrecta' })

    const token = jwt.sign(
      { id: user.user_id, user_handle: user.user_handle },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      user: user.user_handle
    })
  })
}

export async function register (req, res) {
  try {
    const {
      // eslint-disable-next-line camelcase
      user_handle,
      email_address,
      user_password,
      first_name,
      last_name
    } = req.body

    // Verifica si ya existe el email o el user_handle
    const checkQuery = 'SELECT * FROM users WHERE email_address = ? OR user_handle = ?'
    // eslint-disable-next-line camelcase
    db.query(checkQuery, [email_address, user_handle], async (err, results) => {
      if (err) return res.status(500).json({ error: 'Error del servidor' })
      if (results.length > 0) {
        return res.status(400).json({ error: 'Usuario o correo ya registrado' })
      }

      // Encriptar contraseña
      const hashedPassword = await bcrypt.hash(user_password, 10)

      // Insertar nuevo usuario
      const insertQuery = `
        INSERT INTO users (user_id, user_handle, email_address, user_password, first_name, last_name)
        VALUES (UUID_TO_BIN(UUID()), ?, ?, ?, ?, ?)
      `
      db.query(
        insertQuery,
        // eslint-disable-next-line camelcase
        [user_handle, email_address, hashedPassword, first_name, last_name],
        (err, result) => {
          if (err) {
            return res.status(500).json({ error: 'Error al registrar usuario' })
          }

          res.status(201).json({ message: 'Usuario registrado con éxito' })
        }
      )
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}
