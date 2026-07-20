import { createBrowserRouter } from "react-router";
import Root from "../pages/Root";
import Home from "../pages/HomePage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
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
          {index:true,Component:Dashboard}
          
          
        ],
      },
    ],
  },
]);

export default router;