"use client";
import React from "react";
import Image from "next/image";

interface ServiceRateProps {
  isData: boolean;
  data?: {
    bankName?: string;
    accountNo?: string;
    rps?: string;
    rph?: string;
  };
}

const ServiceRate: React.FC<ServiceRateProps> = ({ isData, data = {} }) => {
  const { bankName = "N/A", accountNo = "N/A", rps = "0", rph = "0" } = data;

  return (
    <div className="card p-6">
      {isData ? (
        <div>
          {/* Rates Section */}
          {/* <div className="flex items-center gap-16">
            <div>
              <div className="text-gray-500 font-medium">Rate per hour</div>
              <div className="flex items-end">
                <div className="text-orange-500 font-bold text-4xl">₦{rph}</div>
                <div className="text-gray-500 font-medium">/hr</div>
              </div>
            </div>
            <div className="relative w-[40px] h-[10px]">
              <div className="absolute w-full h-[1px] bg-orange-500 top-1/2 -translate-y-1/2"></div>
              <div className="absolute w-[3px] h-[3px] bg-orange-500 rounded-full right-0 top-1/2 -translate-y-1/2"></div>
            </div>
            <div>
              <div className="text-gray-500 font-medium">Per service</div>
              <div className="text-orange-500 font-bold text-4xl">₦{rps}</div>
            </div>
          </div> */}

          {/* Bank Details Section */}
          <div className="mt-6">
            <div className="text-gray-700 mb-5 font-medium">Bank Details</div>
            <div className="flex space-x-10">
              {/* Bank Name */}
              <div className="flex gap-2 items-center">
                <div className="text-gray-500 text-sm">Bank Name</div>
                <div className="relative w-[40px] h-[20px]">
                  <div className="absolute w-full h-[2px] bg-orange-500 top-1/2 -translate-y-1/2"></div>
                  <div className="absolute w-[10px] h-[10px] bg-orange-500 rounded-full right-0 top-1/2 -translate-y-1/2"></div>
                </div>
                <div className="text-gray-700 font-medium">{bankName}</div>
              </div>
              {/* Account Number */}
              <div className="flex gap-2 items-center">
                <div className="text-gray-500 text-sm">Account Number</div>
                <div className="relative w-[40px] h-[20px]">
                  <div className="absolute w-full h-[2px] bg-orange-500 top-1/2 -translate-y-1/2"></div>
                  <div className="absolute w-[10px] h-[10px] bg-orange-500 rounded-full right-0 top-1/2 -translate-y-1/2"></div>
                </div>
                <div className="text-gray-700 font-medium">{accountNo}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Empty State Section
        <div className="flex flex-col items-center">
          <Image
            src="/Images/emptyService.png"
            alt="Empty Service"
            width={200}
            height={200}
          />
          <p className="text-gray-600 text-center mt-4">
            Nothing to show here. Complete your profile setup to add your
            service rate and bank details.
          </p>
        </div>
      )}
    </div>
  );
};

export default ServiceRate;

