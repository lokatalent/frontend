"use client";
import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootStateTalentProfileState } from "@/store/talent/profile/TalentProfileSlice";

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
  const bankDetails = useSelector(
    (state: RootStateTalentProfileState) => state.talentProfile.bankDetails
  );

  return (
    <div className="card p-6 border rounded-lg shadow-lg">
      {isData ? (
        <div>
          {/* Bank Details Section */}
          <div className="mt-6">
            <div className="text-gray-700 mb-5 font-medium">Bank Details</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Bank Name */}
              <div className="flex gap-3 items-center">
                <div className="text-gray-500 text-sm">Bank Name</div>
                <div className="relative w-[40px] h-[20px]">
                  <div className="absolute w-full h-[2px] bg-orange-500 top-1/2 -translate-y-1/2"></div>
                  <div className="absolute w-[10px] h-[10px] bg-orange-500 rounded-full right-0 top-1/2 -translate-y-1/2"></div>
                </div>
                <div className="text-gray-700 font-medium">
                  {bankDetails.bank_name || "Empty"}
                </div>
              </div>
              {/* Account Number */}
              <div className="flex gap-3 items-center">
                <div className="text-gray-500 text-sm">Account Number</div>
                <div className="relative w-[40px] h-[20px]">
                  <div className="absolute w-full h-[2px] bg-orange-500 top-1/2 -translate-y-1/2"></div>
                  <div className="absolute w-[10px] h-[10px] bg-orange-500 rounded-full right-0 top-1/2 -translate-y-1/2"></div>
                </div>
                <div className="text-gray-700 font-medium">
                  {bankDetails.account_num || 0}
                </div>
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
