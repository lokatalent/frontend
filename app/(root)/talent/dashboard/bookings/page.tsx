"use client"

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

export default function TalentBookings() {
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
      requester_id: "",
      provider_id: id,
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
    <div className="w-full space-y-6">
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
              path="talent/dashboard/bookings/"
              talent={true}
            />
          )}
        </div>
      </div>
    </div>
  );
}
