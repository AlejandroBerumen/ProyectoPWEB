<?php
    include("../conexiones/conexion_bd.php");
    $conexion = new ConexionBD();
    $con = $conexion->getConexion();

    $cadenaJSON = file_get_contents('php://input');
    $datos = json_decode($cadenaJSON, true);

    $filtro = $datos['filtro'];

    $consulta = mysqli_query($con, "SELECT * FROM clientes WHERE $filtro");
    $res = array();
    while($fila = mysqli_fetch_assoc($consulta)){
        $registro = array();
        $registro['id'] = $fila['id'];
        $registro['nombre'] = $fila['nombre'];
        $registro['apellido'] = $fila['apellido'];
        $registro['telefono'] = $fila['telefono'];
        $registro['correo'] = $fila['correo'];
        array_push($res, $registro);
    }
    $resp = json_encode($res);
    echo $resp;
?>