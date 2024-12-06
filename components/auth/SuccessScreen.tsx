import { Button } from "@/components/ui/button";
import successImage from "@/public/Images/mark.png";
import Image from "next/image";

interface SuccessProps {
	head: string;
	content: string;
	btn: string;
	onClick: () => void;
}
const SuccessScreen = ({ head, content, btn, onClick }: SuccessProps) => {
	return (
		<div className="w-10/12 mx-auto flex flex-col items-center justify-center">
			<div className="relative aspect-square w-44">
			<Image
				src={successImage}
				fill
				alt="success icon"
				className="object-contain"
			/></div>

			<p className="font-bold text-textColor text-center text-xl md:text-4xl py-3">
				{head}
			</p>
			<p className="text-textColor text-center pb-5">{content}</p>

			<Button
				onClick={onClick}
				className=" bg-primaryBlue hover:bg-blue-700 text-white xl:w-8/12 text-lg p-4 md:p-8 mt-8"
			>
				{btn}
			</Button>
		</div>
	);
};

export default SuccessScreen;
