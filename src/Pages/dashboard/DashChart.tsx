import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { chartData } from "./data/chartData";

type TooltipProps = {
  active?: boolean;
  payload?: {
    payload: {
      month: string;
      earnings: number;
      downloads: number;
    };
  }[];
};

const CustomTooltip = ({
  active,
  payload,
}: TooltipProps) => {
  if (!active || !payload?.length) {
    return null;
  }

  const data = payload[0].payload;

  return (
    <div
      className="
        min-w-[145px]
        rounded-xl
        border border-gray-200
        bg-white
        px-3 py-2.5
        shadow-lg
      "
    >
      {/* Month */}

      <p className="mb-2 font-heading !text-[10px] font-semibold text-gray-900">
        {data.month}
      </p>

      {/* Metrics */}

      <div className="space-y-1.5">

        {/* Earnings */}

        <div className="flex items-center justify-between gap-4">
          <span className="!text-[9px] font-normal text-gray-500">
            Earnings
          </span>

          <span className="font-mono !text-[9px] font-medium text-gray-900">
            {data.earnings.toLocaleString()} XOF
          </span>
        </div>

        {/* Downloads */}

        <div className="flex items-center justify-between gap-4">
          <span className="!text-[9px] font-normal text-gray-500">
            Downloads
          </span>

          <span className="font-mono !text-[9px] font-medium text-gray-900">
            {data.downloads}
          </span>
        </div>

      </div>
    </div>
  );
};

const DashChart = () => {
  return (
    <section
      className="
        w-full
        min-w-0
        overflow-hidden
        rounded-2xl
        border border-gray-200
        bg-white
        p-3.5
        sm:p-4
      "
    >

      {/* ================= HEADER ================= */}

      <div
        className="
          flex
          min-w-0
          flex-col
          gap-3
          sm:flex-row
          sm:items-start
          sm:justify-between
        "
      >

        {/* Title */}

        <div className="min-w-0">

          <h2
            className="
              truncate
              font-heading
              !text-[15px]
              font-semibold
              tracking-tight
              text-gray-900
            "
          >
            Analytics & Performances
          </h2>

          <p className="mt-0.5 !text-[12px] font-normal text-gray-500">
            Understand your earnings and downloads
          </p>

        </div>

        {/* Period */}

        <button
          type="button"
          className="
            flex
            w-fit
            shrink-0
            items-center
            gap-2
            rounded-full
            border border-gray-200
            bg-white
            px-3 py-1.5
            !text-xs
            font-medium
            text-gray-700
            transition-colors
            hover:bg-gray-50
            focus:outline-none
          "
        >
          1 year

          <span className="!text-[9px] font-normal text-gray-400">
            ▼
          </span>
        </button>

      </div>

      {/* ================= LEGEND ================= */}

      <div className="mt-4 flex items-center gap-4 sm:gap-5">

        <div className="flex items-center gap-2">

          <span className="h-2 w-2 shrink-0 rounded-full bg-blue-600" />

          <span className="!text-[10px] font-medium text-gray-600">
            Earnings
          </span>

        </div>

      </div>

      {/* ================= CHART ================= */}

      <div
        className="
          mt-3
          h-[210px]
          w-full
          min-w-0
          sm:mt-4
          sm:h-[240px]
        "
      >

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart
            data={chartData}
            margin={{
              top: 10,
              right: 5,
              left: -18,
              bottom: 0,
            }}
            barCategoryGap="12%"
          >

            {/* ================= GRADIENT ================= */}

            <defs>

              <linearGradient
                id="earningsGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="0%"
                  stopColor="#3b82f6"
                />

                <stop
                  offset="55%"
                  stopColor="#2563eb"
                />

                <stop
                  offset="100%"
                  stopColor="#172554"
                />

              </linearGradient>

            </defs>

            {/* ================= GRID ================= */}

            <CartesianGrid
              vertical={false}
              stroke="#e5e7eb"
              strokeDasharray="3 3"
            />

            {/* ================= X AXIS ================= */}

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 9,
                fill: "#6b7280",
              }}
              dy={7}
              interval="preserveStartEnd"
            />

            {/* ================= Y AXIS ================= */}

            <YAxis
              axisLine={false}
              tickLine={false}
              width={35}
              tick={{
                fontSize: 8,
                fill: "#9ca3af",
              }}
              tickFormatter={(value: number) =>
                value >= 1000
                  ? `${value / 1000}k`
                  : `${value}`
              }
            />

            {/* ================= TOOLTIP ================= */}

            <Tooltip
              cursor={{
                fill: "rgba(37, 99, 235, 0.04)",
              }}
              content={<CustomTooltip />}
            />

            {/* ================= BAR ================= */}

            <Bar
              dataKey="earnings"
              fill="url(#earningsGradient)"
              radius={[6, 6, 2, 2]}
              maxBarSize={52}
              animationBegin={100}
              animationDuration={800}
              animationEasing="ease-out"
              activeBar={false}
              className="outline-none"
            />

          </BarChart>
        </ResponsiveContainer>

      </div>

    </section>
  );
};

export default DashChart;