import Button from "@/components/ui/Button";
import StatCard from "./StatCard";
import { ChevronRight, Lightbulb } from "lucide-react";
import GlobalStatCard from "./GlobalStatCard";

const Dashboard = () => {
  return (
    <div className="p-6 bg-[#fafafa] min-h-screen">

      {/* ================= HEADER ================= */}
      <section>
        <h1 className="font-heading text-xl font-semibold tracking-tight text-gray-900">
          Welcome Back Eli 👋
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Your academic work is now a digital work
        </p>
      </section>

      {/* ================= MILESTONE ================= */}
      <section className="w-full mt-3 px-6 py-2 bg-gray-100 rounded-full flex items-center justify-between">
        <div className="flex items-center gap-2 ">
<Lightbulb size={18}/> 
             <span className="text-sm font-medium text-gray-500">
Upload 1 more document to increase earnings by        </span>
        <span className="text-green-500 font-semibold text-[14px]">~18%</span>
        </div>
             

        <Button className="flex items-center gap-2">
          Take Action
          <ChevronRight size={18} />
        </Button>
      </section>

      {/* ================= CONTENT ================= */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-4">

        {/* Snapshot */}
        <section className="rounded-2xl border border-gray-200 bg-white p-4">

          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 text-white">
                <span className="text-[10px]">✦</span>
              </div>

              <span className="text-xs font-semibold text-gray-900">
                Your Creator Snapshot
              </span>
            </div>

            <button className="rounded-full border border-gray-200 px-3 py-1.5 text-xs text-gray-600 transition hover:bg-gray-50">
              Today ⌄
            </button>
          </div>

          {/* Stats */}
        <GlobalStatCard/> 
        </section>

        {/* Future chart */}
        <section className="min-h-[150px] rounded-2xl border border-gray-200 bg-white">
          eli
        </section>

      </div>

    </div>
  );
};

export default Dashboard;