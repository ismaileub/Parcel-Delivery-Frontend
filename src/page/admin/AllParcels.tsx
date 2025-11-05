/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import {
  useGetAllParcelsQuery,
  useUpdateParcelStatusMutation,
} from "@/redux/features/parcel/parcel.api";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SkeletonTable from "@/components/provider/SkeletonTable";
import Pagination from "@/components/ui/pagination";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { IUser } from "@/constant/user.interface";

const STATUS_OPTIONS = [
  "Pending",
  "Approved",
  "Picked Up",
  "Dispatched",
  "In-Transit",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
  "Returned",
];

const SORT_OPTIONS = [
  { label: "Newest", value: "createdAt_desc" },
  { label: "Oldest", value: "createdAt_asc" },
];

const AllParcels = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [sortOption, setSortOption] = useState(SORT_OPTIONS[0].value);

  const [sortBy, sortOrder] = sortOption.split("_");

  const { data, isLoading, refetch } = useGetAllParcelsQuery(
    {
      page: currentPage,
      limit: itemsPerPage,
      sortBy,
      sortOrder,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const { data: userData } = useUserInfoQuery(undefined);

  const user: IUser = userData?.data;

  const userId = user?._id;

  const [updateParcelStatus] = useUpdateParcelStatusMutation();

  const handleUpdateParcelStatus = async (parcelId: string, status: string) => {
    if (!userId) {
      toast.error("User not logged in!");
      return;
    }

    try {
      const updateData = {
        currentStatus: status,
        updatedBy: userId,
      };

      console.log(updateData);

      const result = await updateParcelStatus({
        id: parcelId,
        updateData,
      }).unwrap();

      toast.success(`Status updated to ${status}`);
      refetch();
      return result.data;
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update status");
      console.log("err", err);
    }
  };

  if (isLoading) return <SkeletonTable />;

  const parcels = data?.data || [];
  const totalPages = data?.meta?.totalPages || 1;
  const totalItems = data?.meta?.total || 0;

  return (
    <div className="mt-8 border border-slate-400 rounded-lg shadow">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-xl text-center mx-auto font-semibold">
          All Parcels ({totalItems})
        </h1>

        {/* Sort Dropdown */}
        <Select value={sortOption} onValueChange={setSortOption}>
          <SelectTrigger className="w-56">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader className="bg-gray-300">
          <TableRow>
            <TableHead>Tracking ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Fee</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Update Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {parcels.map((parcel: any) => (
            <TableRow key={parcel._id}>
              <TableCell>{parcel.trackingId}</TableCell>
              <TableCell>{parcel.type}</TableCell>
              <TableCell>{parcel.weight} kg</TableCell>
              <TableCell>{parcel.fee} ৳</TableCell>

              <TableCell>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    parcel.currentStatus === "Pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : parcel.currentStatus === "Delivered"
                      ? "bg-green-200 text-green-800"
                      : parcel.currentStatus === "Cancelled"
                      ? "bg-red-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {parcel.currentStatus}
                </span>
              </TableCell>

              <TableCell>
                <Select
                  onValueChange={async (value) =>
                    await handleUpdateParcelStatus(parcel._id, value)
                  }
                  defaultValue={parcel.currentStatus}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Update status" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default AllParcels;
