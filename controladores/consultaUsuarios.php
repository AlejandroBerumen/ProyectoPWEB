<?php
    include("../conexiones/conexion_bd.php");
    $conexion = new ConexionBD();
    $con = $conexion->getConexion();

    $consulta = mysqli_query($con, "SELECT * FROM usuarios");
    $res = array();
    while($fila = mysqli_fetch_assoc($consulta)){
        $registro = array();
        $registro['id'] = $fila['id'];
        $registro['nombreUsuario'] = $fila['nombreUsuario'];
        $registro['contrasena'] = $fila['contrasena'];
        array_push($res, $registro);
    }
    $resp = json_encode($res);
    echo $resp;
?>