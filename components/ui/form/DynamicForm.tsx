"use client";

// DynamicForm.tsx
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import ResetDialog from "@/components/auth/ResetDialog";
import {
  errorHandler,
  FieldConfig,
  formatPhone,
  handleUnauthorizedError,
  setToken,
} from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FormField } from "./FormField";
import ReviewModal from "@/components/profile/ReviewModal";
import { useDispatch, useSelector } from "react-redux";
import {
  RootStateProfile,
  setInformation,
  setProfileDetails,
} from "@/store/profile/profileSlice";
import PasswordChangedModal from "@/components/settings/security/PasswordChangedModal";
import PhoneNumberVerification from "@/components/settings/security/PhoneVerificationModal";
import { showToast } from "@/store/auth/toastSlice";

import {
  forgotPassword,
  googleAuth,
  sendEmailOTP,
  signin,
  signup,
  verifyUser,
} from "@/services/authService";
import {
  onForgotPassword,
  onSignUp,
  setLoggedin,
  setUser,
} from "@/store/auth/authSlice";
import { loginTest } from "@/services/axiosTest";
import { updateBankProfile, updateProfile } from "@/services/profileService";
import Spinner from "../Spinner";

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
  bank_name?: string;
  acc_num?: string;
}
interface DynamicForm {
  fields: FieldConfig[];
  defaultValues: DefaultValues;
  buttonAction: string;
  schemaType: any;
  width: string;
  styles?: string;
}

