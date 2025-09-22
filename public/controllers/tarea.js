/* eslint-disable camelcase */
import { supabase } from '../../public/supabase/supabase.js' // ⬅️ Asegúrate de que la ruta sea correcta

// obtener todas las tareas
export async function getTareas (req, res) {
  console.log('👉 Entrando a getTareas')

  try {
    const { data, error } = await supabase
      .from('Tareas')
      .select('*')

    if (error) {
      console.error('Error de Supabase:', error)
      return res.status(500).json({ error: 'Error en el servidor' })
    }

    res.json(data)
  } catch (err) {
    console.error('Error general:', err)
    res.status(500).json({ error: 'Error en el servidor' })
  }
}

// crear una nueva tarea
export async function crearTarea (req, res) {
  const { titulo, descripcion, fecha_limite, hora_entrega, id_curso, usuario_id } = req.body

  // La foto de tu esquema muestra una columna 'id_cursos' y 'usuario_id' en la tabla 'Tareas'.
  // Asegúrate de que los nombres de las propiedades en req.body coincidan con los nombres de las columnas.
  const nuevaTarea = {
    titulo,
    descripcion,
    fecha_limite,
    hora_entrega,
    id_cursos: id_curso, // ⬅️ Corregido según tu esquema 'Tareas'
    usuario_id // ⬅️ Agregado según tu esquema 'Tareas'
  }

  try {
    const { data, error } = await supabase
      .from('Tareas')
      .insert(nuevaTarea)
      .select() // `select()` es para que la base de datos devuelva el objeto insertado

    if (error) {
      console.error('Error de Supabase:', error)
      return res.status(500).json({ error: 'Error al guardar tarea' })
    }

    res.status(201).json({ message: 'Tarea guardada correctamente', id: data[0].id })
  } catch (err) {
    console.error('Error general:', err)
    res.status(500).json({ error: 'Error al guardar tarea' })
  }
}
