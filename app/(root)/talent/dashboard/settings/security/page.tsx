"use client";
import SecurityForm from "@/components/settings/security/SecurityForm";
import TwoStepVerification from "@/components/settings/security/TwoStepVerification";
import { Button } from "@/components/ui/button";
import { RootStateProfile } from "@/store/profile/profileSlice";
import {
  RootState,
  setActiveTwoStepVerification,
  setTwoStepVerificationModal,
} from "@/store/settings/SettingsSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Security() {
  const dispatch = useDispatch();
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(true);
  const ProfileInfo = useSelector(
    (state: RootStateProfile) => state.profile.information.phoneNumber
  );
  const activeTwoStepVerification = useSelector(
    (state: RootState) => state.settings.activeTwoStepVerification
  );
  console.log(ProfileInfo);

  const toggleSwitch = () => {
    if (activeTwoStepVerification) {
      dispatch(setActiveTwoStepVerification(false));
    } else {
      dispatch(setActiveTwoStepVerification(true));
    }
  };

  return (
    <div className="p-6">
      <div>
        <SecurityForm />
      </div>
      <div className="mt-6 card flex justify-between items-center">
        {!activeTwoStepVerification ? (
          <div className="flex justify-between">
            <div className="space-y-3">
              <p>2-FA autentification</p>
              <p className="text-gray-500 mt-2 w-[80%]">
                Two-factor authentication is an enhanced security measure. Once
                enabled, you'll be required to give a type of identification
                when you log in.
              </p>
            </div>
            <Button
              type="submit"
              onClick={() => dispatch(setTwoStepVerificationModal(true))}
              className="font-nunito mt-10 text-sm text-[#fff] bg-[#3377FF] font-normal leading-6 w-[23rem] mx-auto rounded h-14  hover:text-[#3377FF] hover:bg-white hover:border-2 hover:border-[#3377ff] transition transition-all duration-[500ms]"
            >
              Enable
            </Button>
            <TwoStepVerification />
          </div>
        ) : (
          <div className="w-full">
            <h2 className="text-2xl font-bold mb-4">2-FA Authentication</h2>
            <div className="flex items-center justify-between mb-4 w-2/4">
              <span>2-FA authentication</span>
              <div
                className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
                  activeTwoStepVerification ? "bg-blue-500" : "bg-gray-300"
                }`}
                onClick={toggleSwitch}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform ${
                    activeTwoStepVerification
                      ? "translate-x-6"
                      : "translate-x-0"
                  } transition-transform duration-200`}
                ></div>
              </div>
            </div>
            <div className="mb-4 flex w-2/4">
              <label
                htmlFor="phone-number"
                className="w-full block font-medium mb-2"
              >
                Phone number
              </label>
              <input
                type="tel"
                id="phone-number"
                value={ProfileInfo}
                // onChange={handlePhoneNumberChange}
                readOnly
                className="flex-end w-full focus:outline-none text-right"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Security;
