import Image from "next/image";
import preview from "@/public/Images/preview.png";

const Preview = () => {
  return (
    <div className="contained py-14">
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold py-8 leading-2 text-center">
        Lorem ipsum lorem
      </h1>
      <h3 className="font-raleway text-[16px] leading-[23.48px] w-[70%] mx-auto  text-center ">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
        consectetur adipiscing Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Cras consectetur adipiscing
      </h3>

      <div className="Imageslide flex flex-col gap-8 mb-8">
        <div className="flex gap-2 sm:gap-4 md:gap-4 lg:gap-4 border border-3 border-primaryBlue rounded-[40px] mt-10">
            <Image src={preview} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="flex gap-2 self-center">
          <div className="w-5 h-1.5 bg-[#2A4AF4] rounded-[5px]"></div>
          <div className="w-5 h-1.5 bg-[#3377FF5E] rounded-[5px]"></div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
