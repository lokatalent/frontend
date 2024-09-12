import Link from "next/link";
import { FaInstagram, FaTwitterSquare, FaFacebookSquare } from "react-icons/fa";
const Footer = () => {
	return (
		<div className="bg-primaryBlue p-14 text-white">
			<div className="contained ">
				<div>
					<div className="flex flex-col md:flex-row justify-between py-3 pb-8 border-b border-b-white">
						<p className="font-bold text-xl">LokaTalent</p>
						<div className=" flex flex-row justify-between  w-1/2">
							<Link href="/">
								<span className="text-lg   text-white">
									Terms and Conditions
								</span>
							</Link>
							<Link href="/">
								<span className="text-lg  text-white">Services</span>
							</Link>
							<Link href="/">
								<span className="text-lg  text-white">Creatives</span>
							</Link>
						</div>
					</div>

					<div className="flex flex-col md:flex-row justify-between py-5">
						<div className="flex flex-row space-x-4">
							<FaInstagram />
							<FaTwitterSquare />
							<FaFacebookSquare />
						</div>
						<p className="mt-4 md:mt-0">HAVE ANY QUESTIONS ? REACH OUT TO US</p>
					</div>

					<div className="flex flex-col md:flex-row  md:justify-between items-start py-3">
						<div className=" ">
							<p>2024 Lokatalent. All Rights Reserved</p>
						</div>

						<div className=" flex  items-end mt-5 md:mt-0 ">
							<button className="bg-white w-[241px] md:w-[339px]  text-primaryBlue  py-5 px-8">
								Contact Us
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
