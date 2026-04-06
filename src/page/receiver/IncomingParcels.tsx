/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useConfirmParcelMutation,
  useGetReceiverParcelsQuery,
} from "@/redux/features/parcel/parcel.api";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import SkeletonTable from "@/components/provider/SkeletonTable";
import Pagination from "@/components/ui/pagination";

const IncomingParcels = () => {
  const {
    data: response,
    isLoading: isIncoming,
    refetch,
  } = useGetReceiverParcelsQuery(undefined);

  //
  const [confirmParcel, { isLoading: isConfirming }] =
    useConfirmParcelMutation();

  // const parcels = response?.data || [];
  const incomingParcels =
    response?.data?.filter((item: any) => item.currentStatus !== "Delivered") ||
    [];
  const totalItems = incomingParcels.length;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedParcels = incomingParcels.slice(startIndex, endIndex);

  const handleConfirm = async (id: string) => {
    try {
      const res = await confirmParcel({ id }).unwrap();
      if (res.success) {
        toast.success("Parcel Confirmed successfully");
      }
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to confirm parcel");
    }
  };

  if (isIncoming) return <SkeletonTable />;

  return (
    <div className="max-w-7xl mx-auto mt-8 border border-slate-400 rounded-lg shadow">
      <h1 className="text-center py-4 text-xl font-semibold">
        All My Incoming Parcels ({totalItems})
      </h1>

      <Table>
        <TableHeader className="bg-gray-500 text-white">
          <TableRow>
            <TableHead>Tracking ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Fee</TableHead>
            <TableHead>Pickup location</TableHead>
            <TableHead>Delivered from</TableHead>
            <TableHead>Delivery Date</TableHead>
            <TableHead>Sender's info</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginatedParcels.map((item: any) => (
            <TableRow key={item._id}>
              <TableCell>{item.trackingId}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.weight} kg</TableCell>
              <TableCell>{item.fee} ৳</TableCell>
              <TableCell>{item.pickupAddress}</TableCell>
              <TableCell>{item.deliveryAddress}</TableCell>
              <TableCell>
                {item.deliveryDate
                  ? new Date(item.deliveryDate).toLocaleDateString()
                  : "N/A"}
              </TableCell>
              <TableCell>
                <small>
                  Name: {item?.sender?.name || "N/A"}
                  <br />
                  Email: {item?.sender?.email || "N/A"}
                </small>
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    item.currentStatus === "Requested"
                      ? "bg-yellow-200 text-yellow-800"
                      : item.currentStatus === "Delivered"
                        ? "bg-green-200 text-green-800"
                        : item.currentStatus === "Cancelled"
                          ? "bg-red-600 text-white"
                          : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {item.currentStatus}
                </span>
              </TableCell>
              <TableCell>
                {item.currentStatus === "Out for Delivery" ? (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        className="bg-green-600"
                        size="sm"
                        disabled={isConfirming}
                      >
                        Confirm Delivery
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Parcel?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to confirm this parcel?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Close</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleConfirm(item._id)}
                          disabled={isConfirming}
                        >
                          {isConfirming ? "Confirming..." : "Confirm Delivery"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ) : (
                  <Button disabled size="sm" className="bg-green-600">
                    Non-Confirmable
                  </Button>
                )}
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

export default IncomingParcels;
