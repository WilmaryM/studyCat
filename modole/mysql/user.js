// db.js
import { createConnection } from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const db = createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
})

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err)
    return
  }
  console.log('✅ Base de datos conectada con éxito')
})

export default db
