"use client";

import DynamicForm from "@/components/ui/form/DynamicForm";
import { FieldConfig, passwordFormSchema } from "@/lib/utils";

function NewPassword() {
	const fields: FieldConfig[] = [
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

	interface Default{
		newPassword:string,
		confirmPassword:string
	}

	const defaultValues: Default = {
		newPassword: "",
		confirmPassword: "",
	};

	return (
		<div className="sm:px-[4rem]  md:px-[6rem] lg:px-[7rem] py-12 flex justify-center h-screen flex-col items-cener gap-12 bg-[#FAF8F4]">
			<div className="flex justify-center relative">
				<div>
					<h4 className="font-nunito text-xl md:text-4xl font-bold leading-[50.4px] tracking-tighter text-center">
						Set Your New Password
					</h4>
					<p className="font-nunito text-sm text-[#989898] text-center">
						Enter a new password for your account
					</p>
				</div>
			</div>
			<div className="flex gap-4 items-center justify-center">
				<DynamicForm
					fields={fields}
					defaultValues={defaultValues}
					schemaType={passwordFormSchema}
					buttonAction="new-password"
					width="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[35rem]"
				/>
			</div>
			<div className="flex justify-center">{/* <ResetDialog /> */}</div>
		</div>
	);
}

export default NewPassword;
