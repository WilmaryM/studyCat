/* eslint-disable camelcase */
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

export function crearTarea (req, res) {
  const { titulo_tarea, descripcion, fecha_entrega, id_curso } = req.body

  const query = `
    INSERT INTO tareas (titulo_tarea, descripcion, fecha_entrega, id_curso)
    VALUES (?, ?, ?, ?)
  `

  db.query(query, [titulo_tarea, descripcion, fecha_entrega, id_curso], (err, result) => {
    if (err) {
      console.error('❌ Error MySQL:', err)
      return res.status(500).json({ error: 'Error al guardar tarea' })
    }
  })
}
