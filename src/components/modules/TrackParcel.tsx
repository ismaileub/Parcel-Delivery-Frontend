/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLazyTrackParcelByTidQuery } from "@/redux/features/parcel/parcel.api";

const TrackParcel = () => {
  const [trackingId, setTrackingId] = useState("");
  const [trigger, { data, isFetching, isError }] =
    useLazyTrackParcelByTidQuery();

  const handleTrack = () => {
    if (!trackingId) return;
    trigger(trackingId.trim()); // safe: remove extra spaces
  };

  const parcel = data?.data; // shortcut for easier access

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md rounded-2xl border p-6 shadow-sm my-6 ">
        <h1 className="mb-4 text-center text-2xl font-semibold text-gray-700">
          Track Your Parcel
        </h1>

        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Enter Tracking ID"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
          />
          <Button onClick={handleTrack} disabled={isFetching}>
            {isFetching ? "Tracking..." : "Track"}
          </Button>
        </div>

        {/* Error */}
        {isError && (
          <p className="text-center text-red-500">❌ Parcel not found</p>
        )}

        {/* Parcel Details */}
        {parcel && (
          <div className="space-y-4">
            <div className="rounded-lg border p-4 bg-gray-50">
              <h2 className="text-lg font-semibold mb-2 text-gray-800">
                📦 Tracking ID: {parcel.trackingId}
              </h2>
              <p>
                <span className="font-semibold">Current Status:</span>{" "}
                {parcel.currentStatus}
              </p>
              <p>
                <span className="font-semibold">Type:</span> {parcel.type}
              </p>
              <p>
                <span className="font-semibold">Weight:</span> {parcel.weight}{" "}
                kg
              </p>
              <p>
                <span className="font-semibold">Delivery Address:</span>{" "}
                {parcel.deliveryAddress}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                📜 Status History
              </h3>
              <ul className="space-y-2">
                {parcel.statusLogs.map((log: any, index: number) => (
                  <li
                    key={index}
                    className="rounded-lg border bg-white p-3 text-sm shadow-sm"
                  >
                    <p>
                      <span className="font-semibold">Status:</span>{" "}
                      {log.status}
                    </p>
                    <p>
                      <span className="font-semibold">Updated At:</span>{" "}
                      {new Date(log.updateAt).toLocaleString()}
                    </p>
                    {log.note && (
                      <p>
                        <span className="font-semibold">Note:</span> {log.note}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackParcel;
