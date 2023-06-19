const alertaBox = () => {
	return (
		// <textarea type="text" id="inputAlerta" class="absolute border shadow-sm border-slate-300 rounded-md align-middle resize-none top-1/4 right-1/4 left-1/4 h-2/5" disabled> Hola</textarea>
		<div
			class="absolute border border-indigo-200 dark:border-slate-50/60 backdrop-blur-[2px] shadow-sm top-1/4 right-1/4 left-1/4 h-2/5 rounded-md z-40 content-center bg-slate-100/60 dark:bg-slate-900/60 hidden"
			id="divAlerta"
		>
			<label
				class="grow align-middle dark:text-white text-center py-40"
				id="textoAlerta"
			>
				No deberias estar leyendo esto 😒
			</label>
		</div>
	);
};

export default alertaBox;
