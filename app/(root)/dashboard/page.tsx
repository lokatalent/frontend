"use client";

import { BookingColumns } from "@/components/columns/Columns";
import BalanceCard from "@/components/overview/BalanceCard";
import BookingCard from "@/components/overview/BookingCard";
import DataTable from "@/components/ui/gen/DataTable";
import Modal from "@/components/ui/modal";
import PageSpinner from "@/components/ui/PageSpinner";
import { formatDate, handleUnauthorizedError } from "@/lib/utils";
import { getAllBookings, getServices } from "@/services/bookingService";
import { getUserWallet } from "@/services/profileService";
import { showToast } from "@/store/auth/toastSlice";
import { resetBooking, setAllServices } from "@/store/profile/bookingSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Dashboard() {
  const user = useSelector((state: any) => state.auth.user);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const [bookingType, setBookingType] = useState("");
  const [userWallet, setUserWallet] = useState({});

  // fetch bookings
  const fetchBookings = async (id: any) => {
    setLoading(true);
    const data = {
      requester_id: id,
      provider_id: "",
      service_type: "",
      booking_type: bookingType,
      status: "",
      start_time: "",
      end_time: "",
      start_date: "",
      end_date: "",
    };
    const response: any = await getAllBookings({ data });
    if (!response.error) {
      setLoading(false);
      setBookings(response.data);
    } else {
      setLoading(false);
      handleUnauthorizedError(response, dispatch, router, showToast);
    }
  };

  // fetch services
  const fetchServices = async () => {
    setLoading(true);
    const response = await getServices();
    if (!response.error) {
      setLoading(false);
      dispatch(setAllServices(response.data));
    } else {
      setLoading(false);
      handleUnauthorizedError(response, dispatch, router, showToast);
    }
  };

  // fetch wallet
  const fetchWallet = async () => {
    setLoading(true);
    const response = await getUserWallet();
    if (!response.error) {
      setLoading(false);
      setUserWallet(response.data);
    } else {
      setLoading(false);
      handleUnauthorizedError(response, dispatch, router, showToast);
    }
  };

  // fetch notifications

  const changeType = (val: any) => {
    setBookingType(val);
  };

  // check for active booking
  const [showModal, setShowModal] = useState(false)
  const bookingData = useSelector((state: any) => state.booking.bookingData);
  const cancelBooking = () => {
    dispatch(resetBooking())
    setShowModal(false)
  }

  //  if booking data has an address, show modal asking to complete or cancel booking
  //  and send user to talents page.

  useEffect(() => {
    if (user.email) {
      if (user.is_verified) {
        fetchWallet();
        fetchBookings(user.id);
        fetchServices();
        if(
            (bookingData.status === "open") &&
            (bookingData.payment_status !== "verified") &&
            (bookingData.requester_addr)
          ){
          setShowModal(true);
        }
      } else {
        dispatch(
          showToast({
            status: "success",
            message: "Complete your profile to access your account",
          })
        );
        router.push("/dashboard/profile/edit");
      }
    } else router.push("/login");
  }, [bookingType]);

  return (
    <div>
      <div className="w-full space-y-6 sm:space-y-3">
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col space-y-3">
            <p className="text-3xl text-black font-bold">
              Hello {user?.first_name}👋
            </p>
            <p className="text-[#6C727F]">
              Ready to book? We’ve got you covered.
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-4">
          <BalanceCard text="Balance" number={userWallet?.balance} />
          <BookingCard />
        </div>

        <h1 className="font-medium text-2xl">Bookings</h1>
        <div>
          <div className="card">
            {loading ? (
              <PageSpinner />
            ) : (
              <div>
                <DataTable
                  columns={BookingColumns}
                  title="Bookings"
                  data={bookings}
                  isRole={true}
                  isSort={true}
                  path="/"
                  changeType={changeType}
                  bookingType={bookingType}
                />
                {bookings.length > 0 && (
                  <div className="flex justify-center mt-8">
                    <Link
                      href="/dashboard/bookings"
                      className="px-10 py-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                    >
                      View all bookings
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal isOpen={showModal} onClose={() => {setShowModal(false)}}>
        <div className="w-full">
          <h1 className="font-semibold text-xl">Welcome back, {user.first_name}!</h1>
          <div>
            <p className="mb-4">Complete your booking</p>
            <div className="mb-4">
              <p className="uppercase font-medium text-gray-500 text-xs">Service Type</p>
              <p className="capitalize">{bookingData.service_type}</p>
            </div>
            <div className="mb-4">
              <p className="uppercase font-medium text-gray-500 text-xs">Address</p>
              <p className="capitalize">{bookingData.requester_addr}</p>
            </div>
            <div className="mb-4">
              <p className="uppercase font-medium text-gray-500 text-xs">Date</p>
              <p className="capitalize">{formatDate(bookingData.start_date)}</p>
            </div>
            <div className="mb-4">
              <p className="uppercase font-medium text-gray-500 text-xs">Time</p>
              <p className="capitalize">{(bookingData.start_time)?.slice(0, 5)} - {(bookingData.end_time)?.slice(0, 5)}</p>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={cancelBooking} className="text-sm h-10 px-5 bg-red-500 text-white">Cancel</button>
            <Link href={"/dashboard/bookings/talents"}><button className="text-sm h-10 px-5 bg-primaryBlue text-white">Complete</button></Link>
          </div>
        </div>
      </Modal>
    </div>
  );
}
