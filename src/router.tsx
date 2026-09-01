import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";
import { ProtectedRoute, PublicRoute } from "./components/ProtectedRoute";

import Dashboard from "./Pages/dashboard/Dashboard";
import Settings from "./Pages/settings/Settings";

import SignIn from "./Pages/auth/SignIn";
import SignUp from "./Pages/auth/SignUp";
import NotFound from "./Pages/NotFound";
import ErrorFallback from "./Pages/ErrorFallback";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorFallback />,
    element: <Navigate to="/dashboard" replace />,
  },

  {
    path: "/signin",
    errorElement: <ErrorFallback />,
    element: (
      <PublicRoute>
        <SignIn />
      </PublicRoute>
    ),
  },

  {
    path: "/signup",
    errorElement: <ErrorFallback />,
    element: (
      <PublicRoute>
        <SignUp />
      </PublicRoute>
    ),
  },

  {
    path: "/dashboard",
    errorElement: <ErrorFallback />,
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="home" replace />,
      },

      {
        path: "home",
        errorElement: <ErrorFallback />,
        element: <Dashboard />,
      },

      {
        path: "settings",
        errorElement: <ErrorFallback />,
        element: <Settings />,
      },
    ],
  },

  // Catch-all 404 route
  {
    path: "*",
    element: <NotFound />,
  },
]);