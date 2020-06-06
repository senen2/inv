/**
 * @author botpi
 */

function inicioCreaP()
{
	// encabezado = getCookie("encabezado");
	encabezado = localStorage.getItem("encabezado");
	IDlector = 1;
	if (encabezado==null || encabezado=="")
		encabezado="'',''";
	leeServidor();

	gtimer = 0;
	pideLectura();
}

function pideLectura()
{
	$("#aviso").show();
	$("#formulario").hide();
	gtimer = setTimeout(cerrar, 10000);
	PoneModoI('c', revisaLectura);
}

function revisaLectura(datos)
{
	if (datos) {
		dibujaFormulario(datos);
	} else {
		BuscaLecturaI(revisaLectura);
	}
}

function dibujaFormulario(datos)
{
	if (gtimer) {
		clearTimeout(gtimer);
		gtimer = 0;
	}

	if (datos['nombre']=='*') {
		modo = "crear";
		$("#formulario").show();
		$("#aviso").hide();
		$("#titulo").text("Creacion de un Producto");
		$("#nombre").val('');
		$("#cb").val(datos['cb']);
		$("#precioc").val(1);
		$("#preciov").val(1);	
		$("#cantidad").val(1);
		$("#cantidad").attr("disabled", false)	
	}
	else {
		modo = 'editar';
		$("#formulario").show();
		$("#aviso").hide();
		$("#titulo").text("Modificacion de un Producto");
		$("#nombre").val(datos['nombre']);
		$("#cb").val(datos['cb']);
		$("#precioc").val(datos['precioc']);
		$("#preciov").val(datos['preciov']);	
		$("#cantidad").val(datos['cantidad']);
		$("#cantidad").attr("disabled", true) 				
	}
	$("#nombre").focus()
}

function grabar(funcion)
{
	if (modo=='crear') 
		CreaProductoI(
			  $("#cb").val()
			, $("#nombre").val()
			, $("#precioc").val()
			, $("#preciov").val()
			, $("#cantidad").val()
			, funcion);
	else
		ModificaProductoI(
			  $("#cb").val()
			, $("#nombre").val()
			, $("#precioc").val()
			, $("#preciov").val()
			, funcion);
}

function cerrar()
{
	window.location.replace("mov.html");
}
