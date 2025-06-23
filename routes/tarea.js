import express from 'express'
import { getTareas } from '../controllers/tarea.js'

const router = express.Router()

router.get('/', getTareas)

export default router
