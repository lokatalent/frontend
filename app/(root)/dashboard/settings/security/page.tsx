"use client";
import TwoStepVerification from "@/components/settings/security/TwoStepVerification";
import { Button } from "@/components/ui/button";
import DynamicForm from "@/components/ui/form/DynamicForm";
import {
  changePasswordFormSchema,
  FieldConfig,
} from "@/lib/utils";
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
  const fields: FieldConfig[] = [
    {
      name: "currentPassword",
      type: "password",
      label: "Current Password",
      validation: {
        required: "Password is required",
        minLength: {
          value: 8,
          message: "Password must be at least 8 characters",
        },
        pattern: {
          value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
          message: "Password must contain at least one letter and one number",
        },
      },
    },
    {
      name: "newPassword",
      type: "password",
      label: "New Password",
      validation: {
        required: "Password is required",
        minLength: {
          value: 6,
          message: "Password must be at least 6 characters",
        },
        pattern: {
          value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
          message: "Password must contain at least one letter and one number",
        },
      },
    },
    {
      name: "confirmPassword",
      type: "password",
      label: "Confirm Password",
      validation: {
        required: "Password is required",
        minLength: {
          value: 6,
          message: "Password must be at least 6 characters",
        },
        pattern: {
          value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
          message: "Password must contain at least one letter and one number",
        },
      },
    },
  ];

  const defaultValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const handleTwoFactorToggle = () => {
    setIsTwoFactorEnabled((prevState) => !prevState);
  };

  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
    if (activeTwoStepVerification) {
      dispatch(setActiveTwoStepVerification(false));
    } else {
      dispatch(setActiveTwoStepVerification(true));
    }
  };

  const savedCurrentPassword = "12345678"; // Replace with actual saved password value

  const schemaType = changePasswordFormSchema(savedCurrentPassword);
  return (
    <div className="p-6">
      <div>
        <DynamicForm
          fields={fields}
          defaultValues={defaultValues}
          schemaType={schemaType}
          buttonAction="changePassword"
          width="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[28rem]"
        />
      </div>

      <div className="mt-6 card flex justify-between items-center">
        {!activeTwoStepVerification ? (
          <div className="flex ">
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
                    isOn ? "translate-x-6" : "translate-x-0"
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
