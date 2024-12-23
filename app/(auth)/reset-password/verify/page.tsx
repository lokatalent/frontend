"use client";
import InputOTPDemo from "@/components/auth/InputOTP";
import { onSaveOTP } from "@/store/auth/authSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function MailVerification() {
	const [isResend, setIsResend] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const [value, setValue] = useState("");
	const router = useRouter();
	const dispatch = useDispatch()

	function resendHandler() {
		// setIsResend((resend) => !resend);
		setIsResend(true);
	}

	useEffect(() => {
		setTimeout(() => {
			setIsError(false);
		}, 2000);
	}, [isError]);

	useEffect(() => {
		setTimeout(() => {
			setIsResend(false);
		}, 2000);
	}, [isResend]);

	const handleVerify = () => {
		// if ()
		if (value.length !== 6) {
			setIsError(true);
			return;
		}
		setIsError(false);
		dispatch(onSaveOTP(value))
		// check if the value is the same as the otp sent to the mail

		router.push("../../reset-password/new-password");
	};

	return (
		<>
			<div className="flex justify-center flex-col items-cener bg-[#FAF8F4] h-full">
				<div className="flex justify-center">
					<Image
						src="/Images/email.png"
						alt="Email logo"
						width={150}
						height={150}
						objectFit="cover"
					/>
				</div>
				<div className="mb-5 mt-5">
					<h4 className="font-nunito text-3xl font-bold leading-[50.4px] tracking-tighter text-center">
						Check Your Mail
					</h4>
					<p className="font-nunito text-center">
						We’ve sent you a password reset link. Please check your email and{" "}
						<br />
						follow the instructions
					</p>
				</div>
				<div className="flex gap-4 items-center justify-center mt-5">
					<div>
						<InputOTPDemo
							value={value}
							setValue={setValue}
						/>
					</div>
				</div>
				{isResend && (
					<div className="flex justify-center">
						<div className="bg-[#D4FFD5] w-max text-[13px] px-4 py-2 rounded border border-[#00FF26FC] flex justify-center">
							<p>A code has been sent to your email. Please check and input</p>
						</div>
					</div>
				)}
				{isError && (
					<div className="flex justify-center ">
						<div className="bg-red-300 w-max text-[13px] px-4 py-2 rounded border border-red-500 text-black flex justify-center">
							<p>Ensure you enter the valid code</p>
						</div>
					</div>
				)}

				<div className="flex justify-center gap-2 sm:gap-4 md:gap-8 lg:gap-8">
					{/* <Link
            href={`../../reset-password/new-password`}
            className="font-nunito text-[14px] !text-[#fff] bg-[#3377FF]  font-normal leading-6 w-[15rem] sm:w-[15rem] md:w-[15rem] lg:w-[20rem] rounded h-12 flex items-center justify-center"
          >
            Verify
          </Link> */}
					<button
						onClick={handleVerify}
						className="font-nunito text-[14px] !text-[#fff] bg-[#3377FF]  font-normal leading-6 w-[15rem] sm:w-[15rem] md:w-[15rem] lg:w-[20rem] rounded h-12 flex items-center justify-center my-5"
					>
						Verify
					</button>
				</div>
				<div className="flex gap-2 justify-center text text-center font-sans text-sm md:text-base leading-[30px] ">
					Didn’t get a code?
					<button
						className="text-[#3377FF] font-semibold"
						onClick={resendHandler}
					>
						Resend Code
					</button>
				</div>
			</div>
		</>
	);
}

export default MailVerification;
