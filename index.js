import authRoutes from './routes/user.js' // Asegúrate de que la ruta sea correcta
import Tareas from './routes/tarea.js' // Asegúrate de que la ruta sea correcta
import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

console.log('JWT_SECRET:', process.env.JWT_SECRET)

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Usar rutas
app.use('/api/users', authRoutes)
app.use('/api/tareas', Tareas)

// Iniciar servidor
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`)
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`El puerto ${port} ya está en uso`)
  }
})
