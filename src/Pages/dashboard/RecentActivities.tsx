import {
  Wallet,
  Download,
  CircleCheck,
} from "lucide-react";

import type {
  DashboardActivity,
  DashboardActivityType,
} from "@/services/dashboard.service";

const activityStyles: Record<
  DashboardActivityType,
  {
    icon: typeof Wallet;
    container: string;
    iconColor: string;
  }
> = {
  order: {
    icon: Wallet,
    container: "bg-orange-100",
    iconColor: "text-orange-500",
  },

  notification: {
    icon: Download,
    container: "bg-blue-100",
    iconColor: "text-blue-500",
  },

  payment: {
    icon: CircleCheck,
    container: "bg-green-100",
    iconColor: "text-green-500",
  },
};

const formatRelativeTime = (
  createdAt: string
): string => {
  const time = new Date(createdAt).getTime();

  if (Number.isNaN(time)) {
    return "Recently";
  }

  const diffMinutes = Math.max(
    0,
    Math.round(
      (Date.now() - time) / 60000
    )
  );

  if (diffMinutes < 1) {
    return "Now";
  }

  if (diffMinutes < 60) {
    return `${diffMinutes}m`;
  }

  const diffHours = Math.floor(diffMinutes / 60);

  if (diffHours < 24) {
    return `${diffHours}h`;
  }

  const diffDays = Math.floor(diffHours / 24);

  if (diffDays < 7) {
    return `${diffDays}d`;
  }

  return new Date(createdAt).toLocaleDateString(
    "fr-FR",
    {
      day: "2-digit",
      month: "2-digit",
    }
  );
};

type RecentActivitiesProps = {
  activities?: DashboardActivity[];
};

const RecentActivities = ({
  activities = [],
}: RecentActivitiesProps) => {
  const recentActivities = activities.slice(0, 4);

  return (
    <section className="w-full min-w-0 rounded-2xl border border-gray-200 bg-white p-3.5 sm:p-4">

      {/* Header */}

      <div className="flex min-w-0 items-center justify-between gap-3">

        <h2 className="min-w-0 truncate font-heading !text-[15px] font-semibold tracking-tight text-gray-900">
          Recent Activities
        </h2>

        <button
          type="button"
          className="
            shrink-0
            rounded-full
            border border-gray-200
            px-2.5 py-1
            !text-xs
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

      <div className="mt-3 flex w-full gap-1 rounded-full border border-gray-200 bg-gray-50 p-1 sm:gap-1.5">

        <button
          type="button"
          className="
            min-w-0
            flex-1
            rounded-full
            border border-gray-200
            bg-white
            px-1.5 py-2
            !text-[11px]
            font-semibold
            text-gray-800
            shadow-sm
            sm:!text-[11.5px]
          "
        >
          Today
        </button>

        <button
          type="button"
          className="
            min-w-0
            flex-1
            rounded-full
            border border-transparent
            px-1.5 py-2
            !text-[11px]
            font-semibold
            text-gray-500
            transition-colors
            hover:text-gray-700
            sm:!text-[11.5px]
          "
        >
          Yesterday
        </button>

        <button
          type="button"
          className="
            min-w-0
            flex-1
            rounded-full
            border border-transparent
            px-1.5 py-2
            !text-[11px]
            font-semibold
            text-gray-500
            transition-colors
            hover:text-gray-700
            sm:!text-[11.5px]
          "
        >
          This Week
        </button>

      </div>

      {/* Activities */}

      <div className="mt-3 divide-y divide-gray-100">

        {recentActivities.length === 0 ? (
          <div className="py-6 text-center text-[11px] text-gray-400">
            No recent activity.
          </div>
        ) : (
          recentActivities.map((activity) => {
            const style = activityStyles[activity.type];
            const Icon = style.icon;

            return (
              <div
                key={activity.id}
                className="
                  flex
                  min-w-0
                  items-center
                  gap-2
                  py-2.5
                  sm:gap-2.5
                "
              >

                {/* Icon */}

                <div
                  className={`
                    flex
                    h-7 w-7
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

                  <p className="truncate !text-[12px] font-medium text-gray-800">
                    {activity.title}
                  </p>

                  <p className="truncate !text-[0.675rem] font-normal text-gray-400">
                    {activity.description}
                  </p>

                </div>

                {/* Time */}

                <span
                  className="
                    max-w-[55px]
                    shrink-0
                    truncate
                    !text-[9px]
                    font-semibold
                    text-gray-700
                    sm:max-w-none
                    sm:!text-[10px]
                  "
                >
                  {formatRelativeTime(activity.createdAt)}
                </span>

              </div>
            );
          })
        )}

      </div>

    </section>
  );
};

export default RecentActivities;