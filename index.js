import express from 'express'
import session from 'express-session'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import helmet from 'helmet'

import authRoutes from './public/routes/user.js'
import Tareas from './public/routes/tarea.js'
import Curso from './public/routes/curso.js'
import { corsMiddleware } from './public/middlewares/cors.js'

dotenv.config()

const app = express()

// Necesario para __dirname en ESModules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Middleware CORS
app.use(corsMiddleware())

// Helmet + CSP actualizado
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          'https://kit.fontawesome.com'
        ],
        scriptSrcElem: [
          "'self'",
          'https://cdn.jsdelivr.net/npm/flatpickr',
          'https://kit.fontawesome.com'
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          'https://fonts.googleapis.com',
          'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css',
          'https://ka-f.fontawesome.com',
          'https://cdnjs.cloudflare.com' // 👈 añadido aquí
        ],
        fontSrc: [
          "'self'",
          'https://fonts.gstatic.com',
          'data:',
          'https://ka-f.fontawesome.com',
          'https://cdnjs.cloudflare.com' // 👈 añadido aquí
        ],
        connectSrc: [
          "'self'",
          'http://localhost:3000',
          'https://ka-f.fontawesome.com'
        ],
        imgSrc: ["'self'", 'data:']
      }
    }
  })
)

// Middleware para analizar JSON
app.use(express.json())

// Middleware de sesión
app.use(session({
  secret: process.env.JWT_SECRET || 'secreto',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // true si usas HTTPS en producción
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 1 día
  }
}))

// Servir archivos estáticos desde "public"
app.use(express.static(path.join(__dirname, 'public')))

// Ruta principal: abre login.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'intro.html'))
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
    console.log(`El puerto ${port} ya está en uso`)
  }
})
