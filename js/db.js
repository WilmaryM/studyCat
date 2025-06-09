// js/db.js
import mysql from 'mysql2'

// Configura tu conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'base_gatuna'
})

// Establece la conexión
db.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar a la base de datos:', err.message)
  } else {
    console.log('✅ Conexión a la base de datos MySQL exitosa')
  }
})

// Exporta la conexión para usar en otros archivos
export default db
