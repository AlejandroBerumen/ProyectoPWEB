<?php
    include("../conexiones/conexion_bd.php");
    $conexion = new ConexionBD();
    $con = $conexion->getConexion();

    $consulta = mysqli_query($con, "SELECT * FROM vistaServicios");
    $res = array();
    while($fila = mysqli_fetch_assoc($consulta)){
        $registro = array();
        $registro['id'] = $fila['id'];
        $registro['nombreCliente'] = $fila['nombreCliente'];
        $registro['apellidoCliente'] = $fila['apellidoCliente'];
        $registro['tipo'] = $fila['tipo'];
        $registro['direccion'] = $fila['direccion'];
        $registro['fecha'] = $fila['fecha'];
        $registro['hora'] = $fila['hora'];
        $registro['nombreFotografo'] = $fila['nombreFotografo'];
        $registro['apellidoFotografo'] = $fila['apellidoFotografo'];
        $registro['nombreFotografo2'] = $fila['nombreFotografo2'];
        $registro['apellidoFotografo2'] = $fila['apellidoFotografo2'];
        $registro['precio'] = $fila['precio'];
        $registro['notas'] = $fila['notas'];
        array_push($res, $registro);
    }
    $resp = json_encode($res);
    echo $resp;
?>