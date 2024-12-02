import Image from "next/image";
import preview from "@/public/Images/preview.png";

const Preview = () => {
  return (
    <div className="contained py-6 md:py-14 w-full max-w-4xl mx-auto">
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold py-4 md:py-8 leading-2 text-center">
        Simplified Dashboard for Easy Management
      </h1>
      <h3 className="font-raleway text-[16px] leading-[23.48px] w-[70%] mx-auto  text-center ">
        Effortlessly manage your bookings and stay updated with all your service
        details in one place
      </h3>

      <div className="Imageslide flex flex-col gap-8 mb-8">
        <div className="flex gap-2 sm:gap-4 md:gap-4 lg:gap-4 border border-3 border-primaryBlue rounded-xl md:rounded-[40px] mt-10 overflow-hidden">
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
