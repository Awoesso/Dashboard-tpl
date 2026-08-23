type StatCardProps = {
  title: string;
  value: number;
  change: number;
};

const StatCard = ({ title, value, change }: StatCardProps) => {
  return (
    <div className="flex flex-1 flex-col justify-between rounded-xl border border-gray-200  drop-shadow-xs bg-white px-4 py-3 transition-colors hover:border-gray-300">
      {/* Titre */}
      <p className="text-xs font-medium text-gray-500">
        {title}
      </p>

      {/* Valeur + évolution */}
      <div className="mt-2 flex items-end gap-2">
        <span className="text-lg font-semibold tracking-tight text-gray-900">
           {value.toLocaleString()}
        </span>

        <span className="mb-0.5 rounded-full bg-green-100 px-1.5 py-0.5 text-[10px] font-semibold text-green-700">
          +{change}%
        </span>
      </div>
    </div>
  );
};

export default StatCard;  