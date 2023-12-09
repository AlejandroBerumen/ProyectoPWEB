<?php
    include("../conexiones/conexion_bd.php");
    $conexion = new ConexionBD();
    $con = $conexion->getConexion();

    $cadenaJSON = file_get_contents('php://input');
    $datos = json_decode($cadenaJSON, true);

    $tipo = $datos['tipo'];
    $direccion = $datos['direccion'];
    $fecha = $datos['fecha'];
    $hora = $datos['hora'];
    $notas = $datos['notas'];
    $precio = $datos['precio'];
    $idcliente = $datos['idcliente'];
    $idfotografo = $datos['idfotografo'];
    $idfotografoayudante = $datos['idfotografoayudante'];

    $alta = mysqli_query($con, "INSERT INTO servicio(tipo, direccion, fecha, hora, notas, precio, idcliente, idfotografo, idfotografoayudante) VALUES('$tipo', '$direccion', '$fecha', '$hora', '$notas', '$precio', '$idcliente', '$idfotografo', '$idfotografoayudante')");

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