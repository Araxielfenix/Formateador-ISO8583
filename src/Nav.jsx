const Nav = () => {
	return (
		<div class="navbar navbar-expand-lg navbar-light bg-light " id="navBar">
			<div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 ">
				<div class="flex h-16 items-center justify-between ">
					<div class="md:flex md:items-center md:gap-12 hover:outline-none">
						<a
							class="group relative inline-flex items-center overflow-hidden text-teal-600"
							href="https://github.com/AraxielFenix"
						>
							<img
								class="h-12 rounded-full border-2 border-indigo-600 hover:border-indigo-500 hover:scale-90 transform transition duration-500 ease-in-out z-40 hover:outline-none select-none"
								src="https://pbs.twimg.com/profile_images/1688791121843884033/ha0qS6NH.jpg"
								alt="AraxielFenix"
							/>
							<label
								class="text-gray-700 text-sm font-bold mb-2 md:mb-1 pr-3 group-hover:translate-x-1 -translate-x-full transition-transform z-10 cursor-pointer dark:text-white hover:outline-none select-none"
								for="inline-full-name"
							>
								Araxiel Fenix{" "}
							</label>
						</a>
					</div>
					<div class="grid group ">
						<button
							id="dropdownDefaultButton"
							data-dropdown-toggle="dropdown"
							class="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 select-none"
							type="button"
						>
							Herramientas{" "}
							<svg
								class="w-4 h-4 ml-2"
								aria-hidden="true"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 9l-7 7-7-7"
								></path>
							</svg>
						</button>
						<div
							id="dropdown"
							class="hidden absolute group-hover:grid mt-32 z-10 bg-white divide-y divide-gray-100 rounded shadow dark:bg-[#1a202c] ring-2 ring-indigo-600 place-self-center place-items-center"
						>
							<ul
								class="py-2 text-sm text-gray-700 dark:text-gray-200 align-middle"
								aria-labelledby="dropdownDefaultButton"
							>
								<li>
									<a
										href="https://araxielfenix.github.io/Analizador/"
										class="block px-4 py-2 hover:bg-indigo-600 dark:hover:bg-indigo-600 dark:hover:text-white select-none"
									>
										Analizador
									</a>
								</li>
								<li>
									<a
										href="https://araxielfenix.github.io/Comparador/"
										class="block px-4 py-2 hover:bg-indigo-600 dark:hover:text-white select-none"
									>
										Comparador
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Nav;
