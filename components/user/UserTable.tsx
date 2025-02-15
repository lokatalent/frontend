"use client";

import { UserType, UserColumns } from "@/components/Columns";
import { DataTable } from "@/components/DataTable";
import { UserFilter } from "../FilterData";
import { UserOptions } from "../SortData";
import PageSpinner from "@/components/ui/PageSpinner";
import { useDispatch } from "react-redux"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { showToast } from "@/store/auth/toastSlice"
import { getAllUsers } from "@/services/adminService";
import { handleUnauthorizedError } from "@/lib/utils";

export default function UserTable() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const fetchData = async()=>{
    setLoading(true);
    const response: any = await getAllUsers();
    console.log(response);
    if (!response.error) {
      setLoading(false);
      setUsers(response.data);
    } else {
      setLoading(false);
      handleUnauthorizedError(response, dispatch, router, showToast);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    loading ? (
      <PageSpinner />
    ) : (
      <div className="card my-5">
        <DataTable
          columns={UserColumns}
          data={users}
          title="User List"
          selectOptions={UserOptions}
          path="/admin/users"
          filterType={UserFilter}
        />
      </div>
    )
  );
};
