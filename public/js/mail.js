import { createTransport } from 'nodemailer'

// Configura el transporte
const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

// Función para enviar correo al usuario y al admin
async function sendEmail (to, username) {
  try {
    // Enviar correo al usuario
    await transporter.sendMail({
      from: `"StudyCat" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Inicio de sesión en StudyCat',
      text: `Hola ${username}, has iniciado sesión correctamente en StudyCat.`,
      html: `<p>Hola <b>${username}</b>, has iniciado sesión correctamente en <b>StudyCat</b>.</p>`
    })

    // Enviar correo al admin
    await transporter.sendMail({
      from: `"StudyCat Notificaciones" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_ADMIN,
      subject: 'Nuevo inicio de sesión en StudyCat',
      text: `El usuario ${username} ha iniciado sesión en StudyCat.`
    })

    console.log('✅ Correos enviados correctamente.')
  } catch (error) {
    console.error('❌ Error al enviar correo:', error)
  }
}

export default sendEmail
