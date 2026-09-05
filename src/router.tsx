import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import ProductsNew from "./Pages/products/ProductsNew";
import DashboardLayout from "./layouts/DashboardLayout";
import { ProtectedRoute, PublicRoute } from "./components/ProtectedRoute";

import Dashboard from "./Pages/dashboard/Dashboard";
import Settings from "./Pages/settings/Settings";
import Marketplace from "./Pages/marketplace/Marketplace";
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
  path: "products/new",
          errorElement: <ErrorFallback />,

  element: <ProductsNew />,
},
      {
        path: "settings",
        errorElement: <ErrorFallback />,
        element: <Settings />,
      },
       {
        path: "Marketplace",
        errorElement: <ErrorFallback />,
        element: <Marketplace />,
      },
    ],
  },

  // Catch-all 404 route
  {
    path: "*",
    element: <NotFound />,
  },
]);