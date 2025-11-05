/* eslint-disable @typescript-eslint/no-explicit-any */
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
  useCancelParcelMutation,
  useGetSenderAllParcelQuery,
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
import { CreatedParcelModal } from "@/components/modules/CreatedParcelModal";

const CreatedParcels = () => {
  const { data, isLoading } = useGetSenderAllParcelQuery(undefined);
  const [cancelParcel, { isLoading: isCancelling }] = useCancelParcelMutation();

  const parcels = data?.data || [];
  const totalItems = parcels.length;

  const handleCancel = async (id: string) => {
    try {
      const res = await cancelParcel({ id }).unwrap();
      if (res.success) {
        toast.success("Parcel cancelled successfully");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to cancel parcel");
    }
  };

  if (isLoading) {
    return <SkeletonTable />;
  }

  return (
    <div>
      <CreatedParcelModal />

      <div className="w-full mx-auto mt-8 border border-slate-400 rounded-lg shadow">
        <h1 className="text-center py-4 text-xl font-semibold">
          All My Created Parcels ({totalItems})
        </h1>

        <Table>
          <TableHeader className="bg-slate-800 text-white">
            <TableRow>
              <TableHead className="text-white">Tracking ID</TableHead>
              <TableHead className="text-white">Type</TableHead>
              <TableHead className="text-white">Weight</TableHead>
              <TableHead className="text-white">Fee</TableHead>
              <TableHead className="text-white">Pickup Address</TableHead>
              <TableHead className="text-white">Delivery Address</TableHead>
              <TableHead className="text-white">Delivery Date</TableHead>
              <TableHead className="text-white">Receiver</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-center text-white">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {parcels.map((item: any) => (
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
                  <small>{item.receiver.email}</small>
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
                <TableCell className="text-center">
                  {item.currentStatus === "Pending" ||
                  item.currentStatus === "Approved" ? (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="sm"
                          disabled={isCancelling}
                        >
                          Cancel
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Cancel Parcel?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to cancel this parcel?
                            <br />
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Close</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleCancel(item._id)}
                            disabled={isCancelling}
                          >
                            {isCancelling ? "Cancelling..." : "Confirm Cancel"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  ) : (
                    <Button disabled size="sm" variant="destructive">
                      Non-Cancelable
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CreatedParcels;
