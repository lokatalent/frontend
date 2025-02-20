"use client";

import PageSpinner from "@/components/ui/PageSpinner";
import { viewProvider } from "@/services/bookingService";
import { getService, getServiceImages } from "@/services/services";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaAngleLeft, FaCheckCircle, FaStar } from "react-icons/fa";
import { handleUnauthorizedError } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { showToast } from "@/store/auth/toastSlice";

const DAYS_OF_WEEK: DayOfWeek[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function TalentDetails() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const serviceType = searchParams.get("service_type");
  const router = useRouter();
  const dispatch = useDispatch();
  const [tab, setTab] = useState(1);
  const [loading, setLoading] = useState(false);
  const [talent, setTalent] = useState<any>(null);
  const [serviceDetail, setServiceDetail] = useState({});
  const [serviceAvailability, setServiceAvailability] = useState({});
  const [serviceImages, setServiceImages] = useState([]);

  const getProvider = async () => {
    setLoading(true);
    let response = await viewProvider(id);
    if (!response.error) {
      setLoading(false);
      setTalent(response.data);
    } else {
      handleUnauthorizedError(response, dispatch, showToast, router)
      // setLoading(false);
    }
  };

  const getTalentService = async () => {
    setLoading(true);
    let response = await getService({id: id, service_type: serviceType});
    if (!response.error) {
      setLoading(false);
      setServiceDetail(response.data);
      setServiceAvailability(response.data?.availability);
    } else {
      handleUnauthorizedError(response, dispatch, showToast, router)
      // setLoading(false);
    }
  };

  const getTalentServiceImages = async () => {
    setLoading(true);
    let response = await getServiceImages({id: id, service_type: serviceType});
    if (!response.error) {
      setLoading(false);
      setServiceImages(response.data);
    } else {
      handleUnauthorizedError(response, dispatch, showToast, router)
      // setLoading(false);
    }
  };

  useEffect(() => {
    getProvider();
    getTalentService();
    getTalentServiceImages();
  }, []);
  return (
    <div>
      {loading ? (
        <PageSpinner />
      ) : (
      <div className="py-3 sm:py-5">
      <div className="relative talent_gradient pl-5 sm:pl-14 pr-5 sm:pr-20 rounded-[16px]">
        {/* back icon */}
        <FaAngleLeft
          color="white"
          className="absolute top-4 sm:top-5 left-3 sm:left-5"
          size={24}
          onClick={() => router.back()}
        />
        <div className="relative top-16 sm:top-20 bg-white shadow rounded-xl w-full px-4 sm:px-10 py-6 sm:py-12">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
            {/* Profile picture - in its own div */}
            <div className="shrink-0 flex justify-center sm:justify-start">
              <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-full">
                <Image
                  src={talent?.avatar || "/Images/camera.png"}
                  fill
                  className="object-cover rounded-full"
                  alt="talent-img"
                />
              </div>
            </div>
            
            {/* Main content */}
            <div className="w-full">
              <div>
                {/* Name, verification status, and rating */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5">
                    <h1 className="text-xl sm:text-2xl font-semibold text-primaryBlue">
                      {`${talent?.first_name} ${talent?.last_name}`}
                    </h1>
                    <div className="flex items-center">
                      <div className="h-2 sm:h-3 w-2 sm:w-3 rounded-full mr-2 bg-green-500"></div>
                      <span className="text-sm sm:text-base">{talent?.is_verified === true ? "Verified" : "Not Verified"}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaStar color="#FFAC33" />
                    <FaStar color="#FFAC33" />
                    <FaStar color="#FFAC33" />
                    <FaStar color="#FFAC33" />
                    <FaStar color="#FFAC33" />
                    <p className="text-sm sm:text-base">(5)</p>
                  </div>
                </div>
              </div>
              
              {/* Availability status and book button */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-3 sm:mt-5 gap-3 sm:gap-0">
                <div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full mr-2 bg-green-500"></div>
                    <span className="text-sm sm:text-base">Available for work</span>
                  </div>
                </div>
                <Link href={"/dashboard/bookings/payments"}>
                  <button className="btnOne max-w-full sm:max-w-[150px] w-full sm:w-auto">Book Now</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white mt-20 sm:mt-28 px-4 sm:px-8 py-6 sm:py-10">
        {/* Tabs */}
        <div className="flex items-center gap-5 mb-3 overflow-x-auto">
          <p
            onClick={() => setTab(1)}
            className={`pb-1 cursor-pointer whitespace-nowrap text-sm sm:text-base ${
              tab === 1 && "text-primaryBlue"
            }`}
          >
            Details
          </p>
          <p
            onClick={() => setTab(2)}
            className={`pb-1 cursor-pointer whitespace-nowrap text-sm sm:text-base ${
              tab === 2 && "text-primaryBlue pb-1"
            }`}
          >
            Reviews
          </p>
        </div>
        
        {/* Details tab content */}
        {tab === 1 && (
          <div className="bg-white shadow-lg px-3 sm:px-5 pt-3 pb-6 sm:pb-8">
            <div className="px-3 sm:px-5 py-5 sm:py-8 shadow">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                <div className="bg-orangeLight px-4 sm:px-5 py-5 sm:py-7">
                  <p className="text-orangeDark text-sm sm:text-base">
                    {serviceDetail?.service_desc || ""}
                  </p>
                </div>
                <div className="px-4 sm:px-5 py-5 sm:py-7">
                  <p className="font-semibold text-sm sm:text-base">Years of experience</p>
                  <p className="mt-2 sm:mt-3 text-sm sm:text-base">{serviceDetail?.experience_years || "nill"}</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-10 mt-5 sm:mt-8">
                <p className="text-lg sm:text-xl font-semibold">Skills set</p>
                <div className="flex flex-wrap items-center gap-4 sm:gap-7">
                  <div className="flex items-center gap-2">
                    <FaCheckCircle color="#DF8600" />
                    <p className="text-sm sm:text-base capitalize">{serviceDetail?.service_type}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Available Hours section */}
            <div className="px-3 sm:px-5 py-5 sm:py-8 shadow mt-4 sm:mt-6">
              <p className="text-lg sm:text-xl mb-4 sm:mb-6">Available Hours</p>
              <div className="grid grid-cols-3 sm:grid-cols-7 gap-3 sm:gap-6">
                {DAYS_OF_WEEK.map((day) => (
                  <div key={day} className="flex flex-col items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 bg-orangeLight text-orangeDark flex items-center justify-center rounded-full text-sm sm:text-base">
                      {day.charAt(0)}
                    </div>
                    <p className="text-xs sm:text-sm">{day.slice(0, 3)}</p>
                    <p className="text-xs sm:text-sm text-center">{`${serviceAvailability[day.toLowerCase()]?.start} - ${serviceAvailability[day.toLowerCase()]?.end}`}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Images section */}
            <div className="px-3 sm:px-5 py-5 sm:py-8 shadow mt-4 sm:mt-6">
              <p className="text-lg sm:text-xl mb-4 sm:mb-6">Images</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-8 mt-4 sm:mt-8">
                {serviceImages.map((img, index) => (
                  <div key={index} className="relative h-32 sm:h-40 w-full sm:w-40">
                    <Image
                      src={img?.url}
                      fill
                      className="object-cover"
                      alt="service-img"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Reviews tab content */}
        {tab === 2 && (
          <div className="bg-white shadow-lg px-3 sm:px-5 pt-3 pb-6 sm:pb-8">
            {/* First review */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center py-3 px-3 sm:px-4 gap-3 sm:gap-5">
              <div className="shrink-0 mx-auto sm:mx-0">
                <div className="relative h-16 w-16 sm:h-24 sm:w-24 rounded-full">
                  <Image
                    src={`/Images/hero1.png`}
                    fill
                    className="object-cover rounded-full"
                    alt="talent-img"
                  />
                </div>
              </div>
              <div className="w-full">
                <div className="py-2 sm:py-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-2 sm:mb-3">
                    <h1 className="font-semibold text-center sm:text-left text-sm sm:text-base">Daniella Doe</h1>
                    <div className="flex items-center justify-center sm:justify-start gap-1">
                      <FaStar size={14} color="#FFAC33" />
                      <FaStar size={14} color="#FFAC33" />
                      <FaStar size={14} color="#FFAC33" />
                      <FaStar size={14} color="#FFAC33" />
                      <FaStar size={14} color="#FFAC33" />
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-center sm:text-left">
                    I love that you did your job perfectly.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Second review */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center py-3 px-3 sm:px-4 gap-3 sm:gap-5 mb-2 pb-3 border-t">
              <div className="shrink-0 mx-auto sm:mx-0">
                <div className="relative h-16 w-16 sm:h-24 sm:w-24 rounded-full">
                  <Image
                    src={`/Images/hero1.png`}
                    fill
                    className="object-cover rounded-full"
                    alt="talent-img"
                  />
                </div>
              </div>
              <div className="w-full">
                <div className="py-2 sm:py-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-2 sm:mb-3">
                    <h1 className="font-semibold text-center sm:text-left text-sm sm:text-base">Daniella Doe</h1>
                    <div className="flex items-center justify-center sm:justify-start gap-1">
                      <FaStar size={14} color="#FFAC33" />
                      <FaStar size={14} color="#FFAC33" />
                      <FaStar size={14} color="#FFAC33" />
                      <FaStar size={14} color="#FFAC33" />
                      <FaStar size={14} color="#FFAC33" />
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-center sm:text-left">
                    Impressive performance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
      )}
    </div>
  );
}

export default TalentDetails;
