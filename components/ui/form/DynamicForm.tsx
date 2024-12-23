"use client"

// DynamicForm.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import ResetDialog from "@/components/auth/ResetDialog";
import { errorHandler, FieldConfig } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FormField } from "./FormField";
import ReviewModal from "@/components/profile/ReviewModal";
import { useDispatch, useSelector } from "react-redux";
import { RootStateProfile, setInformation, setProfileDetails } from "@/store/profile/profileSlice";
import PasswordChangedModal from "@/components/settings/security/PasswordChangedModal";
import PhoneNumberVerification from "@/components/settings/security/PhoneVerificationModal";
import { showToast } from "@/store/auth/toastSlice";
import { signup } from "@/services/authService";
import { onSignUp } from "@/store/auth/authSlice";

interface DefaultValues {
  firstName?: string;
  lastName?: string;
  email?: string;
  number?: string;
  newPassword?: string;
  confirmPassword?: string;
  addressVerify?: string;
  gender?: string;
  dateOfBirth?: string;
  country?: string;
  state?: string;
  city?: string;
  address?: string;
}
interface DynamicForm {
  fields: FieldConfig[];
  defaultValues: DefaultValues;
  buttonAction: string;
  schemaType: any;
  width: string;
  styles?: string
}

const DynamicForm = ({
  fields,
  defaultValues,
  schemaType,
  buttonAction,
  width,
  styles
}: DynamicForm) => {
  const router = useRouter();
  const pathname = usePathname();
  const [savedData, setSavedData] = useState<FormData | null>(null);
  const [error, setError] = useState<string[] | null | string>("");
  const [fileValue, setFileValue] = useState<string>("");
  const [inputValue, setInputValue] = useState<File | null>(null);
  const verificationResult = useSelector(
    (state: RootStateProfile) => state.profile.verification
  );
  const file = useSelector((state: RootStateProfile) => state.profile.file);

  const dispatch = useDispatch();

  // const file = sessionStorage.getItem("selectedFile");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schemaType),
    defaultValues,
  });

  const onSubmit = async (data: any) => {
    setSavedData(data);
    if (buttonAction === "reset-password") {
      router.push("./reset-password/verify");
    }
    if (buttonAction === "sign-up") {
      // check passwords
      if (data.newPassword !== data.confirmPassword) {
        return dispatch(
          showToast({
            status: "error",
            message: "",
          })
        );
      }

      let temp = {
        "first_name": data.firstName,
        "last_name": data.lastName,
        "email": data.email,
        "phone_num": data.number,
        "password": data.newPassword
      }

      const response = await signup(temp);
      if (!response.error) {
        dispatch(onSignUp(response.data.email))
        // router.push(`${pathname}/verify`);
      } else {
        dispatch(
          showToast({
            status: "error",
            message: errorHandler(response.data),
          })
        );
      }

      dispatch(showToast({
        status: "success",
        message: "We are live!"
      }))
    }
    if (buttonAction === "log-in") {
      router.push("/dashboard");
    }
    if (buttonAction === "profile-edit") {
      dispatch(setProfileDetails(data));
      dispatch(
        setInformation({
          state: data.state,
          address: data.address,
          city: data.city,
          dateOfBirth: data.dateofBirth,
        })
      );
      router.push("/dashboard/profile/verify");
    }
    if (buttonAction === 'edit-address') {
      dispatch(setInformation({ state: data.state, address: data.address, city: data.city }))
    }
    // console.log(error)
    setError(null);
    reset();
  };



  // console.log(pathname);
  const onError = (data: any) => {
    console.log("error");
    setError(data);
    // setSavedData(data);
    console.log(data);
    // reset();
  };

  return (
    <div className="w-full md:px-6 mt-5">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className={` ${buttonAction === "changePassword"
          ? ""
          : "flex flex-col justify-center items-center gap-6 w-full"
          }`}
      >
        <div className="w-full">
          <div
            className={`grid w-full ${fields.length > 3
              ? "md:grid-cols-2 w-full"
              : "grid-cols-1"
              }  justify-center items-center gap-4`}
          >
            {fields.map((field) => (
              // <div key={field.name}>

              <FormField
                key={field.name}
                name={field.name}
                validation={field.validation}
                label={field.label}
                type={field.type}
                error={error?.[field.name]}
                register={register}
                control={control}
                disabled={isSubmitting}
                width={width}
                styles={styles}
                options={field.options}
                buttonAction={buttonAction}
              // fileHandlerOptions={fileHandlerOptions}
              />
              // </div>s
            ))}
          </div>
          {/* {savedData} */}
          {buttonAction === "log-in" && (
            <div className="flex justify-end mt-4 self-end text-right">
              <Link
                href="/reset-password"
                className="text-sm text-primaryBlue self-end"
              >
                Forgot Password?
              </Link>
            </div>
          )}
        </div>
        <div>
          {buttonAction == "new-password" ? (
            <ResetDialog />
          ) : buttonAction === "addressVerification" &&
            verificationResult &&
            file ? (
            <ReviewModal linkTo={"/dashboard/profile"} />
          ) : buttonAction === "edit-profile" && verificationResult && file ? (
            <ReviewModal linkTo={"/dashboard/settings/profile"} />
          ) : buttonAction === "changePassword" ? (
            <PasswordChangedModal />
          ) : buttonAction === "twoStepVerification" ? (
            <PhoneNumberVerification />
          ) : (
            <div className="space-y-5 flex itms-center flex-col">
              <button
                type="submit"
                // disabled={true}
                className={`${buttonAction === "changePassword"
                  ? "!w-[23rem] mt-10"
                  : "mx-auto  flex-center"
                  } text-sm text-[#fff] bg-[#3377FF] font-normal leading-6 w-[10rem] md:w-[15rem] lg:w-[30rem] rounded h-14  transition-normal hover:text-[#3377FF] hover:bg-white hover:border-2 hover:border-[#3377ff] `}
              >
                {buttonAction === "log-in"
                  ? "Login"
                  : buttonAction === "reset-password"
                    ? "Send Reset Link"
                    : "Submit"}
              </button>

              {buttonAction === "log-in" || buttonAction === "sign-up" ? (
                <button className="w-full bg-white text-black font-bold flex justify-center p-2 py-3 rounded-sm border border-[#D6DDEB]">
                  <FcGoogle size={24} className="mr-2" />
                  Continue with Google
                </button>
              ) : null}
            </div>
          )}
        </div>
      </form>

      {/* {savedData && (
        <div className="mt-4">
          <h3 className="font-medium">Saved Data:</h3>
          <pre className="mt-2 text-sm overflow-auto">
            {savedData}
          </pre>
        </div>
      )} */}
    </div>
  );
};

export default DynamicForm;
