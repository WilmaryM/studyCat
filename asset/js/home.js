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
      const hora = inputHora.value
      const cursoId = 1 // fijo por ahora

      if (!titulo || !fecha) {
        // eslint-disable-next-line no-undef
        alert('Por favor completa el título y la fecha.')
        return
      }

      enviarTareaAlServidor(titulo, descripcion, fecha, hora, cursoId)
    })

    // ✅ función aparte (fuera del click)
    function enviarTareaAlServidor (titulo, descripcion, fecha, hora, cursoId) {
      fetch('http://localhost:3000/api/tareas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          titulo_tarea: titulo,
          descripcion: descripcion,
          fecha_entrega: fecha,
          hora_entrega: hora,
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

  // cargar tareas al inicio
  function cargarTareasDesdeElServidor () {
    fetch('http://localhost:3000/api/tareas')
      .then(res => res.json())
      .then(data => {
        data.forEach(tarea => {
          mostrarTarea(tarea)
        })
        console.log('Tareas cargadas:', data)
      })
      .catch(err => {
        console.error('Error al cargar tareas:', err)
      })
  }
  function mostrarTarea (tarea) {
    const divTarea = document.createElement('div')
    divTarea.classList.add('tarea')

    const inputTexto = document.createElement('input')
    inputTexto.type = 'text'
    inputTexto.value = tarea.titulo_tarea

    const inputFecha = document.createElement('input')
    inputFecha.type = 'date'
    inputFecha.value = tarea.fecha_entrega

    const inputHora = document.createElement('input')
    inputHora.type = 'time'
    inputHora.value = tarea.hora_entrega || '' // Si no hay hora, dejar vacío

    const btnEliminar = document.createElement('button')
    btnEliminar.innerHTML = '<i class="fa-solid fa-trash"></i>'
    btnEliminar.classList.add('borrar')
    btnEliminar.addEventListener('click', () => {
      divTarea.remove()
      // Aquí podrías agregar lógica para eliminar la tarea del servidor si es necesario
      const inputHora = document.createElement('input')
      inputHora.type = 'time'

      // Asegurarse de que el campo tenga formato adecuado:
      if (tarea.hora_entrega) {
        const horaFormateada = tarea.hora_entrega.slice(0, 5) // "14:30:00" → "14:30"
        inputHora.value = horaFormateada
      } else {
        inputHora.value = ''
      }
    })

    divTarea.appendChild(inputTexto)
    divTarea.appendChild(inputFecha)
    divTarea.appendChild(inputHora)
    divTarea.appendChild(btnEliminar)
    // Añadir la tarea al contenedor de tareas
    listaTareas.appendChild(divTarea)
  }
  cargarTareasDesdeElServidor()
})
