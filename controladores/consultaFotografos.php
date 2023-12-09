<?php
    include("../conexiones/conexion_bd.php");
    $conexion = new ConexionBD();
    $con = $conexion->getConexion();

    $consulta = mysqli_query($con, "SELECT * FROM fotografos");
    $res = array();
    while($fila = mysqli_fetch_assoc($consulta)){
        $registro = array();
        $registro['id'] = $fila['id'];
        $registro['nombre'] = $fila['nombre'];
        $registro['apellido'] = $fila['apellido'];
        $registro['tipo'] = $fila['tipo'];
        $registro['activo'] = $fila['activo'];
        array_push($res, $registro);
    }
    $resp = json_encode($res);
    echo $resp;
?>