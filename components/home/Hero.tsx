import Image from "next/image";

const Hero = () => {
	return (
		<div className="bg-primaryBlue">
			<div className="contained flex flex-col md:flex-row space-y-5 md:space-y-0 py-24 ">
				<div className="text-white">
					<p className="font-semibold lg:text-xl leading-7 pb-7">
						WELCOME TO LOKATALENT
					</p>
					<h2 className="text-4xl md:text-5xl lg:text-7xl font-bold">
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
				<div>
					<div className="max-w-max]">
						<Image
							src="/Images/hero1.png"
							width={478}
							height={200}
							alt="driver"
						/>
					</div>
					<div className="flex ">
						<Image
							src="/Images/hero2.png"
							width={400}
							height={200}
							alt="painter"
						/>
						<Image
							src="/Images/hero3.png"
							width={400}
							height={200}
							alt="cleaner"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
