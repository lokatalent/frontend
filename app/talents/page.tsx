"use client";

import LogInAuth from "@/components/auth/LogInAuth";
import PageSpinner from "@/components/ui/PageSpinner";
import { handleUnauthorizedError } from "@/components/utils";
import { findProviders } from "@/services/bookingService";
import { showToast } from "@/store/auth/toastSlice";
import { Item } from "@radix-ui/react-select";
import { Router } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const TalentItem = ({ data, setShowModal }: any) => {
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
          <p className="max-w-xl">
            {data.service_desc}
          </p>
          <div className="flex items-center justify-end gap-3 w-full max-w-xs shrink-0">
            <button
              onClick={setShowModal}
              className="hidden btnTwo border border-primaryBlue"
            >
              View Profile
            </button>
            <button onClick={setShowModal} className="btnOne max-w-[200px]">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function Talents() {
  const [showModal, setShowModal] = useState(true);
  const [talentData, setTalentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const onShowModal = () => {
    setShowModal(true);
  };

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

  useEffect(() => {
    getProvidersData();
  }, []);

  return (
    <div>
      {loading ? (
        <PageSpinner />
      ) : (
        <div className="py-10 bg-bgWhite min-h-screen wrap">
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
          {/* main */}
          <div className="my-6 flex flex-col gap-6">
            {talentData.map((item, index) => (
              <div key={index}>
                <TalentItem data={item} setShowModal={onShowModal} />
              </div>
            ))}
          </div>
          {showModal && (
            <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-70 z-10">
              <div className="w-full h-full flex items-center md:items-start justify-center py-5 md:py-10 wrap">
                <div className="bg-white w-full max-w-[500px] rounded-md px-5 py-8">
                  <div className="hidden fle justify-end mb-5">
                    <FaTimes onClick={() => setShowModal(false)} />
                  </div>
                    <LogInAuth providersPage={true} />
                  {/* <div className="text-center max-w-[470px] mx-auto">
                    <h1 className="text-xl md:text-2xl xl:text-3xl text-textGray5">
                      You have to sign in to make a booking
                    </h1>
                    <p className="md:text-lg xl:text-xl mb-6 text-textGray5 md:px-4 mt-5"></p>
                    <button
                      onClick={() => router.push("/login")}
                      className="bg-primaryBlue text-white h-12 md:h-14 w-full"
                    >
                      Sign in
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Talents;
