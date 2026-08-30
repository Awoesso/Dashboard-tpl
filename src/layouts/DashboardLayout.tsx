import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div
      className={`
        grid
        min-h-screen
        bg-gray-100
        transition-[grid-template-columns]
        duration-300

        ${
          collapsed
            ? "grid-cols-[68px_1fr]"
            : "grid-cols-[260px_1fr]"
        }

        max-md:block
      `}
    >

      {/* ================= SIDEBAR ================= */}

      <Sidebar
        collapsed={collapsed}
        onToggle={handleToggleSidebar}
      />

      {/* ================= MAIN ================= */}

      <div className="min-w-0">

        <Navbar />

        <main className="min-w-0 p-3 sm:p-4 lg:p-5 bg-[#fafafa]">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;