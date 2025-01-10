"use client";

import { handleUnauthorizedError } from "@/lib/utils";
import { findProviders } from "@/services/bookingService";
import { showToast } from "@/store/auth/toastSlice";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function DashboardTalentsHome() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  // const params = useSearchParams();
  // const userId = params.get("id");

  // const getProviders = async () => {
  //   const response = await findProviders(userId);
  //   if (!response.error) {
  //     console.log("Talent", response);
  //   } else {
  //     setLoading(false);
  //     handleUnauthorizedError(response, dispatch, router, showToast);
  //   }
  // };

  useEffect(() => {
    // getProviders();
  }, []);
  return (
    <div className="py-5 bg-bgWhite">
      {/* header */}
      <div>
        <h1 className="text-3xl font-semibold text-center">
          Available talents for hire
        </h1>
        <div className="hidden justify-end mt-5">
          <button className="bg-primaryBlue text-white h-10 px-5">
            Filter
          </button>
        </div>
      </div>
    </div>
  );
}
