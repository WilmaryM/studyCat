import authRoutes from './routes/user.js'
import Tareas from './routes/tarea.js'
import Curso from './routes/curso.js'
import session from 'express-session'
import { corsMiddleware } from './middlewares/cors.js' // Corrige si exportaste con export default o named export
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

// Middleware CORS: usa solo uno, aquí el personalizado
app.use(corsMiddleware())

// Middleware para analizar JSON
app.use(express.json())

// Middleware de sesión, con configuración correcta
app.use(session({
  secret: process.env.JWT_SECRET || 'secreto',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // true solo si usas HTTPS
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 1 día
  }
}))

// Rutas
app.use('/api/users', authRoutes)
app.use('/api/tareas', Tareas)
app.use('/api/cursos', Curso)

// Iniciar servidor
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`)
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`El puerto ${port} ya está en uso`)
  }
})
