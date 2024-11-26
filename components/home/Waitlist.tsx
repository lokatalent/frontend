"use client";

import { addEmailToWaitlist } from "@/services/waitlistService";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import Spinner from "../ui/Spinner";

export default function Waitlist() {
  const [toast, setToast] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (toast) {
      setTimeout(() => {
        setToast("");
        setToastMessage("");
      }, 3500);
    }
  }, [toast]);

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");

  const addUserEmail = async () => {
    if (!email) {
      setToast("error");
      setToastMessage("Email is invalid");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setToast("error");
      setToastMessage("Email is invalid");
      return;
    }
    setLoading(true);
    let response = await addEmailToWaitlist(email);
    if (!response.error) {
      setLoading(false);
      setShowModal(true);
      setEmail("");
    } else {
      setLoading(false);
      setToast("error");
      setToastMessage(
        response.data.message ===
          "User with email or phone number already exist"
          ? "Email has already been added to waitlist"
          : response.data.message
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen waitlist_bg wrap">
      <div className="waitlist_wrap max-w-[760px] xl:max-w-[840px] mx-auto text-center">
        <p className="text-white md:text:lg xl:text-xl font-semibold">
          WELCOME TO LOKATALENT
        </p>
        <h1 className="font-semibold text-white text-3xl md:text-5xl xl:text-[64px] leading-[1.3] mt-4 md:mt-8">
          Quality Home Service On Demand
        </h1>
        <p className="my-6 md:10 text-white md:text-lg xl:text-xl leading-[1.5]">
          Stay ahead of the curve. Join our waitlist to be notified when our
          platform launches, and discover a smarter way to book services.
          Whether you’re a customer or a service provider, we invite you to be a
          part of our community
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-3 mt-6 md:mt-12">
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter your email"
            className="waitlist_input xl:text-xl w-full text-white bg-transparent border border-white px-3 h-12 xl:h-[60px] focus:outline-none rounded-md"
          />
          <button
            onClick={addUserEmail}
            className="shrink-0 bg-white text-primaryBlue h-12 xl:h-[60px] px-5 w-full sm:w-[unset] xl:w-full xl:max-w-[232px] rounded-md xl:text-xl"
          >
            {loading ? <Spinner /> : "Join our waitlist"}
          </button>
        </div>
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-70 modal overflow-y-scroll z-10">
          <div className="w-full flex justify-center overflow-scroll py-5 md:py-10 wrap">
            <div className="bg-white w-full max-w-[650px] rounded-md px-5 md:px-10 py-8">
              <div className="flex justify-end mb-5">
                <FaTimes onClick={() => setShowModal(false)} />
              </div>
              <div className="text-center max-w-[470px] mx-auto">
                <h1 className="text-xl md:text-2xl xl:text-3xl text-textGray5">
                  You have been added to the Waitlist!
                </h1>
                <div className="flex justify-center mt-8 md:mt-14 mb-6">
                  <div className="relative aspect-[117/97] h-14 md:h-24">
                    <Image
                      src={`/Images/waitlist-modal.svg`}
                      fill
                      className="object-contain"
                      alt="waitlist-modal"
                    />
                  </div>
                </div>
                <p className="md:text-lg xl:text-xl mb-6 text-textGray5 md:px-4">
                  We’ll notify you as soon as the platform is ready for you to
                  get started{" "}
                </p>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-primaryBlue text-white h-12 md:h-20 w-full"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* toast */}
      <div>
        {toast && (
          <div
            id="toast-bottom-right"
            className={`fixed flex items-center min-w-[250px] max-w-xs py-4 px-4 space-x-4 text-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-sm shadow top-5 right-5 ${
              toast === "success" ? "bg-primaryBlue text-white" : "bg-red-500"
            }`}
            role="alert"
          >
            <div className="flex w-full justify-between gap-3">
              <p className="font-normal">{toastMessage}</p>
              <div
                className="cursor-pointer mt-1"
                onClick={() => setToast("")}
              >
                <FaTimes color="white" onClick={() => setShowModal(false)} />
                {/* <FontAwesomeIcon icon={faTimes} size="sm" /> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
