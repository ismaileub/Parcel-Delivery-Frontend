/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import Pagination from "@/components/ui/pagination";
import SkeletonTable from "@/components/provider/SkeletonTable";
import { useGetAllUsersQuery } from "@/redux/features/auth/auth.api";

const AllUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Pass a new object each time and force refetch when args change
  const { data, isLoading } = useGetAllUsersQuery(
    { page: currentPage, limit: itemsPerPage },
    { refetchOnMountOrArgChange: true }
  );

  if (isLoading) return <SkeletonTable />;

  const users = data?.data || [];
  const totalPages = data?.meta?.totalPages || 1;
  const totalItems = data?.meta?.total || 0;

  return (
    <div className="mt-8 border border-slate-400 rounded-lg shadow">
      <h1 className="text-center py-4 text-xl font-semibold">
        All Users ({totalItems})
      </h1>

      <Table>
        <TableHeader className="">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Joined on</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user: any) => (
            <TableRow key={user._id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    user.role === "ADMIN"
                      ? "bg-purple-200 text-purple-800"
                      : user.role === "SENDER"
                      ? "bg-blue-200 text-blue-800"
                      : "bg-green-200 text-green-800"
                  }`}
                >
                  {user.role}
                </span>
              </TableCell>
              <TableCell>
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "—"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default AllUsers;
