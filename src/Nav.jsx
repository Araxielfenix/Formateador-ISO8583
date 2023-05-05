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
					<div class="flex items-center gap-4">
						<a
							class="group relative inline-flex items-center overflow-hidden rounded bg-indigo-600 px-8 py-3 text-white hover:outline-none focus:ring active:bg-indigo-500"
							href="https://araxielfenix.github.io/Comparador/"
						>
							<span class="absolute left-0 -translate-x-full transition-transform group-hover:translate-x-4">
								<svg
									class="h-5 w-5"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										d="M13,7V4H11v3H7v2h4v3l5-4L13,7z M20.5,11.5c-0.3,0-0.6,0.1-0.8,0.4l-2.7,2.7c-0.4,0.4-0.4,1,0,1.4l2.7,2.7c0.4,0.4,1,0.4,1.4,0l2.7-2.7c0.4-0.4,0.4-1,0-1.4l-2.7-2.7C21.1,11.6,20.8,11.5,20.5,11.5z M3.5,11.5c-0.3,0-0.6,0.1-0.8,0.4L0,14.6c-0.4,0.4-0.4,1,0,1.4l2.7,2.7c0.4,0.4,1,0.4,1.4,0l2.7-2.7c0.4-0.4,0.4-1,0-1.4l-2.7-2.7C4.1,11.6,3.8,11.5,3.5,11.5z"
										fill="currentColor"
									/>
								</svg>
							</span>
							<span class="text-sm font-medium transition-all group-hover:ml-4">
								Comparador
							</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Nav;
