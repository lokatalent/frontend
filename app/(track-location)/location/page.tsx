"use client"
import LocationTrack from "@/components/location/LocationTrack";
import { Spacer } from "@/components/Spacer";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { RxCaretRight } from "react-icons/rx";
import {
	TbCircleNumber1,
	TbCircleNumber2Filled,
	TbCircleNumber3Filled,
} from "react-icons/tb";

const Page = () => {
	const [mapping, setMapping] = useState(false);
	return (
		<div className="bg-bgWhite h-svh">
			{!mapping && (
				<div className="flex flex-col justify-center contained mx-auto">
					<div className="my-4">
						<Spacer size={30} />
						<div className="flex flex-row justify-center space-x-4 items-center">
							<p className="flex flex-row space-x-3 items-center">
								<span>
									<TbCircleNumber1
										size={28}
										style={{ color: "#3377FF", borderColor: "#3377FF" }}
									/>
								</span>
								<span>Location</span>
							</p>
							<RxCaretRight size={20} />
							<p className="flex flex-row space-x-3 items-center">
								<span>
									<TbCircleNumber2Filled
										size={28}
										style={{ color: "#9EA3AEF", fill: "#3377FF99" }}
									/>
								</span>
								<span className="text-textGray3">Details</span>
							</p>
							<RxCaretRight size={20} />
							<p className="flex flex-row space-x-3 items-center">
								<span>
									<TbCircleNumber3Filled
										size={28}
										style={{ color: "#9EA3AEF", fill: "#3377FF99" }}
									/>
								</span>
								<span className="text-textGray3">Payment</span>
							</p>
						</div>
					</div>
					<Spacer size={50} />
					<div className="my-8">
						<h1 className="header my-5 text-center">Where do you need help?</h1>
						<Spacer size={40} />
						<Input
							type="email"
							placeholder="Enter Location"
							className="input-class w-10/12 mx-auto placeholder:text-textGray2"
						/>
						<div className="flex justify-center mt-8">
							<div className="contactButton btnOne my-5 max-w-[499px]">
								Continue
							</div>
						</div>
					</div>
				</div>
			)}
			<LocationTrack
				mapping={mapping}
				setMapping={setMapping}
			/>
		</div>
	);
};

export default Page;
