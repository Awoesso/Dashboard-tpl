import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./Pages/dashboard/Dashboard";
import Settings from "./Pages/settings/Settings";

import SignIn from "./Pages/auth/SignIn";
import SignUp from "./Pages/auth/SignUp";

export const router = createBrowserRouter([
  {
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },

  {
    path: "/signin",
    element: <SignIn />,
  },

  {
    path: "/signup",
    element: <SignUp />,
  },

  {
    path: "*",
    element: <Navigate to="/signup" replace />,
  },
]);