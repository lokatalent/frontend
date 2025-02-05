"use client";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent, useEffect, useState, useRef } from "react";
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
import { getBankProfile, getOwnProfile, updateProfileImage } from "@/services/profileService";
import { getAllService, getService, getServiceType } from "@/services/services";
import { showToast } from "@/store/auth/toastSlice";
import { capitalize, errorHandler, handleUnauthorizedError } from "@/lib/utils";
import { RootStateProfile, setProfilePics } from "@/store/profile/profileSlice";
import { setUser, setUserAvatar } from "@/store/auth/authSlice";
import { setBankDetailsData } from "@/store/talent/profile/TalentProfileSlice";
import PageSpinner from "@/components/ui/PageSpinner";

const INITIAL_PROFILE_DATA = [
  { title: "Name", value: "-" },
  { title: "Email Address", value: "-" },
  { title: "Phone Number", value: "-" },
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

const Profiles = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: any) => state.auth.user);
  const [serviceType, setServiceType] = useState();

  const [activeTab, setActiveTab] = useState<
    "personal" | "portfolio" | "Bank Details" | "reviews"
  >("personal");

  const [profileData, setProfileData] =
    useState<ProfileData[]>(INITIAL_PROFILE_DATA);

  // const { profileDetails, profilePics } = useSelector(
  //   (state: RootStateProfile) => state.profile
  // );
  const bankDetails = useSelector(
    (state: RootStateTalentService) => state.talentProfile.bankDetails
  );
  const service = useSelector(
    (state: RootStateTalentService) => state.service.service
  );
  const userId = useSelector((state: any) => state.auth.user.id);
  const userBio = useSelector((state: any) => state.auth.user.bio);
  const userAvatar = useSelector((state: any) => state.auth.user.avatar);

  const [avatar, setAvatar] = useState(userAvatar);
  const fileInputRef = useRef<HTMLInputElement | null>();

  const handleButtonClick = (): void => {
    fileInputRef.current?.click();
  };

  const handleImageSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageURL: string = URL.createObjectURL(file);
      setAvatar(imageURL);
      dispatch(setUserAvatar(imageURL));
      const images = {
        image: file,
      };
      const response = await updateProfileImage(images);
      if (!response.error) {
        const remoteImgURL = `${response.data.url as string}?t=${new Date().getTime()}`;
        setAvatar(remoteImgURL);
        dispatch(setUserAvatar(remoteImgURL));
        dispatch(
          showToast({
            status: "success",
            message: "Image updated successfully",
          })
        );
      } else {
        handleUnauthorizedError(response, dispatch, router, showToast)
      }
    }
  }

  useEffect(() => {
    const serviceTypeHandler = async () => {
      const response = await getServiceType();

      const newResponse = response.data.map((type: any) => ({
        value: type.service_type,
        label: capitalize(type.service_type),
      }));
      setServiceType(newResponse);
      console.log(response, newResponse);
    };
    serviceTypeHandler();
  }, []);

  const serviceData = {
    experience: "",
    bio: "",
    rate_per_hour: "",
    skillsSet: {
      Indoor_cleaning: false,
      Plumbing: false,
      Cleaning: false,
      Driving: false,
      Cooking: false,
    },
  };

  const [portfolioData, setPortfolioData] =
    useState(serviceData);

  const [serviceRate, setServiceRate] = useState<ServiceRateData>({
    bankName: bankDetails?.bank_name || "",
    accountNo: bankDetails?.account_num || "",
    rps: "",
    rph: "",
  });

  // const fetchData = async () => {
  //   try {
  //     if (user.is_verified)
  //       await Promise.all([fetchProfile(), fetchService(), fetchBankDetails()]);
  //     else fetchProfile();
  //   } catch (error) {
  //     dispatch(
  //       showToast({
  //         status: "error",
  //         message: "Failed to fetch profile data",
  //       })
  //     );
  //   }
  // };

  useEffect(() => {
    // fetchData();

    setLoading(true);
    const initializeData = async () => {
      setLoading(true);
      await fetchProfile();
      await fetchService();
      await fetchBankDetails();
    };

    initializeData();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    const response = await getOwnProfile();
    console.log(response);
    if (!response.error) {
      const profileData = response.data;
      profileData.avatar = `${response.data.avatar as string}?t=${new Date().getTime()}`;
      setAvatar(profileData.avatar);
      dispatch(setUser(profileData));
      dispatch(setUserAvatar(profileData.avatar));
      setLoading(false);
      const {
        first_name,
        last_name,
        email,
        phone_num,
        address,
        date_of_birth,
      } = response.data;
      setProfileData(
        user?.is_verified
          ? [
              { title: "Name", value: `${first_name} ${last_name}` || "-" },
              { title: "Email Address", value: email || "-" },
              { title: "Phone Number", value: phone_num || "-" },
              { title: "Address", value: address || "-" },
              {
                title: "Date of birth",
                value: new Date(date_of_birth).toDateString() || "-",
              },
            ]
          : [
              { title: "Name", value: `${first_name} ${last_name}` || "-" },
              { title: "Email Address", value: email || "-" },
              { title: "Phone Number", value: phone_num || "-" },
            ]
      );
    } else {
      setLoading(false);
      handleUnauthorizedError(response, dispatch, router, showToast);
    }
  };

  const fetchService = async () => {
    setLoading(true);
    const allServicesResponse = await getAllService(userId);
    console.log(allServicesResponse);
    console.log("allServicesResponse");
    if (!allServicesResponse?.data?.length) {
      handleUnauthorizedError(allServicesResponse, dispatch, router, showToast);
      dispatch(
        setService({
          experience_years: "",
          service_type: "",
          service_desc: "",
          rate_per_hour: 0,
          availability: {
            monday: {
              start: "",
              end: "",
            },
            tuesday: {
              start: "",
              end: "",
            },
            wednesday: {
              start: "",
              end: "",
            },
            thursday: {
              start: "",
              end: "",
            },
            friday: {
              start: "",
              end: "",
            },
            saturday: {
              start: "",
              end: "",
            },
            sunday: {
              start: "",
              end: "",
            },
          },
          address: "",
        })
      );
      showToast({
        status: "error",
        message: "No services found for the user.",
      });
      return;
    }

    const serviceResponse = await getService({
      id: userId,
      service_type: allServicesResponse.data[0]?.service_type,
    });
    console.log(serviceResponse);
    dispatch(setService(serviceResponse.data));
    const newService = serviceResponse.data;

    setPortfolioData({
      experience: newService?.experience_years || 0,
      bio: userBio || "",
      rate_per_hour: newService?.rate_per_hour || 0,
      skillsSet: {
        Plumbing: newService?.service_type === "plumbing",
        Indoor_cleaning: newService?.service_type === "sweeping",
        Cleaning: newService?.service_type === "cleaning",
        Driving: newService?.service_type === "driving",
        Cooking: newService?.service_type === "cooking",
      },
    });
  };

  const fetchBankDetails = async () => {
    try {
      const response = await getBankProfile();
      if (!response.error) {
        dispatch(setBankDetailsData(response.data));
      } else {
        // handleUnauthorizedError(response, dispatch, router, showToast);
        dispatch(
          setBankDetailsData({
            user_id: "",
            bank_name: "",
            account_name: "",
            account_num: "",
            bank_code: "",
            created_at: "",
            updated_at: "",
          })
        );
      }
    } catch (error) {
      // showToast({
      //   status: "error",
      //   message: "No bank details found for the user.",
      // });
      return;
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return <ProfileDetails details={profileData} />;
      case "portfolio":
        return <PortfolioView isData={true} data={portfolioData} />;
      case "Bank Details":
        return <ServiceRate isData={true} data={serviceRate} />;
      case "reviews":
        return MOCK_REVIEWS.length ? (
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
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {!loading ? (
        <PageSpinner />
      ) : (
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
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageSelect}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    onClick={handleButtonClick}
                  >
                    <div className="absolute top-2/4 right-[-10px] flex items-center justify-center bg-white shadow-lg p-2 w-[30px] h-[30px] rounded-full">
                      <Image
                        src="/Images/camera-col.png"
                        alt="Edit Profile Picture"
                        width={20}
                        height={20}
                      />
                    </div>
                  </button>
                </div>
                <p className="text-primaryBlue text-2xl font-bold">
                  {profileData[0].value}
                </p>
              </div>
            </div>
          </div>

          {user.is_verified ? null : (
            <ProfileCompletion
              addText="You are not done with your profile setup. Complete it now"
              linkTo="/talent/dashboard/profile/edit"
            />
          )}

          <div className="card sm:overflow-hidden overflow-scroll mt-12">
            <div className="flex items-center mb-8 justify-between">
              <div className="flex flex-row flex-wrap sm:space-x-6 text-sm sm:text-xm">
                {["personal", "portfolio", "Bank Details", "reviews"].map(
                  (tab) => (
                    <Button
                      key={tab}
                      className={`${
                        activeTab === tab
                          ? "rounded-none border-b-2 border-primaryBlue text-primaryBlue pb-1"
                          : ""
                      } hover:no-underline text-[10px] sm:text-[14px]`}
                      variant="link"
                      onClick={() => setActiveTab(tab as typeof activeTab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </Button>
                  )
                )}
              </div>

              {activeTab === "Bank Details" && (
                <EditServiceRate serviceRateEdited={setServiceRate} />
              )}
              {activeTab === "portfolio" && (
                <EditPortfolio
                  portfolioRateEdited={setPortfolioData}
                  skills={portfolioData.skillsSet}
                  onSkillChange={(skill, value) =>
                    setPortfolioData((prev) => ({
                      ...prev,
                      skillsSet: { ...prev.skillsSet, [skill]: value },
                    }))
                  }
                />
              )}
            </div>

            {renderTabContent()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profiles;
