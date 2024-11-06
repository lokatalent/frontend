"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa6";



const BookingCard = () => {
  
  return (
    <div className="w-full md:w-1/2 bg-booking-card bg-[#4787F3] shadow-lg p-4 pl-6  border border-neutral-50 rounded-2xl flex flex-col  items-center">
      <div className="flex flex-col justify-between w-full mb-3">
        <p className="text-2xl pt-0  font-bold text-white">Make a booking</p>
        <p className="text-sm  text-white pr-8">
          Lorem ipsum et tet Lorem ipsum et tet Lorem ipsum et tet Lorem ipsum
          et te
        </p>
        <div className="flex pt-5 gap-2">
          <Button size={"lg"} className="bg-white text-primaryBlue">
            Book <FaArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
