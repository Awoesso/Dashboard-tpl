type StatCardProps = {
  title: string;
  value: number;
  change: number;
  currency?: string;
  period?: string;
};

const StatCard = ({
  title,
  value,
  change,
  currency,
  period,
}: StatCardProps) => {
  const isPositive = change >= 0;
  const formattedValue = value.toLocaleString();

  return (
    <div className="flex flex-1 flex-col justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-xs transition-colors duration-150 hover:border-gray-300">

      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold text-gray-700">
          {title}
        </p>

        {period && (
          <span className="text-[10px] font-normal text-gray-400">
            {period}
          </span>
        )}
      </div>

      {/* Value */}
      <div className="mt-2 flex items-end gap-2.5">

        <p className="font-mono text-lg font-semibold tracking-tight text-gray-900">
          {currency && (
            <span className="mr-1 font-sans text-sm font-medium text-gray-600">
              {currency}
            </span>
          )}

          {formattedValue}
        </p>

        {/* Change */}
        <span
          className={`mb-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
            isPositive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {isPositive ? "+" : ""}
          {change}%
        </span>

      </div>
    </div>
  );
};

export default StatCard;