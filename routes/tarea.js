import express from 'express'
import { getTareas, crearTarea } from '../controllers/tarea.js'

const router = express.Router()

// GET
router.get('/', getTareas)

// POST
router.post('/', crearTarea)

export default router
