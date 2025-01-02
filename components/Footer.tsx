import Link from "next/link";
import { FaInstagram, FaTwitterSquare, FaFacebookSquare } from "react-icons/fa";
const Footer = () => {
	return (
    <div className="px-6 sm:px-[3rem] md:px-[4rem] lg:px-[5rem] flex flex-col gap-8 py-14 md:py-20">
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
        <p className="hidden font-nunito md:text-normal lg:text-2xl font-extrabold tracking-tighter mt-4 sm:mt-4 md:mt-4 lg:mt-0 text-left sm:text-right md:text-right lg:text-right uppercase">
          Have any questions? reach out to us
        </p>
        <div className="flex justify-between flex-col-reverse sm:flex-row md:flex-row lg:flew-row gap-4 sm:gap-0 md:gap-0 lg:gap-0 mt-12">
          <p>2024 Lokatalent. All Rights Reserved</p>
          <button className="hidden font-nunito text-xl !text-[#3377FF] font-normal leading-6 bg-white button w-[12rem] lg:w-[14rem]">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
