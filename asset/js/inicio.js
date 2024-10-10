//variables
const contenedor = document.querySelector(".contenedor");
const formulario = document.querySelector(".formulario");
const btn_login = document.getElementById("btn_login");
const caja_register = document.getElementById("caja_registrar");

export function register(){
    caja_register.style.display = "block";
}
document.getElementById("register_btn").addEventListener("click", register);
