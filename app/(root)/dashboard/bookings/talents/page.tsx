"use client";

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
    <div className="bg-white rounded-xl w-full px-10 py-8 flex gap-5">
      <div className="shrink-0">
        <div className="relative h-24 w-24 rounded-full">
          <Image
            src={data.provider_details.avatar}
            fill
            className="object-cover rounded-full"
            alt="talent-img"
          />
        </div>
      </div>
      <div className="w-full">
        <div className="flex justify-between">
          <div>
            <div className="flex items-center gap-5">
              <h1 className="text-2xl font-semibold">{`${data.provider_details.first_name} ${data.provider_details.last_name}`}</h1>
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full mr-2 bg-green-500"></div>
                <span>Available for work</span>
              </div>
            </div>
            <p className="text-xl mt-2">Indoor Cleaner</p>
          </div>
          <div>
            <p className="text-xl">{data.distance} away</p>
            <p className="text-xl text-right text-gray-600">{data.duration}</p>
          </div>
        </div>
        <div className="flex justify-between mt-5 gap-8">
          <p className="max-w-xl">{data.service_desc}</p>
          <div className="flex items-center justify-end gap-3 w-full max-w-xs shrink-0">
            <Link href={"/dashboard/bookings/payments"}>
              <button onClick={() => saveTalent(data)} className="btnOne max-w-[200px]">Book Now</button>
            </Link>
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
    end_time: bookingData.start_time,
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
    dispatch(saveTalentData(data))
  }

  useEffect(() => {
    getProvidersData();
  }, []);

  return (
    <div className="py-5 bg-bgWhite">
      {/* header */}
      <div>
        <h1 className="text-3xl font-semibold text-center">
          Available talents for hire
        </h1>
        <div className="hidden justify-end mt-5">
          <button className="bg-primaryBlue text-white h-10 px-5">
            Filter
          </button>
        </div>
      </div>
      <div className="my-6 flex flex-col gap-6">
        {talentData.map((item, index) => (
          <div key={index}>
            <TalentItem data={item} saveTalent={saveTalent} />
          </div>
        ))}
      </div>
    </div>
  );
}
