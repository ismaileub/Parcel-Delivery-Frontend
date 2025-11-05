import { role } from "@/constant/role";
import { AdminSidebarItems } from "@/routes/AdminSidebarItems";
import { ReceiverSidebarItems } from "@/routes/ReceiverSidebarItems";
import { SenderSidebarItems } from "@/routes/SenderSidebarItems";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case role.admin:
      return [...AdminSidebarItems];
    case role.receiver:
      return [...ReceiverSidebarItems];
    case role.sender:
      return [...SenderSidebarItems];
    default:
      return [];
  }
};
