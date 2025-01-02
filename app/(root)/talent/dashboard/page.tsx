"use client"

import { BookingColumns, type BookingType } from "@/components/columns/Columns";
import InfoCard from "@/components/InfoCard";
import DataTable from "@/components/ui/gen/DataTable";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { IoWalletOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const Dashboard = () => {
	const user = useSelector((state: any) => state.auth.user);
	const BookingData: any = [];
	return (
		<div className="">
			<div className="w-full flex justify-between items-center">
				<div className="flex flex-col space-y-3">
					<p className="text-3xl text-black font-bold">Hello {user?.first_name}👋</p>
					<p className="text-[#6C727F]">Keep track of your bookings and provide top-notch service to your clients</p>
				</div>
			</div>

			<div className="grid md:grid-cols-3 gap-3 lg:gap-5 w-full py-10">
				<InfoCard
					text="No of Bookings"
					number={19}
					icon={<FaUserGroup color="#8E11F0" />}
					iconColor="#8280FF87"
					comment="No bookings Yet"
					percentColor="#00B69B"
				/>
				<InfoCard
					text="Average Ratings"
					number={19}
					iconColor="#FFAC3399"
					icon={<FaStar color="#D38005" />}
					comment="No ratings Yet"
					percentColor="#00B69B"
				/>
				<InfoCard
					text="Income Earned"
					number={19}
					icon={<IoWalletOutline color="#3377FF" />}
					iconColor="#3377FF87"
					comment="No income earned Yet"
					percentColor="#00B69B"
				/>
			</div>

			<h1 className="text-2xl mb-5 font-semibold">Bookings</h1>
			<div>
				<div className="card">
					<DataTable
						columns={BookingColumns}
						title="Bookings"
						data={BookingData}
						isRole={true}
						isSort={true}
						path="/"
					/>

					<div className="flex justify-center mt-5">
						<Link
							href="talent/dashboard/bookings"
							className="px-10 py-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
						>
							View all bookings
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
