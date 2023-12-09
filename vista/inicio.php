<?php
session_start();
if(!isset($_SESSION['valida'])){
	header('Location: login.php');
}
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
	<link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'>
	<script src="scripts/mootools.js"></script>
	<script type="text/javascript" src="scripts/jspdf.min.js"></script>
	<title>Sistema</title>
	<style>
		.bg-primary{
			background: rgba(181, 112, 237, 1.0) !important;
		}
		body{
			background-color: #eee;
			font-family: Roboto;
		}
		.cuerpo{
			margin-left: 20%;
		}
		.barraLateral{
			position: fixed;
			background-color: #aaa;
			width: 20%;
			height: 100%;
			padding: 2%;
		}
		.barraOpcion{
			font-size: 175%;
			margin-top: 10%;
		}
		.barraSubopcion{
			font-size: 120%;
			margin-bottom: 3%;
		}
		.barraOpcion:hover{
			background-color: #777;
			cursor: pointer;
		}
		.barraSubopcion:hover{
			background-color: #777;
			cursor: pointer;
		}
		.bso1{display: none; padding: 5%; animation: menu 0.5s;}
		.bo1:hover ~ .bso1{display: block;}
		.bso1:hover{display: block;}
		.bso2{display: none; padding: 5%; animation: menu 0.5s;}
		.bo2:hover ~ .bso2{display: block;}
		.bso2:hover{display: block;}
		.bso3{display: none; padding: 5%; animation: menu 0.5s;}
		.bo3:hover ~ .bso3{display: block;}
		.bso3:hover{display: block;}
		.bso4{display: none; padding: 5%; animation: menu 0.5s;}
		.bo4:hover ~ .bso4{display: block;}
		.bso4:hover{display: block;}
		@keyframes menu{
			from{
				margin-top: -10%;
			}to{
				margin-top: 0%;
			}
		}
		.barraLateral img{
			width: 10%;
			margin-right: 4%;
		}
		.contenedorInicial{
			font-size: 1000%;
			font-weight: bolder;
			color: #cfcfcf;
			text-align: center;
			margin-top: 18%;
		}
		.contenedor{
			display: none;
		}
		.contenedorAgregarCliente{
			position: relative;
			padding: 5%;
			font-size: 180%;
		}
		.contenedorAgregarCliente label{
			font-size: 70%;
		}
		.contenedorAgregarCliente input{
			font-size: 75%;
			width: 40%;
		}
		.contenedorAgregarCliente button{
			position: absolute;
			right: 0;
			top: 0;
			width: 16%;
			font-size: 133%;
			margin: 5%;
		}
		th{
			background: linear-gradient(#222, #999) !important;
			color: white !important;
		}
		tr:hover > td{
			background-color: #ccc !important;
		}
		td img{
			width: 25%;
			margin-right: 20px;
		}
		td img:hover{
			filter: invert(75%);
			cursor: pointer;
		}
		.tdopciones{
			width: 200px;
		}
		.tdopcionesServicio{
			width: 280px;
		}
		.modal input, .modal select{
			width: 100%;
		}
		.contenedorAgregarFotografo{
			position: relative;
			padding: 5%;
			font-size: 180%;
		}
		.contenedorAgregarUsuario{
			position: relative;
			padding: 5%;
			font-size: 180%;
		}
		.contenedorAgregarFotografo label{
			font-size: 70%;
		}
		.contenedorAgregarFotografo input{
			font-size: 75%;
			width: 40%;
		}
		.contenedorAgregarFotografo select{
			font-size: 75%;
			width: 30%;
		}
		.contenedorAgregarFotografo button{
			position: absolute;
			right: 0;
			top: 0;
			width: 16%;
			font-size: 133%;
			margin: 5%;
		}
		.contenedorAgregarServicio{
			position: relative;
			padding: 5%;
			font-size: 180%;
		}
		.contenedorAgregarServicio label{
			font-size: 70%;
		}
		.contenedorAgregarServicio input, .contenedorAgregarServicio textarea{
			font-size: 75%;
			width: 40%;
		}
		.contenedorAgregarServicio select{
			font-size: 75%;
			width: 30%;
		}
		.autocompletado{
			position: absolute;
			margin-left: 27.5%;
			margin-top: -2.75%;
		}
		.autocompletado input{
			width: 20%;
		}
		.si{
			font-size: 150% !important;
		}
		.opcional2, .opcional{
			display: none;
		}
		.opcional2M, .opcionalM{
			display: none;
		}
		.cs:hover{
			cursor: pointer;
		}
		.modalEditarServicio{
			margin-top: 0% !important;
		}
		.modalEditarServicio textarea{
			width: 100%;
		}
		.modalPruebaOPaquete button{
			width: 100%;
		}
		.contenedorAgregarPaquete{
			padding: 3%;
		}
		.barraBuscadorClientes{
			padding: 1%;
		}
		.barraBuscadorClientes label{
			margin-left: 3%;
			margin-right: 1%;
		}
		.contenedorAgregarUsuario label{
			font-size: 70%;
		}
		.contenedorAgregarUsuario input{
			font-size: 75%;
			width: 40%;
		}
		.contenedorAgregarUsuario button{
			position: absolute;
			right: 0;
			top: 0;
			width: 16%;
			font-size: 133%;
			margin: 5%;
		}
		#disponibilidad1{
			display: inline;
		}
	</style>
