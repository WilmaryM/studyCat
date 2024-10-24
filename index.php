<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script src="https://kit.fontawesome.com/c00593a25a.js" crossorigin="anonymous"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StudyCat</title>
    <link rel="stylesheet" href="asset/css/estilo.css">
</head>
<body>

    <section>
        <div class="contenedor">
            <div class="formulario">
                <form action="#">
                    <h2>Mi Tutor Felino</h2>

                    <div class="input-contenedor">
                        <i class="fa-solid fa-cat"></i>
                        <input type="text" required>
                        <label for="#">Usuario</label>
                    </div>
                    <div class="input-contenedor">
                        <i class="fa-solid fa-shield-cat"></i>
                        <input type="password" required autocomplete="current-password">
                        <label for="#">Contraseña</label>
                    </div>

                    <div class="recordar olvidar">
                    <input type="checkbox" id="remember">
                        <label for="remember">Recordar contraseña</label>
                    </div>
                </form>

                    <button id="btn_login" type="submit">Login</button>

                    <div class="olvidar">
                        <label for="#">
                            <input type="checkbox">
                            <a href="">Olvidé la contraseña</a>
                        </label>
                    </div>

                <div class="registrar">
                    <p>No tengo una cuenta, <a href="#caja_registrar" id="register_btn">Crear una.</a></p>
                </div>

            </div>
        </div>

        <div class="imgaen"></div>
            <img src="asset/img/2.png" alt="gatito teacher">
        </div>
    </section>

    <section id="caja_registrar">
        <div class="contenedor">
            <div class="formulario" >
                <form action="#" >
                    <h2>Registrate</h2>

                    <div class="input-contenedor">
                        <i class="fa-solid fa-user"></i>
                        <input type="text" required>
                        <label for="nombre">Nombre</label>
                    </div>

                    <div class="input-contenedor">
                        <i class="fa-regular fa-address-book"></i>
                        <input type="text" required>
                        <label for="apellido">Apellido</label>
                    </div>

                    <div class="input-contenedor">
                        <i class="fa-solid fa-envelope"></i>
                        <input type="email" required>
                        <label for="email">Correo Electronico</label>
                    </div>

                    <div class="input-contenedor">
                        <i class="fa-solid fa-cat"></i>
                        <input type="text" required>
                        <label for="usuario">Usuario</label>
                    </div>

                    <div class="input-contenedor">
                        <i class="fa-solid fa-shield-cat"></i>
                        <input type="password" required>
                        <label for="password">Contraseña</label>
                    </div>

                    <div class="input-contenedor">
                        <i class="fa-solid fa-check"></i>
                    <input type="password" id="confirmar_password" name="confirmar_password" required>
                    <label for="confirmar_password">Confirmar contraseña</label>
                    </div>
                </form>

                <button type="submit">Registrarse</button>
            </div>
        </div>
    </section>




    <script type="module" src= "asset/js/app.js"></script>
</body>
</html>