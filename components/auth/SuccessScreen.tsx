import React from "react";
import Image from "next/image";
import successImage from "@/assets/images/success.png";
import { Button } from "@/components/ui/button";

interface SuccessProps {
	head: string;
	content: string;
	btn: string;
	onClick: () => void;
}
const SuccessScreen = ({ head, content, btn, onClick }: SuccessProps) => {
	return (
		<div className="w-10/12 mx-auto flex flex-col items-center justify-center p-14 ">
			<Image
				src={successImage}
				width={194}
				height={194}
				alt="success icon"
			/>

			<p className="font-bold text-textColor text-3xl py-3">{head}</p>
			<p className="text-textColor pb-5">{content}</p>

			<Button
				onClick={onClick}
				className="btnOne hover:bg-bgWhite hover:text-primaryBlue my-14"
			>
				{btn}
			</Button>
		</div>
	);
};

export default SuccessScreen;
