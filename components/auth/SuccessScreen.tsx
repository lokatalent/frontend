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
		<div className="w-10/12 mx-auto flex flex-col items-center justify-center p-14 ">
			<Image
				src={successImage}
				width={194}
				height={194}
				alt="success icon"
			/>

			<p className="font-bold text-textColor text-center text-xl md:text-4xl py-3">
				{head}
			</p>
			<p className="text-textColor pb-5">{content}</p>

			<Button
				onClick={onClick}
				className=" bg-primaryBlue hover:bg-blue-700 text-white w-8/12  text-lg p-4 md:p-8 my-14"
			>
				{btn}
			</Button>
		</div>
	);
};

export default SuccessScreen;
