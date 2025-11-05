import { Card, CardContent } from "@/components/ui/card";
import { useGetAllUsersQuery } from "@/redux/features/auth/auth.api";
import { useGetAllParcelsQuery } from "@/redux/features/parcel/parcel.api";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router";

const AdminOverview = () => {
  const { data: parcelData, isLoading: IsParcelLoading } =
    useGetAllParcelsQuery(undefined);
  const { data: userData, isLoading: IsUserLoading } =
    useGetAllUsersQuery(undefined);

  const allParcels = parcelData?.meta?.total | 0;
  const allUsers = userData?.meta?.total || 0;

  if (IsParcelLoading || IsUserLoading) {
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
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-semibold mb-6 text-center">
        📊 Admin Overview
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Parcels */}
        <Link to="/admin/all-parcels">
          <Card className="p-6 text-center bg-blue-300 transition-colors">
            <CardContent>
              <p className="text-sm text-gray-100">Total Parcels</p>
              <p className="text-3xl font-bold text-white mt-2">{allParcels}</p>
            </CardContent>
          </Card>
        </Link>

        {/* Users */}
        <Link to="/admin/all-users">
          <Card className="p-6 text-center bg-blue-300 transition-colors">
            <CardContent>
              <p className="text-sm text-gray-100">Total Users</p>
              <p className="text-3xl font-bold text-white mt-2">{allUsers}</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default AdminOverview;
