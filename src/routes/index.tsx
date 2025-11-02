import App from "@/App";
import TrackParcel from "@/components/modules/TrackParcel";
import Login from "@/page/Login";
import Register from "@/page/Register";
import { createBrowserRouter } from "react-router";
export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      // {
      //   Component: About,
      //   path: "about",
      // },
      {
        path: "track-parcel",
        Component: TrackParcel,
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
]);
