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

    // Añadir los elementos al div tarea
    tarea.appendChild(inputTexto)
    tarea.appendChild(inputFecha)
    tarea.appendChild(inputHora)
    tarea.appendChild(btnEliminar)

    // Añadir la tarea al contenedor principal
    listaTareas.appendChild(tarea)
  }

  btnAgregar.addEventListener('click', crearTarea)
})
