import React from "react";
import ProfileCard from "@/components/notifications/ProfileCard";
import ProfileDetails from "@/components/profile/ProfileDetails";

import { TbCurrencyNaira } from "react-icons/tb";
import { IoCheckmarkCircle } from "react-icons/io5";
import { Button } from "@/components/ui/button";
// import { useParams, useRouter } from "next/navigation";

const data = [
  {
    title: "Booking Type",
    value: "Scheduled Booking",
  },
  {
    title: "Start Date",
    value: "25/03/2024",
  },
  {
    title: "End Date",
    value: "25/03/2024",
  },
  {
    title: "Location",
    value: "Address - 15, aasherifa road, eleyele, Ile-Ife",
  },
  {
    title: "Service Type",
    value: "Indoor Cleaning Service",
  },
  {
    title: "Start Time",
    value: "09:00 AM",
  },
  {
    title: "End Time",
    value: "04:00 PM",
  },
  {
    title: "Task Description",
    value:
      "I need someone to help with cleaning, washing, sweeping and other household cleaning",
  },
];

const NotificationDetail = ({
  params,
}: {
  params: { notificationDetail: string };
}) => {
  // console.log(params.notificationDetail); // send a request to get the notofication details using the params

  // const router = useRouter();
  const profileData = {
    name: "Jayden Cooper",
    occupation: "Indoor Cleaner",
    location: "Ile-Ife, Nigeria",
    status: "Booking Accepted",
  };

  return (
    <div>
      <section className="bg-primaryBg bg-red relative">
        <div className="self-start cursor-pointer absolut top-[10%] sm:top-[1%] md:top-[1%] lg:top-[10%] left-[3%] h-12 w-12">
          <div >
          {/* <div onClick={() => router.back()}> */}
            <svg
              width="35"
              height="35"
              viewBox="0 0 35 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.6924 9.16754L13.458 17.7485L22.0389 23.9829"
                stroke="#212121"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </section>
      <div className="card p-4 space-y-8">
        <ProfileCard
          name={profileData.name}
          occupation={profileData.occupation}
          location={profileData.location}
          status={profileData.status}
        />

        <ProfileDetails details={data} />

        <div className="card flex md:items-center gap-4 flex-col items-start md:flex-row">
          <div className="self-strt">
            <h4 className="text-md">Rate Charged</h4>
            <p className="mt-3 flex items-center text-4xl text-[#DF8600] font-bold">
              <TbCurrencyNaira size={"2.25rem"} />
              100,000
            </p>
          </div>
          <div className="bg-primaryBlue p-6 text-white rounded-md self-star">
            <div className="flex gap-2 items-center">
              <h4 className="text-[12px] text-[hsla(0,0%,100%,0.62)]">
                Payment Status
              </h4>
              <IoCheckmarkCircle size={30} />
            </div>
            <p className="mt-3 text-[16px] ">In Escrow</p>
            <p className="flex items-center text-[12px] flex-wrap max-w-[20rem]">
              In Escrow Your payment has been securely held in escrow. We’ll
              release it once the service is successfully completed to your
              satisfaction
            </p>
          </div>
        </div>

        <div className="!mt-12 flex flex-col sm:flex-row gap-4 ">
          <Button className="text-[#605DEC] bg-[#F6F5FF] hover:bg-primaryBlue hover:text-white border-[#605DEC] border px-14 py-5 text-sm">
            Make a Complaint
          </Button>
          <Button className="bg-primaryBlue px-14 py-5 text-sm border hover:bg-primaryBlue hover:text-white hover:brightness-90">
            Mark Job as Complete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationDetail;
