import Image from "next/image";
import DropDownElement from "../ui/DropDownElement";

const Hero = () => {
  return (
    <div className="bg-primaryBlue min-h-[600px] md:h-screen max-h-[800px] flex items-center pt-24">
      <div className="contained flex justify-between flex-col md:flex-row gap-10 space-y-8 md:space-y-0">
        <div className="w-full max-w-[750px] text-white">
          <p className="font-semibold lg:text-xl leading-7 pb-5">
            WELCOME TO LOKATALENT
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-5xl xl:text-7xl font-semibold">
            Quality Home Service On Demand
          </h2>

          <p className="py-5 text-xl">
            Get professional services at your doorstep within hours
          </p>
          <div className="w-full max-w-3xl">
            <DropDownElement />
          </div>
          <div className="flex space-x-2 text-lg">
            <p className=" ">
              Want to sign up as a service provider?{" "}
              <span className=" text-white underline underline-offset-8 whitespace-nowrap">
                Apply Here
              </span>
            </p>
          </div>
        </div>
        <div className="flex items-end justify-center md:justify-end">
          <div className="w-full md:w-auto">
            <Image
              src="/Images/hero.png"
              className="w-full h-auto md:w-[378px]"
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
