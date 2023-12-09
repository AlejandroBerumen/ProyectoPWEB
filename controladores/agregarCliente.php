<?php
    include("../conexiones/conexion_bd.php");
    $conexion = new ConexionBD();
    $con = $conexion->getConexion();

    $cadenaJSON = file_get_contents('php://input');
    $datos = json_decode($cadenaJSON, true);

    $nombre = $datos['nombre'];
    $apellido = $datos['apellido'];
    $telefono = $datos['telefono'];
    $correo = $datos['correo'];

    $alta = mysqli_query($con, "INSERT INTO clientes(nombre, apellido, telefono, correo) VALUES('$nombre', '$apellido', '$telefono', '$correo')");

    $res = array();
    if($alta){
       $respuesta['insercion'] = 'Exito';
       $respuesta['id'] = mysqli_insert_id($con);
        $respuestaJSON = json_encode($respuesta);
    }else{
        $respuesta['insercion'] = 'Error';
        $respuestaJSON = json_encode($respuesta);
    }
    echo $respuestaJSON;
?>