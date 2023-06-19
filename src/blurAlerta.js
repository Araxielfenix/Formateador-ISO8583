export function textoAlerta(tipo) {
	var time = 2000;
	// Use switch case to handle multiple events from same element.
	switch (tipo) {
		case "copiar":
			if (document.getElementById("iso").value != "") {
				document.getElementById("textoAlerta").innerHTML =
					"Copiado al portapapeles";
			}
			break;
		case "analizarButton":
			if (document.getElementById("iso").value == "") {
				document.getElementById("textoAlerta").innerHTML =
					"No se ha ingresado un mensaje ISO";
			} else if (document.getElementById("iso").value.length <= 350) {
				time = 3600;
				document.getElementById("textoAlerta").innerHTML =
					"No es posible analizar el mensaje ISO debido a que no cumple con el formato requerido.";
			} else {
				console.log(document.getElementById("textAreaIso").value.length);
			}
			break;
	}
	alerta(time);
}

function alerta(time) {
	blurFields();
	//document.getElementById("analizarButton").classList.add("invisible");
	document.getElementById("divAlerta").classList.remove("hidden");
	document.getElementById("divAlerta").classList.add("grid");
	setTimeout(function () {
		document.getElementById("divAlerta").classList.remove("grid");
		document.getElementById("divAlerta").classList.add("hidden");
		//document.getElementById("analizarButton").classList.remove("invisible");
		unblurFields();
	}, time);
}

function blurFields() {
	document.getElementById("navBar").classList.add("blur-sm");
	document.getElementById("iso").classList.add("blur-sm");
	document.getElementById("opciones").classList.add("blur-sm");
	document.getElementById("isoModificado").classList.add("blur-sm");
	document.getElementById("tabs").classList.add("blur-sm");
	document.getElementById("divInputs").classList.add("blur-sm");
}

function unblurFields() {
	document.getElementById("navBar").classList.remove("blur-sm");
	document.getElementById("iso").classList.remove("blur-sm");
	document.getElementById("opciones").classList.remove("blur-sm");
	document.getElementById("isoModificado").classList.remove("blur-sm");
	document.getElementById("tabs").classList.remove("blur-sm");
	document.getElementById("divInputs").classList.remove("blur-sm");
}
