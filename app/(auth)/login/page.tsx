"use client";
import LogInAuth from "@/components/auth/LogInAuth";
import { resetAuth } from "@/store/auth/authSlice";
import { resetBooking } from "@/store/profile/bookingSlice";
import { resetProfile } from "@/store/profile/profileSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const LogIn = () => {
  const router = useRouter(); 
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetAuth(), resetBooking(), resetProfile())
  }, []) 

  return (
    <section className="w-full py-5">
      <LogInAuth />
    </section>
  );
};

export default LogIn;
