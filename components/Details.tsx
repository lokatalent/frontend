"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectGroup,
  SelectValue,
} from "./ui/select"; 
import Image from "next/image";
import { TbCurrencyNaira } from "react-icons/tb";
import { IoCheckmarkCircle } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa6";
import ContactDialog from "./ContactDialog";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { showToast } from "@/store/auth/toastSlice";
import { bookingStatusMap, PaymentStatus } from "@/lib/constants"
import { updateBookingStatus } from "@/services/bookingService";

interface DetailProps {
  title: string;
  bookingData: any;
  customerData: any;
  talentData: any;
}

export default function Detail(
  {
    title,
    bookingData,
    customerData,
    talentData
  }: DetailProps
) {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleBookingStatusUpdate = async (id: string, newStatus: string) => {
    const response = await updateBookingStatus({id: id, status: newStatus});
    if (!response.error) {
      dispatch(
        showToast({
          status: "success",
          message: `Marked as ${newStatus}`
        })
      );
    } else {
      handleUnauthorizedError(response, dispatch, router, showToast);
    }
  };

  const getPaymentStatus = (paymentStatus: any, bookingStatus: any) => {
    if (paymentStatus === PaymentStatus.PAYMENT_STATUS_VERIFIED) {
      if (bookingStatus === "completed") {
        return (
          <div className="bg-primaryBlue p-6 text-white rounded-md self-star">
            <div className="flex gap-2 items-center">
              <h4 className="text-[12px] text-[hsla(0,0%,100%,0.62)]">
                Payment Status
              </h4>
              <IoCheckmarkCircle size={30} />
            </div>
            <p className="mt-3 text-[16px] ">In Escrow</p>
            <p className="flex items-center text-[12px] flex-wrap max-w-[20rem]">
              Your booking has been completed successfully. You have successfully paid the service provider.
            </p>
          </div>
        );
      }
      return (
        <div className="bg-primaryBlue p-6 text-white rounded-md self-star">
          <div className="flex gap-2 items-center">
            <h4 className="text-[12px] text-[hsla(0,0%,100%,0.62)]">
              Payment Status
            </h4>
            <IoCheckmarkCircle size={30} />
          </div>
          <p className="mt-3 text-[16px] ">In Escrow</p>
          <p className="flex items-center text-[12px] flex-wrap max-w-[20rem]">
            In Escrow, payment has been securely held in escrow. We’ll
            release it once the service is successfully completed.
          </p>
        </div>
      );
    }
    if (paymentStatus === PaymentStatus.PAYMENT_STATUS_CANCELED) {
      return (
        <div className="bg-primaryBlue p-6 text-white rounded-md self-star">
          <div className="flex gap-2 items-center">
            <h4 className="text-[12px] text-[hsla(0,0%,100%,0.62)]">
              Payment Status
            </h4>
            <IoCloseCircle size={30} />
          </div>
          <p className="mt-3 text-[16px] ">Canceled</p>
          <p className="flex items-center text-[12px] flex-wrap max-w-[20rem]">
            Payment canceled.
          </p>
        </div>
      );
    }
  };

  return (
    <div className="mt-12 sm:ml-0 md:mx-8">
      <div>
        <div className="flex gap-3 items-center">
          <FaArrowLeft size={24} onClick={() => router.back()} />
          <h1 className="font-medium text-2xl">{title}</h1>
        </div>
      </div>
      <div className="card my-5 flex flex-col gap-12">
        <div
          className={`px-2 py-2 flex items-center  gap-2 justify-center w-[90px] rounded-md text-sm font-medium bg-[#FFAC321] rounded-3xl ${
            bookingData?.status === "accept" || bookingData?.status === "completed"
              ? "bg-accept "
              : bookingData?.status === "in_progress"
              ? "bg-yellow "
              : "bg-red-100 "
          }`}
        >
          <div className={`h-[7px] w-[7px] rounded-[100%] bg-primary `}></div>
          {bookingStatusMap.get(bookingData?.status)}
        </div>
        <div className="flex justify-between mt-8 flex-wrap flex-col gap-8  md:flex-col md:gap-8 lg:flex-row">
          <div className="flex items-center gap-[1.4rem] flex-wrap">
            <div className="flex gap-[1.4rem] items-center">
              <div className="w-[90px] h-[90px]">
                <Image
                  src={customerData?.avatar || "/Images/camera.png"}
                  alt=""
                  className="w-full h-full object-cover"
                  width={50}
                  height={50}
                />
              </div>
              <div>
                <h4>{`${customerData?.first_name} ${customerData?.last_name}`}</h4>
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-[7px] w-[7px] rounded-[100%] bg-[#115F04]"></div>
                  Customer
                </div>
              </div>
            </div>
            {/* <div className="w-[100px] h-[1px] bg-[hsla(36,100%,44%,1)]"></div> */}
            <div className="relative w-[100px] h-[20px]">
              <div className="absolute w-[100px] h-[2px] bg-orange-500 top-1/2 transform -translate-y-1/2"></div>
              <div className="absolute w-[10px] h-[10px] bg-orange-500 rounded-full right-0 top-1/2 transform -translate-y-1/2"></div>
            </div>
            <div className="flex gap-[1.4rem] items-center">
              <div className="w-[90px] h-[90px]">
                <Image
                  src={talentData?.avatar || "/Images/camera.png"}
                  alt=""
                  className="w-full h-full object-cover"
                  width={50}
                  height={50}
                />
              </div>
              <div>
                <h4>{`${talentData?.first_name} ${talentData?.last_name}`}</h4>
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-[7px] w-[7px] rounded-[100%] bg-[#115F04]"></div>
                  Talent
                </div>
              </div>
            </div>
          </div>
          <div>
            <Select onValueChange={(newStatus: string) => handleBookingStatusUpdate(bookingData?.id, newStatus)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Update Booking Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    value="completed"
                    className="bold leading-none text-violet11 hover:font-bold hover:text-[#3377FF] hover:bg-[#3377FF3D] rounded-[7px] flex items-center h-[35px]"
                  >
                    Mark as Complete
                  </SelectItem>
                  <SelectItem
                    value="canceled"
                    className="bold leading-none text-violet11 hover:font-bold hover:text-[#3377FF] hover:bg-[#3377FF3D] rounded-[7px] flex items-center h-[35px]"
                  >
                    Mark as Canceled
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-1">
          <div>
            <h4 className="text-[12px] text-[#212121B2]">Booking Type</h4>
            <p className="mt-2 flex items-center">{bookingData?.booking_type}</p>
          </div>
          <div>
            <h4 className="text-[12px] text-[#212121B2]">Start Date</h4>
            <p className="mt-2 flex items-center">{bookingData?.start_date}</p>
          </div>
          <div>
            <h4 className="text-[12px] text-[#212121B2]">End Date</h4>
            <p className="mt-2 flex items-center">{bookingData?.end_date}</p>
          </div>
          <div>
            <h4 className="text-[12px] text-[#212121B2]">Location</h4>
            <p className="mt-2 flex items-center">{bookingData?.requester_addr}</p>
          </div>
          <div className="">
            <h4 className="text-[12px] text-[#212121B2]">Service Type</h4>
            <p className="mt-2 flex items-center">{bookingData?.service_type}</p>
          </div>
          <div>
            <h4 className="text-[12px] text-[#212121B2]">Start Time</h4>
            <p className="mt-2 flex items-center">{bookingData?.start_time}</p>
          </div>
          <div>
            <h4 className="text-[12px] text-[#212121B2]">End Time</h4>
            <p className="mt-2 flex items-center">{bookingData?.end_time}</p>
          </div>
        </div>
        <div className="flex md:items-center gap-4 flex-col items-start md:flex-row">
          <div className="self-strt">
            <h4 className="text-[12px]">Amount</h4>
            <p className="mt-3 flex items-center text-4xl text-[#DF8600] font-bold">
              <TbCurrencyNaira size={"2.25rem"} />
              {bookingData?.total_price}
            </p>
          </div>
          {getPaymentStatus(bookingData?.payment_status, bookingData?.status)}
        </div>
      </div>
    </div>
  );
};
