import { config } from "process";
import React from "react";
import style from "styled-jsx/style";

import { IoMdTrendingUp } from "react-icons/io";
import { string } from "zod";

interface CardProp {
	text: string;
	iconColor: string;
	icon: React.ReactNode;
	number: number;
	arrow: React.ReactNode;
	percent: number;
	comment: string;
	percentColor: string;
}

const InfoCard = ({
	text,
	number,
	icon,
	iconColor,
	arrow,
	percent,
	comment,
	percentColor,
}: CardProp) => {
	return (
		<div className="w-[325px] bg-white shadow-lg p-4  border border-neutral-50 rounded-lg flex flex-col  items-center">
			<div className="flex justify-between w-full mb-4">
				<div>
					<p className="text-sm font-semibold">{text}</p>
					<p className="text-2xl pt-5  font-bold">{number}</p>
					<div className="flex pt-5 gap-2">
						{arrow}
						<p className="text-sm flex items-center font-medium">
							<span
								className="text-[#00B6B] pr-1"
								style={{ color: percentColor }}
							>
								{percent}%
							</span>
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
