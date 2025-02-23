"use client";
import React, { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  // ColumnFiltersState,
  getFilteredRowModel,
  FilterFn,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { rankItem } from "@tanstack/match-sorter-utils";
import { useRouter } from "next/navigation";

import { BookingOptions } from "@/components/overview/SortData";
import SortList from "@/components/overview/SortList";
import RoleSwitch from "@/components/overview/RoleSwitch";
import Image from "next/image";
interface RoleSwitchProps {
  roleHandler: (role: string) => void; // Assuming roleHandler is a function that accepts a role as a string
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title: string;
  path: string;
  isSort: boolean;
  isRole: boolean;
  talent?: boolean;
  changeType?: any;
  bookingType?: any;
}
interface GlobalFilter {
  globalFilter: any;
}
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);


  // Store the itemRank info
  addMeta({ itemRank });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};
function DataTable<TData, TValue>({
  columns,
  data,
  path,
  isSort,
  isRole,
  talent,
  changeType,
  bookingType,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const [sort, setSort] = useState(""); // Initial selected option

  const [globalFilter, setGlobalFilter] = useState<string>("");
  // const [role, setRole] = useState<boolean>(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    filterFns: {
      fuzzy: fuzzyFilter, //define as a filter function that can be used in column definitions
    },
    globalFilterFn: "fuzzy",
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  const handleNavigate = (id: number) => {
    router.push(
      talent ? `/talent/dashboard/bookings/${id}` : `/dashboard/bookings/${id}`
    );
  };

  const roleHandler = (role: string) => {
    changeType(role);
  };

  const bookingRoles = [
    { value: "", label: "All" },
    { value: "instant", label: "Instant" },
    { value: "scheduled", label: "Scheduled" },
  ];

  const sortHandler = (role: string) => {
    // cosnole.log("Selected role:", role);
    setSort(role);
    // Your role change logic here
  };

  return (
    <div>
      <div className="mb-5">
        {/* <h1 className="font-medium text-2xl">{title}</h1> */}
        <div className="flex flex-col sm:flex-row gap-5 justify-between items-start sm:items-center">
          {isRole ? (
            <RoleSwitch
              initialRole={bookingType}
              roles={bookingRoles}
              onRoleChange={roleHandler}
            />
          ) : null}
          {isSort ? (
            <SortList options={BookingOptions} onSortChange={sortHandler} />
          ) : null}
        </div>
      </div>

      <div className="rounded-md borde">
        <Table className="whitespace-nowrap">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="h-14"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() =>
                    path.length > 0
                      ? handleNavigate(row.original.id)
                      : undefined
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="w-1/5 h-14">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="py-10 text-center"
                >
                  <Image
                    src={"/Images/empty-data.png"}
                    alt="Empty Data"
                    height={150}
                    width={150}
                    className="mx-auto"
                  />
                  {talent ? (
                    <div>
                      <p>You havent received any booking yet</p>
                      <p>
                        No bookings yet, but new requests may come in at any
                        time!
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p>You havent made any booking yet</p>
                      <p>
                        Explore our services and book what you need in just a
                        few taps
                      </p>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default DataTable;
