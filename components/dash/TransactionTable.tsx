import { TransactionType, TransationColumns } from "@/components/Columns";
import { DataTable } from "@/components/DataTable";
import Link from "next/link";

async function getData(): Promise<TransactionType[]> {
	return [
		{
			id: "12456256565",
			name: "Justin Cooper",
			paymentMethod: "Paystack",
			time: "24/4/2024",
			amount: "15,000",
			status: "Pending",
		},
		{
			id: "2565767900",
			name: "Martin Cooper",
			paymentMethod: "Paystack",
			time: "24/4/2024",
			amount: "15,000",
			status: "Accepted",
		},
		{
			id: "8698767900",
			name: "Jayden Cooper",
			paymentMethod: "Paystack",
			time: "24/4/2024",
			amount: "15,000",
			status: "Declined",
		},
		// ...
	];
}

const options = ["Transactions", "Transactions", "Transactions", "Transactions"];

export default async function TransactionTable() {
	const data = await getData();

	return (
		<div className="card my-5">
			<DataTable
				columns={TransationColumns}
				data={data}
				title="Transactions"
				selectOptions={options}
			/>

			<div className=" my-8 flex justify-center items-center">
				<Link
					href="/"
					className="bg-primaryBlue px-5 py-3 text-white rounded-lg"
				>
					View All Transactions
				</Link>
			</div>
		</div>
	);
}
