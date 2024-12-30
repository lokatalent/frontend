"use client";
import DynamicForm from "@/components/ui/form/DynamicForm";
import { emailFormSchema, FieldConfig } from "@/lib/utils";

import Image from "next/image";

type defaultValues = {
	email: string;
};

function ResetPassword() {
	const fields: FieldConfig[] = [
		{
			name: "email",
			type: "email",
			label: "Email",
			validation: {
				required: "Email is required",
				pattern: {
					value: /\S+@\S+\.\S+/,
					message: "Invalid email format",
				},
			},
		},
	];

	const defaultValues: defaultValues = {
		email: "",
	};

	// const schemaType = emailFormSchema;

	return (
		<>
			<div className="flex justify-center flex-col items-cener gap-12 bg-[#FAF8F4]">
				<div className="flex flex-col justify-center relative">
					<div className="flex justify-center">
						<Image
							src="/Images/lock.png"
							alt="Lock"
							width={120}
							height={120}
							priority
						/>
					</div>
					<div>
						<h4 className="font-nunito text-2xl md:text-3xl font-bold leading-[50.4px] tracking-tighter text-center mt-8 mb-2">
							Forgot Password
						</h4>
						<p className="font-nunito text-sm text-[#6C727F] text-center w-[90%] mx-auto">
							Enter the email address associated with your account and we’ll
							send you a link to <br /> reset your password
						</p>
					</div>
					<div className="mt-5">
						{/* <EmailForm type="email-input" /> */}
						<DynamicForm
							fields={fields}
							defaultValues={defaultValues}
							schemaType={emailFormSchema}
							buttonAction="reset-password"
							width="w-full max-w-2xl mx-auto"
						/>
						{/* <StraightForm /> */}
					</div>
				</div>
			</div>
		</>
	);
}

export default ResetPassword;
