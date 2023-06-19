import { mensajeISO } from "./analizar";

export function selectedTab() {
	// Supongamos que tienes una referencia al contenedor de la lista de pestañas
	const tabsContainer = document.getElementById("tabsContainer");

	// Obtén todos los botones de las pestañas dentro del contenedor
	const tabButtons = tabsContainer.querySelectorAll("li");

	// Itera sobre los botones de las pestañas y verifica cuál tiene la clase "bg-indigo-600"
	let activeTabButton;
	tabButtons.forEach((button) => {
		if (button.classList.contains("bg-indigo-600")) {
			activeTabButton = button;
			return; // Detiene el bucle una vez que se encuentra la pestaña activa
		}
	});

	// Si se encontró la pestaña activa, puedes acceder a su información
	if (activeTabButton) {
		const activeTabText = activeTabButton.textContent;
		//console.log("La pestaña activa es:", activeTabText);
	} else {
		console.log("No se encontró ninguna pestaña activa. ");
	}

	// Obtén todos los elementos <li> dentro del contenedor de las pestañas
	const tabItems = tabsContainer.querySelectorAll("a");

	// Agrega el listener de clic a cada elemento <li> de las pestañas
	tabItems.forEach((item) => {
		item.addEventListener("click", handleTabClick);
	});
}

// Función de controlador de clic para las pestañas
function handleTabClick(event) {
	// Obtén el ID de la pestaña seleccionada
	const tabId = event.currentTarget.id;
	eliminarInputs();
	idNumber = 0;
	if (tabId == "transaccion") {
		activeTab = "informacionTransaccion";

		for (let i = 0; i < idNumber; i++) {
			//Obten el valor de los inputs y actualiza el objeto mensajeISO.
			const spanText = document.getElementById("span" + i).textContent;
			const inputValue = document.getElementById(i).value;
			mensajeISO.informacionTransaccion[spanText] = inputValue;
		}

		// Obtén la matriz de pares clave-valor del objeto informacionTransaccion
		const informacionTransaccionEntries = Object.entries(
			mensajeISO.informacionTransaccion
		);

		// Recorre la matriz de pares clave-valor e imprime cada elemento
		informacionTransaccionEntries.forEach(([clave, valor]) => {
			agregarInputs(clave, valor);
		});
	}
	if (tabId == "compra") {
		activeTab = "detallesCompra";
		// Obtén la matriz de pares clave-valor del objeto informacionTransaccion
		const informacionCompraEntries = Object.entries(mensajeISO.detallesCompra);

		// Recorre la matriz de pares clave-valor e imprime cada elemento
		informacionCompraEntries.forEach(([clave, valor]) => {
			agregarInputs(clave, valor);
		});
	}
	if (tabId == "comercio") {
		activeTab = "detallesComercio";
		// Obtén la matriz de pares clave-valor del objeto informacionTransaccion
		const informacionComercioEntries = Object.entries(
			mensajeISO.detallesComercio
		);

		// Recorre la matriz de pares clave-valor e imprime cada elemento
		informacionComercioEntries.forEach(([clave, valor]) => {
			agregarInputs(clave, valor);
		});
	}
	if (tabId == "tokens") {
		activeTab = "tokensYCampos";
		// Obtén la matriz de pares clave-valor del objeto informacionTransaccion
		const informacionTokensEntries = Object.entries(mensajeISO.tokensYCampos);

		// Recorre la matriz de pares clave-valor e imprime cada elemento
		informacionTokensEntries.forEach(([clave, valor]) => {
			agregarInputs(clave, valor);
		});
	}
}

function handleInputChange(spanText) {
	return function (event) {
		const { value } = event.target;
		mensajeISO[activeTab][spanText] = value;
	};
}

var activeTab = "";
export var idNumber = 0;

function agregarInputs(spanText, value) {
	// Crear un nuevo elemento <span> para el texto adicional
	const newSpan = document.createElement("span");
	//agregar id al span.
	newSpan.id = "span" + idNumber;

	newSpan.textContent = spanText;

	// Obtener una referencia al elemento <div> con el id "inputs"
	const inputsDiv = document.getElementById("inputs");

	// Crear un nuevo elemento <div>
	const newDiv = document.createElement("div");
	newDiv.classList.add("group", "relative", "justify-center");
	newDiv.id = "input" + idNumber; // Agregar un nuevo ID único al nuevo div

	// Crear un nuevo elemento <input>
	const newInput = document.createElement("input");
	newInput.type = "text";
	newInput.id = idNumber; // Agregar un nuevo ID único al nuevo input

	newInput.addEventListener("change", handleInputChange(spanText));

	newInput.classList.add(
		"block",
		"px-2.5",
		"pb-2.5",
		"pt-4",
		"w-full",
		"text-sm",
		"rounded-lg",
		"border-1",
		"appearance-none",
		"text-gray-700",
		"dark:text-white",
		"text-center",
		"bg-white",
		"dark:bg-slate-700",
		"border",
		"shadow-sm",
		"border-slate-300",
		"placeholder-slate-400",
		"focus:outline-none",
		"focus:border-indigo-600",
		"focus:ring-indigo-600",
		"focus:ring-0",
		"peer"
	);
	//newInput.placeholder = placeHolder;

	// Agregar valor al nuevo input
	newInput.value = value;

	// Agregar el nuevo input y span al nuevo div
	newDiv.appendChild(newSpan);
	newDiv.appendChild(newInput);

	// Agregar el nuevo div al <div> con el id "inputs"
	inputsDiv.appendChild(newDiv);
	idNumber++;
}

function eliminarInputs() {
	const inputsDiv = document.getElementById("inputs");
	const inputs = inputsDiv.querySelectorAll("div");
	const spans = inputsDiv.querySelectorAll("span");

	// Eliminar los inputs
	inputs.forEach((input) => {
		input.remove();
	});

	// Eliminar los spans
	spans.forEach((span) => {
		span.remove();
	});
}
