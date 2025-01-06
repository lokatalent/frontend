"use client";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Image from "next/image";

import ServiceRate from "@/components/talent/profile/ServiceRate";
import ReviewCard from "@/components/talent/profile/ReviewCard";
import PortfolioView from "@/components/talent/profile/PortfolioView";
import EditServiceRate from "@/components/talent/profile/editing/EditServiceRate";
import EditPortfolio from "@/components/talent/profile/editing/EditPortfolio";
import ProfileDetails from "@/components/profile/ProfileDetails";
import ProfileCompletion from "@/components/profile/ProfileCompletion";
import {
  RootStateTalentService,
  setService,
} from "@/store/talent/service/TalentServiceSlice";
import { Button } from "@/components/ui/button";
import { getBankProfile, getOwnProfile } from "@/services/profileService";
import { getAllService, getService } from "@/services/services";
import { showToast } from "@/store/auth/toastSlice";
import { errorHandler } from "@/lib/utils";
import { RootStateProfile } from "@/store/profile/profileSlice";
import {
  RootStateTalentProfile,
  setBankDetailsData,
} from "@/store/talent/profile/TalentProfileSlice";

interface ProfileData {
  title: string;
  value: string;
}

interface SkillSet {
  [key: string]: boolean;
}

interface PortfolioData {
  experience: number;
  bio: string;
  rate_per_hour: number;
  skillsSet: SkillSet;
}

interface ServiceRateData {
  bankName: string;
  accountNo: string;
  rps: string;
  rph: string;
}

const INITIAL_PROFILE_DATA: ProfileData[] = [
  { title: "Name", value: "-" },
  { title: "Email Address", value: "-" },
  { title: "Phone Number", value: "-" },
  // { title: "Country", value: "-" },
  // { title: "State", value: "-" },
  // { title: "City", value: "-" },
  { title: "Address", value: "-" },
];

