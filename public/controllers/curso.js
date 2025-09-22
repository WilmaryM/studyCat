/* eslint-disable camelcase */
import { supabase } from '../../public/supabase/supabase.js'

export const crearCurso = async (req, res) => {
  const { tema, descripcion, link } = req.body
  const user_id = req.user.id // Viene del token verificado

  if (!user_id) {
    return res.status(401).json({ mensaje: 'Usuario no autenticado' })
  }

  try {
    const { data, error } = await supabase
      .from('cursos') // ⬅️ Usa .from() para especificar la tabla
      .insert({ // ⬅️ Usa .insert() con un objeto
        nombre: tema,
        descripcion: descripcion,
        link: link,
        user_id: user_id
      })

    if (error) {
      console.error('Error de Supabase al guardar el curso:', error)
      return res.status(500).json({ mensaje: 'Error al guardar el curso' })
    }

    res.status(201).json({ mensaje: 'Curso guardado correctamente', curso: data[0] })
  } catch (error) {
    console.error('Error general al guardar el curso:', error)
    res.status(500).json({ mensaje: 'Error al guardar el curso' })
  }
}
