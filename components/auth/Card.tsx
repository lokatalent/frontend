import Link from "next/link";
import { FaRegUser } from "react-icons/fa";
interface CardProps {
	info: string;
	userType: string;
	buttonText: string;
	path: string;
}
const Card = ({ info, buttonText, userType, path }: CardProps) => {
	return (
		<div className="flex justify-center w-5/6 md:w-[391px] m-5 ">
			<div className="bg-slate-50 shadow-xl rounded-lg p-8 flex items-center flex-col justify-center ">
				<FaRegUser
					color="#3377FF"
					size={48}
				/>
				<p className="text-xl md:text-3xl font-semibold py-5 text-center">
					{userType}
				</p>
				<p className="text-base font-normal text-textGray mb-6 text-center">
					{info}
				</p>
				<Link
					href={`${path}`}
					className="bg-primaryBlue hover:bg-blue-700 text-white generalButton w-full md:w-5/6 "
				>
					{buttonText}
				</Link>
			</div>
		</div>
	);
};

export default Card;
