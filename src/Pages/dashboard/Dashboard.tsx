import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";
import GlobalStatCard from "./GlobalStatCard";

import {
  ChevronRight,
  Lightbulb,
  ChevronDown,
} from "lucide-react";

import DOCPERFORMANCE from "./DOCPERFORMANCE";
import DahWallet from "./DahWallet";
import DashChart from "./DashChart";
import RecentActivities from "./RecentActivities";

// ================= WELCOME MESSAGES =================

interface WelcomeMessage {
  title: string;
  subtitle: string;
}

const WELCOME_MESSAGES: WelcomeMessage[] = [
  {
    title: "Welcome back, Eli 👋",
    subtitle: "Your academic work is now a digital asset.",
  },
  {
    title: "Ready to scale your earnings? 🚀",
    subtitle: "Check your stats and upload new study materials.",
  },
  {
    title: "Good to see you, Eli ⚡",
    subtitle: "Turn your revision notes into passive income.",
  },
];

const Dashboard = () => {
  const [messageIndex] = useState<number>(0);

  const currentMessage = useMemo(
    () => WELCOME_MESSAGES[messageIndex],
    [messageIndex]
  );

  return (
    <div className="min-h-screen bg-[#fafafa] px-3 py-4 sm:px-4 sm:py-5 lg:px-6 lg:py-6">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section>
        <h1 className="font-heading text-lg! font-semibold tracking-tight text-gray-800 sm:text-xl!">
          {currentMessage.title}
        </h1>

        <p className="mt-1 text-[11px]! leading-5 text-gray-500 sm:text-sm!">
          {currentMessage.subtitle}
        </p>
      </section>

      {/* =====================================================
          MILESTONE BANNER
      ===================================================== */}

      <section
        className="
          mt-4
          flex
          w-full
          flex-col
          gap-3
          rounded-2xl
          bg-gray-100
          px-4
          py-3

          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:rounded-full
          sm:px-5
          sm:py-2

          lg:px-6
        "
      >

        {/* Message */}

        <div
          className="
            flex
            min-w-0
            items-start
            gap-2

            sm:items-center
          "
        >

          <Lightbulb
            size={17}
            strokeWidth={1.8}
            className="mt-0.5 shrink-0 text-gray-700 sm:mt-0"
          />

          <p className="min-w-0 text-[11px]! leading-4 text-gray-500 sm:text-[12px]! lg:text-sm!">

            Upload 1 more document to increase earnings by{" "}

            <span className="ml-1 font-semibold text-green-500">
              ~18%
            </span>

          </p>

        </div>

        {/* Action */}

        <Button
          className="
            flex
            w-full
            shrink-0
            items-center
            justify-center
            gap-1.5

            sm:w-auto
          "
        >
          Take Action
          <ChevronRight size={16} />
        </Button>

      </section>

      {/* =====================================================
          DASHBOARD GRID
      ===================================================== */}

      <div
        className="
          mt-4
          grid
          grid-cols-1
          gap-4

          sm:mt-5

          lg:grid-cols-[minmax(0,1.8fr)_minmax(280px,1fr)]
        "
      >

        {/* =================================================
            LEFT COLUMN
        ================================================= */}

        <div className="grid min-w-0 gap-4">

          {/* ================= CREATOR SNAPSHOT ================= */}

          <section
            className="
              min-w-0
              rounded-2xl
              border
              border-gray-200
              bg-white
              p-3

              sm:p-4
            "
          >

            {/* Header */}

            <div className="flex items-center justify-between gap-3">

              <div className="flex min-w-0 items-center gap-2">

                <div
                  className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-gray-900
                    text-white
                  "
                >
                  <span className="text-[10px]!">
                    ✦
                  </span>
                </div>

                <span className="truncate text-[11px]! font-semibold text-gray-900 sm:text-xs!">
                  Your Creator Snapshot
                </span>

              </div>

              <button
                type="button"
                className="
                  flex
                  shrink-0
                  items-center
                  gap-1
                  rounded-full
                  border
                  border-gray-200
                  px-2.5
                  py-1.5
                  text-[10px]!
                  font-semibold
                  text-gray-900
                  transition
                  hover:bg-gray-50

                  sm:px-3
                  sm:text-xs!
                "
              >
                Today

                <ChevronDown
                  size={14}
                  className="shrink-0"
                />
              </button>

            </div>

            {/* Stats */}

            <div className="mt-3 min-w-0 overflow-hidden">
              <GlobalStatCard />
            </div>

          </section>

          {/* ================= DOCUMENT PERFORMANCE ================= */}

          <div className="min-w-0">
            <DOCPERFORMANCE />
          </div>

          {/* ================= ANALYTICS ================= */}

          <div className="min-w-0">
            <DashChart />
          </div>

        </div>

        {/* =================================================
            RIGHT COLUMN
        ================================================= */}

        <div className="grid min-w-0 gap-4">

          {/* Wallet */}

          <div className="min-w-0">
            <DahWallet />
          </div>

          {/* Recent Activities */}

          <div className="min-w-0">
            <RecentActivities />
          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;