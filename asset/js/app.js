/* eslint-disable no-undef */
const form = document.getElementById('login-form')

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const email = form.email.value
  const password = form.password.value

  try {
    const res = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    const data = await res.json()

    if (res.ok) {
      alert('Login exitoso')
      console.log(data.token)

      // Guardar el nombre de usuario en localStorage
      localStorage.setItem('userHandle', data.user)

      // Redirigir al home
      window.location.href = 'home.html'
    } else {
      // eslint-disable-next-line no-undef
      alert(data.error || 'Error al iniciar sesión')
    }
  } catch (error) {
    console.error('Error de red:', error)
    // eslint-disable-next-line no-undef
    alert('Error al conectar con el servidor')
  }
})

const registerForm = document.getElementById('register-form')

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const nombre = registerForm.nombre.value
  const apellido = registerForm.apellido.value
  const email = registerForm.email.value
  const user = registerForm.user.value
  const password = registerForm.password.value
  const confirmarPassword = registerForm.confirmar_password.value

  if (password !== confirmarPassword) {
    // eslint-disable-next-line no-undef
    alert('Las contraseñas no coinciden')
    return
  }

  try {
    const res = await fetch('http://localhost:3000/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firts_name: nombre,
        last_name: apellido,
        email_address: email,
        user_handle: user,
        user_password: password
      })
    })

    const data = await res.json()

    if (res.ok) {
      // eslint-disable-next-line no-undef
      alert('Registro exitoso')
      console.log(data)
    } else {
      alert(data.error || 'Error al registrarse')
    }
  } catch (error) {
    console.error('Error de red:', error)
    alert('No se pudo conectar al servidor')
  }
})
