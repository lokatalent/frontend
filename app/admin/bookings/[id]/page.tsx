"use client";

import React, { useState, useEffect } from "react";
import Detail from "@/components/Details";
import PageSpinner from "@/components/ui/PageSpinner";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { showToast } from "@/store/auth/toastSlice";
import { getBooking } from "@/services/bookingService";
import { getProfile } from "@/services/profileService";
import { handleUnauthorizedError } from "@/lib/utils";

const BookingDetails = ({ params }: { params: { id: string } }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({});
  const [providerData, setProviderData] = useState({});
  const [requesterData, setRequesterData] = useState({});

  const fetchData = async () => {
    setLoading(true);
    const bookingResp = await getBooking(params.id);
    if (!bookingResp.error) {
      setBookingData(bookingResp.data);
      const providerProfileResp = await getProfile(bookingResp?.data?.provider_id);
      const requesterProfileResp = await getProfile(bookingResp?.data?.requester_id);
      if (!providerProfileResp.error) {
        setProviderData(providerProfileResp.data)
      } else {
        setLoading(false);
        if (providerProfileResp.status === 401) {
          handleUnauthorizedError(providerProfileResp, dispatch, router, showToast);
        }
      }

      if (!requesterProfileResp.error) {
        setRequesterData(requesterProfileResp.data);
      } else {
        setLoading(false);
        if (requesterProfileResp.status === 401) {
          handleUnauthorizedError(requesterProfileResp, dispatch, router, showToast);
        }
      }
      setLoading(false);
    } else {
      setLoading(false);
      handleUnauthorizedError(bookingResp, dispatch, router, showToast);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    loading ? (
      // <div>
        <PageSpinner />
      // </div>
    ) : (
      // <div>
        <Detail
          title="Bookings Details"
          bookingData={bookingData}
          customerData={requesterData}
          talentData={providerData}
        />
      // </div>
    )
  );
};

export default BookingDetails;
