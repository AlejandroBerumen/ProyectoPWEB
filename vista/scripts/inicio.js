var modalPruebaOPaquete = new bootstrap.Modal(document.getElementById('modalPruebaOPaquete'), {});
var clienteServicioAgregado = false;
var dominio = "localhost";
//===================================== FUNCIONAMIENTO =============================================
function contenedores(cual){
	switch(cual){
		case "":
		break;
		case "agcl":
			$('contenedorInicial').setStyle('display', 'none');
			$$('.contenedor').setStyle('display', 'none');
			$('contenedorAgregarCliente').setStyle('display', 'block');
		break;
		case "vercl":
			$('contenedorInicial').setStyle('display', 'none');
			$$('.contenedor').setStyle('display', 'none');
			$('contenedorVerClientes').setStyle('display', 'block');
			tablaClientes();
		break;
		case "agfo":
			$('contenedorInicial').setStyle('display', 'none');
			$$('.contenedor').setStyle('display', 'none');
			$('contenedorAgregarFotografo').setStyle('display', 'block');
		break;
		case "verfo":
			$('contenedorInicial').setStyle('display', 'none');
			$$('.contenedor').setStyle('display', 'none');
			$('contenedorVerFotografos').setStyle('display', 'block');
			tablaFotografos();
		break;
		case "agser":
			$('contenedorInicial').setStyle('display', 'none');
			$$('.contenedor').setStyle('display', 'none');
			$('contenedorAgregarServicio').setStyle('display', 'block');
			fotografosSelect("no");
		break;
		case "verser":
			$('contenedorInicial').setStyle('display', 'none');
			$$('.contenedor').setStyle('display', 'none');
			$('contenedorVerServicio').setStyle('display', 'block');
			tablaServicios();
		break;
		case "agpaq":
			$('contenedorInicial').setStyle('display', 'none');
			$$('.contenedor').setStyle('display', 'none');
			$('contenedorAgregarPaquete').setStyle('display', 'block');
			modalPruebaOPaquete.hide();
			verPruebas();
		break;
		case "agus":
			$('contenedorInicial').setStyle('display', 'none');
			$$('.contenedor').setStyle('display', 'none');
			$('contenedorAgregarUsuario').setStyle('display', 'block');
		break;
		case "verus":
			$('contenedorInicial').setStyle('display', 'none');
			$$('.contenedor').setStyle('display', 'none');
			$('contenedorVerUsuarios').setStyle('display', 'block');
			tablaUsuarios();
		break;
	}
	limpiarTodo();
}

//===================================== VALIDACIONES =============================================
function soloNumeros(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode < 48 || charCode > 57){
        evt.preventDefault();
        return false;
    }
    return true;
}
$('cajaAgClTelefono').addEventListener("keypress", soloNumeros);
$('cajaAgClTelefonoM').addEventListener("keypress", soloNumeros);
$('cajaAgSerPrecio').addEventListener("keypress", soloNumeros);
$('cajaAutocompletar').addEventListener("keypress", soloNumeros);

function soloLetras(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode==32){    
        return true;
    }
    evt.preventDefault();
    return false;
}
$('cajaAgClApellido').addEventListener("keypress", soloLetras);
$('cajaAgClNombre').addEventListener("keypress", soloLetras);
$('cajaAgFoApellido').addEventListener("keypress", soloLetras);
$('cajaAgFoNombre').addEventListener("keypress", soloLetras);
$('cajaAgClApellidoM').addEventListener("keypress", soloLetras);
$('cajaAgClNombreM').addEventListener("keypress", soloLetras);
$('cajaAgFoApellidoM').addEventListener("keypress", soloLetras);
$('cajaAgFoNombreM').addEventListener("keypress", soloLetras);
$('cajaAgClApellidoSer').addEventListener("keypress", soloLetras);
$('cajaAgClNombreSer').addEventListener("keypress", soloLetras);

//===================================== GENERAL =============================================
var idSeleccionada, tablaSeleccionada;
var myModal = new bootstrap.Modal(document.getElementById('myModal'), {});
function modalEliminar(id, tabla){
	idSeleccionada = id;
	tablaSeleccionada = tabla;
	if(tabla=="clientes")
		$('textoModalEliminar').set('text', '¿Desea eliminar el registro seleccionado?. Al eliminar un cliente se eliminarán los servicios y pruebas vinculados a él.');
	else
		$('textoModalEliminar').set('text', '¿Desea eliminar el registro seleccionado?');
	myModal.toggle();
}

function eliminar(){
	var data = {
		"id": idSeleccionada,
		"tabla": tablaSeleccionada
	}
	fetch("http://"+dominio+"/controladores/eliminar.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: JSON.stringify(data)
    }).then(function(res) {
    	return res.json();
  	}).then((data)=>{
  		if(data['eliminacion']=="Exito"){
  			alert("Registro eliminado");
  			myModal.hide();
  			if(tablaSeleccionada=="clientes")
  				tablaClientes();
  			else if(tablaSeleccionada=="fotografos")
  				tablaFotografos();
  			else if(tablaSeleccionada=="servicio")
  				tablaServicios();
  			else if(tablaSeleccionada=="usuarios")
  				tablaUsuarios();
  		}else{
  			alert("Error en la eliminación");
  		}
  	});
}

function limpiarTodo(){
	$$('input').set('value', '');
	for(var i=0; i<$$('input').length; i++)
		$$('input')[i].removeAttribute("disabled");
	$('disponibilidad1').set('HTML', '');
	$('disponibilidad2').set('HTML', '');
}

