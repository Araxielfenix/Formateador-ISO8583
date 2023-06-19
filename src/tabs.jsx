import { createSignal } from "solid-js";

function categories() {
	const [activeTab, setActiveTab] = createSignal(1); // Estado para almacenar la pestaña activa
	const activeTabStyle = (tab) => ({
		"bg-indigo-600": activeTab() === tab,
		"text-white": activeTab() === tab,
		"hover:bg-indigo-900": activeTab() !== tab,
		// add a gray background to the inactive tabs
		"bg-slate-700": activeTab() !== tab,
	});

	return (
		<section class="hidden pt-10" id="tabs">
			<ul
				id="tabsContainer"
				class="text-sm md:mx-96 font-medium text-center text-gray-500 divide-x divide-gray-200 shadow sm:flex dark:divide-gray-700 dark:text-gray-400 border-slate-300 border rounded"
			>
				<li
					classList={{
						"w-full rounded-l": true,
						...activeTabStyle(1),
					}}
				>
					<a
						id="transaccion"
						href="#"
						classList={{
							"inline-block w-full p-4 ": true,
							"hover:text-gray-700 focus:outline-none dark:hover:text-white": true,
						}}
						aria-current="page"
						onClick={() => setActiveTab(1)}
					>
						Información de la transacción
					</a>
				</li>
				<li classList={{ "w-full": true, ...activeTabStyle(2) }}>
					<a
						id="compra"
						href="#"
						classList={{
							"inline-block w-full p-4": true,
							"hover:text-gray-700  focus:outline-none dark:hover:text-white": true,
						}}
						onClick={() => setActiveTab(2)}
					>
						Detalles de la compra
					</a>
				</li>
				<li classList={{ "w-full": true, ...activeTabStyle(3) }}>
					<a
						id="comercio"
						href="#"
						classList={{
							"inline-block w-full p-4": true,
							"hover:text-gray-700  focus:outline-none dark:hover:text-white": true,
						}}
						onClick={() => setActiveTab(3)}
					>
						Detalles del comercio
					</a>
				</li>
				<li classList={{ "w-full rounded-r": true, ...activeTabStyle(4) }}>
					<a
						id="tokens"
						href="#"
						classList={{
							"inline-block w-full p-4": true,
							"hover:text-gray-700  focus:outline-none dark:hover:text-white": true,
						}}
						onClick={() => setActiveTab(4)}
					>
						Tokens y otros campos
					</a>
				</li>
			</ul>
		</section>
	);
}

export default categories;
