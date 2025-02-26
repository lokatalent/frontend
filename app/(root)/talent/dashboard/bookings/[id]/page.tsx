"use client"

import React, { useEffect, useState } from "react";
import ProfileCard from "@/components/notifications/ProfileCard";
import ProfileDetails from "@/components/profile/ProfileDetails";
import PageSpinner from "@/components/ui/PageSpinner";

import { TbCurrencyNaira } from "react-icons/tb";
import {
  IoCheckmarkCircle,
  IoCloseCircle,
  IoSyncCircleSharp
} from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  getBooking,
  acceptBooking,
  rejectBooking,
  verifyPayment
} from "@/services/bookingService";
import { getProfile } from "@/services/profileService";
import { useDispatch } from "react-redux"
import { showToast } from "@/store/auth/toastSlice"
import { handleUnauthorizedError } from "@/lib/utils";
import { bookingStatusMap, PaymentStatus } from "@/lib/constants"

const NotificationDetail = ({
  params,
}: {
  params: { id: string };
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [currentBookingStatus, setCurrentBookingStatus] = useState("");
  const [bookingData, setBookingData] = useState([]);
  const [bookingResp, setBookingResp] = useState({});
  const [requesterData, setRequesterData] = useState({});

  const fetchData = async () => {
    setLoading(true);
    const response = await getBooking(params.id);
    if (!response.error) {
      if (response.data?.payment_status === PaymentStatus.PAYMENT_STATUS_PENDING) {
        const paymentResp = await verifyPayment({booking_id: params.id})
        if (!paymentResp.error) {
          response.data.payment_status = paymentResp.data?.status
        } else {
          handleUnauthorizedError(paymentResp, dispatch, router, showToast);
        }
      }
      setBookingResp(response.data);
      const data = [
        {
          title: "BookingType",
          value: response.data.booking_type,
        },
        {
          title: "Start Date",
          value: response.data.start_date,
        },
        {
          title: "End Date",
          value: response.data.end_date,
        },
        {
          title: "Location",
          value: response.data.requester_addr,
        },
        {
          title: "Service Type",
          value: response.data.service_type,
        },
        {
          title: "Start Time",
          value: response.data.start_time,
        },
        {
          title: "End Time",
          value: response.data.end_time,
        },
        {
          title: "Task Description",
          value: response.data.service_desc,
        }
      ];
      setBookingData(data);
      setCurrentBookingStatus(response.data.status);
      const profileResp = await getProfile(response.data.requester_id)
      if (!profileResp.error) {
        const reqData = {
          name: `${profileResp.data.first_name} ${profileResp.data.last_name}`,
          location: response.data.requester_addr.split(",").splice(-3).join(", "),
          status: bookingStatusMap.get(response.data.status),
          avatar: profileResp.data.avatar,
        };
        setRequesterData(reqData);
      } else {
        setLoading(false);
        handleUnauthorizedError(profileResp, dispatch, router, showToast);
      }
      setLoading(false);
    } else {
      setLoading(false);
      handleUnauthorizedError(response, dispatch, router, showToast);
    }
  };

  const handleAcceptBooking = async (id: string) => {
    const response = await acceptBooking(id);
    if (!response.error) {
      dispatch(
        showToast({
          status: "success",
          message: "Booking Accepted"
        })
      );
      // router.refresh();
      // router.reload();
      setCurrentBookingStatus("in_progress");
    } else {
      handleUnauthorizedError(response, dispatch, router, showToast);
    }
  };

  const handleRejectBooking = async (id: string) => {
    const response = await rejectBooking(id);
    if (!response.error) {
      dispatch(
        showToast({
          status: "success",
          message: "Booking Rejected"
        })
      );
      // router.refresh();
      // router.reload();
      setCurrentBookingStatus("reject");
    } else {
      handleUnauthorizedError(response, dispatch, router, showToast);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentBookingStatus]);

  return (
    loading ? (
      <div>
        <PageSpinner />
      </div>
    ) : (
      <div>
        <section className="bg-primaryBg bg-red relative">
          <div className="self-start cursor-pointer absolut top-[10%] sm:top-[1%] md:top-[1%] lg:top-[10%] left-[3%] h-12 w-12">
            <div onClick={() => router.back()}>
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
            name={requesterData?.name}
            occupation=""
            location={requesterData?.location}
            status={requesterData?.status}
            avatar={requesterData?.avatar}
          />

          <ProfileDetails details={bookingData} />

          <div className="card flex md:items-center gap-4 flex-col items-start md:flex-row">
            <div className="self-strt">
              <h4 className="text-md">Rate Charged</h4>
              <p className="mt-3 flex items-center text-4xl text-[#DF8600] font-bold">
                <TbCurrencyNaira size={"2.25rem"} />
                {bookingResp?.actual_price}
              </p>
            </div>
            {getPaymentStatus(bookingResp?.payment_status)}
          </div>
          {(bookingResp?.status === "open") && (
            <div className="!mt-12 flex flex-col sm:flex-row gap-4 ">
              <Button 
                className="text-[#605DEC] bg-[#F6F5FF] hover:bg-primaryBlue hover:text-white border-[#605DEC] border px-14 py-5 text-sm"
                onClick={() => handleRejectBooking(bookingResp?.id)}
              >
                Reject Booking
              </Button>
              <Button 
                className="bg-primaryBlue px-14 py-5 text-sm border hover:bg-primaryBlue hover:text-white hover:brightness-90"
                onClick={() => handleAcceptBooking(bookingResp?.id)}
              >
                Accept Booking
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  );
};

function getPaymentStatus(paymentStatus: any, bookingStatus: any) {
  if (status === PaymentStatus.PAYMENT_STATUS_VERIFIED) {
    if (bookingStatus === "completed") {
      return (
        <div className="bg-primaryBlue p-6 text-white rounded-md self-star">
          <div className="flex gap-2 items-center">
            <h4 className="text-[12px] text-[hsla(0,0%,100%,0.62)]">
              Payment Status
            </h4>
            <IoCheckmarkCircle size={30} />
          </div>
          <p className="mt-3 text-[16px] ">Payment Sent</p>
          <p className="flex items-center text-[12px] flex-wrap max-w-[20rem]">
            This booking has been completed successfully. The service provider has been paid.
          </p>
        </div>
      );
    }
    if (bookingStatus === "canceled") {
      return (
        <div className="bg-primaryBlue p-6 text-white rounded-md self-star">
          <div className="flex gap-2 items-center">
            <h4 className="text-[12px] text-[hsla(0,0%,100%,0.62)]">
              Payment Status
            </h4>
            <IoCheckmarkCircle size={30} />
          </div>
          <p className="mt-3 text-[16px] ">Refunded</p>
          <p className="flex items-center text-[12px] flex-wrap max-w-[20rem]">
            This booking has been canceled. The requester has been refunded.
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
  if (status === PaymentStatus.PAYMENT_STATUS_CANCELED) {
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

  return (
    <div className="bg-primaryBlue p-6 text-white rounded-md self-star">
      <div className="flex gap-2 items-center">
        <h4 className="text-[12px] text-[hsla(0,0%,100%,0.62)]">
          Payment Status
        </h4>
        <IoSyncCircleSharp size={30} />
      </div>
      <p className="mt-3 text-[16px] ">Pending</p>
      <p className="flex items-center text-[12px] flex-wrap max-w-[20rem]">
        Payment is pending...
      </p>
    </div>
  );
};

export default NotificationDetail;
