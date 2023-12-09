<?php
include("../conexiones/conexion_bd.php");
$conexion = new ConexionBD();
$con = $conexion->getConexion();
if(isset($_POST['submit'])){
	$usuario = $_POST['usuario'];
	$contra = $_POST['contra'];
	$ip = $_SERVER['REMOTE_ADDR'];
	$captcha = $_POST['g-recaptcha-response'];
	$secretkey = "6LcQpS8pAAAAABlYnGBh0nVctaO-avusCJAoO-Xg";
	$respuesta = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$secretkey&response=$captcha&remoteip=$ip");
	$atributos = json_decode($respuesta, TRUE);
	if($atributos['success']){
		if(isset($_POST['usuario']) && isset($_POST['contra'])){
			$sql = "SELECT * FROM usuarios WHERE nombreUsuario = '$usuario' AND contrasena = '$contra'";
			$res = mysqli_query($con ,$sql);
			if(mysqli_num_rows($res) == 1) {
          session_start();
          $_SESSION['valida'] = true;
          $_SESSION['usuario'] = $usuario;
          header('Location: inicio.php');
      }else{
    		echo '<script>alert("No se encontró un usuario con los datos especificados...")</script>';  	
      }
		}
	}else{
		echo '<script>alert("Valida el captcha para continuar...")</script>';
	}
}
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
	<script src="https://www.google.com/recaptcha/api.js" async defer></script>
	<link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'>
	<script src="scripts/mootools.js"></script>
	<title>Login</title>
	<style>
		body{
			background: linear-gradient(135deg, #F9B73F, #EE2E79, #7828C9);
  			height: 100%;
    		margin: 0;
    		background-repeat: no-repeat;
    		background-attachment: fixed;
		}
		.recuadroLogin{
			position: absolute;
			width: 30%;
			height: 80%;
			margin-top: 5%;
			margin-left: 35%;
			border-radius: 15px;
			background-color: #eee;
			box-shadow: 2px 2px 15px 2px #333;
			font-family: Roboto;
			font-size: 300%;
			padding: 3%;
		}
		form{
			margin-top: 7.5%;
		}
		.recuadroLogin label{
			font-size: 50%;
		}
		.recuadroLogin input{
			font-size: 50%;
			width: 100%;
			height: 50px;
			border-radius: 15px;
			 border: none;
       		outline: none;
			box-shadow: 1px 1px 5px 1px #555;
		}
		form button{
			width: 50%;
			padding: 3% !important;
			margin-top: 10%;
			margin-left: 25%;
		}
		.captcha{
			margin-left: 17.5%;
			margin-top: 5%;
		}
	</style>
</head>
<body>
<div class="recuadroLogin">
	Acceso
	<form method="POST">
		<label>Usuario:</label>
		<input type="text" name="usuario">
		<label>Contraseña:</label>
		<input type="password" name="contra">
		<div class="captcha" id="captcha">
			<div class="g-recaptcha" data-sitekey="6LcQpS8pAAAAAHy4H0lY0kl-62zFna0E_TSOfOc4"></div>
		</div>
		<button type="submit" name="submit" class="btn btn-primary">Ingresar</button>
	</form>
<script>
	function iniciarSesion(){
		window.location.href = "inicio.html";
	}
</script>
</div>
</body>
</html>