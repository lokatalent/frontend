"use client";

import { BookingType, BookingColumns } from "@/components/Columns";
import { DataTable } from "@/components/DataTable";
import Link from "next/link";
import { BookingOptions } from "../SortData";

interface MyObject {
  name: string;
  options: string[];
}

const getSelect: MyObject[] = [
  {
    name: "Booking Type",
    options: ["Instant Booking", "Scheduled Booking"],
  },
  {
    name: "Status",
    options: ["Pending", "In Progress", "Completed", "Cancelled"],
  },
  {
    name: "Service Type",
    options: [
      "Driving",
      "Indoor Cleaning",
      "Solar Installation",
      "Electrical Cleaning",
    ],
  },
  {
    name: "Role",
    options: ["Customer", "Talent"],
  },
];



export default function BookingTable({ isHome , data }: {isHome: boolean, data: BookingType []}) {
	// const data = await getData();

	return (
    <div className="card my-5">
      <DataTable
        columns={BookingColumns}
        data={data}
        title="Bookings"
        selectOptions={BookingOptions}
        path="/admin/bookings"
        filterType={getSelect}
      />

      {isHome && (
        <div className=" my-8 flex justify-center items-center">
          <Link
            href="/admin/bookings"
            className="bg-primaryBlue px-5 py-3 text-white rounded-lg"
          >
            View All Bookings
          </Link>
        </div>
      )}
    </div>
  );
}
