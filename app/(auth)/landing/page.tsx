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
import { setLoggedin, setUser } from "@/store/auth/authSlice";

export default function Home() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const fetchServices = async () => {
    setLoading(true);
    const response = await getServices();
    if (!response.error) {
      setLoading(false);
      // ask Paul to modify this object to add the name and value
      dispatch(setAllServices(response.data));
    } else {
      setLoading(false);
      // return dispatch(
      //   showToast({
      //     status: "error",
      //     message: response.data.message,
      //   })
      // );
    }
  };


  useEffect(() => {
  // reset user info
    dispatch(setUser({}))
    dispatch(setLoggedin(false))

    fetchServices()
  }, [])
  
  return (
    <div>
     
      <div>
        <Hero />
        <Preview />
        <HowItWorks />
        <ApplyHere />
       
        <Footer />
      </div>
      
    </div>
  );
}
