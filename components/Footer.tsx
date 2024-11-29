import Link from "next/link";
import { FaInstagram, FaTwitterSquare, FaFacebookSquare } from "react-icons/fa";
const Footer = () => {
	return (
    // <div className="bg-primaryBlue p-14 text-white">
    // 	<div className="contained ">
    // 		<div>
    // 			<div className="flex flex-col md:flex-row justify-between py-3 pb-8 border-b border-b-white">
    // 				<p className="font-bold text-xl">LokaTalent</p>
    // 				<div className=" flex flex-row justify-between  w-1/2">
    // 					<Link href="/">
    // 						<span className="text-lg   text-white">
    // 							Terms and Conditions
    // 						</span>
    // 					</Link>
    // 					<Link href="/">
    // 						<span className="text-lg  text-white">Services</span>
    // 					</Link>
    // 					<Link href="/">
    // 						<span className="text-lg  text-white">Creatives</span>
    // 					</Link>
    // 				</div>
    // 			</div>

    // 			<div className="flex flex-col md:flex-row justify-between py-5">
    // 				<div className="flex flex-row space-x-4">
    // 					<FaInstagram />
    // 					<FaTwitterSquare />
    // 					<FaFacebookSquare />
    // 				</div>
    // 				<p className="mt-4 md:mt-0">HAVE ANY QUESTIONS ? REACH OUT TO US</p>
    // 			</div>

    // 			<div className="flex flex-col md:flex-row  md:justify-between items-start py-3">
    // 				<div className=" ">
    // 					<p>2024 Lokatalent. All Rights Reserved</p>
    // 				</div>

    // 				<div className=" flex  items-end mt-5 md:mt-0 ">
    // 					<button className="bg-white w-[241px] md:w-[339px]  text-primaryBlue  py-5 px-8">
    // 						Contact Us
    // 					</button>
    // 				</div>
    // 			</div>
    // 		</div>
    // 	</div>
    // </div>
    <div className="bg-[#3377ff] px-[2rem] sm:px-[3rem] md:px-[4rem] lg:px-[5rem] text-white flex flex-col gap-8 py-20 mt-12">
      <div>
        <div className="">
          <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row justify-between gap-2 sm:gap-0 md:gap-0 lg:gap-0 items-start sm:items-center md:items-center lg:items-center">
            <p className="font-bold text-xl">Lokatalent</p>
            <div>
              <nav>
                <ul className="flex list-none gap-[20px] sm:gap-[35px] md:gap-[40px] lg:gap-[110px]">
                  <li className="">
                    <Link href="/login">Terms & Conditions</Link>
                  </li>
                  <li>
                    <Link href="/signup">Services</Link>
                  </li>
                  <li>
                    <Link href="/register">Creative</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[100%] h-[0.5px] bg-white"></div>
      <div>
        <div className="flex gap-4 md:gap-4 lg:gap-8">
          <FaInstagram />
          <FaTwitterSquare />
           <FaFacebookSquare />
        </div>
        <p className="font-nunito md:text-normal lg:text-2xl font-extrabold tracking-tighter mt-4 sm:mt-4 md:mt-4 lg:mt-0 text-left sm:text-right md:text-right lg:text-right uppercase">
          Have any questions? reach out to us
        </p>
        <div className="flex justify-between flex-col-reverse sm:flex-row md:flex-row lg:flew-row gap-4 sm:gap-0 md:gap-0 lg:gap-0 mt-12">
          <p>2024 Lokatalent. All Rights Reserved</p>
          <button className="font-nunito text-xl !text-[#3377FF] font-normal leading-6 bg-white buttonds w-[12rem] h-[2.5rem] lg:w-[14rem] lg:h-[3rem]">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
