import { createBrowserRouter } from "react-router";
import Root from "../pages/Root";
import Home from "../pages/HomePage";
import AuthLayout from "../components/layouts/AuthLayout";
import Login from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import Attendance from "../pages/Attendance";
const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      {
        path: "auth",
        
        children: [
          { path: "login", Component: Login },
          // { path: "register", Component: Register },
        ],
      },
      {
        path: "home",
        Component: AuthLayout,
        children: [
          {index:true,Component:Dashboard},
          {path:"attendance",Component: Attendance},
          
          
        ],
      },
    ],
  },
]);

export default router;