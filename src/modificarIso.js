import { idNumber } from "./analizar";
export function modificarMensaje() {
	const mensaje = document.getElementById("iso").value;
	console.log(mensaje.substring(18, 18 + 16));
	//Crea un for para obtener los valores de los inputs con idNumber y los guarda en un array.
	let array = [];
	for (let i = 0; i < idNumber; i++) {
		array.push(document.getElementById(i).value);
	}

	console.log(array);
	//Agrega los primeros 32 caracteres del mensaje original a una variable.
	let mensajeNuevo = mensaje.substring(0, 18 + 16);
	console.log(mensajeNuevo);
	//Agrega los valores de los inputs al mensaje nuevo.
	for (let i = 0; i < array.length; i++) {
		mensajeNuevo += array[i];
	}
	console.log(mensajeNuevo);

	document.getElementById("isoModificado").value = mensajeNuevo;

	document.getElementById("copiar").classList.remove("hidden");
	document.getElementById("switch").classList.remove("hidden");
}
