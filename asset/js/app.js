/* eslint-disable no-undef */
const loginForm = document.getElementById('login-form')
const registerForm = document.getElementById('register-form')

// Lógica para el formulario de LOGIN
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const userHandle = loginForm.user_handle.value
  const password = loginForm.password.value

  try {
    const res = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user_handle: userHandle, password })
    })

    const data = await res.json()

    if (res.ok) {
      alert('Inicio de sesión exitoso')
      console.log(data)
      localStorage.setItem('token', data.token)
      // ➡️ Aquí se guarda el nombre que viene del backend
      localStorage.setItem('userName', data.user.user_handle)
      window.location.href = 'home.html'
    } else {
      alert(data.error || 'Error al iniciar sesión')
    }
  } catch (error) {
    console.error('Error de red:', error)
    alert('Error al conectar con el servidor')
  }
})

// Lógica para el formulario de REGISTRO
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const nombre = registerForm.nombre.value
  const apellido = registerForm.apellido.value
  const email = registerForm.email.value
  const user = registerForm.user_handle.value
  const password = registerForm.password.value
  const confirmarPassword = registerForm.confirmar_password.value

  if (password !== confirmarPassword) {
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
        first_name: nombre,
        last_name: apellido,
        email_address: email,
        user_handle: user,
        user_password: password
      })
    })

    const data = await res.json()

    if (res.ok) {
      alert('Registro exitoso')
      console.log(data)
      // Usa el user_handle del formulario como fallback
      localStorage.setItem('userName', user)
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
