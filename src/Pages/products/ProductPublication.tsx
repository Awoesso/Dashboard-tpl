import { Check, Globe, Lock } from "lucide-react";
import type { ProductStatus } from "./ProductsNew";

interface Props {
  status: ProductStatus;
  onChange: (status: ProductStatus) => void;
  loading?: boolean;
}

const ProductPublication = ({
  status,
  onChange,
  loading,
}: Props) => {
  if (loading) {
    return (
      <div className="rounded-2xl! border! border-gray-100! bg-white! p-4! shadow-sm! sm:p-6!">
        <div className="animate-pulse! space-y-3!">
          <div className="skeleton! h-5! w-24! rounded!" />
          <div className="skeleton! h-16! rounded-xl!" />
          <div className="skeleton! h-16! rounded-xl!" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl! border! border-gray-100! bg-white! p-4! shadow-sm! sm:p-6!">
      <h2 className="mb-4! text-sm! font-bold! text-gray-900!">
        Publication
      </h2>

      <div className="space-y-2.5!">
        <PublicationOption
          active={status === "draft"}
          icon={<Lock size={16} />}
          title="Draft"
          description="Keep it private."
          onClick={() => onChange("draft")}
        />

        <PublicationOption
          active={status === "published"}
          icon={<Globe size={16} />}
          title="Published"
          description="Make it visible."
          onClick={() => onChange("published")}
        />
      </div>
    </div>
  );
};

interface PublicationOptionProps {
  active: boolean;
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

const PublicationOption = ({
  active,
  icon,
  title,
  description,
  onClick,
}: PublicationOptionProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex! w-full! items-center! justify-between!
        rounded-xl! border! p-3.5! text-left! transition-all!
        ${
          active
            ? "border-blue-600! bg-blue-50/40! ring-1! ring-blue-600!"
            : "border-gray-200! bg-white! hover:border-gray-300!"
        }
      `}
    >
      <div className="flex! items-center! gap-3!">
        <span className="text-gray-500!">{icon}</span>

        <div>
          <p className="text-xs! font-bold! text-gray-900!">
            {title}
          </p>

          <p className="text-[10px]! font-medium! text-gray-500!">
            {description}
          </p>
        </div>
      </div>

      {active && (
        <Check
          size={14}
          className="text-blue-600!"
          strokeWidth={3}
        />
      )}
    </button>
  );
};

export default ProductPublication;