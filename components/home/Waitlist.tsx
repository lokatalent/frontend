"use client";

import { addEmailToWaitlist } from "@/services/waitlistService";
import Image from "next/image";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function Waitlist() {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [email, setEmail] = useState("");
  const addUserEmail = async () => {
    if (!email) return alert("Email is required");
    setLoading(true);
    let response = await addEmailToWaitlist(email);
    if (!response.error) {
      setLoading(false);
      setShowModal(true);
      setEmail("")
    } else {
      setLoading(false);
      alert("Something went wrong");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen waitlist_bg">
      <div className="waitlist_wrap max-w-[840px] mx-auto text-center">
        <p className="text-white text-xl font-semibold">
          WELCOME TO LOKATALENT
        </p>
        <h1 className="font-semibold text-white text-[64px] leading-[1.3]">
          Quality Home Service On Demand
        </h1>
        <p className="my-5 text-white text-xl leading-[1.5]">
          Stay ahead of the curve. Join our waitlist to be notified when our
          platform launches, and discover a smarter way to book services.
          Whether you’re a customer or a service provider, we invite you to be a
          part of our community
        </p>
        <div className="flex items-center gap-2 mt-12">
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter your email"
            className="waitlist_input text-xl w-full text-white bg-transparent border border-white px-3 h-[60px] focus:outline-none rounded-md"
          />
          <button
            onClick={addUserEmail}
            className="shrink-0 bg-white text-primaryBlue h-[60px] w-full max-w-[232px] rounded-md"
          >
            Join our waitlist
          </button>
        </div>
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-70 modal overflow-y-scroll z-10">
          <div className="w-full flex justify-center overflow-scroll md:py-10">
            <div className="bg-white w-full max-w-[650px] rounded-md px-10 py-8">
              <div className="flex justify-end mb-5">
                <FaTimes onClick={() => setShowModal(false)} />
              </div>
              <div className="text-center max-w-[470px] mx-auto">
                <h1 className="text-3xl">
                  You have been added to the Waitlist!
                </h1>
                <div className="flex justify-center mt-14 mb-6">
                  <div className="relative aspect-[117/97] h-24">
                    <Image
                      src={`/Images/waitlist-modal.svg`}
                      fill
                      className="object-contain"
                      alt="waitlist-modal"
                    />
                  </div>
                </div>
                <p className="text-xl mb-6">
                  You will recieve lorem ipsum lorem ipsum lorem ipsum lor
                </p>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-primaryBlue text-white h-20 w-full"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
