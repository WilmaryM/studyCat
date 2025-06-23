document.addEventListener('DOMContentLoaded', () => {
  const listaTareas = document.getElementById('lista-tareas')
  const btnAgregar = document.getElementById('agregar')

  function crearTarea () {
    const tarea = document.createElement('div')
    tarea.classList.add('tarea')

    const inputTexto = document.createElement('input')
    inputTexto.type = 'text'
    inputTexto.placeholder = 'Escribe la tarea'

    const inputFecha = document.createElement('input')
    inputFecha.type = 'date'

    const inputHora = document.createElement('input')
    inputHora.type = 'time'

    const btnEliminar = document.createElement('button')
    btnEliminar.innerHTML = '<i class="fa-solid fa-trash"></i>'
    btnEliminar.classList.add('borrar')
    btnEliminar.addEventListener('click', () => {
      tarea.remove()
    })

    // ✅ crear botón de guardar
    const btnGuardar = document.createElement('button')
    btnGuardar.innerHTML = '<i class="fa-solid fa-check"></i>'
    btnGuardar.classList.add('guardar')

    // ✅ Evento para guardar tarea
    btnGuardar.addEventListener('click', () => {
      console.log('✔ Botón guardar fue clickeado')
      const titulo = inputTexto.value.trim()
      const descripcion = 'Tarea sin descripción' // luego puedes agregar otro input
      const fecha = inputFecha.value
      const cursoId = 1 // fijo por ahora

      if (!titulo || !fecha) {
        // eslint-disable-next-line no-undef
        alert('Por favor completa el título y la fecha.')
        return
      }

      enviarTareaAlServidor(titulo, descripcion, fecha, cursoId)
    })

    // ✅ función aparte (fuera del click)
    function enviarTareaAlServidor (titulo, descripcion, fecha, cursoId) {
      fetch('http://localhost:3000/api/tareas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          titulo_tarea: titulo,
          descripcion: descripcion,
          fecha_entrega: fecha,
          id_curso: cursoId
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log('Tarea guardada:', data)
          // eslint-disable-next-line no-undef
          alert('Tarea guardada exitosamente')
        })
        .catch(err => {
          console.error('Error al guardar tarea:', err)
        })
    }

    // Añadir los elementos al div tarea
    tarea.appendChild(inputTexto)
    tarea.appendChild(inputFecha)
    tarea.appendChild(inputHora)
    tarea.appendChild(btnEliminar)
    tarea.appendChild(btnGuardar)

    listaTareas.appendChild(tarea)
  }

  btnAgregar.addEventListener('click', crearTarea)
})
