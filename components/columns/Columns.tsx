"use client";
import { ColumnDef } from "@tanstack/react-table";
import { StaticImageData } from "next/image";

export type BookingType = {
  id: string;
  date: string;
  time: string;
  location: string;
  status: "Pending" | "Accepted" | "Declined";
};

export const BookingColumns: ColumnDef<BookingType>[] = [
  {
    accessorKey: "id",
    header: "Booking ID",
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
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: string = row.getValue("status");

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




