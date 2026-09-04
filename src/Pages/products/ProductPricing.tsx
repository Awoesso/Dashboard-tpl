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
  "h-10! w-full! rounded-xl! border! border-gray-200! bg-[#fafafa]! px-3.5! text-xs! font-semibold! text-gray-900! outline-none! transition-all! placeholder:text-gray-400! focus:border-blue-600! focus:ring-2! focus:ring-blue-600/10!";

const ProductPricing = ({
  form,
  errors,
  updateForm,
  loading,
}: Props) => {
  if (loading) {
    return (
      <div className="rounded-2xl! border! border-gray-200! bg-white! p-4!  sm:p-6!">
        <div className="animate-pulse! space-y-4!">
          <div className="skeleton! h-5! w-24! rounded!" />
          <div className="grid! grid-cols-1! gap-4! sm:grid-cols-2!">
            <div className="skeleton! h-10! rounded-xl!" />
            <div className="skeleton! h-10! rounded-xl!" />
          </div>
        </div>
      </div>
    );
  }

  if (!form || !updateForm) return null;

  return (
    <div className="rounded-2xl! border! border-gray-100! bg-white! p-4! sm !sm:p-6!">
      <div className="mb-5!">
        <h2 className="text-sm! font-bold! text-gray-900!">
          Pricing
        </h2>
        <p className="mt-0.5! text-[11px]! font-medium! text-gray-400!">
          Set the selling price of your product.
        </p>
      </div>

      <div className="grid! grid-cols-1! gap-4! sm:grid-cols-2!">
        <div>
          <label className="mb-1.5! block! text-xs! font-semibold! text-gray-700!">
            Price
          </label>

          <div className="relative!">
            <input
              type="number"
              min="0"
              value={form.price}
              onChange={(e) =>
                updateForm("price", e.target.value)
              }
              placeholder="150000"
              className={`${inputClass} pr-14!`}
            />

            <span className="pointer-events-none! absolute! right-3! top-1/2! -translate-y-1/2! text-[10px]! font-bold! text-gray-400!">
              XOF
            </span>
          </div>

          {errors?.price && (
            <p className="mt-1.5! text-[10px]! font-semibold! text-red-500!">
              {errors.price}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1.5! block! text-xs! font-semibold! text-gray-700!">
            Compare at price{" "}
            <span className="font-normal! text-gray-400!">
              (Optional)
            </span>
          </label>

          <div className="relative!">
            <input
              type="number"
              min="0"
              value={form.comparePrice}
              onChange={(e) =>
                updateForm("comparePrice", e.target.value)
              }
              placeholder="180000"
              className={`${inputClass} pr-14!`}
            />

            <span className="pointer-events-none! absolute! right-3! top-1/2! -translate-y-1/2! text-[10px]! font-bold! text-gray-400!">
              XOF
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPricing;