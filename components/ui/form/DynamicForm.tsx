// DynamicForm.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import ResetDialog from "@/components/auth/ResetDialog";
import { FieldConfig } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FormField } from "./FormField";
import ReviewModal from "@/components/profile/ReviewModal";
import { useDispatch, useSelector } from "react-redux";
import { RootStateProfile, setInformation, setProfileDetails } from "@/store/profile/profileSlice";
import PasswordChangedModal from "@/components/settings/security/PasswordChangedModal";
import PhoneNumberVerification from "@/components/settings/security/PhoneVerificationModal";

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
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [fileValue, setFileValue] = useState<string>("");
  const [inputValue, setInputValue] = useState<File | null>(null);
  const verificationResult = useSelector(
    (state: RootState) => state.profile.verification
  );
  const file = useSelector((state: RootState) => state.profile.file);
  console.log(file);
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

  const onSubmit = (data: any) => {
    console.log("success");
    console.log(data);
    setSavedData(data);
    if (buttonAction === "reset-password") {
      router.push("./reset-password/verify");
    }
    if (buttonAction === "sign-up") {
      router.push(`${pathname}/verify`);
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
      dispatch(setInformation({ state: data.state, address: data.address, city: data.city}))
    }
    setError(null);

    const openDialog = () => setDialogOpen(true);
    openDialog();
    const closeDialog = () => setDialogOpen(false);
    closeDialog();
    reset();
  };
  
	return (
		<div className="w-full md:px-6 mt-5">
			<form
				onSubmit={handleSubmit(onSubmit, onError)}
				className={`flex flex-col justify-center items-center gap-6 w-full`}
			>
				<div className="w-full">
					<div
						className={`grid w-full ${
							fields.length > 3
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
								disabled={isSubmitting}
								width={width}
							/>
							// </div>s
						))}
					</div>
					{/* {savedData} */}
					{buttonAction === "log-in" && (
						<div className="flex justify-end mt-4 self-end text-right">
							<Link
								href="/reset-password"
								className="text-[14px] text-primaryBlue self-end"
							>
								Forgot Password?
							</Link>
						</div>
					)}
				</div>
				<div className="w-full">
					{buttonAction == "password" ? (
						<ResetDialog isDialog={isDialogOpen} />
					) : (
						<div className="space-y-5 flex items-center flex-col">
							<button
								type="submit"
								// disabled={true}
								className="w-full bg-blue-500 text-white p-2 py-3 rounded-sm hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{buttonAction === "log-in"
									? "Login"
									: buttonAction === "reset-password"
									? "Send Reset Link"
									: "Submit"}
							</button>

							{buttonAction === "log-in" || buttonAction === "sign-up" ? (
								<button className="w-full bg-white text-black font-bold flex justify-center p-2 py-3 rounded-sm border border-[#D6DDEB]">
									<FcGoogle
										size={24}
										className="mr-2"
									/>
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
