/* eslint-disable react/prop-types */
"use client";

import email from "@/public/Images/email.png";
import number from "@/public/Images/number.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import InputOTPDemo from "./InputOTP";

interface VerificationProps {
	isCorrect: boolean;
}

const Verification: React.FC<VerificationProps> = ({ isCorrect }) => {
	const [isResend, setIsResend] = useState(false);
	const [value, setValue] = useState("");
	const router = useRouter();
	const pathname = usePathname();
	console.log(pathname);
	// console.log(pathname.includes("email"))
	const IsEmail = pathname.includes("email");
	console.log(IsEmail);
	console.log(pathname);

	function resendHandler() {
		setIsResend((resend) => !resend);
	}

	// const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
	//   // Restrict input to a single character
	//   e.target.value = e.target.value.slice(0, 1);
	// };

	return (
		<>
			<div className="px-[2rem] sm:px-[4rem] md:px-[5.5rem] lg:px-[7rem] py-12 flex justify-center flex-col items-cener gap-12 bg-[#FAF8F4] h-sc">
				<div className="flex justify-center relative">
					<div className="self-start cursor-pointer absolute top-[1%] left-[1%] h-12 w-12">
						<button onClick={() => router.back()}>
							<svg
								width="35"
								height="35"
								viewBox="0 0 35 35"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M19.6924 9.16754L13.458 17.7485L22.0389 23.9829"
									stroke="#212121"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
					</div>

					<div>
						<h4 className="font-nunito text-4xl font-bold leading-[50.4px] tracking-tighter text-center">
							{IsEmail ? "Email" : "Phone number"} verification
						</h4>
						<p className="font-nunito text-xl text-center">
							Enter the six digit code we sent to your Email <br /> to verify
							your account
						</p>
					</div>
				</div>
				<div className="flex justify-center">
					<Image
						src={IsEmail ? email : number}
						alt="Email logo"
						className="w-[10rem] h-[10rem]"
					/>
				</div>
				<div className="flex gap-4 items-center justify-center">
					<div>
						{/* <form className="flex gap-2 sm:gap-4 md:gap-4 lg:gap-4">
              <div className="">
                <input
                  type="number"
                  min={1}
                  max={9}
                  maxLength={1}
                  onInput={handleInput}
                 className={`appearance:none p-[0.6rem] flex items-center justify-center border-2 border-[#3377ff] text-[#3377ff] ${styles.input}`}
                />
              </div>
              <div className="">
                <input
                  type="number"
                  min={1}
                  max={9}
                  maxLength={1}
                  onInput={handleInput}
                 className={`appearance:none p-[0.6rem] flex items-center justify-center border-2 border-[#3377ff] text-[#3377ff] ${styles.input}`}
                />
              </div>
              <div className="">
                <input
                  type="number"
                  min={1}
                  max={9}
                  maxLength={1}
                  onInput={handleInput}
                 className={`appearance:none p-[0.6rem] flex items-center justify-center border-2 border-[#3377ff] text-[#3377ff] ${styles.input}`}
                />
              </div>
              <div className="h-1 w-2 bg-black self-center"></div>
              <div className="">
                <input
                  type="number"
                  min={1}
                  max={9}
                  maxLength={1}
                  onInput={handleInput}
                 className={`appearance:none p-[0.6rem] flex items-center justify-center border-2 border-[#3377ff] text-[#3377ff] ${styles.input}`}
                />
              </div>
              <div className="">
                <input
                  type="number"
                  min={1}
                  max={9}
                  maxLength={1}
                  onInput={handleInput}
                 className={`appearance:none p-[0.6rem] flex items-center justify-center border-2 border-[#3377ff] text-[#3377ff] ${styles.input}`}
                />
              </div>
              <div className="">
                <input
                  type="number"
                  min={1}
                  max={9}
                  maxLength={1}
                  onInput={handleInput}
                  className={`appearance:none p-[0.6rem] flex items-center justify-center border-2 border-[#3377ff] text-[#3377ff] ${styles.input}`}
                />
               
              </div>
            </form> */}
						<InputOTPDemo
							value={value}
							setValue={setValue}
						/>
					</div>
				</div>
				{isCorrect && (
					<div className="flex justify-center">
						<div className="bg-[#FFD4D8] w-max text-[13px] px-4 py-2 rounded border border-[#FF3D0078] flex justify-center">
							<p>Oh no, the code you entered is incorrect, please try again.</p>
						</div>
					</div>
				)}
				{isResend && (
					<div className="flex justify-center">
						<div className="bg-[#D4FFD5] w-max text-[13px] px-4 py-2 rounded border border-[#00FF26FC] flex justify-center">
							<p>A code has been sent to your email. Please check and input</p>
						</div>
					</div>
				)}
				<div className="flex justify-center gap-2 sm:gap-4 md:gap-8 lg:gap-8">
					<Link
						// href={`./${location}`}
						href={`./${IsEmail ? "number-verification" : "email-verification"}`}
						className="font-nunito text-[14px] !text-[#605dec] bg-[#f6f5ff] border-[#605dec] border-2 font-normal leading-6 w-[15rem] sm:w-[15rem] md:w-[15rem] lg:w-[15rem] rounded h-12 flex items-center justify-center"
					>
						Verify {IsEmail ? "Phone Number" : "Email"} Instead
					</Link>
					<Link
						href={`${pathname}/verified`}
						className="font-nunito text-[14px] !text-[#fff] bg-[#3377FF]  font-normal leading-6 w-[15rem] sm:w-[15rem] md:w-[15rem] lg:w-[15rem] rounded h-12 flex items-center justify-center"
					>
						Verify
					</Link>
				</div>
				<div className="flex justify-center text text-center font-sans text-[15px] sm:text-[15px] md:text-[20px] lg:text-[20px] font-bold leading-[30px] ">
					Didn’t get a code?
					<button
						className="text-[#3377FF]"
						onClick={resendHandler}
					>
						Resend Code
					</button>
				</div>
			</div>
		</>
	);
};

export default Verification;
