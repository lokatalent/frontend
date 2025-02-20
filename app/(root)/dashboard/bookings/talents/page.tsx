"use client";

import Spinner from "@/components/ui/Spinner";
import { handleUnauthorizedError } from "@/lib/utils";
import { findProviders } from "@/services/bookingService";
import { showToast } from "@/store/auth/toastSlice";
import { saveTalentData } from "@/store/profile/bookingSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TalentItem = ({ data, saveTalent }: any) => {
  return (
    <div className="bg-white rounded-xl shadow-md w-full p4 sm:p-6">
      {/* Main content with responsive layout */}
      <div className="flex flex-row sm:flex-row gap-4 sm:gap-6 w-full">
        {/* Profile picture - always on left */}
        <div className="relative h-16 w-16 sm:h-24 sm:w-24 rounded-full flex-shrink-0">
          <Image
            src={data.provider_details.avatar || "/Images/camera.png"}
            fill
            className="object-cover rounded-full"
            alt="talent-img"
          />
        </div>
        {/* Content container - takes remaining width */}
        <div className="flex-1 flex flex-col gap-3 w-full">
          {/* Name, Status, Distance container */}
          <div className="w-full">
            <h1 className="text-lg sm:text-2xl font-semibold">
              {`${data.provider_details.first_name} ${data.provider_details.last_name}`}
            </h1>
            <div className="flex flex-row sm:flex-row sm:items-center sm:justify-between mt-1">
              <div className="flex flex-row sm:flex-row sm:items-center gap-2 sm:gap-4">
                {/* Status */}
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full mr-2 bg-green-500"></div>
                  <span className="text-sm sm:text-base">Available for work</span>
                </div>
                <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-0 mr-1">{data.distance} away</p>
              </div>
              <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-0">{data.duration}</p>
            </div>
          </div>
          <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-sm sm:text-base text-gray-700">{data.service_desc}</p>
            <div className="flex flex-wrap gap-3">
              <Link href={`/dashboard/bookings/talents/${data.provider_id}?service_type=${data?.service_type}`}>
                <button
                  onClick={() => saveTalent(data)}
                  className="bg-white border border-primaryBlue px-4 py-2 text-primaryBlue text-sm sm:text-base whitespace-nowrap"
                >
                  View Profile
                </button>
              </Link>
              <Link href={"/dashboard/bookings/payments"}>
                <button
                  onClick={() => saveTalent(data)}
                  className="bg-blue-500 border border-primaryBlue text-white px-4 py-2 text-sm sm:text-base whitespace-nowrap"
                >
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function DashboardTalentsHome() {
  const [talentData, setTalentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // get booking data
  const bookingData = useSelector((state: any) => state.booking.bookingData);
  // get data for the search
  const data = {
    requester_addr: bookingData.requester_addr,
    service_type: bookingData.service_type,
    start_time: bookingData.start_time,
    end_time: bookingData.end_time,
    start_date: bookingData.start_date,
    end_date: bookingData.end_date,
  };

  const dispatch = useDispatch();

  // pass data to the seach providers function
  const getProvidersData = async () => {
    const response = await findProviders(data);
    if (!response.error) {
      setLoading(false);
      setTalentData(response.data);
    } else {
      setLoading(false);
      handleUnauthorizedError(response, dispatch, router, showToast);
    }
  };

  const saveTalent = (data: any) => {
    dispatch(saveTalentData(data));
  };

  useEffect(() => {
    getProvidersData();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="h-[400px] w-full flex flex-col items-center justify-center text-center">
          <h1 className="mb-5 text-base sm:text-lg md:text-xl font-semibold">
            Finding talents for you
          </h1>
          <Spinner />
        </div>
      ) : (
        <div className="py-5 px-4 sm:px-8 bg-bgWhite">
          {/* header */}
          <div className="text-center">
            <h1 className="text-xl sm:text-3xl font-semibold">
              Available talents for {bookingData.service_type} service
            </h1>
            <div className="hidden justify-end mt-5">
              <button className="bg-primaryBlue text-white h-10 px-5">
                Filter
              </button>
            </div>
          </div>
          {(talentData.data.length > 0) && (talentData.message === "Available providers.") ? (
            <div className="my-6 flex flex-col gap-4 sm:gap-6">
              {talentData.data.map((item, index) => (
                <div key={index}>
                  <TalentItem data={item} saveTalent={saveTalent} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center mt-6">
              {/* make a modal */}
              <p className="text-gray-600 text-sm sm:text-base">{talentData.message}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
