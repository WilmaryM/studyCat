// routes/auth.js
import { Router } from 'express'
import { login } from '../controllers/user.js'
import { verifyToken } from '../middlewares/auth.js'

const router = Router()

router.post('/login', login)

// Rutas protegidas
router.get('/perfil', verifyToken, (req, res) => {
  res.json({ message: `Hola, ${req.user.email}`, user: req.user })
})

export default router
