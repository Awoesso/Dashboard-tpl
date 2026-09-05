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
  "h-10! w-full! min-w-0! rounded-xl! border! border-gray-200! bg-[#fafafa]! px-3.5! text-xs! font-medium! text-gray-900! outline-none! transition-all! duration-150! placeholder:text-gray-400! focus:border-blue-600! focus:bg-white! focus:ring-2! focus:ring-blue-600/10!";

const dimensions = [
  {
    key: "length",
    label: "Length",
  },
  {
    key: "width",
    label: "Width",
  },
  {
    key: "height",
    label: "Height",
  },
] as const;

const ProductShipping = ({
  form,
  updateForm,
  loading = false,
}: Props) => {
  /* =========================================================
     SKELETON
  ========================================================= */

  if (loading) {
    return (
      <section className="w-full! min-w-0! rounded-2xl! border! border-gray-200! bg-white! p-4! shadow-sm! sm:p-5!">
        <div className="animate-pulse! space-y-4!">
          {/* Header */}

          <div className="flex! items-center! gap-2.5!">
            <div className="skeleton h-8! w-8! shrink-0! rounded-xl!" />

            <div className="min-w-0! space-y-1.5!">
              <div className="skeleton h-3.5! w-36! rounded-md!" />
              <div className="skeleton h-2.5! w-40! max-w-full! rounded-md!" />
            </div>
          </div>

          {/* Weight */}

          <div className="space-y-1.5!">
            <div className="skeleton h-2.5! w-16! rounded-md!" />
            <div className="skeleton h-10! w-full! rounded-xl!" />
          </div>

          {/* Dimensions */}

          <div className="grid! grid-cols-1! gap-3! sm:grid-cols-3!">
            {dimensions.map((item) => (
              <div
                key={item.key}
                className="space-y-1.5!"
              >
                <div className="skeleton h-2.5! w-14! rounded-md!" />
                <div className="skeleton h-10! w-full! rounded-xl!" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!form || !updateForm) {
    return null;
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section className="w-full! min-w-0! rounded-2xl! border! border-gray-200! bg-white! p-4! shadow-sm! transition-all! duration-200! sm:p-5!">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-4! flex! items-center! gap-2.5!">
        <div className="flex! h-8! w-8! shrink-0! items-center! justify-center! rounded-xl! border! border-gray-200! bg-[#fafafa]! text-gray-600!">
          <Ruler
            size={15}
            strokeWidth={1.9}
          />
        </div>

        <div className="min-w-0!">
          <h2 className="font-heading! text-[14px]! font-semibold! tracking-tight! text-gray-900! sm:text-[15px]!">
            Shipping information
          </h2>

          <p className="mt-0.5! truncate! text-[10px]! font-medium! text-gray-500! sm:text-[11px]!">
            Optional product measurements.
          </p>
        </div>
      </div>

      {/* =====================================================
          WEIGHT
      ===================================================== */}

      <div className="min-w-0!">
        <label
          htmlFor="product-weight"
          className="mb-1.5! block! text-[10px]! font-semibold! text-gray-700! sm:text-[11px]!"
        >
          Weight
          <span className="ml-1! font-medium! text-gray-400!">
            (kg)
          </span>
        </label>

        <div className="relative!">
          <Weight
            size={14}
            strokeWidth={1.8}
            className="pointer-events-none! absolute! left-3! top-1/2! -translate-y-1/2! text-gray-400!"
          />

          <input
            id="product-weight"
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            value={form.weight}
            onChange={(event) =>
              updateForm(
                "weight",
                event.target.value,
              )
            }
            placeholder="1.5"
            className={`${inputClass} pl-9!`}
          />
        </div>
      </div>

      {/* =====================================================
          DIMENSIONS
      ===================================================== */}

      <div className="mt-4! rounded-2xl! border! border-gray-200! bg-[#fafafa]! p-3! sm:p-3.5!">
        <div className="mb-3! flex! items-center! gap-2!">
          <Ruler
            size={13}
            strokeWidth={1.9}
            className="shrink-0! text-gray-500!"
          />

          <div className="min-w-0!">
            <p className="text-[10px]! font-semibold! text-gray-700! sm:text-[11px]!">
              Dimensions
            </p>

            <p className="text-[9px]! font-medium! text-gray-400! sm:text-[10px]!">
              Enter the product size in your preferred unit.
            </p>
          </div>
        </div>

        <div className="grid! min-w-0! grid-cols-1! gap-3! sm:grid-cols-3!">
          {dimensions.map(
            ({ key, label }) => (
              <div
                key={key}
                className="min-w-0!"
              >
                <label
                  htmlFor={`product-${key}`}
                  className="mb-1.5! block! text-[10px]! font-semibold! text-gray-700!"
                >
                  {label}
                </label>

                <input
                  id={`product-${key}`}
                  type="number"
                  min="0"
                  step="0.01"
                  inputMode="decimal"
                  value={
                    form[key]
                  }
                  onChange={(event) =>
                    updateForm(
                      key,
                      event.target.value,
                    )
                  }
                  placeholder="20"
                  className={inputClass}
                />
              </div>
            ),
          )}
        </div>
      </div>

      {/* =====================================================
          HELPER
      ===================================================== */}

      <p className="mt-2.5! text-[9px]! font-medium! leading-relaxed! text-gray-400! sm:text-[10px]!">
        Shipping measurements are optional and can be
        completed later.
      </p>
    </section>
  );
};

export default ProductShipping;