function cerrarSesion(){
	window.location.href = "../controladores/cerrarSesion.php";
}
//===================================== ABCC CLIENTES =============================================
var modalEditarCliente = new bootstrap.Modal(document.getElementById('modalEditarCliente'), {});
var registros = new Array();
function agregarCliente(fuente){
	var nuevaId;
	var banderaValidacion = true;
	if(fuente=='1'){
		var data = {
			"nombre": $('cajaAgClNombre').get('value').toString(),
			"apellido": $('cajaAgClApellido').get('value').toString(),
			"telefono": $('cajaAgClTelefono').get('value').toString(),
			"correo": $('cajaAgClCorreo').get('value').toString()
		}
		if($('cajaAgClNombre').get('value').toString().length<2 || $('cajaAgClNombre').get('value').toString().length>30){
			alert("La longitud del nombre no es la adecuada (2-30 caracteres).\nVuelva a intentarlo.");
			banderaValidacion = false;
		}
		if($('cajaAgClApellido').get('value').toString().length<2 || $('cajaAgClApellido').get('value').toString().length>40){
			alert("La longitud del apellido no es la adecuada. (2-40 caracteres)\nVuelva a intentarlo.");
			banderaValidacion = false;
		}
		if($('cajaAgClTelefono').get('value').toString().length!=10){
			alert("La longitud del teléfono no es la adecuada (10 caracteres).\nVuelva a intentarlo.");
			banderaValidacion = false;
		}
		if($('cajaAgClCorreo').get('value').toString().length>0 && !$('cajaAgClCorreo').get('value').toString().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
			alert("El formato de correo electronico no es el adecuado.\nVuelva a intentarlo.");
			banderaValidacion = false;
		}
	}else if(fuente=='0'){
		var data = {
			"nombre": $('cajaAgClNombreSer').get('value').toString(),
			"apellido": $('cajaAgClApellidoSer').get('value').toString(),
			"telefono": $('cajaAgClTelefonoSer').get('value').toString(),
			"correo": $('cajaAgClCorreoSer').get('value').toString()
		}
		if($('cajaAgClNombreSer').get('value').toString().length<2 || $('cajaAgClNombreSer').get('value').toString().length>30){
			alert("La longitud del nombre del cliente no es la adecuada (2-30 caracteres).\nVuelva a intentarlo.");
			banderaValidacion = false;
			clienteServicioAgregado = false;
		}
		if($('cajaAgClApellidoSer').get('value').toString().length<2 || $('cajaAgClApellidoSer').get('value').toString().length>40){
			alert("La longitud del apellido del cliente no es la adecuada. (2-40 caracteres)\nVuelva a intentarlo.");
			banderaValidacion = false;
			clienteServicioAgregado = false;
		}
		if($('cajaAgClTelefonoSer').get('value').toString().length!=10){
			alert("La longitud del teléfono del cliente no es la adecuada (10 caracteres).\nVuelva a intentarlo.");
			banderaValidacion = false;
			clienteServicioAgregado = false;
		}
		if($('cajaAgClCorreoSer').get('value').toString().length>0 && !$('cajaAgClCorreoSer').get('value').toString().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
			alert("El formato de correo electronico del cliente no es el adecuado.\nVuelva a intentarlo.");
			banderaValidacion = false;
			clienteServicioAgregado = false;
		}
	}

	if(banderaValidacion){
		var promesa = new Promise(function(completado){
		fetch("http://"+dominio+"/controladores/agregarCliente.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: JSON.stringify(data)
	    }).then(function(res) {
	    	return res.json();
	  	}).then((data)=>{
	  		if(data['insercion']=="Exito"){
	  			alert("Cliente agregado");
	  			nuevaId = data['id'];
	  			completado("1");
	  		}else{
	  			alert("Error en la inserción");
	  		}
	  	});
		}).then(
			function(value){
				if(value=="1"){
					return nuevaId;
				}
			}
		);
		return promesa;
	}
}

var idActualizarCliente;
function modalEditarClienteA(i){
	idActualizarCliente = i;
	$('cajaAgClNombreM').set('value', registros[i][1]);
	$('cajaAgClApellidoM').set('value', registros[i][2]);
	$('cajaAgClTelefonoM').set('value', registros[i][3]);
	$('cajaAgClCorreoM').set('value', registros[i][4]);
	modalEditarCliente.toggle();
}

function tablaClientes(){
	registros = new Array();
  	const promesa = new Promise(function(completado, error){
		fetch("http://"+dominio+"/controladores/consultaClientes.php", {
    		method: "GET", 
    		headers: {
      			"Content-Type": "application/json"
    	}}).then((res) => {
    		return res.json()
   		}).then((data)=>{
   			respuesta = data;
   			completado("1");
   			return data;
   		}).catch((e) => console.error(e));
		}).then(
			function(value){
				if(value=="1"){
					for(var i=0; i<respuesta.length; i++){
						var registro = new Array();
						registro.push(respuesta[i]["id"]);
						registro.push(respuesta[i]["nombre"]);
						registro.push(respuesta[i]["apellido"]);
						registro.push(respuesta[i]["telefono"]);
						registro.push(respuesta[i]["correo"]);
						registros.push(registro);
					}
					if(registros.length==0){
						$('tablaClientes').set('HTML', '<div style="text-align: center; margin-top: 10%; font-size: 133%;">No hay clientes registrados...</div>');
					}else{
						var cadenaTabla = "";
						cadenaTabla = cadenaTabla + '<table class="table"><thead><tr><th scope="col">ID</th><th scope="col">Nombre</th><th scope="col">Apellido(s)</th><th scope="col">Teléfono</th><th scope="col">Correo electrónico</th><th scope="col">Opciones</th></tr></thead><tbody>';
						for(var i=0; i<registros.length; i++){
							cadenaTabla = cadenaTabla + '<tr><th scope="row">'+registros[i][0]+'</th><td>'+registros[i][1]+'</td><td>'+registros[i][2]+'</td><td>'+registros[i][3]+'</td><td>'+registros[i][4]+'</td><td class="tdopciones"><img src="img/editar.png" onclick="modalEditarClienteA('+i+')"><img src="img/borrar.png" onclick="modalEliminar(\''+registros[i][0]+'\', \'clientes\')"></td></tr>';
						}
						$('tablaClientes').set('HTML', cadenaTabla + '</tbody></table>');
					}
				}
			}
		);
}

