import { Minus, Plus } from "lucide-react";
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

const ProductOptions = ({
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

          <div className="flex! items-center! justify-between! gap-3!">
            <div className="min-w-0! space-y-1.5!">
              <div className="skeleton h-3.5! w-28! rounded-md!" />
              <div className="skeleton h-2.5! w-44! max-w-full! rounded-md!" />
            </div>

            <div className="skeleton h-6! w-11! shrink-0! rounded-full!" />
          </div>

          {/* Option name */}

          <div className="space-y-1.5!">
            <div className="skeleton h-2.5! w-20! rounded-md!" />
            <div className="skeleton h-10! w-full! rounded-xl!" />
          </div>

          {/* Values */}

          <div className="space-y-2!">
            <div className="skeleton h-2.5! w-12! rounded-md!" />
            <div className="skeleton h-10! w-full! rounded-xl!" />
            <div className="skeleton h-10! w-full! rounded-xl!" />
          </div>
        </div>
      </section>
    );
  }

  if (!form || !updateForm) {
    return null;
  }

  /* =========================================================
     OPTION VALUES
  ========================================================= */

  const addValue = () => {
    updateForm("optionValues", [
      ...form.optionValues,
      "",
    ]);
  };

  const removeValue = (index: number) => {
    updateForm(
      "optionValues",
      form.optionValues.filter(
        (_, i) => i !== index,
      ),
    );
  };

  const updateValue = (
    index: number,
    value: string,
  ) => {
    updateForm(
      "optionValues",
      form.optionValues.map(
        (item, i) =>
          i === index ? value : item,
      ),
    );
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section className="w-full! min-w-0! rounded-2xl! border! border-gray-200! bg-white! p-4! shadow-sm! transition-all! duration-200! sm:p-5!">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-4! flex! items-center! justify-between! gap-4!">
        <div className="min-w-0!">
          <h2 className="font-heading! text-[14px]! font-semibold! tracking-tight! text-gray-900! sm:text-[15px]!">
            Product options
          </h2>

          <p className="mt-0.5! truncate! text-[10px]! font-medium! text-gray-500! sm:text-[11px]!">
            Add options such as color or size.
          </p>
        </div>

        {/* SWITCH */}

        <button
          type="button"
          role="switch"
          aria-checked={form.hasOptions}
          aria-label="Enable product options"
          onClick={() =>
            updateForm(
              "hasOptions",
              !form.hasOptions,
            )
          }
          className={`relative! h-6! w-11! shrink-0! rounded-full! transition-colors! duration-200! focus:outline-none! focus:ring-2! focus:ring-blue-600/20! ${
            form.hasOptions
              ? "bg-blue-600!"
              : "bg-gray-300!"
          }`}
        >
          <span
            className={`absolute! top-1! h-4! w-4! rounded-full! bg-white! shadow-sm! transition-transform! duration-200! ${
              form.hasOptions
                ? "translate-x-6!"
                : "translate-x-1!"
            }`}
          />
        </button>
      </div>

      {/* =====================================================
          DISABLED STATE
      ===================================================== */}

      {!form.hasOptions && (
        <div className="rounded-2xl! border! border-gray-200! bg-[#fafafa]! px-3.5! py-3!">
          <p className="text-[10px]! font-medium! leading-relaxed! text-gray-500! sm:text-[11px]!">
            Enable options to let customers choose
            variants such as color, size, or format.
          </p>
        </div>
      )}

      {/* =====================================================
          OPTIONS CONTENT
      ===================================================== */}

      {form.hasOptions && (
        <div className="space-y-4!">
          {/* OPTION NAME */}

          <div className="min-w-0!">
            <label
              htmlFor="product-option-name"
              className="mb-1.5! block! text-[10px]! font-semibold! text-gray-700! sm:text-[11px]!"
            >
              Option name
            </label>

            <input
              id="product-option-name"
              type="text"
              value={form.optionName}
              onChange={(event) =>
                updateForm(
                  "optionName",
                  event.target.value,
                )
              }
              placeholder="Color"
              autoComplete="off"
              className={inputClass}
            />

            {errors?.optionName && (
              <p
                role="alert"
                className="mt-1.5! text-[10px]! font-semibold! leading-relaxed! text-red-500!"
              >
                {errors.optionName}
              </p>
            )}
          </div>

          {/* VALUES */}

          <div className="min-w-0!">
            <div className="mb-2! flex! items-center! justify-between! gap-3!">
              <label className="text-[10px]! font-semibold! text-gray-700! sm:text-[11px]!">
                Values
              </label>

              <button
                type="button"
                onClick={addValue}
                className="inline-flex! shrink-0! items-center! gap-1! rounded-lg! px-1.5! py-1! text-[10px]! font-semibold! text-blue-600! transition-all! duration-150! hover:bg-blue-50! active:scale-[0.98]!"
              >
                <Plus
                  size={12}
                  strokeWidth={2}
                />
                Add value
              </button>
            </div>

            <div className="space-y-2!">
              {form.optionValues.map(
                (value, index) => (
                  <div
                    key={index}
                    className="flex! min-w-0! items-center! gap-2!"
                  >
                    <input
                      type="text"
                      value={value}
                      onChange={(event) =>
                        updateValue(
                          index,
                          event.target.value,
                        )
                      }
                      placeholder={`Value ${
                        index + 1
                      }`}
                      aria-label={`Option value ${
                        index + 1
                      }`}
                      className={inputClass}
                    />

                    {form.optionValues
                      .length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeValue(index)
                        }
                        aria-label={`Remove value ${
                          index + 1
                        }`}
                        className="
                          flex!
                          h-10!
                          w-10!
                          shrink-0!
                          items-center!
                          justify-center!
                          rounded-xl!
                          border!
                          border-gray-200!
                          bg-[#fafafa]!
                          text-gray-400!
                          transition-all!
                          duration-150!
                          hover:border-red-200!
                          hover:bg-red-50!
                          hover:text-red-500!
                          active:scale-95!
                        "
                      >
                        <Minus
                          size={14}
                          strokeWidth={1.9}
                        />
                      </button>
                    )}
                  </div>
                ),
              )}
            </div>

            {errors?.optionValues && (
              <p
                role="alert"
                className="mt-1.5! text-[10px]! font-semibold! leading-relaxed! text-red-500!"
              >
                {errors.optionValues}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductOptions;