<?php

    include("conexion_bd.php");
    $conexion = new ConexionBD();
    $con = $conexion->getConexion();

    //var_dump($con);
    $respu = $_POST['x'];
    $consulta = mysqli_query($con, "SELECT * FROM usuarios");
    $res = array();
    /*while($fila = mysqli_fetch_assoc($consulta)){
        $registro = array();
        $registro['nombre'] = $fila['nombreUsuario'];
        $registro['contrasena'] = $fila['contrasena'];
        array_push($res, $registro);
    }*/
    array_push($res, $respu);
    $resp = json_encode($res);
    echo $resp;
?>