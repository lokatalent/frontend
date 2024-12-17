"use client";
import ProfileCompletion from "@/components/profile/ProfileCompletion";
import ProfileDetails from "@/components/profile/ProfileDetails";
import { Button } from "@/components/ui/button";
import { RootStateProfile } from "@/store/profile/profileSlice";
import { FaCheckCircle } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Avatar } from "@/components/ui/avatar";
import { BsPlusCircleDotted } from "react-icons/bs";
import ProfilePics from "@/components/ui/gen/ProfilePics";
import { FaStar } from "react-icons/fa";
import { FaPen } from "react-icons/fa6";

import ServiceRate from "@/components/talent/profile/ServiceRate";
import ReviewCard from "@/components/talent/profile/ReviewCard";
import Portfolio from "@/components/talent/profile/Portfolio";

interface DataItem {
  title: string;
  value: string;
}

export default function Profiles() {
  const profileDetails = useSelector(
    (state: RootStateProfile) => state.profile.profileDetails
  );
  const profilePics = useSelector(
    (state: RootStateProfile) => state.profile.profilePics
  );
  const profileInformation = useSelector(
    (state: RootStateProfile) => state.profile.information
  );
  const [method, setMethod] = useState("personal");

  const handleMethodChange = (method: string) => {
    setMethod(method);
  };

  // Fetch user profile data from the server
  const data: DataItem[] = [
    {
      title: "Name",
      value: profileInformation.name,
    },
    {
      title: "Email Address",
      value: profileInformation.email,
    },
    {
      title: "Phone Number",
      value: "09123456789",
    },
    {
      title: "Gender",
      value: "-",
    },
    {
      title: "Country",
      value: "-",
    },
    {
      title: "State",
      value: profileDetails.state.length > 0 ? profileDetails.state : "-",
    },
    {
      title: "City",
      value: profileDetails.city.length > 0 ? profileDetails.city : "-",
    },
    {
      title: "Address",
      value: profileDetails.address.length > 0 ? profileDetails.address : "-",
    },
  ];

  const reviews = [
    {
      name: "Daniella Doe",
      profileImage: "/Images/review.png",
      rating: 4,
      reviewText:
        "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.",
    },
    {
      name: "John Smith",
      profileImage: "/Images/review.png",
      rating: 5,
      reviewText: "Amazing experience, highly recommend!",
    },
  ];

  const activeMethod =
    "rounded-none border-b-2 border-primaryBlue  text-primaryBlue pb-1";

  return (
    <div className="ml-8 h-screen sm:ml-0">
      <div className="h-[10rem] mb-24 w-full bg-gradient-to-r to-[#CCD6B0] from-[#6B705C]">
        <div className="bg-white  translate-y-1/2 w-[80%] mx-auto rounded-md p-6 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="relative flex items-center justify-center bg-[#C4C4C424] shadow-lg p-2 w-[100px] h-[100px] rounded-full">
              {profilePics ? (
                <Image
                  src={profilePics}
                  alt="Profile"
                  layout="fill"
                  className="object-cover rounded-[100px]"
                />
              ) : (
                <Image
                  src="/Images/camera.png"
                  alt="Notification Bing"
                  width={20}
                  height={20}
                />
              )}
              <div className="absolute top-2/4 right-[-10px] flex items-center  justify-center bg-white shadow-lg p-2 w-[30px] h-[30px] rounded-full">
                <Image
                  src="/Images/camera-col.png"
                  alt="Notification Bing"
                  width={20}
                  height={20}
                />
              </div>
            </div>
            <p className="text-primaryBlue text-2xl font-bold">
              Gabriel Daramola
            </p>
          </div>
        </div>
        <div></div>
      </div>

      <ProfileCompletion />

      <div className="card mt-12">
        <div className="flex items-center mb-8 justify-between">
          <div className="flex flex-row space-x-6 text-sm">
            <div>
              <Button
                className={`${
                  method === "personal" ? activeMethod : ""
                } hover:no-underline `}
                variant="link"
                onClick={() => handleMethodChange("personal")}
              >
                Personal Information
              </Button>
            </div>
            <div>
              <Button
                className={`${
                  method === "portfolio" ? activeMethod : ""
                } hover:no-underline `}
                variant="link"
                onClick={() => handleMethodChange("portfolio")}
              >
                Portfolio
              </Button>
            </div>
            <div>
              <Button
                className={`${
                  method === "service" ? activeMethod : ""
                } hover:no-underline `}
                variant="link"
                onClick={() => handleMethodChange("service")}
              >
                Service Rate/Payment
              </Button>
            </div>
            <div>
              <Button
                className={`${
                  method === "reviews" ? activeMethod : ""
                } hover:no-underline `}
                variant="link"
                onClick={() => handleMethodChange("reviews")}
              >
                Reviews
              </Button>
            </div>
          </div>
          {method === "portfolio" ||
            method === "service" ? (
              <div className="bg-[#F5F5F5] rounded-full h-8 w-8 flex-center mr-10 ">
                <FaPen color="#3377FF" size={10} />
              </div>
            ): null}
        </div>

        {method === "personal" ? <ProfileDetails details={data} /> : null}
        {method === "portfolio" ? (
          <Portfolio isData={true} data={null} />
        ) : null}
        {method === "service" ? (
          <ServiceRate isData={false} data={null} />
        ) : null}
        {method === "reviews" ? (
          <div className="card divide-y-[2px] divide-gray-300">
            {reviews.length > 3 ? (
              <div>
                {reviews.map((review, index) => (
                  <ReviewCard
                    key={index}
                    name={review.name}
                    profileImage={review.profileImage}
                    rating={review.rating}
                    reviewText={review.reviewText}
                  />
                ))}
              </div>
            ) : (
              <div className="flex-center flex-col">
                <Image
                  src={"/Images/emptyReview.png"}
                  alt="empty Review"
                  width={200}
                  height={200}
                />
                <p>No Reviews yet!!</p>
              </div>
            )}
          </div>
        ) : null}

        {/* <div className="card">
          <div className="flex items-center bg-white shadow-md space-x-6 rounded-lg p-4">
            <div className="">
              <ProfilePics isProfile={"/Images/review.png"} isEdit={false} />
            </div>
            <div>
              <div className="flex justify-between items-start text-gray-800">
                <p className="text-xl">Daniella Doe</p>
                <div className="flex space-x-1 items-center mt-2">
                  <FaStar color="#FFAC33" />
                  <FaStar color="#FFAC33" />
                  <FaStar color="#FFAC33" />
                  <FaStar color="#FFAC33" />
                  <FaStar color="#D6DDEB" />
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                lorem ipsum
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
