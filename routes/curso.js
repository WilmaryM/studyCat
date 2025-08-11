// routes/cursos.js
import { Router } from 'express'
import { crearCurso } from '../controllers/curso.js'
import { verificarToken } from '../middlewares/auth.js' // importa el middleware

const router = Router()

// Proteger esta ruta
router.post('/', verificarToken, crearCurso)

export default router
