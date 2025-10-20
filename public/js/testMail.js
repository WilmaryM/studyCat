import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

async function testEmail () {
  try {
    const info = await transporter.sendMail({
      from: `"StudyCat Test" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_ADMIN,
      subject: 'Prueba de conexión Gmail',
      text: 'Hola, este es un correo de prueba desde StudyCat.'
    })
    console.log('✅ Correo enviado:', info.response)
  } catch (err) {
    console.error('❌ Error al enviar correo:', err)
  }
}

testEmail()
