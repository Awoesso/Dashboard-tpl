import Button from "@/components/ui/Button";
import GlobalStatCard from "./GlobalStatCard";
import {
  ChevronRight,
  Lightbulb,
  Wallet,
  MoreHorizontal,
  FileText,
  Download,
  CircleCheck,
  Clock,
  BarChart3,
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] p-6">

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

      <section className="mt-3 flex w-full items-center justify-between rounded-full bg-gray-100 px-6 py-2">
        <div className="flex items-center gap-2">
          <Lightbulb
            size={18}
            strokeWidth={1.8}
            className="text-gray-700"
          />

          <span className="text-sm font-medium text-gray-500">
            Upload 1 more document to increase earnings by
          </span>

          <span className="text-[14px] font-semibold text-green-500">
            ~18%
          </span>
        </div>

        <Button className="flex items-center gap-2">
          Take Action
          <ChevronRight size={18} />
        </Button>
      </section>

      {/* =====================================================
          COMPLEX DASHBOARD GRID
      ===================================================== */}

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[1.8fr_1fr]">

        {/* =================================================
            LEFT COLUMN
        ================================================= */}

        <div className="grid min-w-0 gap-4">

          {/* ================= CREATOR SNAPSHOT ================= */}

          <section className="rounded-2xl border border-gray-200 bg-white p-4">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2">

                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 text-white">
                  <span className="text-[10px]">✦</span>
                </div>

                <span className="text-xs font-semibold text-gray-900">
                  Your Creator Snapshot
                </span>

              </div>

              <button
                type="button"
                className="rounded-full border border-gray-200 px-3 py-1.5 text-xs text-gray-600 transition hover:bg-gray-50"
              >
                Today ⌄
              </button>

            </div>

            <div className="mt-3">
              <GlobalStatCard />
            </div>

          </section>


          {/* ================= DOCUMENT PERFORMANCE ================= */}

          <section className="rounded-2xl border border-gray-200 bg-white p-4">

            {/* Header */}

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2">

                <FileText
                  size={15}
                  strokeWidth={1.8}
                  className="text-gray-500"
                />

                <div>
                  <h2 className="text-xs font-semibold text-gray-900">
                    How Your Documents Are Performing
                  </h2>

                  <p className="mt-0.5 text-[10px] text-gray-400">
                    Track your documents performance
                  </p>
                </div>

              </div>

              <button
                type="button"
                className="rounded-full border border-gray-200 px-3 py-1 text-[10px] font-medium text-gray-600 hover:bg-gray-50"
              >
                See All →
              </button>

            </div>


            {/* Table */}

            <div className="mt-4 overflow-hidden rounded-xl border border-gray-100">

              {/* Table header */}

              <div className="grid grid-cols-[1.8fr_0.8fr_0.7fr_0.9fr_0.7fr] border-b border-gray-100 bg-gray-50 px-3 py-2">

                <span className="text-[9px] font-semibold uppercase tracking-wide text-gray-400">
                  Products
                </span>

                <span className="text-[9px] font-semibold uppercase tracking-wide text-gray-400">
                  Price
                </span>

                <span className="text-[9px] font-semibold uppercase tracking-wide text-gray-400">
                  Downloads
                </span>

                <span className="text-[9px] font-semibold uppercase tracking-wide text-gray-400">
                  Earnings
                </span>

                <span className="text-[9px] font-semibold uppercase tracking-wide text-gray-400">
                  Status
                </span>

              </div>


              {/* Row 1 */}

              <div className="grid grid-cols-[1.8fr_0.8fr_0.7fr_0.9fr_0.7fr] items-center border-b border-gray-100 px-3 py-2.5">

                <div className="flex items-center gap-2">

                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gray-100">
                    <FileText
                      size={12}
                      className="text-gray-500"
                    />
                  </div>

                  <span className="truncate text-[10px] font-medium text-gray-700">
                    CHM 112 - Lab Report Template
                  </span>

                </div>

                <span className="text-[10px] text-gray-500">
                  ₦1,495
                </span>

                <span className="text-[10px] text-gray-500">
                  12
                </span>

                <span className="text-[10px] text-gray-600">
                  ₦20,930
                </span>

                <span className="w-fit rounded-full bg-green-100 px-2 py-0.5 text-[8px] font-semibold text-green-700">
                  Published
                </span>

              </div>


              {/* Row 2 */}

              <div className="grid grid-cols-[1.8fr_0.8fr_0.7fr_0.9fr_0.7fr] items-center px-3 py-2.5">

                <div className="flex items-center gap-2">

                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gray-100">
                    <FileText
                      size={12}
                      className="text-gray-500"
                    />
                  </div>

                  <span className="truncate text-[10px] font-medium text-gray-700">
                    ECO 304 - Exam Prep Notes
                  </span>

                </div>

                <span className="text-[10px] text-gray-500">
                  ₦2,990
                </span>

                <span className="text-[10px] text-gray-500">
                  6
                </span>

                <span className="text-[10px] text-gray-600">
                  ₦17,940
                </span>

                <span className="w-fit rounded-full bg-orange-100 px-2 py-0.5 text-[8px] font-semibold text-orange-600">
                  Draft
                </span>

              </div>

            </div>

          </section>


          {/* ================= ANALYTICS ================= */}

          <section className="rounded-2xl border border-gray-200 bg-white p-4">

            <div className="flex items-start justify-between">

              <div className="flex items-center gap-2">

                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-50">
                  <BarChart3
                    size={14}
                    strokeWidth={1.8}
                    className="text-gray-600"
                  />
                </div>

                <div>
                  <h2 className="text-xs font-semibold text-gray-900">
                    Analytics & Insights
                  </h2>

                  <p className="mt-0.5 text-[10px] text-gray-400">
                    Understand what is driving your earnings and sales
                  </p>
                </div>

              </div>


              <div className="flex items-center gap-1">

                <button className="rounded-full bg-blue-600 px-2.5 py-1 text-[9px] font-semibold text-white">
                  Earnings
                </button>

                <button className="rounded-full px-2.5 py-1 text-[9px] font-medium text-gray-500 hover:bg-gray-50">
                  Downloads
                </button>

                <button className="rounded-full border border-gray-200 px-2.5 py-1 text-[9px] font-medium text-gray-500">
                  This Year ⌄
                </button>

              </div>

            </div>


            {/* Chart */}

            <div className="mt-5 flex h-36 items-end justify-between gap-2 px-2">

              {[
                30,
                45,
                55,
                70,
                58,
                76,
                52,
                92,
                125,
                70,
                62,
                82,
              ].map((height, index) => (

                <div
                  key={index}
                  className="flex h-full flex-1 items-end justify-center"
                >

                  <div
                    className={`w-full max-w-7 rounded-t-md transition ${
                      index === 8
                        ? "bg-blue-600"
                        : "bg-gray-200"
                    }`}
                    style={{
                      height: `${height}px`,
                    }}
                  />

                </div>

              ))}

            </div>


            {/* Months */}

            <div className="mt-2 grid grid-cols-12 text-center">

              {[
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ].map((month) => (

                <span
                  key={month}
                  className="text-[8px] text-gray-400"
                >
                  {month}
                </span>

              ))}

            </div>

          </section>

        </div>


        {/* =================================================
            RIGHT COLUMN
        ================================================= */}

        <div className="grid min-w-0 gap-4">

          {/* ================= WALLET ================= */}

          <section className="rounded-2xl border border-gray-200 bg-white p-4">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2">

                <Wallet
                  size={15}
                  strokeWidth={1.8}
                  className="text-gray-500"
                />

                <span className="text-xs font-semibold text-gray-900">
                  Your Wallet
                </span>

              </div>

              <button className="text-gray-400 hover:text-gray-700">
                <MoreHorizontal size={16} />
              </button>

            </div>


            <div className="mt-4 text-center">

              <p className="text-[10px] text-gray-400">
                Your Balance
              </p>

              <p className="mt-1 text-xl font-semibold tracking-tight text-gray-900">
                ₦207.86
              </p>

              <p className="mt-0.5 text-[9px] text-gray-400">
                ≈ ₦38,870.02
              </p>

            </div>


            <button className="mt-4 flex w-full items-center justify-center rounded-full bg-blue-600 py-2 text-[10px] font-semibold text-white transition hover:bg-blue-700">
              Transfer to Bank →
            </button>


            <div className="mt-4 divide-y divide-gray-100 border-t border-gray-100">

              <div className="flex items-center justify-between py-2.5">

                <div className="flex items-center gap-2">

                  <FileText
                    size={12}
                    className="text-gray-400"
                  />

                  <span className="text-[10px] text-gray-500">
                    Documents owned
                  </span>

                </div>

                <span className="text-[10px] font-semibold text-gray-700">
                  5 NFTs
                </span>

              </div>


              <div className="flex items-center justify-between py-2.5">

                <div className="flex items-center gap-2">

                  <Clock
                    size={12}
                    className="text-gray-400"
                  />

                  <span className="text-[10px] text-gray-500">
                    Last activity
                  </span>

                </div>

                <span className="text-[10px] font-semibold text-gray-700">
                  3 hours ago
                </span>

              </div>

            </div>

          </section>


          {/* ================= RECENT ACTIVITIES ================= */}

          <section className="rounded-2xl border border-gray-200 bg-white p-4">

            <div className="flex items-center justify-between">

              <span className="text-xs font-semibold text-gray-900">
                Recent Activities
              </span>

              <button className="rounded-full border border-gray-200 px-2.5 py-1 text-[9px] text-gray-500">
                See All →
              </button>

            </div>


            <div className="mt-3 flex rounded-lg bg-gray-50 p-0.5">

              <button className="flex-1 rounded-md bg-white py-1.5 text-[9px] font-semibold text-gray-700 shadow-sm">
                Today
              </button>

              <button className="flex-1 py-1.5 text-[9px] text-gray-400">
                Yesterday
              </button>

              <button className="flex-1 py-1.5 text-[9px] text-gray-400">
                This Week
              </button>

            </div>


            <div className="mt-3 divide-y divide-gray-100">

              {/* Activity */}

              <div className="flex items-center gap-2.5 py-2.5">

                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-100">
                  <Wallet
                    size={12}
                    className="text-orange-500"
                  />
                </div>

                <div className="min-w-0 flex-1">

                  <p className="truncate text-[10px] font-semibold text-gray-700">
                    You earned ₦150
                  </p>

                  <p className="truncate text-[8px] text-gray-400">
                    ECO 304 - Exam Prep Notes
                  </p>

                </div>

                <span className="text-[8px] text-gray-400">
                  2m ago
                </span>

              </div>


              <div className="flex items-center gap-2.5 py-2.5">

                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100">
                  <Download
                    size={12}
                    className="text-blue-500"
                  />
                </div>

                <div className="min-w-0 flex-1">

                  <p className="truncate text-[10px] font-semibold text-gray-700">
                    New Download
                  </p>

                  <p className="truncate text-[8px] text-gray-400">
                    A student downloaded your document
                  </p>

                </div>

                <span className="text-[8px] text-gray-400">
                  2h ago
                </span>

              </div>


              <div className="flex items-center gap-2.5 py-2.5">

                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100">
                  <CircleCheck
                    size={12}
                    className="text-green-500"
                  />
                </div>

                <div className="min-w-0 flex-1">

                  <p className="truncate text-[10px] font-semibold text-gray-700">
                    Document minted successfully
                  </p>

                  <p className="truncate text-[8px] text-gray-400">
                    Your document is now available
                  </p>

                </div>

                <span className="text-[8px] text-gray-400">
                  Yesterday
                </span>

              </div>


              <div className="flex items-center gap-2.5 py-2.5">

                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100">
                  <Wallet
                    size={12}
                    className="text-green-500"
                  />
                </div>

                <div className="min-w-0 flex-1">

                  <p className="truncate text-[10px] font-semibold text-gray-700">
                    Earnings received
                  </p>

                  <p className="truncate text-[8px] text-gray-400">
                    Payment added to your wallet
                  </p>

                </div>

                <span className="text-[8px] text-gray-400">
                  Yesterday
                </span>

              </div>

            </div>

          </section>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;