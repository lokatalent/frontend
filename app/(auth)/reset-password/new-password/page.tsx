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

	// const schemaType = passwordFormSchema;

	return (
		<div className="flex-col items-cener gap-12 bg-[#FAF8F4]">
			<div className="flex justify-center relative">
				<div>
					<h4 className="font-nunito text-xl md:text-4xl font-bold leading-[50.4px] tracking-tighter text-center">
						Set Your New Password
					</h4>
					<p className="font-nunito text-[#989898] text-center mt-2">
						Enter a new password for your account
					</p>
				</div>
			</div>
			<div className="flex gap-4 items-center justify-center mt-6">
				{/* <form className="flex flex-wrap justify-center">
          <div className="flex flex-col flex-wrap items-center justify-center gap-10">
            <div className="flex flex-col gap-[0.5rem]">
              <div className="relative flex flex-col">
                <label>New Password</label>
                <input
                  type={newPasswordVisible ? "text" : "password"}
                  className="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[35rem] bg-white h-[3rem] text-black rounded px-[1rem]"
                  required
                />
                <button
                  type="button"
                  onClick={toggleNewPasswordVisibility}
                  className="toggle-password-button absolute right-5 top-1/2"
                >
                  {newPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="flex justify-between">
                {!formIsValid ? (
                  <div className="text-[10px] text-[#FFB82E]">
                    This password is not valid
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-[0.5rem]">
              <div className="relative flex flex-col">
                <label>Confirm Password</label>
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  className="w-[20rem] sm:w-[23rem] md:w-[25rem] lg:w-[35rem] bg-white h-[3rem] text-black rounded px-[1rem]"
                  required
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="toggle-password-button absolute right-5 top-1/2"
                >
                  {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="flex justify-between">
                {!formIsValid ? (
                  <div className="text-[10px] text-[#FFB82E]">
                    Passwords are not the same
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </form> */}
				{/* <PasswordForm type="pass-word"/> */}
				<DynamicForm
					fields={fields}
					defaultValues={defaultValues}
					schemaType={passwordFormSchema}
					buttonAction="password"
					width="w-full max-w-xl mx-auto"
				/>
			</div>
			<div className="flex justify-center">{/* <ResetDialog /> */}</div>
		</div>
	);
}

export default NewPassword;
