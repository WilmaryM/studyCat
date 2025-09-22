// routes/cursos.js
import { Router } from 'express'
import { crearCurso } from '../../public/controllers/curso.js'
import { verificarToken } from '../../public/middlewares/auth.js' // importa el middleware

const router = Router()

// Proteger esta ruta
router.post('/', verificarToken, crearCurso)

export default router
