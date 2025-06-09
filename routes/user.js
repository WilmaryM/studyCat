import { Router } from 'express'
// Importamos la función login desde controllers/user.js
import { login, register } from '../controllers/user.js'
const router = Router()

// Ruta para inicio de sesión
router.post('/login', login)

// Ruta para registro
router.post('/register', register)

export default router
