import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import { FormFieldError } from "@/components/ui/form/FormFieldError";
import { updatePassword } from "@/services/authService";
import { errorHandler, handleUnauthorizedError } from "@/lib/utils";
import { showToast } from "@/store/auth/toastSlice";
import { useDispatch } from "react-redux";

interface changePasswordType {
  confirmPassword: string;
  currentPassword: string;
  newPassword: string;
}

const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    // .regex(
    //   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    //   "Password must contain at least one letter and one number"
    // ),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    //   .regex(
    //     /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    //     "Password must contain at least one letter and one number"
    //   ),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const SecurityForm = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (data: changePasswordType) => {
    console.log(data);
    let temp = {
      old_password: data.currentPassword,
      new_password: data.newPassword,
    };
    const response = await updatePassword(temp);
    console.log(response);
    if (!response.error) {
      setSuccessModal(true);
    } else {
      handleUnauthorizedError(response, dispatch, showToast, router);
      dispatch(
        showToast({
          status: "error",
          message: errorHandler(response.data),
        })
      );
    }
    reset();
  };

  const PasswordInput = ({ id, show, toggle, register, error, label }) => (
    <div className="relative mb-4 w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[28rem]">
      <label htmlFor={id} className="block text-sm font-medium mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          {...register(id)}
          className={` flex w-full rounded-md bg-white h-[3rem] px-3 py-1 text-sm shadow-s transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
           ${error ? "border-red-500" : "border-gray-300"}`}
        />
        <button
          type="button"
          onClick={toggle}
          className="absolute right-3 top-2 text-gray-500"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <FaEye /> : <FaEyeSlash />}
        </button>
      </div>
      {error && <FormFieldError error={error} />}
    </div>
  );

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <PasswordInput
          id="currentPassword"
          show={showCurrentPassword}
          toggle={() => setShowCurrentPassword(!showCurrentPassword)}
          register={register}
          error={errors.currentPassword}
          label="Current Password"
        />

        <PasswordInput
          id="newPassword"
          show={showNewPassword}
          toggle={() => setShowNewPassword(!showNewPassword)}
          register={register}
          error={errors.newPassword}
          label="New Password"
        />

        <PasswordInput
          id="confirmPassword"
          show={showConfirmPassword}
          toggle={() => setShowConfirmPassword(!showConfirmPassword)}
          register={register}
          error={errors.confirmPassword}
          label="Confirm Password"
        />

        <Button
          type="submit"
          className=" text-sm  bg-[#3377FF] font-normal leading-6 h-14  text-white py-2 rounded "
        >
          Change Password
        </Button>
      </form>

      <Dialog open={successModal} onOpenChange={setSuccessModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Success!</DialogTitle>
            <DialogDescription>
              Your password has been successfully updated.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Button onClick={() => setSuccessModal(false)} className="w-full">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SecurityForm;
