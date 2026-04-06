/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetReceiverParcelsQuery } from "@/redux/features/parcel/parcel.api";
import { Link } from "react-router";

const ReceiverOverview = () => {
  const { data: parcelData, isLoading } = useGetReceiverParcelsQuery(undefined);

  const allParcels = parcelData?.data?.length || 0;
  const deliveredCount =
    parcelData?.data?.filter((item: any) => item.currentStatus === "Delivered")
      .length || 0;
  const incomingCount = allParcels - deliveredCount;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="p-6">
          <Skeleton className="h-6 w-24 mb-4" />
          <Skeleton className="h-10 w-16" />
        </Card>
        <Card className="p-6">
          <Skeleton className="h-6 w-24 mb-4" />
          <Skeleton className="h-10 w-16" />
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl py-10 px-4">
      <h1 className="text-3xl font-semibold mb-6">📦 Receiver Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link to="/receiver/incoming-parcels">
          <Card className="p-6 text-center bg-slate-800 transition-colors">
            <CardContent>
              <p className="text-sm text-slate-200">Incoming Parcels</p>
              <p className="mt-2 text-3xl font-bold text-amber-300">
                {incomingCount}
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/receiver/delivered-parcels">
          <Card className="p-6 text-center bg-emerald-700 transition-colors">
            <CardContent>
              <p className="text-sm text-emerald-50">Delivered Parcels</p>
              <p className="mt-2 text-3xl font-bold text-white">
                {deliveredCount}
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default ReceiverOverview;
