import authRoutes from './routes/user.js' // Asegúrate de que la ruta sea correcta
import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

console.log('JWT_SECRET:', process.env.JWT_SECRET)

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Usar rutas
app.use('/api/users', authRoutes)

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
