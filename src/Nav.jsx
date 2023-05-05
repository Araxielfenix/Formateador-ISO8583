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
								class="h-12 rounded-full border-2 border-indigo-600 hover:border-indigo-500 hover:scale-90 transform transition duration-500 ease-in-out z-40 hover:outline-none"
								src="https://static-cdn.jtvnw.net/jtv_user_pictures/6f424ca8-2f68-43c6-b021-a3134ace9225-profile_image-70x70.png"
								alt="AraxielFenix"
							/>
							<label
								class="text-gray-700 text-sm font-bold mb-2 md:mb-1 pr-3 group-hover:translate-x-1 -translate-x-full transition-transform z-10 cursor-pointer dark:text-white hover:outline-none"
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
							class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
							class="hidden absolute group-hover:grid mt-32 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 place-self-center place-items-center"
						>
							<ul
								class="py-2 text-sm text-gray-700 dark:text-gray-200 align-middle "
								aria-labelledby="dropdownDefaultButton"
							>
								<li>
									<a
										href="https://araxielfenix.github.io/Analizador/"
										class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
									>
										Analizador
									</a>
								</li>
								<li>
									<a
										href="https://araxielfenix.github.io/Comparador/"
										class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
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
