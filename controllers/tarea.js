import db from '../js/db.js'

// obtener todas las tareas
export function getTareas (req, res) {
  console.log('👉 Entrando a getTareas')
  const query = 'SELECT * FROM tareas'
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error en el servidor' })
    res.json(results)
  })
}
