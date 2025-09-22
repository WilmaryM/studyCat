document.addEventListener('DOMContentLoaded', () => {
  const listaTareas = document.getElementById('lista-tareas')
  const btnAgregar = document.getElementById('agregar')


  // Verificar si Flatpickr está disponible
  if (typeof flatpickr !== 'undefined') {
    flatpickr('#calendar-label', {
      defaultDate: 'today',
      dateFormat: 'd-m-Y',
      inline: true,
      onChange: function (selectedDates, dateStr) {
        console.log('Fecha seleccionada:', dateStr)
      }
    })
  } else {
    console.error('Flatpickr no está definido. Asegúrate de incluir la librería Flatpickr en tu HTML.')
  }

// Mostrar el nombre de usuario guardado en localStorage
document.addEventListener('DOMContentLoaded', () => {
  const userHandle = localStorage.getItem('userHandle')
  if (userHandle) {
    document.getElementById('nombre_usuario').textContent = userHandle
  } else {
    // Si no existe el handle, puedes dejar un texto vacío o un mensaje
    document.getElementById('nombre_usuario').textContent = ''
  }
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
    btnEliminar.addEventListener('click', () => tarea.remove())

    const btnGuardar = document.createElement('button')
    btnGuardar.innerHTML = '<i class="fa-solid fa-check"></i>'
    btnGuardar.classList.add('guardar')

    btnGuardar.addEventListener('click', () => {
      const titulo = inputTexto.value.trim()
      const descripcion = 'Tarea sin descripción'
      const fecha = inputFecha.value
      const hora = inputHora.value
      const cursoId = 1

      if (!titulo || !fecha) {
        window.alert('Por favor completa el título y la fecha.')
        return
      }

      fetch('http://localhost:3000/api/tareas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo_tarea: titulo, descripcion, fecha_entrega: fecha, hora_entrega: hora, id_curso: cursoId })
      })
        .then(res => res.json())
        .then(data => window.alert('Tarea guardada exitosamente'))
        .catch(err => console.error('Error al guardar tarea:', err))
    })

    tarea.append(inputTexto, inputFecha, inputHora, btnEliminar, btnGuardar)
    listaTareas.appendChild(tarea)
  }

  btnAgregar.addEventListener('click', crearTarea)

  // Cargar tareas desde servidor
  function cargarTareasDesdeElServidor () {
    fetch('http://localhost:3000/api/tareas')
      .then(res => res.json())
      .then(data => data.forEach(mostrarTarea))
      .catch(err => console.error('Error al cargar tareas:', err))
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
    inputHora.value = tarea.hora_entrega ? tarea.hora_entrega.slice(0, 5) : ''

    const btnEliminar = document.createElement('button')
    btnEliminar.innerHTML = '<i class="fa-solid fa-trash"></i>'
    btnEliminar.classList.add('borrar')
    btnEliminar.addEventListener('click', () => divTarea.remove())

    divTarea.append(inputTexto, inputFecha, inputHora, btnEliminar)
    listaTareas.appendChild(divTarea)
  }

  cargarTareasDesdeElServidor()
})
