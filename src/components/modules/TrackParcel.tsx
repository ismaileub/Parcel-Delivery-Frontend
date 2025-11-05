/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useLazyTrackParcelByTidQuery } from "@/redux/features/parcel/parcel.api";
import { PackageSearch, Clock } from "lucide-react";

const TrackParcel = () => {
  const [trackingId, setTrackingId] = useState("");
  const [trigger, { data, isFetching, isError }] =
    useLazyTrackParcelByTidQuery();

  const handleTrack = () => {
    if (!trackingId) return;
    trigger(trackingId.trim());
  };

  const parcel = data?.data;

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4 py-10">
      <motion.div
        className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-8 shadow-md hover:shadow-lg transition-all duration-300"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <PackageSearch className="w-7 h-7 text-blue-600" />
            Track Your Parcel
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Enter your tracking ID below to get live parcel status
          </p>
        </div>

        {/* Search Input */}
        <div className="flex gap-2 mb-6">
          <Input
            placeholder="Enter Tracking ID"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            className="border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
          <Button
            onClick={handleTrack}
            disabled={isFetching}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isFetching ? "Tracking..." : "Track"}
          </Button>
        </div>

        {/* Error Message */}
        {isError && (
          <motion.p
            className="text-center text-red-500 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ❌ No parcel found for this tracking ID.
          </motion.p>
        )}

        {/* Parcel Details */}
        {parcel && (
          <motion.div
            className="mt-6 space-y-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Basic Info */}
            <div className="rounded-xl bg-blue-50 border border-blue-100 p-5">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                🚚 Parcel Overview
              </h2>
              <p>
                <span className="font-semibold text-gray-700">
                  Tracking ID:
                </span>{" "}
                <span className="text-blue-700">{parcel.trackingId}</span>
              </p>
              <p>
                <span className="font-semibold text-gray-700">
                  Current Status:
                </span>{" "}
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    parcel.currentStatus === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : parcel.currentStatus === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : parcel.currentStatus === "Cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {parcel.currentStatus}
                </span>
              </p>
              <p>
                <span className="font-semibold text-gray-700">Type:</span>{" "}
                {parcel.type}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Weight:</span>{" "}
                {parcel.weight} kg
              </p>
              <p>
                <span className="font-semibold text-gray-700">
                  Delivery Address:
                </span>{" "}
                {parcel.deliveryAddress}
              </p>
            </div>

            {/* Timeline Section */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" /> Status Timeline
              </h3>
              <ul className="relative border-l-2 border-blue-200 pl-4 space-y-4">
                {parcel.statusLogs
                  .slice()
                  .reverse()
                  .map((log: any, index: number) => (
                    <motion.li
                      key={index}
                      className="ml-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="absolute -left-3.5 top-1.5 bg-blue-600 w-3 h-3 rounded-full"></div>
                      <p className="text-sm font-medium text-gray-800">
                        {log.status}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(log.updateAt).toLocaleString()}
                      </p>
                      {log.note && (
                        <p className="text-xs text-gray-600 italic">
                          “{log.note}”
                        </p>
                      )}
                    </motion.li>
                  ))}
              </ul>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default TrackParcel;
