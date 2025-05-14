import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/user.js'

dotenv.config()
const app = express()

app.use(express.json())

app.use('/api', authRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})
