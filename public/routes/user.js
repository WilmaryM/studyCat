import { Router } from 'express'
import { registerUser, loginUser } from '../../public/controllers/user.js'
const router = Router()

// Ruta para inicio de sesión
router.post('/login', loginUser)

// Ruta para registro
router.post('/register', registerUser)

export default router
