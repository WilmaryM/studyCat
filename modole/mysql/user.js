import { createConnection } from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const db = createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})

db.connect((err) => {
  if (err) throw err
  console.log('Base de datos conectada')
})

export default db
