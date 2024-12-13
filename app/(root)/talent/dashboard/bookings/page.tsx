import { BookingColumns, BookingType } from "@/components/columns/Columns";
import BookingCard from "@/components/overview/BookingCard";
import DataTable from "@/components/ui/gen/DataTable";
import React from "react";

async function getData(): Promise<BookingType[]> {
  return [
    {
      id: "12456256565",
      date: "24/4/2022",
      time: "11:35 AM",
      location: "14, Asherifa Juncti.hfhfhf vhf dds hdd dfsd...",
      status: "Pending",
    },
    {
      id: "2565767900",
      date: "24/4/2021",
      time: "11:15 AM",
      location: "14, Asherifa Juncti....",
      status: "Accepted",
    },
    {
      id: "8698767900",
      date: "24/4/2023",
      time: "11:45 PM",
      location: "14, Asherifa Juncti....",
      status: "Declined",
    },
    {
      id: "12456256565",
      date: "24/4/2022",
      time: "11:35 AM",
      location: "14, Asherifa Juncti...",
      status: "Pending",
    },
    {
      id: "2565767900",
      date: "24/4/2021",
      time: "11:15 AM",
      location: "14, Asherifa Juncti....",
      status: "Accepted",
    },
    {
      id: "8698767900",
      date: "24/4/2023",
      time: "11:45 PM",
      location: "14, Asherifa Juncti....",
      status: "Declined",
    },
  ];
}

export default async function Bookings() {
  const BookingData = await getData()
  return (
    <div className="w-full space-y-6">
      <h1 className="font-medium text-2xl">Bookings</h1>
      <div>
        <div className="card">
          <DataTable
            columns={BookingColumns}
            title="Bookings"
            data={BookingData}
            isRole={true}
            isSort={true}
            path="/talent/dashboard/bookings/"
            talent={true}
          />
        </div>
      </div>
    </div>
  );
}
