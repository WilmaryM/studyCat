/* eslint-disable camelcase */
/* eslint-disable no-undef */
const loginForm = document.getElementById('login-form')
const registerForm = document.getElementById('register-form')

// guardar sesión y redirigir al home
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const user_handle = loginForm.user_handle.value
  const password = loginForm.password.value

  try {
    const res = await fetch('http://localhost:3000/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_handle, password })
    })

    const data = await res.json()

    if (res.ok) {
      // ✅ Guardar sesión localmente
      localStorage.setItem('user', JSON.stringify(data.user))
      localStorage.setItem('token', data.token)

      alert('Inicio de sesión exitoso 🎉')
      window.location.href = 'home.html' // redirige al home
    } else {
      alert(data.message || 'Error al iniciar sesión')
    }
  } catch (err) {
    console.error('Error:', err)
    alert('Hubo un problema con el servidor.')
  }
})

// Revisar si el usuario ya está logueado
const user = JSON.parse(localStorage.getItem('user'))

if (!user) {
  // Si no hay usuario, lo mandamos al login
  window.location.href = 'login.html'
} else {
  // Mostrar nombre en pantalla o consola
  console.log('Usuario activo:', user.user_handle)
  document.getElementById('username').textContent = user.user_handle
}

// Lógica para el formulario de REGISTRO
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const first_name = registerForm.nombre.value.trim()
  const last_name = registerForm.apellido.value.trim()
  const email_address = registerForm.email.value.trim()
  const user = registerForm.user_handle.value.trim()
  const password = registerForm.user_password.value
  // eslint-disable-next-line camelcase
  const confirmar_Password = registerForm.confirmar_password.value

  // eslint-disable-next-line camelcase
  if (password !== confirmar_Password) {
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
        first_name,
        last_name,
        email_address,
        user_handle: user,
        user_password: password,
        confirmar_Password
      })
    })

    const data = await res.json()

    if (res.ok) {
      // Usa el user_handle del formulario como fallback
      localStorage.setItem('userHandle', user)
      window.location.href = 'home.html'
    } else {
      alert(data.error || 'Error al registrarse')
    }
  } catch (error) {
    console.error('Error de red:', error)
    alert('No se pudo conectar al servidor')
  }
})

// ... (El resto de tu código para mostrar/ocultar contraseñas) ...
// Mostrar/Ocultar contraseña en formulario del login
const togglePassword = document.getElementById('togglePassword')
const passwordInput = document.getElementById('password')

togglePassword.addEventListener('click', function () {
  const type = passwordInput.type === 'password' ? 'text' : 'password'
  passwordInput.type = type

  // Cambiar el icono
  this.classList.toggle('fa-eye')
  this.classList.toggle('fa-eye-slash')
})

// Mostrar/Ocultar contraseña en formulario de registro
const toggleRegisterPassword = document.getElementById('toggleRegisterPassword')
const registerPasswordInput = document.getElementById('registerPassword')

if (toggleRegisterPassword && registerPasswordInput) {
  toggleRegisterPassword.addEventListener('click', () => {
    const type = registerPasswordInput.type === 'password' ? 'text' : 'password'
    registerPasswordInput.type = type
    toggleRegisterPassword.classList.toggle('fa-eye')
    toggleRegisterPassword.classList.toggle('fa-eye-slash')
  })
}

// Mostrar/Ocultar confirmar contraseña
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword')
const confirmPasswordInput = document.getElementById('confirmPassword')

if (toggleConfirmPassword && confirmPasswordInput) {
  toggleConfirmPassword.addEventListener('click', () => {
    const type = confirmPasswordInput.type === 'password' ? 'text' : 'password'
    confirmPasswordInput.type = type
    toggleConfirmPassword.classList.toggle('fa-eye')
    toggleConfirmPassword.classList.toggle('fa-eye-slash')
  })
}

// Lógica para cerrar sesión
document.getElementById('logout').addEventListener('click', () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  window.location.href = 'login.html'
})
