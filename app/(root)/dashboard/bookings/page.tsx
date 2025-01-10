"use client";

import { BookingColumns, BookingType } from "@/components/columns/Columns";
import BookingCard from "@/components/overview/BookingCard";
import DataTable from "@/components/ui/gen/DataTable";
import PageSpinner from "@/components/ui/PageSpinner";
import { handleUnauthorizedError } from "@/lib/utils";
import { getAllBookings } from "@/services/bookingService";
import { showToast } from "@/store/auth/toastSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Bookings() {
  const user = useSelector((state: any) => state.auth.user);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const [bookingType, setBookingType] = useState("");

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

  const changeType = (val: any) => {
    setBookingType(val);
  };

  useEffect(() => {
    fetchBookings(user.id);
  }, [bookingType]);

  return (
    <div>
      <div className="w-full space-y-6">
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col space-y-3">
            <p className="text-3xl text-black font-bold">
              Hello {user.first_name}👋
            </p>
            <p className="text-[#6C727F]">
              Ready to book? We’ve got you covered.
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row  gap-4">
          <BookingCard bookingPage={true} />
        </div>
        <h1 className="font-medium text-2xl">Bookings</h1>
        <div>
          <div className="card min-h-[250px]">
            {loading ? (
              <PageSpinner />
            ) : (
              <DataTable
                columns={BookingColumns}
                title="Bookings"
                data={bookings}
                isRole={true}
                isSort={true}
                changeType={changeType}
                bookingType={bookingType}
                path="/dashboard/bookings/"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
