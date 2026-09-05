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
  "h-10! w-full! min-w-0! rounded-xl! border! border-gray-200! bg-[#fafafa]! px-3.5! text-xs! font-medium! text-gray-900! outline-none! transition-all! duration-150! placeholder:text-gray-400! focus:border-blue-600! focus:bg-white! focus:ring-2! focus:ring-blue-600/10!";

const ProductPricing = ({
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
          {/* Header */}

          <div className="space-y-1.5!">
            <div className="skeleton h-3.5! w-20! rounded-md!" />
            <div className="skeleton h-2.5! w-48! max-w-full! rounded-md!" />
          </div>

          {/* Fields */}

          <div className="grid! grid-cols-1! gap-3! sm:grid-cols-2!">
            <div className="space-y-1.5!">
              <div className="skeleton h-2.5! w-10! rounded-md!" />
              <div className="skeleton h-10! w-full! rounded-xl!" />
            </div>

            <div className="space-y-1.5!">
              <div className="skeleton h-2.5! w-28! rounded-md!" />
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

      <div className="mb-4!">
        <h2 className="font-heading! text-[14px]! font-semibold! tracking-tight! text-gray-900! sm:text-[15px]!">
          Pricing
        </h2>

        <p className="mt-0.5! text-[10px]! font-medium! text-gray-500! sm:text-[11px]!">
          Set the selling price of your product.
        </p>
      </div>

      {/* =====================================================
          FIELDS
      ===================================================== */}

      <div className="grid! min-w-0! grid-cols-1! gap-3! sm:grid-cols-2!">
        {/* PRICE */}

        <div className="min-w-0!">
          <label
            htmlFor="product-price"
            className="mb-1.5! block! text-[10px]! font-semibold! text-gray-700! sm:text-[11px]!"
          >
            Price
          </label>

          <div className="relative!">
            <input
              id="product-price"
              type="number"
              min="0"
              inputMode="decimal"
              value={form.price}
              onChange={(event) =>
                updateForm(
                  "price",
                  event.target.value,
                )
              }
              placeholder="150000"
              className={`${inputClass} pr-14!`}
            />

            <span className="pointer-events-none! absolute! right-3! top-1/2! -translate-y-1/2! text-[10px]! font-semibold! text-gray-400!">
              XOF
            </span>
          </div>

          {errors?.price && (
            <p
              role="alert"
              className="mt-1.5! text-[10px]! font-semibold! leading-relaxed! text-red-500!"
            >
              {errors.price}
            </p>
          )}
        </div>

        {/* COMPARE PRICE */}

        <div className="min-w-0!">
          <label
            htmlFor="product-compare-price"
            className="mb-1.5! block! text-[10px]! font-semibold! text-gray-700! sm:text-[11px]!"
          >
            Compare at price
            <span className="ml-1! font-medium! text-gray-400!">
              (Optional)
            </span>
          </label>

          <div className="relative!">
            <input
              id="product-compare-price"
              type="number"
              min="0"
              inputMode="decimal"
              value={form.comparePrice}
              onChange={(event) =>
                updateForm(
                  "comparePrice",
                  event.target.value,
                )
              }
              placeholder="180000"
              className={`${inputClass} pr-14!`}
            />

            <span className="pointer-events-none! absolute! right-3! top-1/2! -translate-y-1/2! text-[10px]! font-semibold! text-gray-400!">
              XOF
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          HELPER
      ===================================================== */}

      <div className="mt-3! rounded-xl! border! border-gray-200! bg-[#fafafa]! px-3! py-2.5!">
        <p className="text-[9px]! font-medium! leading-relaxed! text-gray-500! sm:text-[10px]!">
          Compare at price can be used to display the
          original price alongside the current selling
          price.
        </p>
      </div>
    </section>
  );
};

export default ProductPricing;