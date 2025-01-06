"use client";

import { BookingColumns, BookingType } from "@/components/columns/Columns";
import BookingCard from "@/components/overview/BookingCard";
import DataTable from "@/components/ui/gen/DataTable";
import PageSpinner from "@/components/ui/PageSpinner";
import { getAllBookings } from "@/services/bookingService";
import { showToast } from "@/store/auth/toastSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

async function getData(): Promise<BookingType[]> {
  return [
    {
      id: "12456256565",
      date: "24/4/2022",
      time: "11:35 AM",
      location: "14, Asherifa Juncti.hfhfhf vhf dds hdd dfsd...",
      status: "Pending",
    },
    {
      id: "2565767900",
      date: "24/4/2021",
      time: "11:15 AM",
      location: "14, Asherifa Juncti....",
      status: "Accepted",
    },
    {
      id: "8698767900",
      date: "24/4/2023",
      time: "11:45 PM",
      location: "14, Asherifa Juncti....",
      status: "Declined",
    },
    {
      id: "12456256565",
      date: "24/4/2022",
      time: "11:35 AM",
      location: "14, Asherifa Juncti...",
      status: "Pending",
    },
    {
      id: "2565767900",
      date: "24/4/2021",
      time: "11:15 AM",
      location: "14, Asherifa Juncti....",
      status: "Accepted",
    },
    {
      id: "8698767900",
      date: "24/4/2023",
      time: "11:45 PM",
      location: "14, Asherifa Juncti....",
      status: "Declined",
    },
  ];
}

export default function Bookings() {
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
    const response: any = getAllBookings({ data });
    if (!response.error) {
      setLoading(false);
      setBookings(response.data);
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
  useEffect(() => {
    fetchBookings(user.id);
  }, []);
  return (
    <div>
      {loading ? (
        <PageSpinner />
      ) : (
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
            <div className="card">
              <DataTable
                columns={BookingColumns}
                title="Bookings"
                data={[]}
                isRole={true}
                isSort={true}
                path="/dashboard/bookings/"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
