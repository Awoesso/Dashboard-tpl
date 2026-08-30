import {
  Wallet,
  Download,
  CircleCheck,
} from "lucide-react";

import {
  activitiesData,
  type ActivityType,
} from "./data/activitiesData";

const activityStyles: Record<
  ActivityType,
  {
    icon: typeof Wallet;
    container: string;
    iconColor: string;
  }
> = {
  earning: {
    icon: Wallet,
    container: "bg-orange-100",
    iconColor: "text-orange-500",
  },

  download: {
    icon: Download,
    container: "bg-blue-100",
    iconColor: "text-blue-500",
  },

  success: {
    icon: CircleCheck,
    container: "bg-green-100",
    iconColor: "text-green-500",
  },

  wallet: {
    icon: Wallet,
    container: "bg-green-100",
    iconColor: "text-green-500",
  },
};

const RecentActivities = () => {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-4">

      {/* Header */}

      <div className="flex items-center justify-between">

        <h2 className="font-heading !text-[15px] font-semibold tracking-tight text-gray-900">
          Recent Activities
        </h2>

        <button
          type="button"
          className="
            rounded-full
            border border-gray-200
            px-2.5 py-1
            text-xs
            font-medium
            text-gray-700
            transition-colors
            hover:bg-gray-50
          "
        >
          See All
        </button>

      </div>

      {/* Filter */}

      <div className="mt-3 flex gap-1.5 rounded-full border border-gray-200 bg-gray-50 p-1">

        <button
          type="button"
          className="
            flex-1
            rounded-full
            border border-gray-200
            bg-white
            py-2
            text-[11.5px]
            font-semibold
            text-gray-800
            shadow-sm
          "
        >
          Today
        </button>

        <button
          type="button"
          className="
            flex-1
            rounded-full
            border border-transparent
            py-2
            text-[11.5px]
            font-semibold
            text-gray-500
            transition-colors
            hover:text-gray-700
          "
        >
          Yesterday
        </button>

        <button
          type="button"
          className="
            flex-1
            rounded-full
            border border-transparent
            py-2
            text-[11.5px]
            font-semibold
            text-gray-500
            transition-colors
            hover:text-gray-700
          "
        >
          This Week
        </button>

      </div>

      {/* Activities */}

      <div className="mt-3 divide-y divide-gray-100">

        {activitiesData.map((activity) => {
          const style = activityStyles[activity.type];
          const Icon = style.icon;

          return (
            <div
              key={activity.id}
              className="flex items-center gap-2.5 py-2.5"
            >

              {/* Icon */}

              <div
                className={`
                  flex h-7 w-7
                  shrink-0
                  items-center justify-center
                  rounded-full
                  ${style.container}
                `}
              >
                <Icon
                  size={12}
                  strokeWidth={2}
                  className={style.iconColor}
                />
              </div>

              {/* Content */}

              <div className="min-w-0 flex-1">

                <p className="truncate  text-[12px] font-medium text-gray-800">   
                  {activity.title}
                </p>

                <p className="truncate !text-[0.675rem] font-normal text-gray-400">
                  {activity.description}
                </p>

              </div>

              {/* Time */}

              <span className="shrink-0 text-[10px] font-semibold text-gray-700">
                {activity.time}
              </span>

            </div>
          );
        })}

      </div>

    </section>
  );
};

export default RecentActivities;