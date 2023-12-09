<?php
    include("../conexiones/conexion_bd.php");
    $conexion = new ConexionBD();
    $con = $conexion->getConexion();

    $cadenaJSON = file_get_contents('php://input');
    $datos = json_decode($cadenaJSON, true);

    $id = $datos['id'];
    $nombre = $datos['nombre'];
    $apellido = $datos['apellido'];
    $telefono = $datos['telefono'];
    $correo = $datos['correo'];

    $cambio = mysqli_query($con, "UPDATE clientes SET nombre='$nombre', apellido='$apellido', telefono='$telefono', correo='$correo' WHERE id=$id");

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