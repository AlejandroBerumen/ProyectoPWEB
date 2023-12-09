<?php
    include("../conexiones/conexion_bd.php");
    $conexion = new ConexionBD();
    $con = $conexion->getConexion();

    $cadenaJSON = file_get_contents('php://input');
    $datos = json_decode($cadenaJSON, true);

    $idservicio = $datos['idservicio'];
    $nombre = $datos['nombre'];

    $alta = mysqli_query($con, "INSERT INTO prueba(nombreArchivo, idservicio) VALUES('$nombre', '$idservicio')");

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