import { mensajeFormateado } from "./format.js";
export function copiar() {
	//Si el switch esta desactivado, copia el mensaje del textarea "iso" al portapapeles.
	if (document.getElementById("switchInput").checked == false) {
		navigator.clipboard.writeText(document.getElementById("iso").value);
		console.log("Copiado");
	}
	//Si el switch esta activado, copia el mensaje formateado al portapapeles.
	else {
		navigator.clipboard.writeText(mensajeFormateado);
	}
}
