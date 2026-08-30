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

const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (!active || !payload?.length) {
    return null;
  }

  const data = payload[0].payload;

  return (
    <div className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 shadow-lg">

      {/* Month */}

      <p className="mb-2 font-heading text-[10px] font-semibold text-gray-900">
        {data.month}
      </p>

      {/* Metrics */}

      <div className="space-y-1">

        <div className="flex items-center justify-between gap-6">
          <span className="text-[9px] font-normal text-gray-500">
            Earnings
          </span>

          <span className="font-mono text-[9px] font-medium text-gray-900">
            {data.earnings.toLocaleString()} XOF
          </span>
        </div>

        <div className="flex items-center justify-between gap-6">
          <span className="text-[9px] font-normal text-gray-500">
            Downloads
          </span>

          <span className="font-mono text-[9px] font-medium text-gray-900">
            {data.downloads}
          </span>
        </div>

      </div>
    </div>
  );
};

const DashChart = () => {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-4">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div>
          <h2 className="font-heading !text-[15px] font-semibold  tracking-tight text-gray-900">
            Analytics & Performances
          </h2>

          <p className="mt-0.5 !text-[12px] font-normal text-gray-500">
            Understand your earnings and downloads
          </p>
        </div>

        <button
          type="button"
          className="
            flex items-center gap-2
            rounded-full
            border border-gray-200
            bg-white
            px-3 py-1.5
            text-xs
            font-medium
            text-gray-700
            transition-colors
            hover:bg-gray-50
          "
        >
          1 year

          <span className="text-[9px] font-normal text-gray-400">
            ▼
          </span>
        </button>

      </div>

      {/* Legend */}

      <div className="mt-4 flex items-center gap-5">

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-blue-600" />

          <span className="text-[10px] font-medium text-gray-600">
            Earnings
          </span>
        </div>

       
      </div>

      {/* Chart */}

      <div className="mt-4 h-[240px] w-full">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart
            data={chartData}
            margin={{
              top: 10,
              right: 5,
              left: -15,
              bottom: 0,
            }}
            barCategoryGap="12%"
          >

            {/* Gradient */}

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

            {/* Grid */}

            <CartesianGrid
              vertical={false}
              stroke="#e5e7eb"
              strokeDasharray="3 3"
            />

            {/* X Axis */}

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 10,
                fill: "#6b7280",
              }}
              dy={8}
            />

            {/* Y Axis */}

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 9,
                fill: "#9ca3af",
              }}
              tickFormatter={(value) =>
                value >= 1000
                  ? `${value / 1000}k`
                  : value
              }
            />

            {/* Tooltip */}

            <Tooltip
              cursor={{
                fill: "rgba(37, 99, 235, 0.04)",
              }}
              content={<CustomTooltip />}
            />

            {/* Bars */}

            <Bar
              dataKey="earnings"
              fill="url(#earningsGradient)"
              radius={[6, 6, 2, 2]}
              maxBarSize={52}
              animationBegin={100}
              animationDuration={800}
              animationEasing="ease-out"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </section>
  );
};

export default DashChart;