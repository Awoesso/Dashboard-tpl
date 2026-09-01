import StatCard from "./StatCard";
import { dashboardConfig } from "./data/dashboardConfig";

const GlobalStatCard = () => {
  return (
    <div
      className="
        mt-4
        grid
        min-w-0
        grid-cols-1
        gap-3
        sm:grid-cols-2
        xl:grid-cols-4
      "
    >
      {dashboardConfig.metrics.map((metric) => (
        <StatCard
          key={metric.id}
          title={metric.label}
          value={metric.value}
          change={metric.change}
          currency={metric.currency}
          period={metric.period}
        />
      ))}
    </div>
  );
};

export default GlobalStatCard;