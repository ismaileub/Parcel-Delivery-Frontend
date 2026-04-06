import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import TrackParcel from "@/components/modules/TrackParcel";
import Contact from "@/components/modules/Contact";
import UnAuthorized from "@/components/modules/UnAuthorized";
import { withAuth } from "@/components/modules/withAuth";
import { role } from "@/constant/role";
import Login from "@/page/Login";
import Register from "@/page/Register";
import NotFound from "@/page/NotFound";
import type { TRole } from "@/types";
import { generateRoutes } from "@/ults/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { AdminSidebarItems } from "./AdminSidebarItems";
import { SenderSidebarItems } from "./SenderSidebarItems";
import { ReceiverSidebarItems } from "./ReceiverSidebarItems";
import Home from "@/components/modules/Home";
import AboutUs from "@/components/modules/AboutUs";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        path: "",
        Component: Home,
      },
      {
        Component: AboutUs,
        path: "about",
      },
      {
        path: "track-parcel",
        Component: TrackParcel,
      },
      {
        path: "contact",
        Component: Contact,
      },
    ],
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
  {
    Component: UnAuthorized,
    path: "/unauthorized",
  },
  {
    path: "*",
    Component: NotFound,
  },

  // admin routes
  {
    Component: withAuth(DashboardLayout, role.admin as TRole),
    path: "/admin",
    children: [
      {
        path: "",
        // index : true,
        element: <Navigate to="/admin/overview" />,
      },
      ...generateRoutes(AdminSidebarItems),
    ],
  },

  // sender routes
  {
    Component: withAuth(DashboardLayout, role.sender as TRole),
    path: "/sender",
    children: [
      {
        path: "",
        // index : true,
        element: <Navigate to="/sender/sender-overview" />,
      },
      ...generateRoutes(SenderSidebarItems),
    ],
  },

  // receiver routes
  {
    Component: withAuth(DashboardLayout, role.receiver as TRole),
    path: "/receiver",
    children: [
      {
        path: "",
        // index : true,
        element: <Navigate to="/receiver/receiver-overview" />,
      },
      ...generateRoutes(ReceiverSidebarItems),
    ],
  },
]);
