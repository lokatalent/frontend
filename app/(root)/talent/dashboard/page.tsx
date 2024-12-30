import { BookingColumns, type BookingType } from "@/components/columns/Columns";
import InfoCard from "@/components/InfoCard";
import DataTable from "@/components/ui/gen/DataTable";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { IoWalletOutline } from "react-icons/io5";

async function getData(): Promise<BookingType[]> {
	return [
		// {
		//   id: "12456256565",
		//   date: "24/4/2022",
		//   time: "11:35 AM",
		//   location: "14, Asherifa Juncti.hfhfhf vhf dds hdd dfsd...",
		//   status: "Pending",
		// },
		// {
		//   id: "2565767900",
		//   date: "24/4/2021",
		//   time: "11:15 AM",
		//   location: "14, Asherifa Juncti....",
		//   status: "Accepted",
		// },
		// {
		//   id: "8698767900",
		//   date: "24/4/2023",
		//   time: "11:45 PM",
		//   location: "14, Asherifa Juncti....",
		//   status: "Declined",
		// },
	];
}

const Dashboard = async () => {
	const BookingData = await getData();
	return (
		<div className=" w-11/12 mx-auto">
			<div className="w-full flex justify-between items-center">
				<div className="flex flex-col space-y-3">
					<p className="text-3xl text-black font-bold">Hello Gabriel👋</p>
					<p className="text-[#6C727F]">Keep track of your bookings and provide top-notch service to your clients</p>
				</div>
			</div>

			<div className="flex flex-col md:flex-row space-y-3 md:space-y-0 justify-between w-full py-10  ">
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

			<h1 className="font-medium text-2xl">Bookings</h1>
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