function clientesFiltro(filtro){
	var registrosClientesFiltro = new Array();
	var data = {
		"filtro": filtro
	}
	const promesa = new Promise(function(completado, error){
		fetch("http://"+dominio+"/controladores/consultaClientesFiltro.php", {
        	method: "POST",
        	headers: {
          	"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        	},
        	body: JSON.stringify(data)
    	}).then(function(res) {
    		return res.json();
  		}).then((data)=>{
  			respuesta = data;
   			completado("1");
   			return data;
  	}).catch((e) => console.error(e));
  			}).then(
			function(value){
				if(value=="1"){
					for(var i=0; i<respuesta.length; i++){
						var registro = new Array();
						registro.push(respuesta[i]["id"]);
						registro.push(respuesta[i]["nombre"]);
						registro.push(respuesta[i]["apellido"]);
						registro.push(respuesta[i]["telefono"]);
						registro.push(respuesta[i]["correo"]);
						registrosClientesFiltro.push(registro);
					}
					if(registrosClientesFiltro.length>0){
						return registrosClientesFiltro;
					}else return 0;
				}
			}
		);
  	return promesa;
}

async function tablaClientesFiltro(){
	var filtro = "";
	if($('cajaFiltroClientesNombre').get('value').toString().replaceAll(' ', '').length!=0){
		filtro = "nombre like '%"+$('cajaFiltroClientesNombre').get('value').toString()+"%'";
	}
	if($('cajaFiltroClientesApellido').get('value').toString().replaceAll(' ', '').length!=0){
		if(filtro!="")
			filtro = filtro + " AND"
		filtro = filtro + " apellido like '%"+$('cajaFiltroClientesApellido').get('value').toString()+"%'";
	}
	if($('cajaFiltroClientesTelefono').get('value').toString().replaceAll(' ', '').length!=0){
		if(filtro!="")
			filtro = filtro + " AND"
		filtro = filtro + " telefono like '%"+$('cajaFiltroClientesTelefono').get('value').toString()+"%'";
	}
	if(filtro==""){
		tablaClientes();
	}else{
		var registrosEncontrados = await clientesFiltro(filtro);
		if(registrosEncontrados.length==0){
			$('tablaClientes').set('HTML', '<div style="text-align: center; margin-top: 10%; font-size: 133%;">No hay clientes registrados...</div>');
		}else{
			var cadenaTabla = "";
			cadenaTabla = cadenaTabla + '<table class="table"><thead><tr><th scope="col">ID</th><th scope="col">Nombre</th><th scope="col">Apellido(s)</th><th scope="col">Teléfono</th><th scope="col">Correo electrónico</th><th scope="col">Opciones</th></tr></thead><tbody>';
			for(var i=0; i<registrosEncontrados.length; i++){
				cadenaTabla = cadenaTabla + '<tr><th scope="row">'+registrosEncontrados[i][0]+'</th><td>'+registrosEncontrados[i][1]+'</td><td>'+registrosEncontrados[i][2]+'</td><td>'+registrosEncontrados[i][3]+'</td><td>'+registrosEncontrados[i][4]+'</td><td class="tdopciones"><img src="img/editar.png" onclick="modalEditarClienteA('+i+')"><img src="img/borrar.png" onclick="modalEliminar(\''+registrosEncontrados[i][0]+'\', \'clientes\')"></td></tr>';
			}
			$('tablaClientes').set('HTML', cadenaTabla + '</tbody></table>');
		}
	}
	
}
$('cajaFiltroClientesNombre').addEventListener("keyup", tablaClientesFiltro);
$('cajaFiltroClientesApellido').addEventListener("keyup", tablaClientesFiltro);
$('cajaFiltroClientesTelefono').addEventListener("keyup", tablaClientesFiltro);

function editarCliente(){
	var banderaValidacion = true
	if($('cajaAgClNombreM').get('value').toString().length<2 || $('cajaAgClNombreM').get('value').toString().length>30){
		alert("La longitud del nombre no es la adecuada (2-30 caracteres).\nVuelva a intentarlo.");
		banderaValidacion = false;
	}
	if($('cajaAgClApellidoM').get('value').toString().length<2 || $('cajaAgClApellidoM').get('value').toString().length>40){
		alert("La longitud del apellido no es la adecuada. (2-40 caracteres)\nVuelva a intentarlo.");
		banderaValidacion = false;
	}
	if($('cajaAgClTelefonoM').get('value').toString().length!=10){
		alert("La longitud del teléfono no es la adecuada (10 caracteres).\nVuelva a intentarlo.");
		banderaValidacion = false;
	}
	if($('cajaAgClCorreoM').get('value').toString().length>0 && !$('cajaAgClCorreoM').get('value').toString().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
		alert("El formato de correo electronico no es el adecuado.\nVuelva a intentarlo.");
		banderaValidacion = false;
	}
	if(banderaValidacion){
		var data = {
			"id": registros[idActualizarCliente][0],
			"nombre": $('cajaAgClNombreM').get('value').toString(),
			"apellido": $('cajaAgClApellidoM').get('value').toString(),
			"telefono": $('cajaAgClTelefonoM').get('value').toString(),
			"correo": $('cajaAgClCorreoM').get('value').toString()
		}
		fetch("http://"+dominio+"/controladores/actualizarCliente.php", {
	        method: "POST",
	        headers: {
	          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
	        },
	        body: JSON.stringify(data)
	    }).then(function(res) {
	    	return res.json();
	  	}).then((data)=>{
	  		if(data['insercion']=="Exito"){
	  			alert("Registro actualizado");
	  			tablaClientes();
	  			modalEditarCliente.hide();
	  		}else{
	  			alert("Error");
	  		}
	  	});
	}
}

//===================================== ABCC FOTOGRAFOS =============================================
var modalEditarFotografo = new bootstrap.Modal(document.getElementById('modalEditarFotografo'), {});
var registrosFotografos = new Array();
function agregarFotografo(){
	var banderaValidacion = true;
	if($('cajaAgFoNombre').get('value').toString().length<2 || $('cajaAgFoNombre').get('value').toString().length>30){
		alert("La longitud del nombre no es la adecuada (2-30 caracteres).\nVuelva a intentarlo.");
		banderaValidacion = false;
	}
	if($('cajaAgFoApellido').get('value').toString().length<2 || $('cajaAgFoApellido').get('value').toString().length>40){
		alert("La longitud del apellido no es la adecuada. (2-40 caracteres)\nVuelva a intentarlo.");
		banderaValidacion = false;
	}
	if(banderaValidacion){
		var data = {
			"nombre": $('cajaAgFoNombre').get('value').toString(),
			"apellido": $('cajaAgFoApellido').get('value').toString(),
			"tipo": $('AgFoTipo').get('value')
		}
		fetch("http://"+dominio+"/controladores/agregarFotografo.php", {
        	method: "POST",
        	headers: {
          	"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        	},
        	body: JSON.stringify(data)
    	}).then(function(res) {
    		return res.json();
  		}).then((data)=>{
  			if(data['insercion']=="Exito"){
  				alert("Fotógrafo agregado");
  			}else{
  				alert("Error en la inserción");
  			}
  		});
	}
}

var idActualizarFototografo;
function modalEditarFotografoA(i){
	idActualizarFototografo = i;
	$('cajaAgFoNombreM').set('value', registrosFotografos[i][1]);
	$('cajaAgFoApellidoM').set('value', registrosFotografos[i][2]);
	$('AgFoTipoM').value = registrosFotografos[i][3];
	modalEditarFotografo.toggle();
}

function tablaFotografos(){
	registrosFotografos = new Array();
  	const promesa = new Promise(function(completado, error){
		fetch("http://"+dominio+"/controladores/consultaFotografos.php", {
    		method: "GET", 
    		headers: {
      			"Content-Type": "application/json"
    	}}).then((res) => {
    		return res.json()
   		}).then((data)=>{
   			respuesta = data;
   			completado("1");
   			return data;
   		}).catch((e) => console.error(e));
		}).then(
			function(value){
				if(value=="1"){
					for(var i=0; i<respuesta.length; i++){
						var registro = new Array();
						registro.push(respuesta[i]["id"]);
						registro.push(respuesta[i]["nombre"]);
						registro.push(respuesta[i]["apellido"]);
						registro.push(respuesta[i]["tipo"]);
						registro.push(respuesta[i]["activo"]);
						registrosFotografos.push(registro);
					}
					if(registrosFotografos.length==0){
						$('contenedorVerFotografos').set('HTML', '<div style="text-align: center; margin-top: 10%; font-size: 133%;">No hay fotografos registrados...</div>');
					}else{
						var cadenaTabla = "";
						cadenaTabla = cadenaTabla + '<table class="table"><thead><tr><th scope="col">ID</th><th scope="col">Nombre</th><th scope="col">Apellido(s)</th><th scope="col">Tipo</th><th scope="col">Opciones</th></tr></thead><tbody>';
						for(var i=0; i<registrosFotografos.length; i++){
							if(registrosFotografos[i][4]!=0 && registrosFotografos[i][4]!="0")
								cadenaTabla = cadenaTabla + '<tr><th scope="row">'+registrosFotografos[i][0]+'</th><td>'+registrosFotografos[i][1]+'</td><td>'+registrosFotografos[i][2]+'</td><td>'+registrosFotografos[i][3]+'</td><td class="tdopciones"><img src="img/editar.png" onclick="modalEditarFotografoA('+i+')"><img src="img/borrar.png" onclick="modalEliminar(\''+registrosFotografos[i][0]+'\', \'fotografos\')"></td></tr>';
						}
						$('contenedorVerFotografos').set('HTML', cadenaTabla + '</tbody></table>');
					}
				}
			}
		);
}

function editarFotografo(){
	var banderaValidacion = true;
	if($('cajaAgFoNombreM').get('value').toString().length<2 || $('cajaAgFoNombreM').get('value').toString().length>30){
		alert("La longitud del nombre no es la adecuada (2-30 caracteres).\nVuelva a intentarlo.");
		banderaValidacion = false;
	}
	if($('cajaAgFoApellidoM').get('value').toString().length<2 || $('cajaAgFoApellidoM').get('value').toString().length>40){
		alert("La longitud del apellido no es la adecuada. (2-40 caracteres)\nVuelva a intentarlo.");
		banderaValidacion = false;
	}
	if(banderaValidacion){
		var data = {
			"id": registrosFotografos[idActualizarFototografo][0],
			"nombre": $('cajaAgFoNombreM').get('value').toString(),
			"apellido": $('cajaAgFoApellidoM').get('value').toString(),
			"tipo": $('AgFoTipoM').get('value')
		}
		fetch("http://"+dominio+"/controladores/actualizarFotografo.php", {
	        method: "POST",
	        headers: {
	          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
	        },
	        body: JSON.stringify(data)
	    }).then(function(res) {
	    	return res.json();
	  	}).then((data)=>{
	  		if(data['insercion']=="Exito"){
	  			alert("Registro actualizado");
	  			tablaFotografos();
	  			modalEditarFotografo.hide();
	  		}else{
	  			alert("Error");
	  		}
	  	});
	}
}

//===================================== ABCC SERVICIOS =============================================
var modalEditarServicio = new bootstrap.Modal(document.getElementById('modalEditarServicio'), {});
var modalAgregarPrueba = new bootstrap.Modal(document.getElementById('modalAgregarPrueba'), {});
var registrosFotografosRetorno = new Array();
var registrosServicios = new Array();
function fotografosSelect(eme){
	registrosFotografosRetorno = new Array();
  	const promesa = new Promise(function(completado, error){
		fetch("http://"+dominio+"/controladores/consultaFotografos.php", {
    		method: "GET", 
    		headers: {
      			"Content-Type": "application/json"
    	}}).then((res) => {
    		return res.json()
   		}).then((data)=>{
   			respuesta = data;
   			completado("1");
   			return data;
   		}).catch((e) => console.error(e));
		}).then(
			function(value){
				if(value=="1"){
					for(var i=0; i<respuesta.length; i++){
						var registro = new Array();
						registro.push(respuesta[i]["id"]);
						registro.push(respuesta[i]["nombre"]);
						registro.push(respuesta[i]["apellido"]);
						registro.push(respuesta[i]["tipo"]);
						registro.push(respuesta[i]["activo"]);
						registrosFotografosRetorno.push(registro);
					}
					if(registrosFotografosRetorno.length>0){
						var fotografos = registrosFotografosRetorno;
						var cadenaSelect = '<optgroup label="- - - De Planta - - -">'
						for(var i=0; i<fotografos.length; i++){
							if(fotografos[i][3]=="Planta")
								cadenaSelect = cadenaSelect + '<option value="'+fotografos[i][0]+'">'+(fotografos[i][1]+' '+fotografos[i][2])+'</option>'
						}
						cadenaSelect = cadenaSelect + '</optgroup><optgroup label="- - - Independientes - - -">'
						for(var i=0; i<fotografos.length; i++){
							if(fotografos[i][3]=="Independiente")
								cadenaSelect = cadenaSelect + '<option value="'+fotografos[i][0]+'">'+(fotografos[i][1]+' '+fotografos[i][2])+'</option>'
						}
						cadenaSelect = cadenaSelect + '</optgroup>';
						if(eme!="si"){
							$('AgSerFotografo').set('HTML', cadenaSelect);
							$('AgSerFotografo2').set('HTML', '<option value=" - - ">Ninguno</option>' + cadenaSelect);
						}else{
							/*$('AgSerFotografoM').set('HTML', cadenaSelect);
							$('AgSerFotografo2M').set('HTML', '<option value=" - - ">Ninguno</option>' + cadenaSelect);*/
						}
					}
				}
			}
		);
}

function ocultarOpcionales(cual){
	if(cual==1){
		if($('selectLugar').get('value')=="Direccion")
			$$('.opcional2').setStyle('display', 'inline');
		else $$('.opcional2').setStyle('display', 'none');
	}else if(cual==2){
		if($('AgSerTipo').get('value')=="Evento"){
			$$('.opcional3').setStyle('display', 'none');
			$$('.opcional2').setStyle('display', 'inline');
			$$('.opcional').setStyle('display', 'inline')
		}else{
			$$('.opcional3').setStyle('display', 'inline');
			$$('.opcional').setStyle('display', 'none');
			ocultarOpcionales(1);
		}
	}
}

function ocultarOpcionalesM(cual){
	if(cual==1){
		if($('selectLugarM').get('value')=="Direccion")
			$$('.opcional2M').setStyle('display', 'inline');
		else $$('.opcional2M').setStyle('display', 'none');
	}else if(cual==2){
		if($('AgSerTipoM').get('value')=="Evento"){
			$$('.opcional3M').setStyle('display', 'none');
			$$('.opcional2M').setStyle('display', 'inline');
			$$('.opcionalM').setStyle('display', 'inline')
		}else{
			$$('.opcional3M').setStyle('display', 'inline');
			$$('.opcionalM').setStyle('display', 'none');
			ocultarOpcionales(1);
		}
	}
}

async function buscarCliente(){
	var id = $('cajaAutocompletar').get('value').toString();
	if(id.length!=0){
		if(await clientesFiltro('id='+id)!=0){
			var relleno = await clientesFiltro('id='+id);
			$('cajaAgClNombreSer').set('value', relleno[0][1]);
			$('cajaAgClApellidoSer').set('value', relleno[0][2]);
			$('cajaAgClTelefonoSer').set('value', relleno[0][3]);
			$('cajaAgClCorreoSer').set('value', relleno[0][4]);
			$('cajaAgClNombreSer').set('disabled', 'true');
			$('cajaAgClApellidoSer').set('disabled', 'true');
			$('cajaAgClTelefonoSer').set('disabled', 'true');
			$('cajaAgClCorreoSer').set('disabled', 'true');
			$('cajaAutocompletar').set('disabled', 'true');
		}else alert("No se encontró un cliente con la ID especificada");
	}
}

var idActualizarServicio;
function modalEditarServicioA(i){
	idActualizarServicio = registrosServicios[i][0];
	fotografosSelect("si");
	$('AgSerTipoM').value = registrosServicios[i][3];
	if(registrosServicios[i][4]=="Estudio"){
		$('selectLugarM').value = "Estudio";
		$$('.opcional2M').setStyle('display', 'none');
	}else{
		$('selectLugarM').value = "Direccion";
		$$('.opcional2M').setStyle('display', 'inline');
		$('cajaAgSerDireccionM').set('value', registrosServicios[i][4]);
	}
	$('cajaAgSerPrecioM').set('value', registrosServicios[i][11]);
	$('cajaAgSerNotasM').set('value', registrosServicios[i][12]);
	modalEditarServicio.toggle();
}

function editarServicio(){
	var tipo = $('AgSerTipoM').get('value');
    var direccion;
    var notas;
    var precio;
	var banderaValidacion = true;

	if($('cajaAgSerDireccionM').getStyle('display')=='inline')
    	direccion = $('cajaAgSerDireccionM').get('value').toString();
    else direccion = "Estudio";
    if($('cajaAgSerNotasM').get('value').toString().replaceAll(' ', '')=="")
    	notas = "Sin notas";
    else notas = $('cajaAgSerNotasM').get('value').toString();
    precio = $('cajaAgSerPrecioM').get('value').toString();

    if(direccion.replaceAll(' ', '').length<5 || direccion.replaceAll(' ', '').length>50){
    		alert("La longitud de la dirección no es la adecuada (5-50 caracteres).\nVuelva a intentarlo.");
    		banderaValidacion = false;
    	}
    if(precio.length<1){
    	alert("Por favor, introduzca el precio.");
    	banderaValidacion = false;
    }

	if(banderaValidacion){
		var data = {
			"id": idActualizarServicio,
			"tipo": tipo,
			"direccion": direccion,
			"precio": precio,
			"notas": notas
		}
		fetch("http://"+dominio+"/controladores/actualizarServicio.php", {
	        method: "POST",
	        headers: {
	          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
	        },
	        body: JSON.stringify(data)
	    }).then(function(res) {
	    	return res.json();
	  	}).then((data)=>{
	  		if(data['insercion']=="Exito"){
	  			alert("Registro actualizado");
	  			tablaServicios();
	  			modalEditarServicio.hide();
	  		}else{
	  			alert("Error");
	  		}
	  	});
	}
}

var servicioPrueba;
var contrato;
function modalPruebaOPaqueteA(id, i){
	servicioPrueba = id;
	contrato = i;
	modalPruebaOPaquete.toggle();
}
function modalPruebas(){
	modalPruebaOPaquete.hide();
	var time = new Date().getTime();
	$('cajaAgPrNombre').set('value', "prueba" + time);
	modalAgregarPrueba.toggle();
}

async function agregarServicio(){
	var tipo = $('AgSerTipo').get('value');
    var direccion;
    var fecha;
    var hora;
    var notas;
    var precio;
    var idcliente;
    var idfotografo;
    var idfotografoayudante;
    var banderaValidacion = true;
    if($('cajaAgSerDireccion').getStyle('display')=='inline')
    	direccion = $('cajaAgSerDireccion').get('value').toString();
    else direccion = "Estudio";
    fecha = $('AgSerFecha').get('value');
    hora = $('AgSerHora').get('value');
    if($('cajaAgSerNotas').get('value').toString().replaceAll(' ', '')=="")
    	notas = "Sin notas";
    else notas = $('cajaAgSerNotas').get('value').toString();
    precio = $('cajaAgSerPrecio').get('value').toString();
    idfotografo = $('AgSerFotografo').get('value');
    if($('AgSerFotografo2').getStyle('display')=='none' || $('AgSerFotografo2').get('value')==" - - ")
    	idfotografoayudante = "0";
    else idfotografoayudante = $('AgSerFotografo2').get('value');
    if($('cajaAutocompletar').get('disabled')==true){
    	idcliente = $('cajaAutocompletar').get('value').toString();
    	clienteServicioAgregado = true;
    }else{
    	idcliente = await agregarCliente('0');
    }

    if(clienteServicioAgregado){
    	if(direccion.replaceAll(' ', '').length<5 || direccion.replaceAll(' ', '').length>50){
    		alert("La longitud de la dirección no es la adecuada (5-50 caracteres).\nVuelva a intentarlo.");
    		banderaValidacion = false;
    	}
    	if(fecha==""){
    		alert("Por favor, introduzca la fecha.");
    		banderaValidacion = false;
    	}
    	if(hora==""){
    		alert("Por favor, introduzca la hora.");
    		banderaValidacion = false;
    	}
    	if(precio.length<1){
    		alert("Por favor, introduzca el precio.");
    		banderaValidacion = false;
    	}
    	if(banderaValidacion){
	    	var data = {
				"tipo": tipo,
				"direccion": direccion,
				"fecha": fecha,
				"hora": hora,
				"notas": notas,
				"precio": precio,
				"idcliente": idcliente,
				"idfotografo": idfotografo,
				"idfotografoayudante": idfotografoayudante
			}
			fetch("http://"+dominio+"/controladores/agregarServicio.php", {
		        method: "POST",
		        headers: {
		          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
		        },
		        body: JSON.stringify(data)
		    }).then(function(res) {
		    	return res.json();
		  	}).then((data)=>{
		  		if(data['insercion']=="Exito"){
		  			alert("Servicio agregado");
		  		}else{
		  			alert("Error en la inserción");
		  		}
		  	});
    	}   
    }
}

function tablaServicios(){
	registrosServicios = new Array();
  	const promesa = new Promise(function(completado, error){
		fetch("http://"+dominio+"/controladores/consultaVistaServicios.php", {
    		method: "GET", 
    		headers: {
      			"Content-Type": "application/json"
    	}}).then((res) => {
    		return res.json()
   		}).then((data)=>{
   			respuesta = data;
   			completado("1");
   			return data;
   		}).catch((e) => console.error(e));
		}).then(
			function(value){
				if(value=="1"){
					for(var i=0; i<respuesta.length; i++){
						var registro = new Array();
						registro.push(respuesta[i]["id"]);
						registro.push(respuesta[i]["nombreCliente"]);
						registro.push(respuesta[i]["apellidoCliente"]);
						registro.push(respuesta[i]["tipo"]);
						registro.push(respuesta[i]["direccion"]);
						registro.push(respuesta[i]["fecha"]);
						registro.push(respuesta[i]["hora"]);
						registro.push(respuesta[i]["nombreFotografo"]);
						registro.push(respuesta[i]["apellidoFotografo"]);
						registro.push(respuesta[i]["nombreFotografo2"]);
						registro.push(respuesta[i]["apellidoFotografo2"]);
						registro.push(respuesta[i]["precio"]);
						registro.push(respuesta[i]["notas"]);
						registrosServicios.push(registro);
					}
					if(registrosServicios.length==0){
						$('contenedorVerServicio').set('HTML', '<div style="text-align: center; margin-top: 10%; font-size: 133%;">No hay servicios registrados...</div>');
					}else{
						var cadenaTabla = "";
						cadenaTabla = cadenaTabla + '<table class="table"><thead><tr><th scope="col">ID</th><th scope="col">Cliente</th><th scope="col">Tipo</th><th scope="col">Direccion</th><th scope="col">Fecha</th><th scope="col">Hora</th><th scope="col">Fotógrafo</th><th scope="col">Fotógrafo asistente</th><th scope="col">Precio</th><th scope="col">Notas</th><th scope="col">Opciones</th></tr></thead><tbody>';
						for(var i=0; i<registrosServicios.length; i++){
							var nombreFografoAsistente = "";
							if(registrosServicios[i][9]==null)
								nombreFografoAsistente = " - - "
							else nombreFografoAsistente = registrosServicios[i][9] + " " + registrosServicios[i][10]; 
							cadenaTabla = cadenaTabla + '<tr><th scope="row">'+registrosServicios[i][0]+'</th><td>'+(registrosServicios[i][1]+" "+registrosServicios[i][2])+'</td><td>'+registrosServicios[i][3]+'</td><td>'+registrosServicios[i][4]+'</td><td>'+registrosServicios[i][5]+'</td><td>'+registrosServicios[i][6]+'</td><td>'+(registrosServicios[i][7]+" "+registrosServicios[i][8])+'</td><td>'+(nombreFografoAsistente)+'</td><td>'+registrosServicios[i][11]+'</td><td>'+registrosServicios[i][12]+'</td><td class="tdopcionesServicio"><img src="img/plus.png" onclick="modalPruebaOPaqueteA('+registrosServicios[i][0]+', '+i+')"><img src="img/editar.png" onclick="modalEditarServicioA('+i+')"><img src="img/borrar.png" onclick="modalEliminar(\''+registrosServicios[i][0]+'\', \'servicio\')"></td></tr>';
						}
						$('contenedorVerServicio').set('HTML', cadenaTabla + '</tbody></table>');
					}
				}
			}
		);	
}

function verificarDisponibilidad(cual){
	var idFotografo;
	var consulta;
	var impresion;
	if(cual==1){
		idFotografo = $('AgSerFotografo').get('value');
		consulta = "consultaVistaFF";
		impresion = $('disponibilidad1');
	}
	else if(cual==2){
		idFotografo = $('AgSerFotografo2').get('value');
		consulta = "consultaVistaFF2";
		impresion = $('disponibilidad2');
	}

	if($('AgSerFecha').get('value')=="")
		alert("Introduzca una fecha para verificar la disponibilidad");
	else if(idFotografo==" - - ")
		alert("Seleccione un fotografo para verificar la disponibilidad");
	else{
		var registrosOtraVez = new Array();
	  	const promesa = new Promise(function(completado, error){
			fetch("http://"+dominio+"/controladores/"+consulta+".php", {
	    		method: "GET", 
	    		headers: {
	      			"Content-Type": "application/json"
	    	}}).then((res) => {
	    		return res.json()
	   		}).then((data)=>{
	   			respuesta = data;
	   			completado("1");
	   			return data;
	   		}).catch((e) => console.error(e));
			}).then(
				function(value){
					if(value=="1"){
						for(var i=0; i<respuesta.length; i++){
							var registro = new Array();
							registro.push(respuesta[i]["id"]);
							registro.push(respuesta[i]["fecha"]);
							registrosOtraVez.push(registro);
						}
						var banderaDisponible = true;
						for(var i=0; i<registrosOtraVez.length; i++){
							if(registrosOtraVez[i][0].toString()==idFotografo.toString() && registrosOtraVez[i][1].toString()==$('AgSerFecha').get('value').toString())
								banderaDisponible = false;
						}
						if(banderaDisponible) impresion.set('HTML', '<font color="green">Fotografo Disponible');
						else impresion.set('HTML', '<font color="red">Fotografo no disponible');
					}
				}
			);	
	}
}

function generarContrato(){
	var doc = new jsPDF();
	var texto = "CONTRATO - ESTUDIO FOTOGRÁFICO\n\n\nCliente: " + registrosServicios[contrato][1] + " " + registrosServicios[contrato][2]; 
	texto = texto + "\nServicio a brinar: " + registrosServicios[contrato][3];
	texto = texto + "\nLugar: " + registrosServicios[contrato][4] + "\nMonto total: " + registrosServicios[contrato][11];
	texto = texto + "\nNotas: " + registrosServicios[contrato][12] + "\n\n\nFirma: ______________________________________";
	texto = texto + "\n\n\nAl firmar este contrato acepta nuestras clausulas de cancelación y \ncopyright, así como el cumplimiento del pago.\nEn caso de incumplir, se tomarán medidas legales."
	doc.text(20, 20, texto);
	doc.save('Contrato.pdf');
}

//===================================== ABCC PRUEBAS =============================================
function agregarPrueba(){
	var data = {
		"idservicio": servicioPrueba,
		"nombre": $('cajaAgPrNombre').get('value').toString()
	}
	fetch("http://"+dominio+"/controladores/agregarPrueba.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: JSON.stringify(data)
    }).then(function(res) {
    	return res.json();
  	}).then((data)=>{
  		if(data['insercion']=="Exito"){
  			alert("Prueba agregada");
  			modalAgregarPrueba.hide();
  		}else{
  			alert("Error en la inserción");
  		}
  	});
}

function verPruebas(){
	var registrosPruebas = new Array();
	var filt = {
		"filtro": ("idservicio="+servicioPrueba)
	}
	const promesa = new Promise(function(completado, error){
		fetch("http://"+dominio+"/controladores/consultaPruebasFiltro.php", {
        	method: "POST",
        	headers: {
          	"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        	},
        	body: JSON.stringify(filt)
    	}).then(function(res) {
    		return res.json();
  		}).then((data)=>{
  			respuesta = data;
   			completado("1");
   			return data;
  	}).catch((e) => console.error(e));
  			}).then(
			function(value){
				if(value=="1"){
					for(var i=0; i<respuesta.length; i++){
						var registro = new Array();
						registro.push(respuesta[i]["id"]);
						registro.push(respuesta[i]["nombreArchivo"]);
						registro.push(respuesta[i]["idservicio"]);
						registrosPruebas.push(registro);
					}
					if(registrosPruebas.length>0){
						$('mostrarPruebas').set('HTML', '');
						$$('.btnehlm')[0].setStyle('display', 'block');
						for(var j=0; j<registrosPruebas.length; j++){
							$('mostrarPruebas').appendHTML('<input type="checkbox">'+registrosPruebas[j][1]+'<br>');
						}
					}else{
						$('mostrarPruebas').set('HTML', '<div style="text-align: center; margin-top: 10%; font-size: 133%;">No hay pruebas registradas para este servicio...</div>')
						$$('.btnehlm')[0].setStyle('display', 'none');
					}	
				}
			}
		);
}

//============================== ABCC PAQUETE =============================================
function agregarPaquete(){

}

//============================== ABCC USUARIOS =============================================
if($('nombre').get('text').toString().toLowerCase()!="admin")
	$$('.bo4')[0].setStyle('display', 'none');

var modalEditarUsuario = new bootstrap.Modal(document.getElementById('modalEditarUsuario'), {});
var registrosUsuarios = new Array();
function agregarUsuario(){
	var banderaValidacion = true;
	if($('cajaAgUsNombre').get('value').toString().length<4 || $('cajaAgUsNombre').get('value').toString().length>30){
		alert("La longitud del nombre no es la adecuada (4-30 caracteres).\nVuelva a intentarlo.");
		banderaValidacion = false;
	}
	if($('cajaAgUsContra').get('value').toString().length<8 || $('cajaAgUsContra').get('value').toString().length>30){
		alert("La longitud de la contraseña no es la adecuada. (8-30 caracteres)\nVuelva a intentarlo.");
		banderaValidacion = false;
	}
	if(banderaValidacion){
		var data = {
			"nombreUsuario": $('cajaAgUsNombre').get('value').toString(),
			"contrasena": $('cajaAgUsContra').get('value').toString()
		}
		fetch("http://"+dominio+"/controladores/agregarUsuario.php", {
        	method: "POST",
        	headers: {
          	"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        	},
        	body: JSON.stringify(data)
    	}).then(function(res) {
    		return res.json();
  		}).then((data)=>{
  			if(data['insercion']=="Exito"){
  				alert("Usuario agregado");
  			}else{
  				alert("Error en la inserción");
  			}
  		});
	}
}

var idActualizarUsuario;
function modalEditarUsuarioA(i){
	idActualizarUsuario = registrosUsuarios[i][0];
	$('cajaAgUsNombreM').set('value', registrosUsuarios[i][1]);
	if(registrosUsuarios[i][1].toLowerCase()=="admin") $('cajaAgUsNombreM').disabled = true;
	else $('cajaAgUsNombreM').disabled = false;
	$('cajaAgUsContraM').set('value', registrosUsuarios[i][2]);
	modalEditarUsuario.toggle();
}

function tablaUsuarios(){
	registrosUsuarios = new Array();
  	const promesa = new Promise(function(completado, error){
		fetch("http://"+dominio+"/controladores/consultaUsuarios.php", {
    		method: "GET", 
    		headers: {
      			"Content-Type": "application/json"
    	}}).then((res) => {
    		return res.json()
   		}).then((data)=>{
   			respuesta = data;
   			completado("1");
   			return data;
   		}).catch((e) => console.error(e));
		}).then(
			function(value){
				if(value=="1"){
					for(var i=0; i<respuesta.length; i++){
						var registro = new Array();
						registro.push(respuesta[i]["id"]);
						registro.push(respuesta[i]["nombreUsuario"]);
						registro.push(respuesta[i]["contrasena"]);
						registrosUsuarios.push(registro);
					}
					if(registrosUsuarios.length==1){
						$('contenedorVerFotografos').set('HTML', '<div style="text-align: center; margin-top: 10%; font-size: 133%;">No hay usuarios registrados...</div>');
					}else{
						var cadenaTabla = "";
						cadenaTabla = cadenaTabla + '<table class="table"><thead><tr><th scope="col">ID</th><th scope="col">Nombre</th><th scope="col">Contraseña</th><th scope="col">Opciones</th></tr></thead><tbody>';
						for(var i=0; i<registrosUsuarios.length; i++){
							if(registrosUsuarios[i][1]!="admin")
								cadenaTabla = cadenaTabla + '<tr><th scope="row">'+registrosUsuarios[i][0]+'</th><td>'+registrosUsuarios[i][1]+'</td><td>'+registrosUsuarios[i][2]+'</td><td class="tdopciones"><img src="img/editar.png" onclick="modalEditarUsuarioA('+i+')"><img src="img/borrar.png" onclick="modalEliminar(\''+registrosUsuarios[i][0]+'\', \'usuarios\')"></td></tr>';
							else
								cadenaTabla = cadenaTabla + '<tr><th scope="row">'+registrosUsuarios[i][0]+'</th><td>'+registrosUsuarios[i][1]+'</td><td>'+registrosUsuarios[i][2]+'</td><td class="tdopciones"><img src="img/editar.png" onclick="modalEditarUsuarioA('+i+')"></td></tr>';
						}
						$('contenedorVerUsuarios').set('HTML', cadenaTabla + '</tbody></table>');
					}
				}
			}
		);
}

function editarUsuario(){
	var banderaValidacion = true;
	if($('cajaAgUsNombreM').get('value').toString().length<4 || $('cajaAgUsNombreM').get('value').toString().length>30){
		alert("La longitud del nombre no es la adecuada (4-30 caracteres).\nVuelva a intentarlo.");
		banderaValidacion = false;
	}
	if($('cajaAgUsContraM').get('value').toString().length<8 || $('cajaAgUsContraM').get('value').toString().length>30){
		alert("La longitud de la contraseña no es la adecuada. (8-30 caracteres)\nVuelva a intentarlo.");
		banderaValidacion = false;
	}
	if(banderaValidacion){
		var data = {
			"id": idActualizarUsuario,
			"nombreUsuario": $('cajaAgUsNombreM').get('value').toString(),
			"contrasena": $('cajaAgUsContraM').get('value').toString()
		}
		fetch("http://"+dominio+"/controladores/actualizarUsuario.php", {
        	method: "POST",
        	headers: {
          	"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        	},
        	body: JSON.stringify(data)
    	}).then(function(res) {
    		return res.json();
  		}).then((data)=>{
  			if(data['insercion']=="Exito"){
  				alert("Usuario editado correctamente");
  				tablaUsuarios();
  				modalEditarUsuario.hide();
  			}else{
  				alert("Error");
  			}
  		});
	}
}