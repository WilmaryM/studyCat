/* eslint-disable camelcase */
import { supabase } from '../../public/supabase/supabase.js' // ⬅️ Asegúrate de que la ruta sea correcta
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import sendEmail from '../js/mail.js'
import dotenv from 'dotenv'
dotenv.config()

// Controlador para manejar el inicio de sesión
export const loginUser = async (req, res) => {
  try {
    const { user_handle, password } = req.body

    // ✅ Validación básica
    if (!user_handle || !password) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' })
    }

    // ✅ Buscar usuario en Supabase
    const { data: user, error } = await supabase
      .from('user')
      .select('*')
      .eq('user_handle', user_handle)
      .single()

    if (error || !user) {
      return res.status(401).json({ message: 'Usuario no encontrado' })
    }

    // Comparar contraseña
    const isMatch = await bcrypt.compare(password, user.user_password)
    if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' })

    // ✅ Generar JWT
    const token = jwt.sign(
      { id: user.id, user_handle: user.user_handle }, // datos que quieres guardar
      process.env.JWT_SECRET, // clave secreta en .env
      // eslint-disable-next-line no-multi-spaces
      { expiresIn: '1h' }                            // expiración del token
    )

    // Guardar sesión (opcional, puedes usar solo JWT)
    req.session.user = {
      id: user.id,
      user_handle: user.user_handle,
      email_address: user.email_address
    }

    // Enviar correo
    await sendEmail(user.email_address, user.user_handle)

    // Respuesta al frontend
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      user: req.session.user,
      token// 🔹 enviamos el JWT
    })
  } catch (err) {
    console.error('❌ Error en loginUser:', err)
    res.status(500).json({ message: 'Error interno del servidor', error: err.message })
  }
}

// Controlador para manejar el registro de usuarios
export const registerUser = async (req, res) => {
  console.log('Datos recibidos:', req.body)
  try {
    const { first_name, last_name, user_handle, email_address, user_password, confirmar_Password } = req.body

    // ✅ Validaciones básicas
    if (!first_name || !last_name || !user_handle || !email_address || !user_password || !confirmar_Password) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' })
    }

    if (user_password !== confirmar_Password) {
      return res.status(400).json({ message: 'Las contraseñas no coinciden' })
    }

    // ✅ Revisar si el usuario ya existe
    const { data: existingUser } = await supabase
      .from('user')
      .select('*')
      .eq('user_handle', user_handle)
      .single()

    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' })
    }

    // ✅ Hashear la contraseña
    const hashedPassword = await bcrypt.hash(user_password, 10)

    // ✅ Insertar usuario en Supabase
    const { data, error } = await supabase
      .from('user')
      .insert([
        {
          first_name,
          last_name,
          user_handle,
          email_address,
          user_password: hashedPassword
        }
      ])
      .select()
      .single()

    if (error) {
      return res.status(500).json({ message: 'Error al registrar el usuario', error: error.message })
    }

    // ✅ Opcional: enviar correo de bienvenida
    await sendEmail(data.email_address, data.user_handle)

    res.status(201).json({ message: 'Usuario registrado correctamente', user: data })
  } catch (err) {
    console.error('❌ Error en registerUser:', err)
    res.status(500).json({ message: 'Error interno del servidor', error: err.message })
  }
}
