import { UserType, UserColumns } from "@/components/Columns";
import { DataTable } from "@/components/DataTable";
import { UserFilter } from "../FilterData";
import { UserOptions } from "../SortData";


async function getData(): Promise<UserType[]> {
  return [
    {
      id: "1",
      name: "Justin Cooper",
      image: "@/assets/images/verify.png",
      email: "Jaydencooper@gmail.com",
      type: "Talent",
      phone: "070123456789",
      status: "Active",
    },
    {
      id: "2",
      name: "Martin Cooper",
      image: "@/assets/images/verify.png",
      email: "Jaydencooper@gmail.com",
      type: "Customer",
      phone: "070123456789",
      status: "Deleted",
    },
    {
      id: "3",
      name: "Jayden Cooper",
      image: "@/assets/images/verify.png",
      email: "Jaydencooper@gmail.com",
      type: "Talent",
      phone: "070123456789",
      status: "Suspended",
    },
    {
      id: "4",
      name: "Justin Cooper",
      image: "@/assets/images/verify.png",
      email: "Jaydencooper@gmail.com",
      type: "Talent",
      phone: "070123456789",
      status: "Active",
    },
    {
      id: "5",
      name: "Martin Cooper",
      image: "@/assets/images/verify.png",
      email: "Jaydencooper@gmail.com",
      type: "Customer",
      phone: "070123456789",
      status: "Deleted",
    },
    {
      id: "6",
      name: "Jayden Cooper",
      image: "@/assets/images/verify.png",
      email: "Jaydencooper@gmail.com",
      type: "Talent",
      phone: "070123456789",
      status: "Suspended",
    },
    {
      id: "7",
      name: "Justin Cooper",
      image: "@/assets/images/verify.png",
      email: "Jaydencooper@gmail.com",
      type: "Talent",
      phone: "070123456789",
      status: "Active",
    },
    {
      id: "8",
      name: "Martin Cooper",
      image: "@/assets/images/verify.png",
      email: "Jaydencooper@gmail.com",
      type: "Customer",
      phone: "070123456789",
      status: "Deleted",
    },
    {
      id: "9",
      name: "Jayden Cooper",
      image: "@/assets/images/verify.png",
      email: "Jaydencooper@gmail.com",
      type: "Talent",
      phone: "070123456789",
      status: "Suspended",
    },
    {
      id: "10",
      name: "Justin Cooper",
      image: "@/assets/images/verify.png",
      email: "Jaydencooper@gmail.com",
      type: "Talent",
      phone: "070123456789",
      status: "Active",
    },
    {
      id: "11",
      name: "Martin Cooper",
      image: "@/assets/images/verify.png",
      email: "Jaydencooper@gmail.com",
      type: "Customer",
      phone: "070123456789",
      status: "Deleted",
    },
    {
      id: "12",
      name: "Jayden Cooper",
      image: "@/assets/images/verify.png",
      email: "Jaydencooper@gmail.com",
      type: "Talent",
      phone: "070123456789",
      status: "Suspended",
    },
  ];
}


export default async function UserTable() {
  const data = await getData();

  return (
    <div className="card my-5">
      <DataTable
        columns={UserColumns}
        data={data}
        title="User List"
        selectOptions={UserOptions}
			  path="/users"
			  filterType={UserFilter}
      />
    </div>
  );
}
