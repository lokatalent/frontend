import { BookingType, BookingColumns } from "@/components/Columns";
import { BookingFilter } from "@/components/FilterData";
import { DataTable } from "@/components/DataTable";

async function getData(): Promise<BookingType[]> {
	return [
		{
			id: "12456256565",
			customer: "Justin Cooper",
			talent: "Gabriel Daramola",
			date: "24/4/2024",
			time: "11:45 AM",
			status: "Pending",
		},
		{
			id: "2565767900",
			customer: "Martin Cooper",
			talent: "Gabriel Daramola",
			date: "24/4/2024",
			time: "11:45 AM",
			status: "Accepted",
		},
		{
			id: "8698767900",
			customer: "Jayden Cooper",
			talent: "Gabriel Daramola",
			date: "24/4/2024",
			time: "11:45 AM",
			status: "Declined",
		},
		{
			id: "12456256565",
			customer: "Justin Cooper",
			talent: "Gabriel Daramola",
			date: "24/4/2024",
			time: "11:45 AM",
			status: "Pending",
		},
		{
			id: "2565767900",
			customer: "Martin Cooper",
			talent: "Gabriel Daramola",
			date: "24/4/2024",
			time: "11:45 AM",
			status: "Accepted",
		},
		{
			id: "8698767900",
			customer: "Jayden Cooper",
			talent: "Gabriel Daramola",
			date: "24/4/2024",
			time: "11:45 AM",
			status: "Declined",
		},
		// ...
	];
}

export default async function BookingTable({ isHome }) {
	const data = await getData();

	return (
		<div className="card my-5">
			<DataTable
				columns={BookingColumns}
				data={data}
				title="Bookings"
				type="bookings"
				filterType={BookingFilter}
			/>
		</div>
	);
}
