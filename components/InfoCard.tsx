import React from "react";

interface CardProp {
	text: string;
	iconColor: string;
	icon: React.ReactNode;
	number: number;
	comment: string;
	percentColor: string;
}

const InfoCard = ({
	text,
	number,
	icon,
	iconColor,
	comment,
	percentColor,
}: CardProp) => {
	return (
		<div className="w-[325px] bg-white shadow-lg p-6  border border-neutral-50 rounded-lg flex flex-col  items-center">
			<div className="flex justify-between w-full mb-4">
				<div>
					<p className="text-sm font-semibold text-base">{text}</p>

					<div className="flex  h-full flex-col justify-between ">
						<p className="text-2xl pt-5  font-bold">{number}</p>

						<p className="text-sm flex items-center text-textGray4 font-medium ">
							{comment}
						</p>
					</div>
				</div>
				<div
					className="w-12 h-12 rounded-lg"
					style={{
						backgroundColor: iconColor,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					{icon}
				</div>
			</div>
		</div>
	);
};

export default InfoCard;
