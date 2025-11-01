import App from "@/App";
import Login from "@/page/Login";
import Register from "@/page/REgister";
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
