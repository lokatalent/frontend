"use client";
import ProfileCompletion from "@/components/profile/ProfileCompletion";
import ProfileDetails from "@/components/profile/ProfileDetails";
import Spinner from "@/components/ui/Spinner";
import { signin, verifyUser } from "@/services/authService";
import { getOwnProfile } from "@/services/profileService";
import { setUser } from "@/store/auth/authSlice";
import { showToast } from "@/store/auth/toastSlice";
import { RootStateProfile } from "@/store/profile/profileSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface DataItem {
  title: string;
  value: string;
}

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: any) => state.auth.user);

  const profileDetails = useSelector(
    (state: RootStateProfile) => state.profile.profileDetails
  );

  const [profilePics, setProfilePics] = useState("");

  // const profilePics = useSelector(
  //   (state: RootStateProfile) => state.profile.profilePics
  // );

  const profileInformation = useSelector(
    (state: RootStateProfile) => state.profile.information
  );

  const [data, setData] = useState([
    { title: "Name", value: profileInformation?.name || "-" },
    { title: "Email Address", value: profileInformation?.email || "-" },
    { title: "Phone Number", value: "-" },
    // { title: "Country", value: "-" },
    // { title: "State", value: profileDetails?.state || "-" },
    // { title: "City", value: profileDetails?.city || "-" },
    { title: "Address", value: profileDetails?.address || "-" },
    { title: "Date of birth", value: profileDetails?.date_of_birth || "-" },
  ]);

  // const data: DataItem[] = ;

  const fetchProfile = async () => {
    setLoading(true);
    const response = await getOwnProfile();
    if (!response.error) {
      setLoading(false);
      dispatch(setUser(response.data))
      const profileData = response.data;
      setProfilePics(profileData.avatar);
      setData([
        {
          title: "Name",
          value: `${profileData.first_name} ${profileData.last_name}` || "-",
        },
        { title: "Email Address", value: profileData.email || "-" },
        { title: "Phone Number", value: profileData.phone_num || "-" },
        // { title: "Country", value: profileData.country || "-" },
        // { title: "State", value: profileData.state || "-" },
        // { title: "City", value: profileData.city || "-" },
        { title: "Address", value: profileData.address || "-" },
        {
          title: "Date of birth",
          value: new Date(profileData.date_of_birth).toDateString() || "-",
        },
      ]);
    } else {
      setLoading(false);
      if (response.status === 401) {
        dispatch(
          showToast({
            status: "error",
            message: response.data.message,
          })
        );
        return router.push("/login");
      }

      return dispatch(
        showToast({
          status: "error",
          message: response.data.message,
        })
      );
    }
  };

  const onVerifyUser = async () => {
    const response = await verifyUser();
    if (!response.error) {
      dispatch(
        showToast({
          status: "success",
          message: "Your account has been verified successfully",
        })
      );
    } else {
      // return dispatch(
      //   showToast({
      //     status: "error",
      //     message: response.data.message,
      //   })
      // );
    }
  };

  useEffect(() => {
    if (!user.is_verified) onVerifyUser()
    fetchProfile();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="pt-10">
          <Spinner />
        </div>
      ) : (
        <div className="ml-8 h-screen sm:ml-0">
          <div className="h-[5rem] sm:h-[10rem] mb-24 w-full bg-gradient-to-r to-[#CCD6B0] from-[#6B705C]">
            <div className="bg-white translate-y-1/2 w-[80%] mx-auto rounded-md p-6 flex justify-between items-center">
              <div className="flex items-center space-x-6">
                <div className="relative flex items-center justify-center bg-[#C4C4C424] shadow-lg p-2 w-[50px] h-[50px] sm:w-[100px] sm:h-[100px] rounded-full">
                  <Image
                    src={profilePics || "/Images/camera.png"}
                    alt="Profile"
                    layout="fill"
                    className="object-cover rounded-[100px]"
                  />
                  <div className="absolute top-2/4 right-[-10px] flex items-center justify-center bg-white shadow-lg p-2 w-[30px] h-[30px] rounded-full">
                    <Image
                      src="/Images/camera-col.png"
                      alt="Notification Bing"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
                <p className="text-primaryBlue text-sm md:text-2xl font-bold">
                  {data[0].value}
                </p>
              </div>
            </div>
          </div>

          {!user.is_verified && <ProfileCompletion
            addText="Finish setting up your profile to get the most out of our services"
            linkTo="/dashboard/profile/edit"
          />}

          <div>
            <ProfileDetails details={data} />
          </div>
        </div>
      )}
    </div>
  );
}
