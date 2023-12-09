<?php
    include("../conexiones/conexion_bd.php");
    $conexion = new ConexionBD();
    $con = $conexion->getConexion();

    $cadenaJSON = file_get_contents('php://input');
    $datos = json_decode($cadenaJSON, true);

    $nombre = $datos['nombre'];
    $apellido = $datos['apellido'];
    $tipo = $datos['tipo'];

    $alta = mysqli_query($con, "INSERT INTO fotografos(nombre, apellido, tipo) VALUES('$nombre', '$apellido', '$tipo')");

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