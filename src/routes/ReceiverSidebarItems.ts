import IncomingParcels from "@/page/receiver/IncomingParcels";
import ViewDeliveryHistory from "@/page/receiver/ViewDeliveryHistory";
import type { ISidebarItems } from "@/types";

export const ReceiverSidebarItems: ISidebarItems[] = [
  {
    title: "Receiver Dashboard Menu",
    items: [
      {
        title: "Incoming parcels",
        url: "/receiver/incoming-parcels",
        component: IncomingParcels,
      },
      {
        title: "Received parcels",
        url: "/receiver/delivered-parcels",
        component: ViewDeliveryHistory,
      },
    ],
  },
];