const MOCK_REVIEWS = [
  {
    name: "Daniella Doe",
    profileImage: "/Images/review.png",
    rating: 4,
    reviewText: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum...",
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
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "personal" | "portfolio" | "service" | "reviews"
  >("personal");
  const [profileData, setProfileData] =
    useState<ProfileData[]>(INITIAL_PROFILE_DATA);

  const { profileDetails, profilePics } = useSelector(
    (state: RootStateProfile) => state.profile
  );
  const { bankDetails } = useSelector(
    (state: RootStateTalentProfile) => state.talentProfile
  );
  const service = useSelector(
    (state: RootStateTalentService) => state.service.service
  );
  const userId = useSelector((state: any) => state.auth.user.id);
  const userBio = useSelector((state: any) => state.auth.user.bio);
  const avatar = useSelector((state: any) => state.auth.user.avatar);

  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    experience: +service?.experience_years || 0,
    bio: userBio || "",
    rate_per_hour: service?.rate_per_hour || 0,
    skillsSet: {
      Washing: service?.service_type === "washing",
      Sweeping: service?.service_type === "sweeping",
      Cleaning: service?.service_type === "cleaning",
      Driving: service?.service_type === "driving",
      Cooking: service?.service_type === "cooking",
    },
  });

  const [serviceRate, setServiceRate] = useState<ServiceRateData>({
    bankName: bankDetails.bank_name,
    accountNo: bankDetails.account_num,
    rps: "",
    rph: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchProfile(), fetchService(), fetchBankDetails()]);
      } catch (error) {
        dispatch(
          showToast({
            status: "error",
            message: "Failed to fetch profile data",
          })
        );
        router.push('/login')
      }
    };

    fetchData();
  }, []);

  const fetchProfile = async () => {
    const response = await getOwnProfile();
    console.log(response);
    if (response.status === 200) {
      const {
        first_name,
        last_name,
        email,
        phone_num,
        country,
        state,
        city,
        address,
        bio,
      } = response.data;
      setProfileData([
        { title: "Name", value: `${first_name} ${last_name}` || "-" },
        { title: "Email Address", value: email || "-" },
        { title: "Phone Number", value: phone_num || "-" },
        // { title: "Country", value: country || "-" },
        // { title: "State", value: state || "-" },
        // { title: "City", value: city || "-" },
        { title: "Address", value: address || "-" },
      ]);
    } else {
      throw new Error(response.data.message);
    }
  };

  const fetchService = async () => {
    const response1 = await getAllService(userId);
   
    const response = await getService({
      id: userId,
      service_type: response1.data[0].service_type,
    });
  
    if (response.status === 200) {
      dispatch(setService(response.data));
    } else {
      throw new Error(errorHandler(response.data));
    }
  };

  const fetchBankDetails = async () => {
    const response = await getBankProfile();
    if (response.status === 200) {
      dispatch(setBankDetailsData(response.data));
    } else {
      throw new Error(errorHandler(response.data));
    }
  };

  const handleSkillChange = (skill: string, value: boolean) => {
    setPortfolioData((prev) => ({
      ...prev,
      skillsSet: { ...prev.skillsSet, [skill]: value },
    }));
  };

  const renderTabContent = () => {
    const tabs = {
      personal: <ProfileDetails details={profileData} />,
      portfolio: <PortfolioView isData={true} data={portfolioData} />,
      service: <ServiceRate isData={true} data={serviceRate} />,
      reviews: (
        <div className="card divide-y-[2px] divide-gray-300">
          {MOCK_REVIEWS.length > 1 ? (
            MOCK_REVIEWS.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))
          ) : (
            <div className="flex-center flex-col">
              <Image
                src="/Images/emptyReview.png"
                alt="empty Review"
                width={200}
                height={200}
              />
              <p>No Reviews yet!!</p>
            </div>
          )}
        </div>
      ),
    };

    return tabs[activeTab];
  };

  return (
    <div className="ml-8 h-screen sm:ml-0">
      <div className="h-[10rem] mb-24 w-full bg-gradient-to-r to-[#CCD6B0] from-[#6B705C]">
        <div className="bg-white translate-y-1/2 w-[80%] mx-auto rounded-md p-6 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="relative flex items-center justify-center bg-[#C4C4C424] shadow-lg p-2 w-[100px] h-[100px] rounded-full">
              {avatar ? (
                <Image
                  src={avatar}
                  alt="Profile"
                  layout="fill"
                  className="object-cover rounded-[100px]"
                />
              ) : (
                <Image
                  src="/Images/camera.png"
                  alt="Profile Picture Placeholder"
                  width={20}
                  height={20}
                />
              )}
              <div className="absolute top-2/4 right-[-10px] flex items-center justify-center bg-white shadow-lg p-2 w-[30px] h-[30px] rounded-full">
                <Image
                  src="/Images/camera-col.png"
                  alt="Edit Profile Picture"
                  width={20}
                  height={20}
                />
              </div>
            </div>
            <p className="text-primaryBlue text-2xl font-bold">
              {profileData[0].value}
            </p>
          </div>
        </div>
      </div>

      <ProfileCompletion
        addText="You are not done with your profile set up. Complete it now"
        linkTo="/talent/dashboard/profile/edit"
      />

      <div className="card overflow-scrol mt-12">
        <div className="flex items-center mb-8 justify-between">
          <div className="flex flex-row flex-wrap sm:space-x-6 text-sm">
            {["personal", "portfolio", "service", "reviews"].map((tab) => (
              <Button
                key={tab}
                className={`${
                  activeTab === tab
                    ? "rounded-none border-b-2 border-primaryBlue text-primaryBlue pb-1"
                    : ""
                } hover:no-underline text-[10px]`}
                variant="link"
                onClick={() => setActiveTab(tab as typeof activeTab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}{" "}
                {tab === "service" ? "Bank Information" : "Information"}
              </Button>
            ))}
          </div>

          {activeTab === "service" && (
            <EditServiceRate serviceRateEdited={setServiceRate} />
          )}
          {activeTab === "portfolio" && (
            <EditPortfolio
              portfolioRateEdited={setPortfolioData}
              skills={portfolioData.skillsSet}
              onSkillChange={handleSkillChange}
            />
          )}
        </div>

        {renderTabContent()}
      </div>
    </div>
  );
}

