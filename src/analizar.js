import { textoAlerta } from "./blurAlerta";
import { selectedTab } from "./showInputs";
import { idNumber } from "./showInputs";

// Crear objeto para almacenar los datos de cada categoría
export const mensajeISO = {
	informacionTransaccion: {},
	detallesCompra: {},
	detallesComercio: {},
	tokensYCampos: {},
};

export function obtenerISO() {
	if (
		document.getElementById("iso").value != "" &&
		document.getElementById("iso").value.length > 200
	) {
		const isoMsg = document.getElementById("iso").value;
		analizarISO(segmentarIso(isoMsg), isoMsg);
		document.getElementById("modificar").classList.remove("hidden");
		document.getElementById("tabs").classList.remove("hidden");
		document.getElementById("nota").classList.remove("hidden");
		document.getElementById("nota").classList.add("animate-bounce");
		//Espera un segundo y elimina la clase "animate-bounce" de la nota.
		setTimeout(() => {
			document.getElementById("nota").classList.remove("animate-bounce");
		}, 1500);
		document.getElementById("notaIcon").classList.add("animate-pulse");
	} else {
		textoAlerta("analizarButton");
	}
}

function segmentarIso(isoMsg) {
	//Look for the word "ISO" in the message and get the header up to that point.
	const isoHeader = isoMsg.substring(
		isoMsg.indexOf("ISO") + 3,
		isoMsg.indexOf("ISO") + 12
	);

	//First 2 positions of the header are the product indicator.
	const productIndicator = isoHeader.substring(0, 2);
	//Next 2 positions of the header are the release number.
	const releaseNumber = isoHeader.substring(2, 4);
	//Next 3 positions of the header are the status.
	const status = isoHeader.substring(4, 7);
	//Next 1 position of the header is the origen code.
	const origenCode = isoHeader.substring(7, 8);
	//Next 2 positions of the header are the response code.
	const responseCode = isoHeader.substring(8, 10);

	//Get the message type, which is 4 positions long and its 4 positions right after the header.
	const msgType = isoMsg.substring(
		isoMsg.indexOf("ISO") + 12,
		isoMsg.indexOf("ISO") + 16
	);

	//get the bitmap, which is 16 positions long and its 4 positions right after the header.
	const bitmap = isoMsg.substring(
		isoMsg.indexOf("ISO") + 16,
		isoMsg.indexOf("ISO") + 32
	);

	// Convierte cada caracter del bitmap a binario y lo guarda en la variable "bitmapBin" en formato de 4 bits.
	const bitmapBin = [];
	for (let i = 0; i < bitmap.length; i++) {
		bitmapBin[i] = ("0000" + parseInt(bitmap[i], 16).toString(2)).substr(-4);
	}

	//return the variables in an object.
	return {
		isoHeader,
		productIndicator,
		releaseNumber,
		status,
		origenCode,
		responseCode,
		msgType,
		bitmap,
		bitmapBin,
	};
}

