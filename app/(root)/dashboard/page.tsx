"use client";

import { BookingColumns, BookingType } from "@/components/columns/Columns";
import BalanceCard from "@/components/overview/BalanceCard";
import BookingCard from "@/components/overview/BookingCard";
import DataTable from "@/components/ui/gen/DataTable";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
// async function getData(): Promise<BookingType[]> {
//   return [
//     {
//       id: "12456256565",
//       date: "24/4/2022",
//       time: "11:35 AM",
//       location: "14, Asherifa Juncti.hfhfhf vhf dds hdd dfsd...",
//       status: "Pending",
//     },
//     {
//       id: "2565767900",
//       date: "24/4/2021",
//       time: "11:15 AM",
//       location: "14, Asherifa Juncti....",
//       status: "Accepted",
//     },
//     {
//       id: "8698767900",
//       date: "24/4/2023",
//       time: "11:45 PM",
//       location: "14, Asherifa Juncti....",
//       status: "Declined",
//     },
//   ];
// }

export default function Dashboard() {
  const user = useSelector((state: any) => state.auth.user);
  const BookingData: any = [];
  return (
    <div className="w-full space-y-6">
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col space-y-3">
          <p className="text-3xl text-black font-bold">
            Hello {user?.first_name}👋
          </p>
          <p className="text-[#6C727F]">
            Ready to book? We’ve got you covered.
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row  gap-4">
        <BalanceCard text="Balance" number={0} />
        <BookingCard />
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

          {BookingData.length > 0 && (
            <div className="flex justify-center mt-5">
              <Link
                href="/dashboard/bookings"
                className="px-10 py-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                View all bookings
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
