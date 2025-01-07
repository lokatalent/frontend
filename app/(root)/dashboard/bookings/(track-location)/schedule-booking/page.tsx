"use client";

import ScheduleBooking from "@/components/location/ScheduleBooking";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { RxCaretRight } from "react-icons/rx";
import { TbCircleNumber2, TbCircleNumber3Filled } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
  const router = useRouter();
  const service = useSelector((state: any) => state.booking.service);
  const location = useSelector((state: any) => state.booking.location);

  useEffect(() => {
    if (!service) return router.push("/dashboard/bookings/select-service");
    if (!location) return router.push("/dashboard/bookings/location");
  }, []);

  return (
    <div className="bg-bgWhite  ">
      <div className="flex flex-col justify-center mx-auto ">
        <div className="my-4">
          <div className="flex flex-row justify-center space-x-4 items-center">
            <p className="flex flex-row  space-x-3 items-center">
              <span>
                <FaCircleCheck size={28} style={{ fill: "#3377FF" }} />
              </span>
              <span>Location</span>
            </p>
            <RxCaretRight size={20} />
            <p className="flex flex-row  space-x-3 items-center">
              <span>
                <TbCircleNumber2
                  size={28}
                  style={{ color: "#3377FF", borderColor: "#3377FF" }}
                />
              </span>
              <span className="">Details</span>
            </p>
            <RxCaretRight size={20} />
            <p className="flex flex-row  space-x-3 items-center">
              <span>
                <TbCircleNumber3Filled
                  size={28}
                  style={{ color: "#9EA3AEF", fill: "#3377FF99" }}
                />
              </span>
              <span className="text-textGray3">Payment</span>
            </p>
          </div>
        </div>
        <div className="">
          <h1 className="font-semibold text-3xl mt-5 mb-2 text-center">
            Schedule a Booking Now
          </h1>
          <p className="text-center">Enter details about your booking</p>
        </div>
        <ScheduleBooking />
      </div>
    </div>
  );
};

export default page;
