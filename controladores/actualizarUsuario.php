<?php
    include("../conexiones/conexion_bd.php");
    $conexion = new ConexionBD();
    $con = $conexion->getConexion();

    $cadenaJSON = file_get_contents('php://input');
    $datos = json_decode($cadenaJSON, true);

    $id = $datos['id'];
    $nombreUsuario = $datos['nombreUsuario'];
    $contrasena = $datos['contrasena'];

    $cambio = mysqli_query($con, "UPDATE usuarios SET nombreUsuario='$nombreUsuario', contrasena='$contrasena' WHERE id=$id");

    $res = array();
    if($cambio){
       $respuesta['insercion'] = 'Exito';
        $respuestaJSON = json_encode($respuesta);
    }else{
        $respuesta['insercion'] = 'Error';
        $respuestaJSON = json_encode($respuesta);
    }
    echo $respuestaJSON;
?>