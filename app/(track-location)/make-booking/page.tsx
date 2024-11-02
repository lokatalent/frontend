import { Spacer } from "@/components/Spacer";
import { FaCircleCheck } from "react-icons/fa6";
import { RxCaretRight } from "react-icons/rx";
import { TbCircleNumber2, TbCircleNumber3Filled } from "react-icons/tb";

const page = () => {
	return (
		<div className="bg-bgWhite  h-svh ">
			<div className="flex flex-col justify-center contained mx-auto ">
				<div className="my-4">
					<Spacer size={30} />
					<div className="flex flex-row justify-center space-x-4 items-center">
						<p className="flex flex-row  space-x-3 items-center">
							<span>
								<FaCircleCheck
									size={28}
									style={{ fill: "#3377FF" }}
								/>
							</span>
							<span>Location</span>
						</p>
						<RxCaretRight size={20} />
						<p className="flex flex-row  space-x-3 items-center">
							<span>
								<TbCircleNumber2
									size={28}
									style={{ color: "#3377FF", borderColor: "#3377FF" }}
								/>
							</span>
							<span className="">Details</span>
						</p>
						<RxCaretRight size={20} />
						<p className="flex flex-row  space-x-3 items-center">
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
			</div>

			<div className="my-8   ">
				<h1 className="header my-5  text-center">Make a Booking Now</h1>
				<p className="text-center">Enter details about your booking</p>
			</div>
		</div>
	);
};

export default page;
