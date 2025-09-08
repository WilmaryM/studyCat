import authRoutes from './routes/user.js'
import Tareas from './routes/tarea.js'
import Curso from './routes/curso.js'
import session from 'express-session'
import { corsMiddleware } from './middlewares/cors.js'
import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const app = express()

// Necesario para __dirname en ESModules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Middleware CORS
app.use(corsMiddleware())

// Middleware para analizar JSON
app.use(express.json())

// Middleware de sesión
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

// 👉 Servir archivos estáticos (CSS, imágenes, JS)
// Si tus assets están en "asset", cámbialo

app.use(express.static(path.join(__dirname, 'asset')))

// 👉 Ruta principal para servir login.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'))
})

// Rutas API
app.use('/api/users', authRoutes)
app.use('/api/tareas', Tareas)
app.use('/api/cursos', Curso)

// Iniciar servidor
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`)
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`El puerto  ${port} ya está en uso`)
  }
})
