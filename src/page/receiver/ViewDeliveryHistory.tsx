/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SkeletonTable from "@/components/provider/SkeletonTable";
import { useGetReceiverParcelsQuery } from "@/redux/features/parcel/parcel.api";

const ViewDeliveryHistory = () => {
  const { data, isLoading } = useGetReceiverParcelsQuery(undefined);

  const deliveredParcels =
    data?.data?.filter((item: any) => item.currentStatus === "Delivered") || [];

  const totalItems = deliveredParcels.length;

  if (isLoading) {
    return <SkeletonTable />;
  }

  return (
    <div>
      <div className="max-w-6xl mx-auto mt-8 border border-slate-400 rounded-lg shadow">
        <h1 className="text-center py-4 text-xl font-semibold">
          All My Delivered Parcels ({totalItems})
        </h1>

        <Table>
          <TableHeader className="bg-slate-800 text-white">
            <TableRow>
              <TableHead className="text-white">Tracking ID</TableHead>
              <TableHead className="text-white">Type</TableHead>
              <TableHead className="text-white">Weight</TableHead>
              <TableHead className="text-white">Fee</TableHead>
              <TableHead className="text-white">Pickup Location</TableHead>
              <TableHead className="text-white">Delivered From</TableHead>
              <TableHead className="text-white">Delivery Date</TableHead>
              <TableHead className="text-white">Sender's Info</TableHead>
              <TableHead className="text-white">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {deliveredParcels.length > 0 ? (
              deliveredParcels.map((item: any) => (
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
                      : "—"}
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
                        item.currentStatus === "Delivered"
                          ? "bg-green-200 text-green-800"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {item.currentStatus}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-4">
                  No delivered parcels found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ViewDeliveryHistory;
