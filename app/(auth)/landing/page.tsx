"use client"

import Footer from "@/components/Footer";
import ApplyHere from "@/components/home/ApplyHere";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonial from "@/components/home/Testimonial";
import Preview from "@/components/home/Preview";
import { getServices } from "@/services/bookingService";
import { showToast } from "@/store/auth/toastSlice";
import { setAllServices } from "@/store/profile/bookingSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export default function Home() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const fetchServices = async () => {
    setLoading(true);
    const response = await getServices();
    if (!response.error) {
      setLoading(false);
      dispatch(setAllServices(response.data));
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices()
  }, [])
  return (
    <div>
      <Hero />
      <Preview />
      <HowItWorks />
      <ApplyHere />
      <Footer />
    </div>
  );
}
