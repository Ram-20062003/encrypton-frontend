import { Center } from "@mantine/core";

const Landing = () => {
	return (
		<Center className="w-full h-full">
			<div className="grid py-8 px-4 mx-auto max-w-screen-xl lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 max-md:flex max-md:flex-col-reverse">
				<div className="place-self-center mr-auto lg:col-span-7">
					<h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl dark:text-white">
						Polaris.AI
					</h1>
					<h2 className="mb-6 max-w-2xl font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
						Polaris is a fraud detection system that uses machine learning
						to detect fraudulent transactions.
					</h2>
					<a
						href="/login"
						className="inline-flex justify-center items-center py-3 px-5 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
					>
						Login
						<svg
							className="ml-2 -mr-1 w-5 h-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
								clipRule="evenodd"
							></path>
						</svg>
					</a>
				</div>
				<div className="lg:mt-0 lg:col-span-5 lg:flex">
					<img
						className="mockup"
						src={"/assets/images/mockup.png"}
						alt="mockup"
					/>
				</div>
			</div>
		</Center>
	);
};

export default Landing;
