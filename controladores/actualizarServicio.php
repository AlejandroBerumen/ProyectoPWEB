<?php
    include("../conexiones/conexion_bd.php");
    $conexion = new ConexionBD();
    $con = $conexion->getConexion();

    $cadenaJSON = file_get_contents('php://input');
    $datos = json_decode($cadenaJSON, true);

    $id = $datos['id'];
    $tipo = $datos['tipo'];
    $direccion = $datos['direccion'];
    $precio = $datos['precio'];
    $notas = $datos['notas'];

    $cambio = mysqli_query($con, "UPDATE servicio SET tipo='$tipo', direccion='$direccion', precio='$precio', notas='$notas' WHERE id=$id");

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