const DynamicForm = ({
  fields,
  defaultValues,
  schemaType,
  buttonAction,
  width,
  styles,
}: DynamicForm) => {
  const router = useRouter();
  const pathname = usePathname();
  const [savedData, setSavedData] = useState<FormData | null>(null);
  const [error, setError] = useState<string[] | null | string>("");
  const [fileValue, setFileValue] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  // const verificationResult = useSelector(
  //   (state: RootStateProfile) => state.profile.verification
  // ); // removing profile store
  // const file = useSelector((state: RootStateProfile) => state.profile.file); // remving profile store
  const file = 'ss'
  const verificationResult = 's';

  const dispatch = useDispatch();

  const user = useSelector((state: any) => state.auth.user);

  // const file = sessionStorage.getItem("selectedFile")

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

  const onGoogleAuth = () => {
    const response = googleAuth();
    if (!response.error) {
      console.log("Auth", response.data);
    } else {
      dispatch(
        showToast({
          status: "error",
          message: errorHandler(response.data),
        })
      );
    }
  };

  const onSubmit = async (data: any) => {
    setShowModal(true);
    setLoading(true);
    setSavedData(data);
    if (buttonAction === "reset-password") {
      const response = await forgotPassword(data);
      if (!response.error) {
        setLoading(false);
        dispatch(onForgotPassword(data.email));
        router.push("./reset-password/verify");
      } else {
        setLoading(false);

        handleUnauthorizedError(response, dispatch, router, showToast);
      }
    } else if (buttonAction === "sign-up") {
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
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone_num: formatPhone(data.number),
        password: data.newPassword,
        service_role: "service_requester",
      };

      const response = await signup(temp);
      if (!response.error) {
        setLoading(false);
        dispatch(
          showToast({
            status: "success",
            message: "Account created successfully.",
          })
        );
        router.push(`/login`);
      } else {
        setLoading(false);

        handleUnauthorizedError(response, dispatch, router, showToast);
      }
    } else if (buttonAction === "sign-up-talent") {
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
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone_num: formatPhone(data.number),
        password: data.newPassword,
        service_role: "service_provider",
      };

      const response = await signup(temp);
      if (!response.error) {
        setLoading(false);
        router.push(`/login`);
      } else {
        setLoading(false);

        handleUnauthorizedError(response, dispatch, router, showToast);
      }
    } else if (buttonAction === "log-in") {
      let temp = {
        email: data.email,
        password: data.password,
      };

      const response = await signin(temp);

      if (!response.error) {
        setLoading(false);
        let data = response.data;
        // save tokens
        setToken(data.tokens.access_token, data.tokens.refresh_token);

        // save user
        dispatch(setUser(data.user));
        if (
          data.user.is_verified ||
          data.user.email_verified ||
          data.user.phone_verified
        ) {
          // set logged in
          dispatch(setLoggedin(true));
          // route to dashboard
          router.push(
            data.user.service_role === "service_provider"
              ? `/talent/dashboard`
              : `/dashboard`
          );
        } else {
          setLoading(true);
          // send OTP
          const response = await sendEmailOTP();
          if (!response.error) {
            setLoading(false);
            dispatch(
              showToast({
                status: "success",
                message:
                  "Verify your account. An OTP has been sent to your email",
              })
            );
            // redirect to verify account
            return router.push(`/verify`);
          } else {
            setLoading(false);
            handleUnauthorizedError(response, dispatch, router, showToast);
          }
        }
      } else {
        setLoading(false);

        handleUnauthorizedError(response, dispatch, router, showToast);
      }
      // router.push("/dashboard");
    } else if (buttonAction === "profile-edit") {
      let temp = {
        phone_num: user.phone_num,
        address:
          data.street_addr +
          "," +
          data.city +
          "," +
          data.state +
          "," +
          data.country,
        gender: data.gender,
        date_of_birth: data.dateOfBirth,
      };

      // get bank name and code
      let str = data.bank_name.split("&");
      let bankData = {
        bank_name: str[1],
        bank_code: str[0],
        account_num: data.acc_num,
      };

      const onUpdateProfile = async () => {
        const response = await updateProfile(temp);
        if (!response.error) {
          setLoading(false);
          dispatch(
            showToast({
              status: "success",
              message: "Your Profile has been updated",
            })
          );
          dispatch(setProfileDetails(data));
          dispatch(
            setInformation({
              state: data.state,
              address: data.address,
              city: data.city,
              dateOfBirth: data.dateofBirth,
            })
          );
          // redirect to verify account
          // router.push("/dashboard/profile/verify");

          router.push("/dashboard/profile");
        } else {
          setLoading(false);
          handleUnauthorizedError(response, dispatch, router, showToast);
        }
      };

      const bankResponse = await updateBankProfile(bankData);
      console.log(bankResponse);
      if (!bankResponse.error) {
        setLoading(false);
        onUpdateProfile();

        const response = await verifyUser();
        if (!response.error) {
          dispatch(
            showToast({
              status: "success",
              message: "Your account has been verified successfully",
            })
          );
          let data = response.data;
          console.log(data);
          // save tokens
          setToken(data.tokens.access_token, data.tokens.refresh_token);
          dispatch(setUser(data.user));
        } else {
        }
      } else {
        setLoading(false);
        dispatch(
          showToast({
            status: "error",
            message: errorHandler(bankResponse.data),
          })
        );
      }
    } else if (buttonAction === "edit-address") {
      console.log(data);
      let temp = {
        address:
          data.address +
          "," +
          data.city +
          "," +
          data.state +
          "," +
          data.country,
      };

      const onUpdateProfile = async () => {
        const response = await updateProfile(temp);
        if (!response.error) {
          setLoading(false);
          dispatch(
            showToast({
              status: "success",
              message: "Your Profile has been updated",
            })
          );
          dispatch(setUser(response.data));
          router.push(
            user.service_role === "service_provider"
              ? `/talent/dashboard/profile`
              : `/dashboard/profile`
          );
          // redirect to verify account
          // router.push("/dashboard/profile/verify");

          router.push("/dashboard/profile");
        } else {
          setLoading(false);
          handleUnauthorizedError(response, dispatch, router, showToast);
        }
      };
      onUpdateProfile();
      setLoading(false);
      dispatch(
        setInformation({
          state: data.state,
          address: data.address,
          city: data.city,
        })
      );
    } else if (buttonAction === "create-password") {
    }

    setError(null);
    reset();
  };

  // console.log(pathname);
  const onError = (data: any) => {
    setError(data);
    // setSavedData(data);

    setShowModal(false);
    // reset();
  };

  return (
    <div className="w-full md:px-6 mt-5">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className={` ${
          buttonAction === "changePassword"
            ? ""
            : "flex flex-col justify-center items-center gap-6 w-full"
        }`}
      >
        <div className="w-full">
          <div
            className={`grid w-full ${
              fields.length > 3 ? "md:grid-cols-2 w-full" : "grid-cols-1"
            }   gap-4`}
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
        <div className="w-full max-w-2xl mx-auto">
          {buttonAction == "new-password" ? (
            <ResetDialog />
          ) : buttonAction === "addressVerification" &&
            verificationResult &&
            file ? (
            <ReviewModal linkTo={"/dashboard/profile"} />
          ) : buttonAction === "edit-profile" && verificationResult && file ? (
            <ReviewModal linkTo={"/dashboard/settings/profile"} />
          ) : buttonAction === "changePassword" ? (
            <PasswordChangedModal
              showModal={showModal}
              setShowModal={setShowModal}
            />
          ) : buttonAction === "twoStepVerification" ? (
            <PhoneNumberVerification />
          ) : (
            <div className="space-y-5 flex itms-center flex-col w-full">
              <button
                type="submit"
                // disabled={true}
                className={`${
                  buttonAction === "changePassword" ? "mt-10" : "flex-center"
                } text-sm text-[#fff] bg-[#3377FF] font-normal leading-6 w-full rounded h-14  transition-normal hover:text-[#3377FF] hover:bg-white hover:border-2 hover:border-[#3377ff] `}
              >
                {loading ? (
                  <Spinner />
                ) : (
                  <span>
                    {buttonAction === "log-in"
                      ? "Login"
                      : buttonAction === "reset-password"
                      ? "Send Reset Link"
                      : "Submit"}
                  </span>
                )}
              </button>

              {buttonAction === "log-in" || buttonAction === "sign-up" ? (
                <button
                  onClick={onGoogleAuth}
                  className="hidden w-full bg-white text-black font-bold justify-center p-2 py-3 rounded-sm border border-[#D6DDEB]"
                >
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