function analizarISO(datos, isoMsg) {
	let posicion = 32;
	const bitmapSecBin = [];
	//Campo 1 del bitmapBin es el primer bit del bitmap[0] y asi sucesivamente.
	//Si el bit es 1, entonces el campo 1 esta presente en el mensaje.
	if (datos.bitmapBin[0].charAt(0) == 1 && datos.msgType.substr(0, 2) == "04") {
		//Obtiene el campo 1 del mensaje, este campo es de 16 caracteres y es el bitmap secundario, se encuentra justo despues del bitmap primario.
		const bitmapSecundario = isoMsg.substring(
			isoMsg.indexOf("ISO") + posicion,
			isoMsg.indexOf("ISO") + posicion + 16
		);
		mensajeISO.informacionTransaccion.bitmapSecundario = bitmapSecundario;
		// Convierte cada caracter del bitmap a binario y lo guarda en la variable "bitmapBin" en formato de 4 bits.
		for (let i = 0; i < bitmapSecundario.length; i++) {
			bitmapSecBin[i] = (
				"0000" + parseInt(bitmapSecundario[i], 16).toString(2)
			).substr(-4);
		}
		posicion += 16;
		mensajeISO.informacionTransaccion.bitmapSecundario = bitmapSecundario;
		mensajeISO.informacionTransaccion.bitmapSecBin = bitmapSecBin;
	}
	//El campo 2 no es requerido, pero es importante recorsar la posicion del bit en el bitmap.
	//El campo 3 es el processing code, esta presente en todos los mensajes excepto en los que el msgType es 0800 y 0810.
	if (datos.bitmapBin[0].charAt(2) == 1 && datos.msgType.substr(0, 2) != "08") {
		//Obtiene el campo 3 del mensaje, este campo es de 16 caracteres y se encuentra justo despues del bitmpa primary o secundario.
		const processingCode = isoMsg.substring(
			isoMsg.indexOf("ISO") + posicion,
			isoMsg.indexOf("ISO") + posicion + 6
		);
		mensajeISO.informacionTransaccion.processingCode = processingCode;
		posicion += 6;
	}
	//El campo 4 es el transacction amount, esta presente en todos los mensajes excepto en los que el msgType es 0800 y 0810.
	if (datos.bitmapBin[0].charAt(3) == 1 && datos.msgType.substr(0, 2) != "08") {
		//Obtiene el campo 4 del mensaje, este campo es de 12 caracteres y se encuentra justo despues del processing code.
		const transacctionAmount = isoMsg.substring(
			isoMsg.indexOf("ISO") + posicion,
			isoMsg.indexOf("ISO") + posicion + 12
		);
		mensajeISO.informacionTransaccion.transacctionAmount = transacctionAmount;
		posicion += 12;
	}
	//El campo 5 es el settlement amount, esta presente en los mensajes 0200, 0220, 0420 y 0421.
	if (datos.bitmapBin[1].charAt(0) == 1 && datos.msgType.substr(0, 2) != "08") {
		//Obtiene el campo 5 del mensaje, este campo es de 12 caracteres y se encuentra justo despues del transacction amount.
		const settlementAmount = isoMsg.substring(
			isoMsg.indexOf("ISO") + posicion,
			isoMsg.indexOf("ISO") + posicion + 12
		);
		mensajeISO.informacionTransaccion.settlementAmount = settlementAmount;
		posicion += 12;
	}
	//El campo 6 no es requerido, pero es importante recorsar la posicion del bit en el bitmap.
	//El campo 7 es el transmission date and time, esta presente en todos los mensajes.
	if (datos.bitmapBin[1].charAt(2) == 1) {
		//Obtiene el campo 7 del mensaje, este campo es de 10 caracteres y se encuentra justo despues del settlement amount.
		const transmissionDateAndTime = isoMsg.substring(
			isoMsg.indexOf("ISO") + posicion,
			isoMsg.indexOf("ISO") + posicion + 10
		);
		mensajeISO.informacionTransaccion.transmissionDateAndTime =
			transmissionDateAndTime;
		posicion += 10;
	}
	//Los campos 8 y 9 no son requeridos, pero es importante recorsar la posicion del bit en el bitmap.
	//El campo 10 es el conversion rate, esta presente en los mensajes 0200, 0220, 0420 y 0421.
	if (datos.bitmapBin[2].charAt(1) == 1 && datos.msgType.substr(0, 2) != "08") {
		//Obtiene el campo 10 del mensaje, este campo es de 8 caracteres y se encuentra justo despues del transmission date and time.
		const conversionRate = isoMsg.substring(
			isoMsg.indexOf("ISO") + posicion,
			isoMsg.indexOf("ISO") + posicion + 8
		);
		mensajeISO.informacionTransaccion.conversionRate = conversionRate;
		posicion += 8;
	}
	//El campo 11 es el system trace audit number, esta presente en todos los mensajes.
	if (datos.bitmapBin[2].charAt(2) == 1) {
		//Obtiene el campo 11 del mensaje, este campo es de 6 caracteres y se encuentra justo despues del conversion rate.
		const systemTraceAuditNumber = isoMsg.substring(
			isoMsg.indexOf("ISO") + posicion,
			isoMsg.indexOf("ISO") + posicion + 6
		);
		mensajeISO.informacionTransaccion.systemTraceAuditNumber =
			systemTraceAuditNumber;
		posicion += 6;
	}
	//El campo 12 es el local transaction time, esta presente en todos los mensajes excepto en los que el msgType es 0230, 0430, 0800 y 0810.
	if (
		datos.bitmapBin[2].charAt(3) == 1 &&
		datos.msgType.substr(2, datos.msgType.length) != "30" &&
		!datos.msgType.substr(0, 2) != "08"
	) {
		//Obtiene el campo 12 del mensaje, este campo es de 6 caracteres y se encuentra justo despues del system trace audit number.
		const localTransactionTime = isoMsg.substring(
			isoMsg.indexOf("ISO") + posicion,
			isoMsg.indexOf("ISO") + posicion + 6
		);
		mensajeISO.detallesCompra.horaLocal = localTransactionTime;
		posicion += 6;
	}
	//El campo 13 es el local transaction date, esta presente en todos los mensajes excepto en los que el msgType es 0230, 0430, 0800 y 0810.
	if (
		datos.bitmapBin[3].charAt(0) == 1 &&
		datos.msgType.substr(2, datos.msgType.length) != "30" &&
		!datos.msgType.substr(0, 2) != "08"
	) {
		//Obtiene el campo 13 del mensaje, este campo es de 4 caracteres y se encuentra justo despues del local transaction time.
		const localTransactionDate = isoMsg.substring(
			isoMsg.indexOf("ISO") + posicion,
			isoMsg.indexOf("ISO") + posicion + 4
		);
		mensajeISO.detallesCompra.fechaLocal = localTransactionDate;
		posicion += 4;
	}
	//El campo 14 no es requerido, pero es importante recorsar la posicion del bit en el bitmap.
	//El campo 15 es el settlement date, esta presente en los mensajes 0210, 0420, 0800 y 0810.
	if (
		datos.bitmapBin[3].charAt(2) == 1 &&
		datos.msgType.substr(0, 2) != "02" &&
		datos.msgType.substr(0, 2) != "08"
	) {
		//Obtiene el campo 15 del mensaje, este campo es de 4 caracteres y se encuentra justo despues del local transaction date.
		const settlementDate = isoMsg.substring(
			isoMsg.indexOf("ISO") + posicion,
			isoMsg.indexOf("ISO") + posicion + 4
		);
		mensajeISO.detallesCompra.settlementDate = settlementDate;
		posicion += 4;
	}
	//El campo 16 no es requerido, pero es importante recorsar la posicion del bit en el bitmap.
	//El campo 17 es el capture date, esta presente en los mensajes 0200, 0210, 0220, 0420 y 0421.
	if (
		datos.bitmapBin[4].charAt(0) == 1 &&
		datos.msgType.substr(0, 2) != "08" &&
		datos.msgType != "0230"
	) {
		//Obtiene el campo 17 del mensaje, este campo es de 4 caracteres y se encuentra justo despues del settlement date.
		const captureDate = isoMsg.substring(
			isoMsg.indexOf("ISO") + posicion,
			isoMsg.indexOf("ISO") + posicion + 4
		);
		mensajeISO.detallesCompra.fechaCaptura = captureDate;
		posicion += 4;
	}
	//El campo 18 es el merchant type, esta presente en los mensajes 0200 y 0220.
	if (
		(datos.bitmapBin[4].charAt(1) == 1 && datos.msgType == "0200") ||
		datos.msgType == "0220"
	) {
		//Obtiene el campo 18 del mensaje, este campo es de 4 caracteres y se encuentra justo despues del capture date.
		const merchantType = isoMsg.substring(
			isoMsg.indexOf("ISO") + posicion,
			isoMsg.indexOf("ISO") + posicion + 4
		);
		mensajeISO.detallesComercio.giro = merchantType;
		posicion += 4;
	}
	//El campo 19 no es requerido, pero es importante recorsar la posicion del bit en el bitmap (datos.bitmapBin[4].charAt(2)).
	//El campo 20 no es requerido, pero es importante recorsar la posicion del bit en el bitmap (datos.bitmapBin[4].charAt(3)).
	//El campo 21 no es requerido, pero es importante recorsar la posicion del bit en el bitmap (datos.bitmapBin[5].charAt(0)).
	//el campo 22 es el Entry mode, esta presente en los mensajes 0200, 0210, 0220 y 0230.
	if (
		datos.bitmapBin[5].charAt(1) == 1 &&
		datos.msgType.substr(0, 2) != "08" &&
		datos.msgType.substr(0, 2) != "04"
	) {
		//Obtiene el campo 22 del mensaje, este campo es de 3 caracteres y se encuentra justo despues del capture date.
		const entryMode = isoMsg.substring(
			isoMsg.indexOf("ISO") + posicion,
			isoMsg.indexOf("ISO") + posicion + 3
		);
		mensajeISO.detallesCompra.entryMode = entryMode;
		posicion += 3;
	}
	//El campo 23 no es requerido, pero es importante recorsar la posicion del bit en el bitmap (datos.bitmapBin[5].charAt(2)).
	//El campo 24 no es requerido, pero es importante recorsar la posicion del bit en el bitmap (datos.bitmapBin[5].charAt(3)).
	//El campo 25 es el point of service condition code, esta presente en los mensajes 0200 y 0210.
	if (
		(datos.bitmapBin[6].charAt(0) == 1 && datos.msgType == "0200") ||
		datos.msgType == "0210"
	) {
		//Obtiene el campo 25 del mensaje, este campo es de 2 caracteres y se encuentra justo despues del entry mode.
		const pointOfServiceConditionCode = isoMsg.substring(
			isoMsg.indexOf("ISO") + posicion,
			isoMsg.indexOf("ISO") + posicion + 2
		);
		mensajeISO.detallesCompra.puntoDeServicio = pointOfServiceConditionCode;
		posicion += 2;
	}
	//El campo 26 no es requerido, pero es importante recorsar la posicion del bit en el bitmap (datos.bitmapBin[6].charAt(1)).
	//El campo 27 no es requerido, pero es importante recorsar la posicion del bit en el bitmap (datos.bitmapBin[6].charAt(2)).
	//El campo 28 no es requerido, pero es importante recorsar la posicion del bit en el bitmap (datos.bitmapBin[6].charAt(3)).
	//El campo 29 no es requerido, pero es importante recorsar la posicion del bit en el bitmap (datos.bitmapBin[7].charAt(0)).
	//El campo 30 no es requerido, pero es importante recorsar la posicion del bit en el bitmap (datos.bitmapBin[7].charAt(1)).
	//El campo 31 no es requerido, pero es importante recorsar la posicion del bit en el bitmap (datos.bitmapBin[7].charAt(2)).
	//El campo 32 es el Acquiring institution identification code, esta presente en los mensajes 0200, 0210, 0220, 0230, 0420 y 0421.
	if (datos.bitmapBin[7].charAt(3) == 1 && datos.msgType.substr(0, 2) != "08") {
		//Obtiene el campo 32 del mensaje, este campo es de 11 caracteres y se encuentra justo despues del point of service condition code.
		const acquiringInstitutionIdentificationCode = isoMsg.substring(
			isoMsg.indexOf("ISO") + posicion,
			isoMsg.indexOf("ISO") + posicion + 8
		);
		mensajeISO.detallesComercio.adquiriente =
			acquiringInstitutionIdentificationCode;
		posicion += 8;
	}
	//El campo 33 no es requerido, pero es importante recorsar la posicion del bit en el bitmap (datos.bitmapBin[8].charAt(0)).
	//El campo 34 no es requerido, pero es importante recorsar la posicion del bit en el bitmap (datos.bitmapBin[8].charAt(1)).
	//El campo 35 es el track 2 data, esta presente en los mensajes 0200, 0210, 0220, 0230, 0400, 0410, 0420 y 0421.
	if (datos.bitmapBin[8].charAt(2) == 1 && datos.msgType.substr(0, 2) != "08") {
		//Obtiene el campo 35 del mensaje, este campo es de 23 caracteres y se encuentra justo despues del acquiring institution identification code.
		const track2Data = isoMsg.substring(
			isoMsg.indexOf("ISO") + posicion,
			isoMsg.indexOf("ISO") + posicion + 23
		);
		mensajeISO.detallesCompra.datosTarjeta = track2Data;
		posicion += 23;
	}
	//El campo 36 no es requerido, pero es importante recorsar la posicion del bit en el bitmap (datos.bitmapBin[8].charAt(3)).
	//El campo 37 es el retrieval reference number, esta presente en los mensajes 0200, 0210, 0220, 0230, 0400, 0410, 0420 y 0421.
	if (datos.bitmapBin[9].charAt(0) == 1 && datos.msgType.substr(0, 2) != "08") {
		//Obtiene el campo 37 del mensaje, este campo es de 12 caracteres y se encuentra justo despues del track 2 data.
		const retrievalReferenceNumber = isoMsg.substring(
			isoMsg.indexOf("ISO") + posicion,
			isoMsg.indexOf("ISO") + posicion + 12
		);
		mensajeISO.detallesCompra.folio = retrievalReferenceNumber;
		posicion += 12;
	}
	//El campo 38 es el authorization identification response, esta presente en los mensajes 0210, 0220, 0420 y 0421.
	if (
		(datos.bitmapBin[9].charAt(1) == 1 && datos.msgType == "0210") ||
		datos.msgType == "0220" ||
		datos.msgType == "0420" ||
		datos.msgType == "0421"
	) {
		//Obtiene el campo 38 del mensaje, este campo es de 6 caracteres y se encuentra justo despues del retrieval reference number.
		const authorizationIdentificationResponse = isoMsg.substring(
			isoMsg.indexOf("ISO") + posicion,
			isoMsg.indexOf("ISO") + posicion + 6
		);
		mensajeISO.detallesCompra.authorizationIdentificationResponse =
			authorizationIdentificationResponse;
		posicion += 6;
	}
	//El campo 39 es el response code, esta presente en los mensajes 0210, 0220, 0230, 0420, 0421, 0430 y 0810.
	if (
		datos.bitmapBin[9].charAt(2) == 1 &&
		datos.msgType != "0200" &&
		datos.msgType != "0800"
	) {
		//Obtiene el campo 39 del mensaje, este campo es de 2 caracteres y se encuentra justo despues del authorization identification response.
		const responseCode = isoMsg.substring(
			isoMsg.indexOf("ISO") + posicion,
			isoMsg.indexOf("ISO") + posicion + 2
		);
		mensajeISO.informacionTransaccion.codigoDeRespuesta = responseCode;
		posicion += 2;
	}
	//El campo 40 no es requerido, pero es importante recorsar la posicion del bit en el bitmap (datos.bitmapBin[9].charAt(3)).
	//El campo 41 es el card acceptor terminal identification, esta presente en los mensajes 0200, 0210, 0220, 0230, 0400, 0410, 0420 y 0421.
	if (
		datos.bitmapBin[10].charAt(0) == 1 &&
		datos.msgType.substr(0, 2) != "08"
	) {
		//Obtiene el campo 41 del mensaje, este campo es de 8 caracteres y se encuentra justo despues del response code.
		const cardAcceptorTerminalIdentification = isoMsg.substring(
			isoMsg.indexOf("ISO") + posicion,
			isoMsg.indexOf("ISO") + posicion + 8
		);
		mensajeISO.detallesCompra.terminal = cardAcceptorTerminalIdentification;
		posicion += 8;
	}
	//El campo 42 no es requerido, pero es importante recorsar la posicion del bit en el bitmap (datos.bitmapBin[10].charAt(1)).
	//El campo 43 es el card acceptor identification, esta presente en los mensajes 0200, 0220, 0420 y 0421.
	if (
		(datos.bitmapBin[10].charAt(2) == 1 &&
			datos.msgType.substr(1, 2) == "20") ||
		datos.msgType.substr(1, 2) == "22" ||
		datos.msgType.substr(1, 1) == "4"
	) {
		//Obtiene el campo 43 del mensaje, este campo es de 48 caracteres y se encuentra justo despues del card acceptor terminal identification.
		const cardAcceptorIdentification = isoMsg.substring(
			isoMsg.indexOf("ISO") + posicion,
			isoMsg.indexOf("ISO") + posicion + 48
		);
		mensajeISO.detallesComercio.comercio = cardAcceptorIdentification;
		posicion += 48;
	}
	//El campo 44 no es requerido, pero es importante recorsar la posicion del bit en el bitmap (datos.bitmapBin[10].charAt(3)).
	//El campo 45 no es requerido, pero es importante recorsar la posicion del bit en el bitmap (datos.bitmapBin[11].charAt(0)).
	//El campo 46 no es requerido, pero es importante recorsar la posicion del bit en el bitmap (datos.bitmapBin[11].charAt(1)).
	//El campo 47 no es requerido, pero es importante recorsar la posicion del bit en el bitmap (datos.bitmapBin[11].charAt(2)).
	//El campo 48 es el numero de afiliación, esta presente en los mensajes 0200, 0220, 0230, 0420, 0421, 0800 y 0810.
	if (
		(datos.bitmapBin[11].charAt(3) == 1 &&
			datos.msgType.substr(0, 2) != "04") ||
		datos.msgType.substr(0, 2) != "08"
	) {
		//Obtiene el campo 48 del mensaje, este campo es de 18 caracteres y se encuentra justo despues del track 1 data.
		const numeroAfiliacion = isoMsg.substring(
			isoMsg.indexOf("ISO") + posicion,
			isoMsg.indexOf("ISO") + posicion + 30
		);
		mensajeISO.detallesComercio.numeroDeComercio = numeroAfiliacion;
		posicion += 30;
	}
	//El campo 49 es el currency code transaction, esta presente en los mensajes 0200, 0210, 0220, 0230, 0420, 0421 y 0430.
	if (
		datos.bitmapBin[12].charAt(0) == 1 &&
		datos.msgType.substr(0, 2) != "08"
	) {
		//Obtiene el campo 49 del mensaje, este campo es de 3 caracteres y se encuentra justo despues del additional data.
		const currencyCodeTransaction = isoMsg.substring(
			isoMsg.indexOf("ISO") + posicion,
			isoMsg.indexOf("ISO") + posicion + 3
		);
		mensajeISO.detallesCompra.codigoMoneda = currencyCodeTransaction;
		posicion += 3;
	}
	//El campo 50 es el currency code settlement, esta presente en los mensajes 0200, 0220, 0420 y 0421.
	if (
		(datos.bitmapBin[12].charAt(1) == 1 &&
			datos.msgType.substr(1, 2) == "20") ||
		datos.msgType.substr(1, 2) == "22" ||
		datos.msgType.substr(1, 1) == "4"
	) {
		//Obtiene el campo 50 del mensaje, este campo es de 3 caracteres y se encuentra justo despues del currency code transaction.
		const currencyCodeSettlement = isoMsg.substring(
			isoMsg.indexOf("ISO") + posicion,
			isoMsg.indexOf("ISO") + posicion + 3
		);
		mensajeISO.detallesCompra.codigoMonedaMonto = currencyCodeSettlement;
		posicion += 3;
	}
	//El campo 51 no es requerido, pero es importante recorsar la posicion del bit en el bitmap (datos.bitmapBin[12].charAt(2)).
	//El campo 52 es el personal identification number data, esta presente en los mensajes 0200.
	if (datos.bitmapBin[12].charAt(3) == 1 && datos.msgType == "0200") {
		//Obtiene el campo 52 del mensaje, este campo es de 16 caracteres y se encuentra justo despues del currency code settlement.
		const personalIdentificationNumberData = isoMsg.substring(
			isoMsg.indexOf("ISO") + posicion,
			isoMsg.indexOf("ISO") + posicion + 16
		);
		mensajeISO.detallesTarjeta.personalIdentificationNumberData =
			personalIdentificationNumberData;
		posicion += 16;
	}
	//El campo 53 es el security related control information, esta presente en los mensajes 0200 y 0220.
	if (
		(datos.bitmapBin[13].charAt(0) == 1 && datos.msgType == "0200") ||
		datos.msgType == "0220"
	) {
		//Obtiene el campo 53 del mensaje, este campo es de 16 caracteres y se encuentra justo despues del personal identification number data.
		const securityRelatedControlInformation = isoMsg.substring(
			isoMsg.indexOf("ISO") + posicion,
			isoMsg.indexOf("ISO") + posicion + 16
		);
		mensajeISO.detallesTarjeta.securityRelatedControlInformation =
			securityRelatedControlInformation;
		posicion += 16;
	}
	//El campo 54 es el additional amounts, esta presente en los mensajes 0200, 0210, 0220, 0230, 0420, 0421 y 0430.
	if (
		datos.bitmapBin[13].charAt(1) == 1 &&
		datos.msgType.substr(0, 2) != "08"
	) {
		//Obtiene el campo 54 del mensaje, este campo es de 12 caracteres y se encuentra justo despues del security related control information.
		const additionalAmounts = isoMsg.substring(
			isoMsg.indexOf("ISO") + posicion,
			isoMsg.indexOf("ISO") + posicion + 12
		);
		mensajeISO.detallesCompra.additionalAmounts = additionalAmounts;
		posicion += 12;
	}
	//El campo 55 no es requerido, pero es importante recorsar la posicion del bit en el bitmap (datos.bitmapBin[13].charAt(2)).
	//El campo 56 no es requerido, pero es importante recorsar la posicion del bit en el bitmap (datos.bitmapBin[13].charAt(3)).
	//El campo 57 no es requerido, pero es importante recorsar la posicion del bit en el bitmap (datos.bitmapBin[14].charAt(0)).
	//El campo 58 es el redención de puntos, esta presente en los mensajes 0200 y 0210.
	if (
		(datos.bitmapBin[14].charAt(1) == 1 && datos.msgType == "0200") ||
		datos.msgType == "0210"
	) {
		//Obtiene el campo 58 del mensaje, este campo es de 12 caracteres y se encuentra justo despues del additional amounts.
		const redencionPuntos = isoMsg.substring(
			isoMsg.indexOf("ISO") + posicion,
			isoMsg.indexOf("ISO") + posicion + 12
		);
		posicion += 12;
		mensajeISO.detallesCompra.redencionPuntos = redencionPuntos;
	}
	//El campo 59 no es requerido, pero es importante recorsar la posicion del bit en el bitmap (datos.bitmapBin[14].charAt(2)).
	//El campo 60 es el POS terminal data, esta presente en los mensajes 0200, 0220, 0420 y 0421.
	if (
		(datos.bitmapBin[14].charAt(3) == 1 && datos.msgType == "0200") ||
		datos.msgType == "0220" ||
		datos.msgType.substr(1, 1) == "4"
	) {
		//Obtiene el campo 60 del mensaje, este campo es de 20 caracteres y se encuentra justo despues del redención de puntos.
		const posTerminalData = isoMsg.substring(
			isoMsg.indexOf("ISO") + posicion,
			isoMsg.indexOf("ISO") + posicion + 20
		);
		mensajeISO.detallesCompra.posTerminalData = posTerminalData;
		posicion += 20;
	}
	//El campo 61 es el POS terminal data, esta presente en todos los mensajes exepto en los 0800 y 0810.
	if (
		datos.bitmapBin[15].charAt(0) == 1 &&
		datos.msgType.substr(0, 2) != "08"
	) {
		//Obtiene el campo 61 del mensaje, este campo es de 22 caracteres y se encuentra justo despues del POS terminal data.
		const posCardIssuer = isoMsg.substring(
			isoMsg.indexOf("ISO") + posicion,
			isoMsg.indexOf("ISO") + posicion + 22
		);
		mensajeISO.detallesCompra.posCardIssuer = posCardIssuer;
		posicion += 22;
	}
	//El campo 62 es el codigo postal, esta presente en los mensajes 0200, 0220, 0420 y 0421.
	if (
		(datos.bitmapBin[15].charAt(1) == 1 && datos.msgType == "0200") ||
		datos.msgType == "0220" ||
		datos.msgType.substr(1, 1) == "4"
	) {
		//Obtiene el campo 62 del mensaje, este campo es de 11 caracteres y se encuentra justo despues del POS terminal data.
		const codigoPostal = isoMsg.substring(
			isoMsg.indexOf("ISO") + posicion,
			isoMsg.indexOf("ISO") + posicion + 11
		);
		mensajeISO.detallesComercio.codigoPostal = codigoPostal;
		posicion += 11;
	}
	//El campo 63 es POS additional data, esta presente en los mensajes 0200, 0220 y 0230.
	if (
		datos.bitmapBin[15].charAt(2) == 1 &&
		datos.msgType.substr(0, 2) == "02"
	) {
		//Obtiene el campo 63 del mensaje, este campo es de 11 caracteres y se encuentra justo despues del codigo postal.
		const posAdditionalData = isoMsg.substring(
			isoMsg.indexOf("ISO") + posicion,
			isoMsg.indexOf("ISO") + posicion + 18
		);
		mensajeISO.tokensYCampos.posAdditionalData = posAdditionalData;
	}
	//Se obtiene el tokwn Q1, este campo es de 10 caracteres, se encuentra en la información adicional.
	const tokenQ1Index = isoMsg.indexOf("Q1");
	const tokenQ1 = isoMsg.substring(tokenQ1Index, tokenQ1Index + 12);
	mensajeISO.tokensYCampos.tokenQ1 = tokenQ1;

	//Se obtiene el tokwn Q2, este campo es de 10 caracteres, se encuentra en la información adicional.
	const tokenQ2Index = isoMsg.indexOf("Q2");
	const tokenQ2 = isoMsg.substring(tokenQ2Index, tokenQ2Index + 11);
	mensajeISO.tokensYCampos.tokenQ2 = tokenQ2;

	//Se obtiene el tokwn C0, este campo es de 7 caracteres, se encuentra en la información adicional.
	const tokenC0Index = tokenQ2Index + 11;
	const tokenC0 = isoMsg.substring(tokenC0Index, tokenC0Index + 9);
	mensajeISO.tokensYCampos.tokenC0 = tokenC0;

	//Se obtiene el CVV2, este campo es de 4 caracteres, se encuentra justo despues del token C0.
	const cvv2Index = tokenC0Index + 9;
	const cvv2 = isoMsg.substring(cvv2Index, cvv2Index + 4);
	mensajeISO.detallesCompra.cvv2 = cvv2;

	//Se obtiene el modulo extranjero, este campo es de 3 caracteres, se encuentra justo despues del CVV2.
	const moduloExtranjeroIndex = cvv2Index + 5;
	const moduloExtranjero = isoMsg.substring(
		moduloExtranjeroIndex,
		moduloExtranjeroIndex + 13
	);
	mensajeISO.tokensYCampos.moduloExtranjero = moduloExtranjero;

	//Se obtiene el ECI, este campo es de 1 caracter, se encuentra justo despues del modulo extranjero.
	const eciIndex = moduloExtranjeroIndex + 12;
	const eci = isoMsg.substring(eciIndex, eciIndex + 3);
	mensajeISO.tokensYCampos.eci = eci;

	//Se obtiene el indicador de información adicional, este campo es de 1 caracter, se encuentra justo despues del ECI.
	const indicadorInfoAdicionalIndex = eciIndex + 3;
	const indicadorInfoAdicional = isoMsg.substring(
		indicadorInfoAdicionalIndex,
		indicadorInfoAdicionalIndex + 2
	);
	mensajeISO.tokensYCampos.indicadorInfoAdicional = indicadorInfoAdicional;

	//Se obtiene el CV2, este campo es de 1 caracter, se encuentra justo despues del indicador de información adicional.
	const cv2Index = indicadorInfoAdicionalIndex + 2;
	const cv2 = isoMsg.substring(cv2Index, cv2Index + 2);
	mensajeISO.tokensYCampos.cv2 = cv2;

	//Se obtiene el authentication collector indicator, este campo es de 1 caracter, se encuentra justo despues del CV2.
	const authenticationCollectorIndicatorIndex = cv2Index + 2;
	const authenticationCollectorIndicator = isoMsg.substring(
		authenticationCollectorIndicatorIndex,
		authenticationCollectorIndicatorIndex + 3
	);
	mensajeISO.tokensYCampos.authenticationCollectorIndicator =
		authenticationCollectorIndicator;

	//Se obtiene el token C4, este campo es de 21 caracteres, se encuentra 2 caracteres despues del authentication collector indicator.
	const tokenC4Index = authenticationCollectorIndicatorIndex + 3;
	const tokenC4 = isoMsg.substring(tokenC4Index, tokenC4Index + 22);
	mensajeISO.tokensYCampos.tokenC4 = tokenC4;

	//Se obtiene el token R7, este campo es de 7 caracteres, se encuentra justo despues del token C4.
	const tokenR7Index = tokenC4Index + 22;
	const tokenR7 = isoMsg.substring(tokenR7Index, tokenR7Index + 8);
	mensajeISO.tokensYCampos.tokenR7 = tokenR7;

	selectedTab();

	//simula un click en el boton con id "transaccion".
	document.getElementById("transaccion").click();
}
