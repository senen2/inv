/**
 * @author botpi
 */

// ver ----------------------------------------

function MovimientosI(fecha, periodo, funcionret)
{
	var f = $.datepicker.formatDate("yy-mm-dd", fecha);
	var p ="," + IDlector + ",'" + f + "','" + periodo + "'";
	sendGet(p, 'MovimientosI', funcionret); 
}

function MovimientosDetalleI(fecha, periodo, IDproducto, funcionret)
{
	var f = $.datepicker.formatDate("yy-mm-dd", fecha);
	var p ="," + IDlector + ",'" + f + "','" + periodo + "'," + IDproducto;
	sendGet(p, 'MovimientosDetalleI', funcionret); 
}

function LeeProductoI(IDproducto, funcionret)
{
	var p ="," + IDlector + ",'" + IDproducto + "'";
	sendGet(p, 'LeeProductoI', funcionret); 
}

// agregar ----------------------------------

function GrabaMovimientoI(concepto, cb, cantidad, precioc, preciov, funcionret)
{
	var p ="," + IDlector + ",'" + concepto + "','" + cb + "'," + cantidad + "," + precioc +"," + preciov;
	sendGet(p, 'GrabaMovimientoI', funcionret); 
}

function AgregaProductoI(cb, nombre, cantidad, precioc, preciov, funcionret)
{
	var p ="," + IDlector + ",'" + cb + "','" + nombre + "'," + cantidad +"," + precioc +"," + preciov;
	sendGet(p, 'AgregaProductoI', funcionret); 
}

// modificar -------------------------------

function PoneModoI(modo, funcionret)
{
	var p ="," + IDlector + ",'" + modo + "'";
	sendGet(p, 'PoneModoI', funcionret); 
}

function ModificaProductoI(cb, nombre, precioc, preciov, funcionret)
{
	var p ="," + IDlector + ",'" + cb + "','" + nombre +"'," + precioc +"," + preciov;
	sendGet(p, 'ModificaProductoI', funcionret); 
}

function EliminaMovimientoI(ID, funcionret)
{
	var p ="," + ID;
	sendGet(p, 'EliminaMovimientoI', funcionret); 
}

// buscar ------------------------------

function BuscaLecturaI(funcionret)
{
	var p ="," + IDlector;
	sendGet(p, 'BuscaLecturaI', funcionret); 
}

function ReadLikesI(ventrada, funcionret)
{
	var p ="," + IDlector + ",'" + ventrada + "'";
	sendGet(p, 'ReadLikesI', funcionret); 
}

// index ------------------------------

function Login(funcionret)
{
	sendGet('', 'Login', funcionret); 
}

function CreaUsuarioI(nombre, modo, lang, funcionret)
{
	var p = ",'" + nombre + "','" + modo + "','" + lang + "'";
	sendGet(p, 'CreaUsuarioI', funcionret); 
}

// genericos ----------------------

function nada() {}

function sendPost(datos, funcionh, funcionret)
{
	var enc = encabezado.split("'").join('').split(',');
	datos.append('email', enc[0]);
	datos.append('clave', enc[1]);
	datos.append('pagina', pagina);

	var xhr = new XMLHttpRequest();
	xhr.open("POST", 'http://' + servidor + '/functionh/' + funcionh, true);

	xhr.onreadystatechange = function() {
	    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
	        funcionret(); // this.response or this.responseText
	    }
	}
	xhr.send(datos);	
}

function sendGet(params, funcion, funcionret)
{
	$.ajax({
		url: "http://" + servidor + "/function/" + funcion + "(" + encabezado + params + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcionret(response);
		}
	});	
}
