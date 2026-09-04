import { Package } from "lucide-react";
import type { ProductFormData } from "./ProductsNew";

interface Props {
  form?: ProductFormData;
  errors?: Record<string, string>;
  updateForm?: <K extends keyof ProductFormData>(
    key: K,
    value: ProductFormData[K],
  ) => void;
  loading?: boolean;
}

const inputClass =
  "h-10! w-full! min-w-0! rounded-xl! border! border-gray-200! bg-[#fafafa]! px-3.5! text-xs! font-medium! text-gray-900! outline-none! transition-all! duration-150! placeholder:text-gray-400! focus:border-blue-600! focus:bg-white! focus:ring-2! focus:ring-blue-600/10! disabled:cursor-not-allowed! disabled:opacity-60!";

const ProductInventory = ({
  form,
  errors,
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
          <div className="flex! items-center! gap-2.5!">
            <div className="skeleton h-8! w-8! shrink-0! rounded-xl!" />

            <div className="min-w-0! space-y-1.5!">
              <div className="skeleton h-3.5! w-20! rounded-md!" />
              <div className="skeleton h-2.5! w-48! max-w-full! rounded-md!" />
            </div>
          </div>

          <div className="skeleton h-[68px]! w-full! rounded-2xl!" />

          <div className="grid! grid-cols-1! gap-3! sm:grid-cols-2!">
            <div className="space-y-1.5!">
              <div className="skeleton h-2.5! w-8! rounded-md!" />
              <div className="skeleton h-10! w-full! rounded-xl!" />
            </div>

            <div className="space-y-1.5!">
              <div className="skeleton h-2.5! w-24! rounded-md!" />
              <div className="skeleton h-10! w-full! rounded-xl!" />
            </div>
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
          <Package
            size={15}
            strokeWidth={1.9}
          />
        </div>

        <div className="min-w-0!">
          <h2 className="font-heading! text-[14px]! font-semibold! tracking-tight! text-gray-900! sm:text-[15px]!">
            Inventory
          </h2>

          <p className="mt-0.5! truncate! text-[10px]! font-medium! text-gray-500! sm:text-[11px]!">
            Manage stock and product identification.
          </p>
        </div>
      </div>

      {/* =====================================================
          TRACK INVENTORY
      ===================================================== */}

      <div
        className={`mb-4! flex! items-center! justify-between! gap-4! rounded-2xl! border! p-3.5! transition-all! duration-200! sm:p-4! ${
          form.trackInventory
            ? "border-blue-100! bg-blue-50/40!"
            : "border-gray-200! bg-[#fafafa]!"
        }`}
      >
        <div className="min-w-0!">
          <p className="text-[11px]! font-semibold! text-gray-900! sm:text-xs!">
            Track inventory
          </p>

          <p className="mt-0.5! text-[10px]! font-medium! leading-relaxed! text-gray-500!">
            {form.trackInventory
              ? "Stock quantity will be tracked."
              : "Stock tracking is disabled."}
          </p>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={form.trackInventory}
          aria-label="Track inventory"
          onClick={() =>
            updateForm(
              "trackInventory",
              !form.trackInventory,
            )
          }
          className={`relative! h-6! w-11! shrink-0! rounded-full! transition-colors! duration-200! focus:outline-none! focus:ring-2! focus:ring-blue-600/20! ${
            form.trackInventory
              ? "bg-blue-600!"
              : "bg-gray-300!"
          }`}
        >
          <span
            className={`absolute! top-1! h-4! w-4! rounded-full! bg-white! shadow-sm! transition-transform! duration-200! ${
              form.trackInventory
                ? "translate-x-6!"
                : "translate-x-1!"
            }`}
          />
        </button>
      </div>

      {/* =====================================================
          FIELDS
      ===================================================== */}

      <div className="grid! min-w-0! grid-cols-1! gap-3! sm:grid-cols-2!">
        {/* SKU */}

        <div className="min-w-0!">
          <label
            htmlFor="product-sku"
            className="mb-1.5! block! text-[10px]! font-semibold! text-gray-700! sm:text-[11px]!"
          >
            SKU
          </label>

          <input
            id="product-sku"
            type="text"
            value={form.sku}
            onChange={(event) =>
              updateForm(
                "sku",
                event.target.value,
              )
            }
            placeholder="PROD-001"
            autoComplete="off"
            className={inputClass}
          />
        </div>

        {/* STOCK */}

        {form.trackInventory && (
          <div className="min-w-0!">
            <label
              htmlFor="product-stock"
              className="mb-1.5! block! text-[10px]! font-semibold! text-gray-700! sm:text-[11px]!"
            >
              Stock quantity
            </label>

            <input
              id="product-stock"
              type="number"
              min="0"
              inputMode="numeric"
              value={form.stock}
              onChange={(event) =>
                updateForm(
                  "stock",
                  event.target.value,
                )
              }
              className={inputClass}
            />

            {errors?.stock && (
              <p
                role="alert"
                className="mt-1.5! text-[10px]! font-semibold! leading-relaxed! text-red-500!"
              >
                {errors.stock}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductInventory;