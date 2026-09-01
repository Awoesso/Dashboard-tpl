import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import { UserAuth } from "../Context/Authcontext";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { isLoading } = UserAuth();

  const handleToggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  // Show loading state while checking session
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
          <p className="mt-4 text-sm text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`grid min-h-screen bg-gray-100 transition-[grid-template-columns] duration-300 ${
        collapsed
          ? "grid-cols-[68px_1fr]"
          : "grid-cols-[260px_1fr]"
      }`}
    >
      <Sidebar
        collapsed={collapsed}
        onToggle={handleToggleSidebar}
      />

      <div className="min-w-0">
        <Navbar />

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;