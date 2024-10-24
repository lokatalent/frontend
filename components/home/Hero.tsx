import Image from "next/image";
import DropDownElement from "../ui/DropDownElement";

const Hero = () => {
	return (
		<div className="bg-primaryBlue">
			<div className="contained flex flex-col md:flex-row space-y-8 md:space-y-0 py-24 ">
				<div className="text-white">
					<p className="font-semibold lg:text-xl leading-7 pb-7">
						WELCOME TO LOKATALENT
					</p>
					<h2 className="text-2xl md:text-3xl lg:text-5xl font-bold leading-loose ">
						Quality Home Service On Demand
					</h2>

					<p className="py-7">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
						consectetur adipiscing commodo euismod condimentum nunc.
					</p>
					<DropDownElement />
					<div className="flex space-x-2 text-lg">
						<p className=" ">
							Want to sign up as a service provider?{" "}
							<span className=" text-white underline underline-offset-8 whitespace-nowrap">
								Apply Here
							</span>
						</p>
					</div>
				</div>
				<div className="w-full flex items-end justify-center md:justify-end">
					<div className="w-full md:w-auto">
						<Image
							src="/Images/hero.png"
							className="w-full h-auto md:w-[378px] " // Apply fixed width and height for md and larger
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
