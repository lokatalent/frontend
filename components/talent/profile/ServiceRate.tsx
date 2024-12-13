import React from "react";
import Image from "next/image";

interface ServiceRateProps {
  isData: boolean;
  data?: string[] | null;
}

function ServiceRate({ isData, data}: ServiceRateProps) {
  return (
    <div className=" card p-6">
      {isData ? (
        <div>
          <div className="flex items-center gap-16">
            <div>
              <div className="text-gray-500 font-medium">Rate per hour</div>
              <div className="flex items-end">
                <div className="text-orange-500 font-bold text-4xl">₦1,500</div>
                <div className="text-gray-500 font-medium">/hr</div>
              </div>
            </div>
            <div className="relative w-[40px] h-[10px]">
              <div className="absolute w-[40px] h-[1px] bg-orange-500 top-1/2 transform -translate-y-1/2"></div>
              <div className="absolute w-[3px] h-[3px] bg-orange-500 rounded-full right-0 top-1/2 transform -translate-y-1/2"></div>
            </div>
            <div>
              <div className="text-gray-500 font-medium">per service</div>
              <div className="text-orange-500 font-bold text-4xl ">
                ₦100,000
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="text-gray-700 mb-5 font-medium">Bank Details</div>
            <div className="flex space-x-10">
              <div className="flex gap-2 items-center">
                <div className="text-gray-500 text-sm">Bank Name</div>
                <div className="relative w-[40px] h-[20px]">
                  <div className="absolute w-[40px] h-[2px] bg-orange-500 top-1/2 transform -translate-y-1/2"></div>
                  <div className="absolute w-[10px] h-[10px] bg-orange-500 rounded-full right-0 top-1/2 transform -translate-y-1/2"></div>
                </div>
                <div className="text-gray-700 font-medium">Zenith Bank</div>
              </div>
              <div className="flex gap-2 items-center">
                <div className="text-gray-500 text-sm">Account Number</div>
                <div className="relative w-[40px] h-[20px]">
                  <div className="absolute w-[40px] h-[2px] bg-orange-500 top-1/2 transform -translate-y-1/2"></div>
                  <div className="absolute w-[10px] h-[10px] bg-orange-500 rounded-full right-0 top-1/2 transform -translate-y-1/2"></div>
                </div>
                <div className="text-gray-700 font-medium">01234567888</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-center flex-col">
          <Image
            src={"/Images/emptyService.png"}
            alt="empty Service"
            width={200}
            height={200}
          />
          <p>
            Nothing to show here. Complete your profile set up to add your service rate and bank details
          </p>
        </div>
      )}
    </div>
  );
}

export default ServiceRate;
