import Image from "next/image";
import hero1 from "../../public/Images/hero1.png";
import hero2 from "../../public/Images/hero2.png";
import hero3 from "../../public/Images/hero3.png";

const Testimonial = () => {
  return (
    <div className="contained py-14">
      <h3 className="font-raleway text-lg font-semibold leading-[23.48px] text-left text-[#2A4AF4]">
        TESTIMONIAL
      </h3>

      <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold py-8 leading-2">
        What Customers Say <br /> About Us
      </h1>

      <div className="Imageslide flex flex-col gap-8 mb-8">
        <div className="flex gap-2 sm:gap-4 md:gap-4 lg:gap-4 ">
          <div className="w-[250px] h-[200px] md:w-[350px] md:h-[300px] lg:w-[400px] lg:h-[350px]">
            <Image src={hero1} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="w-[250px] h-[200px] md:w-[350px] md:h-[300px] lg:w-[400px] lg:h-[350px]">
            <Image src={hero2} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="w-[250px] h-[200px] md:w-[350px] md:h-[300px] lg:w-[400px] lg:h-[350px]">
            <Image src={hero3} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="flex gap-2 self-center">
          <div className="w-5 h-1.5 bg-[#2A4AF4] rounded-[5px]"></div>
          <div className="w-5 h-1.5 bg-[#3377FF5E] rounded-[5px]"></div>
        </div>
      </div>

      <div className="bg-primaryBlue rounded-lg p-6 md:p-12 flex flex-col lg:flex-row  ">
        <div className="basis-1/2 lg:pr-4">
          <div className="text-white ">
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold pb-7 text-center md:text-start">
              Ready to Lorem ipsum lorem ip
            </p>
            <p className="text-base font-normal ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.Cras
              consectetur adipiscing commodo euismod condimentum nunc. Lorem
            </p>
          </div>
        </div>
        <div className=" flex flex-col pt-4 lg:pt-0 md:flex-row space-y-3 md:space-y-0 md:space-x-3 items-center justify-center  basis-1/2">
          <div className=" w-full ">
            <button className="bg-white w-full md:w-[241px] text-primaryBlue  py-5 px-8">
              Sign up
            </button>
          </div>

          <div className="w-full ">
            <button className="border border-white w-full  md:w-[241px] hover:bg-blue-700 text-white    py-5 px-8">
              Apply as a Talent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
