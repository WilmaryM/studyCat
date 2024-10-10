<?php
$db_username = 'root';
$db_password = "";
$db_host = 'localhost';
$db_name = 'login_register_db';
$mysqli  = new mysqli($db_host, $db_username, $db_password, $db_name);

if (!$mysqli) {
    die("something went wrong");
}


/*$conexion = mysqli_connect("localhost", "root", " ", "login_register_db" );

if ( $conexion){
    echo "Conectado con exito a la base de datos"; 
}else{
    echo " la base de datos no se puede conectar"; 
}*/

?>