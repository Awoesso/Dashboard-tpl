import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./index.css";
import { router } from "./router";
import { AuthcontextProvider } from "./Context/Authcontext";
import { ErrorBoundary } from "./components/ErrorBoundary";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthcontextProvider>
        <RouterProvider router={router} />
      </AuthcontextProvider>
    </ErrorBoundary>
  </React.StrictMode>
);