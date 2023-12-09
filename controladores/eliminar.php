<?php
    include("../conexiones/conexion_bd.php");
    $conexion = new ConexionBD();
    $con = $conexion->getConexion();

    $cadenaJSON = file_get_contents('php://input');
    $datos = json_decode($cadenaJSON, true);

    $id = $datos['id'];
    $tabla = $datos['tabla'];

    if($tabla!="fotografos"){
        $baja = mysqli_query($con, "DELETE FROM $tabla WHERE id=$id");    
    }else{
        $baja = mysqli_query($con, "UPDATE fotografos SET activo=0 WHERE id=$id");
    }

    $res = array();
    if($baja){
       $respuesta['eliminacion'] = 'Exito';
        $respuestaJSON = json_encode($respuesta);
    }else{
        $respuesta['eliminacion'] = 'Error';
        $respuestaJSON = json_encode($respuesta);
    }
    echo $respuestaJSON;
?>