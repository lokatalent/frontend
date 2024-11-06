"use client";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { Spacer } from "../Spacer";

type FormValues = {
	startTime: string;
	endTime: string;
	description: string;
};

const MakeBookingTime = () => {
	const { handleSubmit, control, register } = useForm<FormValues>({
		defaultValues: {
			startTime: "",
			endTime: "",
			description: "",
		},
	});

	const onSubmit = (data: FormValues) => {
		console.log(data);
		// handle submission logic here
	};

	const [count, setCount] = useState(3.5);
	const [showDuration, setShowDutration] = useState(false);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const increase = () => {
		if (count < 10) {
			setCount((prev) => Math.min(prev + 0.5, 10));
		}
	};

	const decrease = () => {
		if (count > 3.5) {
			setCount((prev) => Math.max(prev - 0.5, 3.5));
		}
	};

	const setDuration = () => {
		setShowDutration(true);
	};

	return (
		<div className="p-6 ">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className=""
			>
				<div className=" flex flex-row space-x-2">
					{/* Start Time Input */}

					<Controller
						name="startTime"
						control={control}
						render={({ field: { onChange, value } }) => (
							<div className="flex flex-col w-full">
								<Label
									htmlFor="description"
									className="text-md pb-3"
								>
									Start Time*
								</Label>
								<div className="flex items-center  bg-white">
									<div className="relative w-full">
										<Input
											type="time"
											onChange={onChange}
											value={value}
											className="w-full p-6 pl-10"
										/>
									</div>
								</div>
							</div>
						)}
					/>

					{/* End Time Input */}
					<Controller
						name="endTime"
						control={control}
						render={({ field: { onChange, value } }) => (
							<div className="flex flex-col w-full">
								<Label
									htmlFor="description"
									className="text-md pb-3"
								>
									End Time*
								</Label>
								<div className="flex items-center  bg-white">
									<div className="relative w-full">
										<Input
											type="time"
											onChange={onChange}
											value={value}
											className="w-full p-6 pl-10"
										/>
									</div>
								</div>
							</div>
						)}
					/>
				</div>
				<p className="text-xs text-textGray3 ">
					Click on the clock icon to set time
				</p>

				<Spacer size={30} />
				{/* Description Text Area */}
				<div>
					<Label
						htmlFor="description"
						className="text-md pb-3"
					>
						Describe Your Task*
					</Label>
					<Textarea
						className="bg-white h-40"
						{...register("description")}
					/>
				</div>

				<Spacer size={30} />
				<div>
					<Dialog
						open={isDialogOpen}
						onOpenChange={setIsDialogOpen}
					>
						<DialogTrigger className=" underline underline-offset-4 text-md ">
							Set Hours Duration*
						</DialogTrigger>
						<DialogContent className="px-5 md:px-16 ">
							<DialogHeader>
								<DialogTitle className="text-lg md:text-3xl mt-5 text-center font-semibold">
									Booking Duration
								</DialogTitle>
								<DialogDescription className=" flex flex-col justify-center items-center">
									<p className="text-lg text-center py-3">
										Set the number of hours you want to book this talent for the
										job
									</p>
								</DialogDescription>
							</DialogHeader>
							<Spacer />
							<div className="flex flex-row justify-between shadow-lg rounded-full py-4 px-8 m-w-[496px]">
								<button
									onClick={decrease}
									disabled={count <= 3.5}
								>
									<FaMinus size={24} />
								</button>
								<h1 className="text-2xl">{count}</h1>
								<button
									onClick={increase}
									disabled={count >= 10}
								>
									<FaPlus size={24} />
								</button>
							</div>
							<Spacer />
							<div className="flex flex-row justify-center space-x-3 w-full">
								<DialogClose asChild>
									<button
										className="btnOne"
										onClick={setDuration}
									>
										Accept
									</button>
								</DialogClose>
							</div>
						</DialogContent>
					</Dialog>

					{showDuration && (
						<div className="flex flex-row space-x-6 bg-white p-5 rounded-sm my-5">
							<p>{count} hrs</p>

							<button
								className="text-primaryBlue cursor-pointer"
								onClick={() => setIsDialogOpen(true)}
							>
								Edit Hours Duration
							</button>
						</div>
					)}
				</div>
				<Spacer size={30} />
				<div className="w-full flex justify-center mt-8">
					<button
						type="submit"
						className="btnOne max-w-[567px] p-4"
					>
						{" "}
						Proceed
					</button>
				</div>
			</form>
		</div>
	);
};

export default MakeBookingTime;
