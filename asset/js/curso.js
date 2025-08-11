/* eslint-disable no-undef */
// curso.js

function mostrarFormulario () {
  document.getElementById('formulario-curso').style.display = 'block'
}

function cerrarFormulario () {
  document.getElementById('formulario-curso').style.display = 'none'
}

document.addEventListener('DOMContentLoaded', () => {
  // Conectar botón agregar con la función
  const botonAgregar = document.querySelector('.boton-agregar')
  if (botonAgregar) {
    botonAgregar.onclick = mostrarFormulario
  }

  // Evento del formulario
  const form = document.getElementById('curso-form')
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault()
      const tema = document.getElementById('tema').value
      const descripcion = document.getElementById('descripcion').value
      const link = document.getElementById('link').value

      const token = localStorage.getItem('token')
      console.log('Token enviado:', token)

      console.log('Datos del curso:')
      console.log('Tema:', tema)
      console.log('Descripción:', descripcion)
      console.log('Link:', link)

      fetch('http://localhost:3000/api/cursos', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tema, descripcion, link })
      })
        .then(async res => {
          if (!res.ok) {
            const text = await res.text() // Evita intentar leer JSON inválido
            throw new Error(text)
          }
          return res.json()
        })
        .then(data => {
          alert('Curso guardado correctamente')
          form.reset()
          cerrarFormulario()
        })
        .catch(error => {
          console.error('Error al guardar el curso:', error)
          alert('Hubo un error al guardar el curso.')
        })
    })
  }
})
