"use client";

import { BookingColumns } from "@/components/columns/Columns";
import BalanceCard from "@/components/overview/BalanceCard";
import BookingCard from "@/components/overview/BookingCard";
import DataTable from "@/components/ui/gen/DataTable";
import { getAllBookings } from "@/services/bookingService";
import { showToast } from "@/store/auth/toastSlice";
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

  // fetch bookings
  const fetchBookings = (id: any) => {
    setLoading(true);
    const data = {
      requester_id: id,
      provider_id: "",
      service_type: "",
      booking_type: "",
      status: "",
      start_time: "",
      end_time: "",
      start_date: "",
      end_date: "",
    };
    const response: any = getAllBookings(data);
    if (!response.error) {
      console.log("Bookings", response.data);
    } else {
      setLoading(false);
      if (response.status === 401) {
        dispatch(
          showToast({
            status: "error",
            message: response.data.message,
          })
        );
        return router.push("/login");
      }

      return dispatch(
        showToast({
          status: "error",
          message: response.data.message,
        })
      );
    }
  };
  // fetch notifications
  const BookingData: any = [];
  useEffect(() => {
    fetchBookings(user.id);
    // if (user.is_verified) fetchBookings(user.id);
    // else router.push("/dashboard/profile/edit")
  }, []);

  return (
    <div className="w-full space-y-6">
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
        <BalanceCard text="Balance" number={0} />
        <BookingCard />
      </div>

      <h1 className="font-medium text-2xl">Bookings</h1>
      <div>
        <div className="card">
          <DataTable
            columns={BookingColumns}
            title="Bookings"
            data={BookingData}
            isRole={true}
            isSort={true}
            path="/"
          />

          {BookingData.length > 0 && (
            <div className="flex justify-center mt-5">
              <Link
                href="/dashboard/bookings"
                className="px-10 py-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                View all bookings
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
