import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Dashboard from "../Pages/dashboard/Dashboard";
import Navbar from "../components/layout/Navbar";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`grid min-h-screen bg-gray-100 transition-[grid-template-columns] duration-300 ${
        collapsed
          ? "grid-cols-[68px_1fr]"
          : "grid-cols-[260px_1fr]"
      }`}
    >
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
      />

      {/* Contenu principal */}
      <div className="min-w-0">
        <Navbar />

        <main>
          <Dashboard />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;