</head>
<body>
	<nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-primary" >
  		<a class="navbar-brand" href="#" style="padding: 1%; font-size: 175%;">Estudio fotográfico</a>
 		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    	<span class="navbar-toggler-icon"></span>
  		</button>
  	<div class="collapse navbar-collapse" id="navbarText">
    	<ul class="navbar-nav mr-auto">
    	</ul>
    	<span class="navbar-text" style="position: absolute; right: 0; margin-right: 13%;">
    		<div id="nombre"><?php echo $_SESSION['usuario']; ?></div>
    	</span>
    		<img src="img/usuario.png" style="width: 4%; height: auto; filter: invert(100%); position: absolute; right: 0; margin-right: 8%;">
    		<img src="img/cerrarsesion.png" class="cs" onclick="cerrarSesion()" style="width: 4%; height: auto; filter: invert(100%); position: absolute; right: 0; margin-right: 3%;">
  		</div>
	</nav>
	<div class="barraLateral" id="barraLateral">
		<div class="barraOpcion bo1"><img src="img/libro.png">Servicios</div>
		<div class="bso1">
			<div class="barraSubopcion" onclick="contenedores('agser')">Agregar servicio</div>
			<div class="barraSubopcion" onclick="contenedores('verser')">Ver servicios</div>
		</div>
		<div class="barraOpcion bo2"><img src="img/camara.png">Fotógrafos</div>
		<div class="bso2">
			<div class="barraSubopcion" onclick="contenedores('agfo')">Agregar fotógrafo</div>
			<div class="barraSubopcion" onclick="contenedores('verfo')">Ver fotógrafos</div>
		</div>
		<div class="barraOpcion bo3"><img src="img/clientes.png">Clientes</div>
		<div class="bso3">
			<div class="barraSubopcion" onclick="contenedores('agcl')">Agregar cliente</div>
			<div class="barraSubopcion" onclick="contenedores('vercl')">Ver clientes</div>
		</div>
		<div class="barraOpcion bo4"><img src="img/usuario.png">Usuarios</div>
		<div class="bso4">
			<div class="barraSubopcion" onclick="contenedores('agus')">Agregar usuario</div>
			<div class="barraSubopcion" onclick="contenedores('verus')">Ver usuarios</div>
		</div>
	</div>
	<div class="cuerpo" id="cuerpo">
		<div class="modal fade" id="myModal" style="margin-top: 10%;">
  			<div class="modal-dialog">
    			<div class="modal-content">
      				<!-- Modal Header -->
      			<div class="modal-header">
        			<h4 class="modal-title">Eliminar</h4>
      			</div>
      			<!-- Modal body -->
      		<div class="modal-body">  	
				<div id="textoModalEliminar">a</div><br>
				<button class="btn btn-danger" onclick="eliminar()">Eliminar</button>
      	</div>
    	</div>
  		</div>
		</div>
		<div class="contenedorInicial" id="contenedorInicial">Bienvenido!</div>

		<div class="contenedor contenedorAgregarCliente" id="contenedorAgregarCliente">
			Agregar Cliente<br><br>
			<label>Nombre:</label><br><input type="text" id="cajaAgClNombre"><br><br>
			<label>Apellido(s):</label><br><input type="text" id="cajaAgClApellido"><br><br>
			<label>Teléfono:</label><br><input type="text" id="cajaAgClTelefono"><br><br>
			<label>Correo:</label><br><input type="email" id="cajaAgClCorreo">
			<button class="btn btn-success" onclick="agregarCliente('1')">Agregar</button>
		</div>

		<div class="modal fade" id="modalEditarCliente" style="margin-top: 10%;">
  			<div class="modal-dialog">
    			<div class="modal-content">
      				<!-- Modal Header -->
      			<div class="modal-header">
        			<h4 class="modal-title">Editar Cliente</h4>
      			</div>
      			<!-- Modal body -->
      		<div class="modal-body">  	
				<label>Nombre:</label><br><input type="text" id="cajaAgClNombreM"><br><br>
				<label>Apellido(s):</label><br><input type="text" id="cajaAgClApellidoM"><br><br>
				<label>Teléfono:</label><br><input type="text" id="cajaAgClTelefonoM"><br><br>
				<label>Correo:</label><br><input type="email" id="cajaAgClCorreoM"><br><br>
				<button class="btn btn-success" onclick="editarCliente()">Guardar</button>
      	</div>
    	</div>
  		</div>
		</div>
		<div  class="contenedor contenedorVerClientes" id="contenedorVerClientes">
			<div class="barraBuscadorClientes">Filtrar por: <label>Nombre:</label><input type="text" id="cajaFiltroClientesNombre"><label>Apellido:</label><input type="text" id="cajaFiltroClientesApellido"><label>Telefono:</label><input type="text" id="cajaFiltroClientesTelefono"></div>
			<div id="tablaClientes"></div>
		</div>

		<div class="contenedor contenedorAgregarFotografo" id="contenedorAgregarFotografo">
			Agregar Fotógrafo<br><br>
			<label>Nombre:</label><br><input type="text" id="cajaAgFoNombre"><br><br>
			<label>Apellido(s):</label><br><input type="text" id="cajaAgFoApellido"><br><br>
			<label>Tipo:</label><br><select id="AgFoTipo"><option value="Planta">Planta</option><option value="Independiente">Independiente</option></select><br><br>
			<button class="btn btn-success" onclick="agregarFotografo()">Agregar</button>
		</div>
		<div class="modal fade" id="modalEditarFotografo" style="margin-top: 10%;">
  			<div class="modal-dialog">
    			<div class="modal-content">
      				<!-- Modal Header -->
      			<div class="modal-header">
        			<h4 class="modal-title">Editar Cliente</h4>
      			</div>
      			<!-- Modal body -->
      		<div class="modal-body">  	
				<label>Nombre:</label><br><input type="text" id="cajaAgFoNombreM"><br><br>
				<label>Apellido(s):</label><br><input type="text" id="cajaAgFoApellidoM"><br><br>
				<label>Tipo:</label><br><select id="AgFoTipoM"><option value="Planta">Planta</option><option value="Independiente">Independiente</option></select><br><br>
				<button class="btn btn-success" onclick="editarFotografo()">Guardar</button>
      	</div>
    	</div>
  		</div>
		</div>
		<div  class="contenedor contenedorVerFotografos" id="contenedorVerFotografos">
			
		</div>

		<div class="modal fade modalEditarServicio" id="modalEditarServicio" style="margin-top: 10%;">
  			<div class="modal-dialog">
    			<div class="modal-content">
      				<!-- Modal Header -->
      			<div class="modal-header">
        			<h4 class="modal-title">Editar Servicio</h4>
      			</div>
      			<!-- Modal body -->
      		<div class="modal-body">  	
				<label>Tipo:</label><br><select id="AgSerTipoM" onclick="ocultarOpcionalesM(2)"><option value="Retrato">Retrato</option><option value="Evento">Evento</option></select><br><br>
				<label class="opcional3M">Lugar:</label><br><select id="selectLugarM" class="opcional3M" onclick="ocultarOpcionalesM(1)"><option value="Estudio">Estudio</option><option value="Direccion">Dirección</option></select><br><br>
				<label class="opcional2M">Dirección:</label><br><input type="text" id="cajaAgSerDireccionM" class="opcional2M"><br><br>
				<label>Precio preeliminar:</label><br><input type="text" id="cajaAgSerPrecioM"><br><br>
				<label>Notas:</label><br><textarea id="cajaAgSerNotasM"></textarea><br><br>
				<button class="btn btn-success" onclick="editarServicio()">Guardar</button>
      	</div>
    	</div>
  		</div>
		</div>
		<div class="modal fade modalPruebaOPaquete" id="modalPruebaOPaquete" style="margin-top: 10%;">
  			<div class="modal-dialog">
    			<div class="modal-content">
      				<!-- Modal Header -->
      			<div class="modal-header">
        			<h4 class="modal-title">Agregar</h4>
      			</div>
      			<!-- Modal body -->
      		<div class="modal-body">  	
				<button class="btn btn-secondary" onclick="modalPruebas()">Agregar Prueba</button><br><br>
				<button class="btn btn-secondary" onclick="contenedores('agpaq')">Agregar Paquete</button><br><br>
				<button class="btn btn-secondary" onclick="generarContrato()">Crear Contrato</button>
      	</div>
    	</div>
  		</div>
		</div>
		<div class="modal fade modalAgregarPrueba" id="modalAgregarPrueba" style="margin-top: 10%;">
  			<div class="modal-dialog">
    			<div class="modal-content">
      				<!-- Modal Header -->
      			<div class="modal-header">
        			<h4 class="modal-title">Agregar Prueba</h4>
      			</div>
      			<!-- Modal body -->
      		<div class="modal-body">  	
				<label>Nombre:</label><br><input type="text" id="cajaAgPrNombre"><br><br>
				<button class="btn btn-success" onclick="agregarPrueba()">Guardar</button>
      	</div>
    	</div>
  		</div>
		</div>
		<div  class="contenedor contenedorVerServicio" id="contenedorVerServicio">
			
		</div>
		<div class="contenedor contenedorAgregarServicio" id="contenedorAgregarServicio">
			Agregar Servicio<br><br><br>
			Datos del cliente:<div class="autocompletado">Autocompletar: <input type="text" id="cajaAutocompletar" placeholder="ID"><button class="btn btn-primary" onclick="buscarCliente()">Buscar</button></div><br><br>
			<label>Nombre:</label><br><input type="text" id="cajaAgClNombreSer"><br><br>
			<label>Apellido(s):</label><br><input type="text" id="cajaAgClApellidoSer"><br><br>
			<label>Teléfono:</label><br><input type="text" id="cajaAgClTelefonoSer"><br><br>
			<label>Correo:</label><br><input type="email" id="cajaAgClCorreoSer"><br><br><br>
			Datos del servicio:<br><br>
			<label>Tipo:</label><br><select id="AgSerTipo" onclick="ocultarOpcionales(2)"><option value="Retrato">Retrato</option><option value="Evento">Evento</option></select><br><br>
			<label class="opcional3">Lugar:</label><br><select id="selectLugar" class="opcional3" onclick="ocultarOpcionales(1)"><option value="Estudio">Estudio</option><option value="Direccion">Dirección</option></select><br><br>
			<label class="opcional2">Dirección:</label><br><input type="text" id="cajaAgSerDireccion" class="opcional2"><br><br>
			<label>Fotógrafo:</label><br><select id="AgSerFotografo"></select><button class="btn btn-primary" style="margin-left: 2%;" onclick="verificarDisponibilidad(1)">Verificar disponibilidad</button><div id="disponibilidad1" style="margin-left: 2%;"></div><br><br>
			<label class="opcional">Fotógrafo ayudante:</label><br><select class="opcional" id="AgSerFotografo2"></select><button class="btn btn-primary opcional" style="margin-left: 2%;" onclick="verificarDisponibilidad(2)">Verificar disponibilidad</button><div id="disponibilidad2" class="opcional" style="margin-left: 2%;"></div><br><br>
			<label>Fecha:</label><br><input type="date" id="AgSerFecha"><br><br>
			<label>Hora:</label><br><input type="time" id="AgSerHora"><br><br>
			<label>Precio preeliminar:</label><br><input type="text" id="cajaAgSerPrecio"><br><br>
			<label>Notas:</label><br><textarea id="cajaAgSerNotas"></textarea><br><br>
			<button class="btn btn-success si" onclick="agregarServicio()">Agregar</button>
		</div>

		<div  class="contenedor contenedorAgregarPaquete" id="contenedorAgregarPaquete">
			<div id="mostrarPruebas"></div>
			<button class="btn btn-success btnehlm" onclick="agregarPaquete()">Agregar</button>
		</div>

		<div class="contenedor contenedorAgregarUsuario" id="contenedorAgregarUsuario">
			Agregar Usuario<br><br>
			<label>Nombre:</label><br><input type="text" id="cajaAgUsNombre"><br><br>
			<label>Contraseña:</label><br><input type="text" id="cajaAgUsContra"><br><br>
			<button class="btn btn-success" onclick="agregarUsuario()">Agregar</button>
		</div>
		<div class="modal fade" id="modalEditarUsuario" style="margin-top: 10%;">
  			<div class="modal-dialog">
    			<div class="modal-content">
      				<!-- Modal Header -->
      			<div class="modal-header">
        			<h4 class="modal-title">Editar Cliente</h4>
      			</div>
      			<!-- Modal body -->
      		<div class="modal-body">  	
				<label>Nombre:</label><br><input type="text" id="cajaAgUsNombreM"><br><br>
				<label>Contraseña:</label><br><input type="text" id="cajaAgUsContraM"><br><br>
				<button class="btn btn-success" onclick="editarUsuario()">Guardar</button>
      	</div>
    	</div>
  		</div>
		</div>
		<div  class="contenedor contenedorVerUsuarios" id="contenedorVerUsuarios">
			
		</div>
	</div>
	<script src="scripts/inicio.js"></script>
</body>
</html>