"use client";
import { formatDate, formatDateTime, shortenSentence } from "@/lib/utils";
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
  // {
  //   accessorKey: "id",
  //   header: "Booking ID",
  // },
  {
    accessorKey: "service_type",
    header: "Service",
    cell: ({ row }) => {
      const service: string = row.getValue("service_type");

      return (
        <div className="flex items-center">
          <p className="capitalize">{service}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "start_date",
    header: "Request Date",
    cell: ({ row }) => {
      const date: string = row.getValue("start_date");

      return (
        <div className="flex items-center">
          <p className="capitalize">{formatDate(date)}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "start_time",
    header: "Start Time",
  },
  {
    accessorKey: "end_time",
    header: "End Time",
  },
  {
    accessorKey: "booking_type",
    header: "Type",
    cell: ({ row }) => {
      const booking: string = row.getValue("booking_type");

      return (
        <div className="flex items-center">
          <p className="capitalize">{booking}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "requester_addr",
    header: "Location",
    cell: ({ row }) => {
      const location: string = row.getValue("requester_addr");

      return (
        <div className="flex items-center">
          <p className="capitalize">{shortenSentence(location, 20)}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Created on",
    cell: ({ row }) => {
      const date: string = row.getValue("created_at");

      return (
        <div className="flex items-center">
          <p className="capitalize">{formatDateTime(date)}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: string = row.getValue("status");

      return (
        <div className="flex items-center">
          <p
            className={`px-1 py-1 capitalize flex items-center justify-center w-[80px] rounded-md text-sm font-medium ${
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
