import { idNumber } from "./showInputs.js";
import { mensajeISO } from "./analizar.js";

export function modificarMensaje() {
	const mensaje = document.getElementById("iso").value;
	console.log(mensaje.substring(18, 18 + 16));
	console.log(mensajeISO);

	//Agrega los primeros 32 caracteres del mensaje original a una variable.
	let mensajeNuevo = mensaje.substring(0, 18 + 16) + ordenarISO(mensajeISO);

	document.getElementById("isoModificado").value = mensajeNuevo;
	document.getElementById("copiar").classList.remove("hidden");
	document.getElementById("switch").classList.remove("hidden");
}

function ordenarISO(mensaje) {
	let iso = Object.values(mensaje.informacionTransaccion).join("");
	iso += Object.values(mensaje.detallesCompra.horaLocal).join("");
	iso += Object.values(mensaje.detallesCompra.fechaLocal).join("");
	iso += Object.values(mensaje.detallesCompra.fechaCaptura).join("");
	iso += Object.values(mensaje.detallesComercio.giro).join("");
	iso += Object.values(mensaje.detallesCompra.entryMode).join("");
	iso += Object.values(mensaje.detallesCompra.puntoDeServicio).join("");
	iso += Object.values(mensaje.detallesComercio.adquiriente).join("");
	iso += Object.values(mensaje.detallesCompra.datosTarjeta).join("");
	iso += Object.values(mensaje.detallesCompra.folio).join("");
	iso += Object.values(mensaje.detallesCompra.terminal).join("");
	iso += Object.values(mensaje.detallesComercio.comercio).join("");
	iso += Object.values(mensaje.detallesComercio.numeroDeComercio).join("");
	iso += Object.values(mensaje.detallesCompra.codigoMonedaMonto).join("");
	iso += Object.values(mensaje.detallesCompra.posTerminalData).join("");
	iso += Object.values(mensaje.detallesCompra.posCardIssuer).join("");
	iso += Object.values(mensaje.detallesComercio.codigoPostal).join("");
	iso += Object.values(mensaje.tokensYCampos.posAdditionalData).join("");
	iso += Object.values(mensaje.tokensYCampos.tokenQ1).join("");
	iso += Object.values(mensaje.tokensYCampos.tokenQ2).join("");
	iso += Object.values(mensaje.tokensYCampos.tokenC0).join("");
	iso += Object.values(mensaje.detallesCompra.cvv2).join("");
	iso += Object.values(mensaje.tokensYCampos.moduloExtranjero).join("");
	iso += Object.values(mensaje.tokensYCampos.eci).join("");
	iso += Object.values(mensaje.tokensYCampos.indicadorInfoAdicional).join("");
	iso += Object.values(mensaje.tokensYCampos.cv2).join("");
	iso += Object.values(
		mensaje.tokensYCampos.authenticationCollectorIndicator
	).join("");
	iso += Object.values(mensaje.tokensYCampos.tokenC4).join("");
	iso += Object.values(mensaje.tokensYCampos.tokenR7).join("");

	return iso;
}
