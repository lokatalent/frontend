"use client";

import { useForm } from "react-hook-form";

function MakeBookingTime() {
	const { register, handleSubmit } = useForm();

	const onSubmit = (data) => {
		console.log("Selected Times:", data);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col gap-4 w-full"
		>
			<div className="flex flex-row gap-4 w-full">
				{/* Start Time Picker */}
				<div className="flex flex-col w-full">
					<label
						htmlFor="startTime"
						className="mb-2 font-semibold"
					>
						Start Time:
					</label>
					<input
						type="time"
						id="startTime"
						{...register("startTime")}
						className="p-2 border border-gray-300 rounded w-full"
					/>
				</div>

				{/* End Time Picker */}
				<div className="flex flex-col w-full">
					<label
						htmlFor="endTime"
						className="mb-2 font-semibold"
					>
						End Time:
					</label>
					<input
						type="time"
						id="endTime"
						{...register("endTime")}
						className="p-2 border border-gray-300 rounded w-full"
					/>
				</div>
			</div>
			<button
				type="submit"
				className="p-3 bg-blue-500 text-white rounded font-semibold w-full hover:bg-blue-600"
			>
				Submit
			</button>
		</form>
	);
}

export default MakeBookingTime;
