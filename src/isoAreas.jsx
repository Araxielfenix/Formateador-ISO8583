import { obtenerISO } from "./analizar.js";
import { modificarMensaje } from "./modificarIso";
import { copiar } from "./copiarMensaje";
import { formatear } from "./format";
import { createSignal } from "solid-js";

const messageArea = () => {
	const [inputValues, setInputValues] = createSignal({});

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setInputValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		// Obtener los valores del input y span
		const { input1, span1 } = inputValues();
		console.log("Valor del input1:", input1);
		console.log("Texto del span1:", span1);
	};

	return (
		<div class="flex flex-col md:flex-row justify-items-center grid-cols-1 pt-3 gap-3 ">
			<textarea
				class="focus:border-indigo-600 md:ml-4 pb-8 mx-auto h-32 w-[96%] md:w-7/12 peer block min-h-[150px] rounded border-slate-300 border shadow-sm dark:bg-slate-700 py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none"
				id="iso"
				placeholder="..ISO00000000000000A00C00000A0C00E000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000******0000=****00000000000000000000        AQUI VA EL NOMBRE DEL COMERCIO Y EL PAIS000000000000000000            000000000MASTB000+00000000000000000000000000000000SW0W 0TQ  000& 0000000000! Q000000 00! Q000000 00! C000000 **** 000          0  0 0 0! C000000 00000000000 ! R000000"
			></textarea>
			<div class="grid place-content-center pb-5" id="opciones">
				<div class="flex gap-5">
					<button
						class="inline-block rounded border border-current px-8 py-3 mt-5 text-sm font-medium bg-indigo-600 text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500 select-none"
						id="analizar"
						onClick={obtenerISO}
					>
						Analizar
					</button>
					<button
						class="hidden rounded border border-current px-8 py-3 mt-5 text-sm font-medium bg-indigo-600 text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500 select-none"
						id="modificar"
						onClick={modificarMensaje}
					>
						Modificar
					</button>
				</div>
				<div class="flex gap-5">
					<button
						class="hidden rounded border border-current px-8 py-3 mt-5 text-sm font-medium bg-indigo-600 text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500 select-none"
						id="copiar"
						onClick={copiar}
					>
						Copiar
					</button>
					<div class="hidden pt-8" id="switch">
						<label class="relative inline-flex items-center cursor-pointer group">
							<input
								type="checkbox"
								value=""
								class="sr-only peer"
								id="switchInput"
								onchange={formatear}
							></input>
							<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600 group-hover:ring group-hover:ring-indigo-600"></div>
							<span class="select-none ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
								Formatear
							</span>
						</label>
					</div>
				</div>
			</div>
			<textarea
				class="focus:border-indigo-600 md:mr-4 pb-8 mx-auto h-32  w-[96%] md:w-7/12 peer block min-h-[150px] rounded border-slate-300 border shadow-sm dark:bg-slate-700 py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none"
				id="isoModificado"
				placeholder="..ISO00000000000000A00C00000A0C00E000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000******0000=****00000000000000000000        AQUI VA EL NOMBRE DEL COMERCIO Y EL PAIS000000000000000000            000000000MASTB000+00000000000000000000000000000000SW0W 0TQ  000& 0000000000! Q000000 00! Q000000 00! C000000 **** 000          0  0 0 0! C000000 00000000000 ! R000000"
			></textarea>
		</div>
	);
};

export default messageArea;
