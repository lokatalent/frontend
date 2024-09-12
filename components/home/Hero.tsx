import type layout from "@/app/layout";
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
				<div className="w-full">
					<div className="max-w-full">
						<Image
							src="/Images/hero1.png"
							width={478}
							height={374}
							alt="driver"
							// className="w-full h-[374px]"
						/>
					</div>
					<div className="flex flex-col sm:flex-row ">
						<div className="md:w-[249px] md:h-[179px]">
							<Image
								src="/Images/hero2.png"
								width={254}
								height={179}
								alt="painter"
								className="contain"
							/>
						</div>
						<div className="md:w-[249px] md:h-[170px]">
							<Image
								src="/Images/hero3.png"
								width={254}
								height={179}
								alt="cleaner"
								className="contain"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
