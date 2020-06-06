/**
 * @author botpi
 */

function inicioEntradas(modo)
{
	// encabezado = getCookie("encabezado");
	encabezado = localStorage.getItem("encabezado");
	IDlector = 1;
	if (encabezado==null || encabezado=="")
		encabezado="'',''";
	leeServidor();

	gtimer = 0;
	if (modo=='L')
		pideLectura();		
	else
		pideTexto();
}

// toma producto por el lector

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

// toma producto por el teclado

function pideTexto()
{
	$("#aviso").show();
	$("#formulario").hide();
	$("#tags").val("");
	$("#tags").focus();
	$('#posibles tbody').empty("");
}

function dibujaPosibles(posibles)
{
	var titulos = [];
	var userLang = navigator.language || navigator.userLanguage; 
	if (userLang.indexOf("es") >= 0) {
	    titulos.push({"titulo":"", "ancho":400, "alinea":"left", "campo":"nombre"});
	}
	else {
	    titulos.push({"titulo":"", "ancho":400, "alinea":"left", "campo":"nombre"});
	}
	
	var datos = {};
	datos["titulos"] = titulos;
	datos["datos"] = posibles;
	datos["totales"] = [];
	
	dibujaTabla(datos, "posibles", "posibles", "tomaOpcion");
}

function tomaOpcion(ID)
{
	LeeProductoI(ID, dibujaFormulario);
}

// ambos -----------

function dibujaFormulario(datos)
{
	if (gtimer) {
		clearTimeout(gtimer);
		gtimer = 0;
	}
	
	$("#formulario").show();
	$("#aviso").hide();
	$("#nombre").val(datos['nombre']);
	$("#cb").val(datos['cb']);
	$("#precioc").val(datos['precioc']);
	$("#preciov").val(datos['preciov']);	
	$("#cantidad").val(datos['cantidad']);
	$("#cantidad").focus()
	$("#cantidad").select()
}

function grabar(funcion)
{
	GrabaMovimientoI('e', $("#cb").val(), $("#cantidad").val(), $("#precioc").val(), $("#preciov").val(), funcion);
}

function cerrar()
{
	window.location.replace("mov.html");
}