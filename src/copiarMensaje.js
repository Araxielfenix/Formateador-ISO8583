import { mensajeFormateado } from "./format.js";
import { textoAlerta } from "./blurAlerta.js";

export function copiar() {
	//Si el switch esta desactivado, copia el mensaje del textarea "iso" al portapapeles.
	if (document.getElementById("switchInput").checked == false) {
		navigator.clipboard.writeText(document.getElementById("iso").value);
		console.log("Copiado");
		textoAlerta("copiar");
	}
	//Si el switch esta activado, copia el mensaje formateado al portapapeles.
	else {
		navigator.clipboard.writeText(mensajeFormateado);
		console.log("Copiado");
		textoAlerta("copiar");
	}
}
