"use client";

import { BookingColumns, type BookingType } from "@/components/columns/Columns";
import InfoCard from "@/components/InfoCard";
import DataTable from "@/components/ui/gen/DataTable";
import PageSpinner from "@/components/ui/PageSpinner";
import { setToken } from "@/components/utils";
import {
  handleUnauthorizedError,
  errorHandler,
  formatNairaNumber
} from "@/lib/utils";
import { verifyUser } from "@/services/authService";
import { getAllBookings } from "@/services/bookingService";
import { getUserWallet } from "@/services/profileService";
import { setUser } from "@/store/auth/authSlice";
import { showToast } from "@/store/auth/toastSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { IoWalletOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state: any) => state.auth.user);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const [bookingType, setBookingType] = useState("");
  const [userWallet, setUserWallet] = useState({});
  const BookingData: any = [];

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

  const onVerifyUser = async () => {
    const response = await verifyUser();
    if (!response.error) {
      dispatch(
        showToast({
          status: "success",
          message: "Your account has been verified successfully",
        })
      );
      let data = response.data;
      console.log(data);
      // save tokens
      setToken(data.tokens.access_token, data.tokens.refresh_token);
      dispatch(setUser(data.user));
    } else {
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

  useEffect(() => {
    if (user.is_verified) {
      fetchBookings(user.id);
      fetchWallet();
    } else {
      onVerifyUser();
    }
  }, []);

  useEffect(() => {
    if (user.is_verified) {
      fetchBookings(user.id);
    } else {
      dispatch(
        showToast({
          status: "success",
          message: "Complete your profile to access your account",
        })
      );
      router.push("/talent/dashboard/profile/edit");
    }
  }, [bookingType]);

  return (
    <div>
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col space-y-3">
          <p className="text-3xl text-black font-bold">
            Hello {user?.first_name}👋
          </p>
          <p className="text-[#6C727F]">
            Keep track of your bookings and provide top-notch service to your
            clients
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-3 lg:gap-5 w-full py-10">
        <InfoCard
          text="No of Bookings"
          number={bookings.length ?? 0}
          icon={<FaUserGroup color="#8E11F0" />}
          iconColor="#8280FF87"
          comment="No bookings Yet"
          percentColor="#00B69B"
        />
        <InfoCard
          text="Average Ratings"
          number={0}
          iconColor="#FFAC3399"
          icon={<FaStar color="#D38005" />}
          comment="No ratings Yet"
          percentColor="#00B69B"
        />
        <InfoCard
          text="Income Earned"
          number={formatNairaNumber(userWallet?.balance + userWallet?.debits)}
          icon={<IoWalletOutline color="#3377FF" />}
          iconColor="#3377FF87"
          comment="No income earned Yet"
          percentColor="#00B69B"
        />
      </div>

      <h1 className="text-2xl mb-5 font-semibold">Bookings</h1>
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
                talent={true}
              />
              {bookings.length > 0 && (
                <div className="flex justify-center mt-8">
                  <Link
                    href="/talent/dashboard/bookings"
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
  );
};

export default Dashboard;
