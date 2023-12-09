<?php
    include("../conexiones/conexion_bd.php");
    $conexion = new ConexionBD();
    $con = $conexion->getConexion();

    $cadenaJSON = file_get_contents('php://input');
    $datos = json_decode($cadenaJSON, true);

    $nombreUsuario = $datos['nombreUsuario'];
    $contrasena = $datos['contrasena'];

    $alta = mysqli_query($con, "INSERT INTO usuarios(nombreUsuario, contrasena) VALUES('$nombreUsuario', '$contrasena')");

    $res = array();
    if($alta){
       $respuesta['insercion'] = 'Exito';
        $respuestaJSON = json_encode($respuesta);
    }else{
        $respuesta['insercion'] = 'Error';
        $respuestaJSON = json_encode($respuesta);
    }
    echo $respuestaJSON;
?>