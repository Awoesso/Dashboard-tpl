import { Ruler, Weight } from "lucide-react";
import type { ProductFormData } from "./ProductsNew";

interface Props {
  form?: ProductFormData;
  updateForm?: <K extends keyof ProductFormData>(
    key: K,
    value: ProductFormData[K],
  ) => void;
  loading?: boolean;
}

const inputClass =
  "h-10! w-full! rounded-xl! border! border-gray-200! bg-white! px-3.5! text-xs! font-semibold! text-gray-900! outline-none! transition-all! placeholder:text-gray-400! focus:border-blue-600! focus:ring-2! focus:ring-blue-600/10!";

const ProductShipping = ({
  form,
  updateForm,
  loading,
}: Props) => {
  if (loading) {
    return (
      <div className="rounded-2xl! border! border-gray-100! bg-white! p-4! shadow-sm! sm:p-6!">
        <div className="animate-pulse! space-y-4!">
          <div className="skeleton! h-5! w-36! rounded!" />
          <div className="skeleton! h-10! rounded-xl!" />
          <div className="grid! grid-cols-1! gap-4! sm:grid-cols-3!">
            <div className="skeleton! h-10! rounded-xl!" />
            <div className="skeleton! h-10! rounded-xl!" />
            <div className="skeleton! h-10! rounded-xl!" />
          </div>
        </div>
      </div>
    );
  }

  if (!form || !updateForm) return null;

  return (
    <div className="rounded-2xl! border! border-gray-200! bg-white! p-4!  sm:p-6!">
      <div className="mb-5! flex! items-center! gap-2.5!">
        <div className="flex! h-8! w-8! items-center! justify-center! rounded-full! border border-gray-600  text-gray-600!">
          <Ruler size={15} />
        </div>

        <div>
          <h2 className="text-sm! font-bold! text-gray-900!">
            Shipping information
          </h2>

          <p className="text-[11px]! font-medium! text-gray-400!">
            Optional product measurements.
          </p>
        </div>
      </div>

      <div className="mb-4!">
        <label className="mb-1.5! block! text-xs! font-semibold! text-gray-700!">
          Weight <span className="text-gray-400!">(kg)</span>
        </label>

        <div className="relative!">
          <Weight
            size={14}
            className="pointer-events-none! absolute! left-3! top-1/2! -translate-y-1/2! text-gray-400!"
          />

          <input
            type="number"
            min="0"
            step="0.01"
            value={form.weight}
            onChange={(e) =>
              updateForm("weight", e.target.value)
            }
            placeholder="1.5"
            className={`${inputClass} pl-9!`}
          />
        </div>
      </div>

      <div className="grid! grid-cols-1! gap-4! sm:grid-cols-3!">
        {[
          ["length", "Length"],
          ["width", "Width"],
          ["height", "Height"],
        ].map(([key, label]) => (
          <div key={key}>
            <label className="mb-1.5! block! text-xs! font-semibold! text-gray-700!">
              {label}
            </label>

            <input
              type="number"
              min="0"
              value={form[key as keyof ProductFormData] as string}
              onChange={(e) =>
                updateForm(
                  key as "length" | "width" | "height",
                  e.target.value,
                )
              }
              placeholder="20"
              className={inputClass}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductShipping;