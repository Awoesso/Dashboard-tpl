import StatCard from "./StatCard";
import { dashboardConfig } from "./data/dashboardConfig";

const GlobalStatCard = () => {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
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