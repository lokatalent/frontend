"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const BookingCard = ({ bookingPage }: { bookingPage?: boolean }) => {
  const router = useRouter();
  return (
    <div
      className={`w-full ${
        !bookingPage && "md:w-1/2"
      } bg-booking-card bg-[#4787F3] shadow-lg p-4 pl-6  border border-neutral-50 rounded-2xl flex flex-col  items-center`}
    >
      <div
        className={`flex flex-col ${
          bookingPage &&
          "md:grid md:grid-cols-2 md:items-center md:gap-20 md:py-5 md:px-10"
        } justify-between w-full mb-3`}
      >
        <div className={`${bookingPage && "max-w-xl"}`}>
          <p className={`text-2xl pt-0  font-bold text-white`}>
            Make a booking
          </p>
          <p className="text-sm  text-white pr-8 mt-4">
            Choose from a variety of trusted services whether you need a skilled
            driver, professional cleaners, or other reliable solutions
          </p>
        </div>
        <div className="flex pt-5 gap-2">
          <Button
            onClick={() => router.push("/dashboard/bookings/select-service")}
            size={"lg"}
            className={`bg-white text-primaryBlue w-full h-14 max-w-xs hover:bg-gray-50`}
          >
            Book {!bookingPage && <FaArrowRight className="ml-2" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
