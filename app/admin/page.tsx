"use client";

import InfoCard from "@/components/InfoCard";
import { FaRegUser } from "react-icons/fa";
import BookingTable from "@/components/dash/BookingTable";
import TransactionTable from "@/components/dash/TransactionTable";
import { IoMdTrendingUp } from "react-icons/io";
import { IoWalletOutline } from "react-icons/io5";
import PageSpinner from "@/components/ui/PageSpinner";
import { useDispatch } from "react-redux"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { showToast } from "@/store/auth/toastSlice"
import { getAdminDashboard } from "@/services/adminService";
import { getAllBookings } from "@/services/bookingService";
import { handleUnauthorizedError } from "@/lib/utils";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({});
  const [bookings, setBookings] = useState([]);

  const getDashboardData = async() => {
    const response = await getAdminDashboard();
    if (!response.error) {
      setLoading(false);
      setDashboardData(response.data);
    } else {
      setLoading(false);
      handleUnauthorizedError(response, dispatch, router, showToast);
    }
  };
	const fetchBookings = async () => {
    setLoading(true);
    const data = {
      requester_id: "",
      provider_id: "",
      service_type: "",
      booking_type: "",
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

  useEffect(() => {
    getDashboardData();
    fetchBookings();
  }, []);

	return (
    loading ? (
      <div>
        <PageSpinner />
      </div>
    ) : (
      <div className="w-full  ">
        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 justify-between w-full py-10  ">
          <InfoCard
            text="Active Bookings"
            number={dashboardData?.active_bookings}
            icon={<IoWalletOutline color="#8E11F0" />}
            iconColor="#8280FF87"
            arrow={<IoMdTrendingUp color="#00B69B" />}
            comment="Up from Yesterday"
            percent={8.5}
            percentColor="#00B69B"
          />
          <InfoCard
            text="Total Active Users"
            number={dashboardData?.active_users}
            icon={<FaRegUser color="#3377FF" />}
            iconColor="#3377FF87"
            arrow={<IoMdTrendingUp color="#00B69B" />}
            comment="Up from Yesterday"
            percent={8.5}
            percentColor="#00B69B"
          />
          <InfoCard
            text="New Users"
            number={dashboardData?.new_users}
            icon={<IoWalletOutline color="#D38005" />}
            iconColor="#FFAC3399"
            arrow={<IoMdTrendingUp color="#00B69B" />}
            comment="Up from Yesterday"
            percent={8.5}
            percentColor="#00B69B"
          />
        </div>

        <div>
          <BookingTable isHome={true} data={bookings} />
        </div>
        <div>
          <TransactionTable />
        </div>
      </div>
    )
	);
}
