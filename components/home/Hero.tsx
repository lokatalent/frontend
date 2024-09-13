import Image from "next/image";

const Hero = () => {
	return (
		<div className="bg-primaryBlue">
			<div className="contained flex flex-col md:flex-row space-y-5 md:space-y-0 py-24 ">
				<div className="text-white">
					<p className="font-semibold lg:text-xl leading-7 pb-7">
						WELCOME TO LOKATALENT
					</p>
					<h2 className="text-3xl md:text-4xl lg:text-6xl font-bold">
						Quality Home Service On Demand
					</h2>

					<p className="py-7">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
						consectetur adipiscing commodo euismod condimentum nunc.
					</p>
					<p>
						Want to sign up as a service provider? <span>Apply Here</span>{" "}
					</p>
				</div>
				<div className="w-full flex items-end justify-center md:justify-end ">
					<div className="max-w-full ">
						<Image
							src="/Images/hero.png"
							width={378}
							height={174}
							alt="driver"
							priority={true}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
