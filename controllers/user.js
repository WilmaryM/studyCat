/* eslint-disable camelcase */
import { supabase } from '../modole/supabase/supabase.js' // ⬅️ Asegúrate de que la ruta sea correcta
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export async function login (req, res) {
  const { user_handle, password } = req.body

  try {
    // Buscar al usuario por user_handle
    const { data: results, error } = await supabase
      .from('user') // ⬅️ Nombre de la tabla según tu esquema
      .select('*')
      .eq('user_handle', user_handle)

    if (error) {
      console.error('Error de Supabase:', error)
      return res.status(500).json({ error: 'Error en el servidor' })
    }

    if (!results || results.length === 0) {
      return res.status(401).json({ error: 'Usuario no encontrado' })
    }

    const user = results[0]
    const match = await bcrypt.compare(password, user.user_password)

    if (!match) {
      return res.status(401).json({ error: 'Contraseña incorrecta' })
    }

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
  } catch (error) {
    console.error('Error general:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export async function register (req, res) {
  try {
    const {
      user_handle,
      email_address,
      user_password,
      first_name,
      last_name
    } = req.body

    // Verificar si ya existe el usuario o el correo
    const { data: existingUser, error: checkError } = await supabase
      .from('user')
      .select('user_handle, email_address')
      .or(`user_handle.eq.${user_handle},email_address.eq.${email_address}`)

    if (checkError) {
      console.error('Error de Supabase al verificar usuario:', checkError)
      return res.status(500).json({ error: 'Error del servidor' })
    }

    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Usuario o correo ya registrado' })
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(user_password, 10)

    // Insertar nuevo usuario
    const newUser = {
      user_handle,
      email_address,
      user_password: hashedPassword,
      first_name,
      last_name
    }

    const { error: insertError } = await supabase
      .from('user')
      .insert(newUser)

    if (insertError) {
      console.error('Error de Supabase al registrar usuario:', insertError)
      return res.status(500).json({ error: 'Error al registrar usuario' })
    }

    res.status(201).json({ message: 'Usuario registrado con éxito' })
  } catch (error) {
    console.error('Error general:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}
