"use client";
import DynamicForm from "@/components/ui/form/DynamicForm";
import { FieldConfig, LogInFormSchema } from "@/lib/utils";
import Link from "next/link";

const LogInAuth = () => {
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
		{
			name: "password",
			type: "password",
			label: "Password",
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
		email: "",
		password: "",
	};

	const schemaType = LogInFormSchema;
	return (
		<div className="bg-bgWhite h-scree">
			<div className="w-8/12 mx-auto pt-20 pb-6 space-y-6  ">
				<div className="text-center space-y-2">
					<h1 className="font-bold text-3xl md:text-4xl text-textColor py-4">
						Welcome Back
					</h1>
					<p className=" mx-auto">
						Log in to access your account and manage your bookings
					</p>
				</div>

				<DynamicForm
					fields={fields}
					defaultValues={defaultValues}
					schemaType={schemaType}
					buttonAction="log-in"
					width="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[35rem]"
				/>
				<footer className="flex justify-center gap-2 ">
					<p className="text-sm font-bold text-gray-600">
						Dont have an account?
					</p>
					<Link
						href={"/signup"}
						className="text-primaryBlue font-bold text-sm"
					>
						Sign Up
					</Link>
				</footer>
			</div>
		</div>
	);
};

export default LogInAuth;
