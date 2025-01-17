"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Image } from "next/image";
import Link from "next/link";
export type BookingType = {
	id: string;
	customer: string;
	talent: string;
	date: string;
	time: string;
	status: "Pending" | "Accepted" | "Declined";
};
export type TransactionType = {
	id: string;
	name: string;
	paymentMethod: string;
	amount: string;
	time: string;
	status: "Pending" | "Accepted" | "Declined";
};
export type UserType = {
	id: string;
	name: any;
	image: string;
	email: string;
	type: string;
	phone: string;
	status: "Active" | "Deleted" | "Suspended";
};
export const BookingColumns: ColumnDef<BookingType>[] = [
	{
		accessorKey: "id",
		header: "Booking ID",
	},
	{
		accessorKey: "customer",
		header: "Customer",
	},
	{
		accessorKey: "talent",
		header: "Talent",
	},

	{
		accessorKey: "date",
		header: "Date",
	},
	{
		accessorKey: "time",
		header: "Time",
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const status = row.getValue("status");

			return (
				<div className="flex items-center">
					<p
						className={`px-2 py-2 flex items-center justify-center w-[122px] rounded-md text-sm font-medium ${
							status === "Accepted"
								? "bg-accept "
								: status === "Pending"
								? "bg-yellow "
								: "bg-red-100 "
						}`}
					>
						{status}
					</p>
				</div>
			);
		},
	},
];
export const TransationColumns: ColumnDef<TransactionType>[] = [
	{
		accessorKey: "id",
		header: "Transaction ID",
	},
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "paymentMethod",
		header: "Payment Method",
	},

	{
		accessorKey: "amount",
		header: "Amount",
	},
	{
		accessorKey: "time",
		header: "Time",
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const status = row.getValue("status");

			return (
				<div className="flex items-center">
					<p
						className={`px-2 py-2 flex items-center justify-center w-[122px] rounded-md text-sm font-medium ${
							status === "Accepted"
								? "bg-accept "
								: status === "Pending"
								? "bg-yellow "
								: "bg-red-100 "
						}`}
					>
						{status}
					</p>
				</div>
			);
		},
	},
];
export const UserColumns: ColumnDef<UserType>[] = [
	{
		accessorKey: "name",
		header: "Name",
		cell: ({ row }) => {
			const nameData = row.original; // The whole row's data
			return (
				<div className="flex items-center space-x-2">
					<Link href={`/users/${nameData.id}`}>
						<p className="text-blue-500">{nameData.name}</p>
					</Link>
				</div>
			);
		},
	},
	{
		accessorKey: "email",
		header: "Email",
	},

	{
		accessorKey: "type",
		header: "Type",
	},
	{
		accessorKey: "phone",
		header: "Phone Number",
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const status = row.getValue("status");

			return (
				<div className="flex items-center">
					<p
						className={`px-2 py-2 flex items-center justify-center w-[122px] rounded-md text-sm font-medium ${
							status === "Active"
								? "bg-accept "
								: status === "Suspended"
								? "bg-yellow "
								: "bg-red-100 "
						}`}
					>
						{status}
					</p>
				</div>
			);
		},
	},
];
