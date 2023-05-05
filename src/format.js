//Crea una funcion para obtener el id del input que tiene el focus.
export var mensajeFormateado = "";
export function formatear() {
	let switcher = document.getElementById("switchInput");

	// switcher.addEventListener("change", () => {
	// 	if (this.checked) {
	// 		//Obtener el texto del textarea "iso" y guardarlo en una variable.
	// 		const mensaje = document.getElementById("iso").value;
	// 		//formatear el texto en lineas de 64 caracteres.
	// 		for (let i = 0; i < mensaje.length; i++) {
	// 			if (i % 64 == 0) {
	// 				mensajeFormateado += "\n";
	// 			}
	// 			mensajeFormateado += mensaje[i];
	// 			console.log(mensajeFormateado);
	// 		}
	// 	}
	// });
	if (switcher.checked == true) {
		//Obtener el texto del textarea "iso" y guardarlo en una variable.
		const mensaje = document.getElementById("iso").value;
		//formatear el texto en lineas de 64 caracteres.
		for (let i = 0; i <= mensaje.length; i++) {
			if (i % 63 == 0) {
				mensajeFormateado += "\n";
			}
			mensajeFormateado += mensaje[i];
			console.log(mensajeFormateado);
		}
	}
	//Remove the word "undefined" from the end of the string.
	mensajeFormateado = mensajeFormateado.substring(
		0,
		mensajeFormateado.length - 9
	);
	console.log("Formateado" + mensajeFormateado);
}
