"use client";
import ProfileCompletion from "@/components/profile/ProfileCompletion";
import ProfileDetails from "@/components/profile/ProfileDetails";
import { Button } from "@/components/ui/button";
import { RootStateProfile } from "@/store/profile/profileSlice";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ServiceRate from "@/components/talent/profile/ServiceRate";
import ReviewCard from "@/components/talent/profile/ReviewCard";
import Portfolio from "@/components/talent/profile/Portfolio";
import EditServiceRate from "@/components/talent/profile/editing/EditServiceRate";
import EditPortfolio from "@/components/talent/profile/editing/EditPortfolio";
import { getOwnProfile, updateService, UpdateService } from "@/services/profileService";
import { showToast } from "@/store/auth/toastSlice";

interface DataItem {
  title: string;
  value: string;
}

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

export default function Profiles() {
  const dispatch = useDispatch();
  const profileDetails = useSelector(
    (state: RootStateProfile) => state.profile.profileDetails
  );
  const profilePics = useSelector(
    (state: RootStateProfile) => state.profile.profilePics
  );
  const profileInformation = useSelector(
    (state: RootStateProfile) => state.profile.information
  );
  // Fetch user profile data from the server
 

   const [data, setData] = useState([
      { title: "Name", value: profileInformation?.name || "-" },
      { title: "Email Address", value: profileInformation?.email || "-" },
      { title: "Phone Number", value: "09123456789" },
      { title: "Country", value: "-" },
      { title: "State", value: profileDetails?.state || "-" },
      { title: "City", value: profileDetails?.city || "-" },
      { title: "Address", value: profileDetails?.address || "-" },
    ]);
  
    // const data: DataItem[] = ;
  
    useEffect(() => {
      const fetchProfile = async () => {
        const response = await getOwnProfile();
        console.log(response);
        if (response.status === 200) {
          const profileData = response.data;
          setData([
            {
              title: "Name",
              value: `${profileData.first_name} ${profileData.last_name}` || "-",
            },
            { title: "Email Address", value: profileData.email || "-" },
            { title: "Phone Number", value: profileData.phone_num || "-" },
            { title: "Country", value: profileData.country || "-" },
            { title: "State", value: profileData.state || "-" },
            { title: "City", value: profileData.city || "-" },
            { title: "Address", value: profileData.address || "-" },
          ]);
        } else if (response.status === 401) {
          dispatch(
            showToast({
              status: "error",
              message: response.data.message,
            })
          );
        }
      };
  
      fetchProfile();
    }, []);


  const [method, setMethod] = useState("personal");
  const IserviceRate = {
    bankName: "Zenith Bank",
    accountNo: "1234567789",
    rps: "2500",
    rph: "1100",
  };
  const [serviceRate, setServiceRate] = useState(IserviceRate);
  const handleMethodChange = (method: string) => {
    setMethod(method);
  };
  const [portfolioData1, setPortfolioData1] = useState({
    experience: "2",
    bio: "John Smith",
    serviceRadius: "1 - 4km",
    skillsSet: {
      Washing: false,
      Sweeping: true,
      Cleaning: false,
      Driving: false,
      Cooking: true,
    },
  });
  const handleSkillChange = (skill: string, value: boolean) => {
    setPortfolioData1((prevData) => ({
      ...prevData,
      skillsSet: {
        ...prevData.skillsSet,
        [skill]: value,
      },
    }));
  };
  const handleServiceRate = (service) => {
    console.log(service);
    setServiceRate(service);
  };
  const handlePortfolio = async (service) => {
    console.log(service);
    let temp = {
      experience_years: service.experience_years,
      service_type: "",
      service_desc: "",
      rate_per_hour: 0,
      address: ''
    };
    const response = await updateService(temp);
    console.log(response);
    setPortfolioData1((prevSkills) => ({
      ...prevSkills,
      experience: service.experience,
      bio: service.bio,

    }));
  };

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

      <ProfileCompletion addText="You are not done with your profile set up. Complete it now" />

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
          {method === "service" ? (
            <EditServiceRate serviceRateEdited={handleServiceRate} />
          ) : method === "portfolio" ? (
            <EditPortfolio
              portfolioRateEdited={handlePortfolio}
              skills={portfolioData1.skillsSet}
              onSkillChange={handleSkillChange}
            />
          ) : null}
        </div>

        {method === "personal" ? <ProfileDetails details={data} /> : null}
        {method === "portfolio" ? (
          <Portfolio isData={true} data={portfolioData1} />
        ) : null}
        {method === "service" ? (
          <ServiceRate isData={true} data={serviceRate} />
        ) : null}
        {method === "reviews" ? (
          <div className="card divide-y-[2px] divide-gray-300">
            {reviews.length > 1 ? (
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
      </div>
    </div>
  );
}
