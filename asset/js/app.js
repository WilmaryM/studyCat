import express from 'express'
const app = express()
const db = require('../modelo/mysql/usuarios.js')

app.disable('x-powered-by')

async function obtenerUsuarios () {
  try {
    const [rows] = await db.query('SELECT * FROM usuarios')
    console.log(rows)
    return rows
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
  }
}

obtenerUsuarios()

// manejo del error 404
app.use((req, res) => {
  res.status(404).send('<h1>404<h1/>')
})

const PORT = process.env.PORT ?? 1234
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
