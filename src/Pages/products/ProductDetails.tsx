import {
  Check,
  FileText,
  Package,
} from "lucide-react";

import {
  categories,
} from "./ProductsNew";

import type {
  ProductFormData,
  ProductType,
} from "./ProductsNew";

interface Props {
  form?: ProductFormData;
  errors?: Record<string, string>;
  updateForm?: <K extends keyof ProductFormData>(
    key: K,
    value: ProductFormData[K],
  ) => void;
  loading?: boolean;
}

const inputClass = `
  h-10!
  w-full!
  min-w-0!
  rounded-xl!
  border!
  border-gray-200!
  bg-[#fafafa]!
  px-3!
  text-xs!
  font-medium!
  text-gray-900!
  outline-none!
  transition-all!
  duration-150!
  placeholder:text-gray-400!
  focus:border-blue-500!
  focus:bg-white!
  focus:ring-2!
  focus:ring-blue-500/10!
`;

const ProductDetails = ({
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
        <div className="animate-pulse! space-y-5!">
          {/* Header */}

          <div className="flex! items-center! gap-2.5!">
            <div className="skeleton h-7! w-7! shrink-0! rounded-full!" />

            <div className="min-w-0! flex-1!">
              <div className="skeleton h-3.5! w-32! rounded-md!" />

              <div className="skeleton mt-1.5! h-2.5! w-48! max-w-full! rounded-md!" />
            </div>
          </div>

          {/* Type */}

          <div>
            <div className="skeleton mb-2! h-2.5! w-24! rounded-md!" />

            <div className="grid! grid-cols-1! gap-3! sm:grid-cols-2!">
              <div className="skeleton h-[74px]! rounded-xl!" />
              <div className="skeleton h-[74px]! rounded-xl!" />
            </div>
          </div>

          {/* Name / Category */}

          <div className="grid! grid-cols-1! gap-4! sm:grid-cols-2!">
            <SkeletonField />
            <SkeletonField />
          </div>

          {/* Brand */}

          <SkeletonField />

          {/* Description */}

          <div className="space-y-2!">
            <div className="skeleton h-2.5! w-20! rounded-md!" />

            <div className="skeleton h-24! w-full! rounded-xl!" />
          </div>
        </div>
      </section>
    );
  }

  if (!form || !updateForm) {
    return null;
  }

  /* =========================================================
     PRODUCT TYPE
  ========================================================= */

  const setType = (type: ProductType) => {
    updateForm("productType", type);
  };

  return (
    <section className="w-full! min-w-0! rounded-2xl! border! border-gray-200! bg-white! p-4! shadow-sm! transition-all! duration-200! sm:p-5!">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-5! flex! items-center! gap-2.5!">
        <div className="flex! h-7! w-7! shrink-0! items-center! justify-center! rounded-full! border! border-gray-300! bg-white! text-gray-600!">
          <Package
            size={13}
            strokeWidth={1.9}
          />
        </div>

        <div className="min-w-0!">
          <h2 className="font-heading! text-[14px]! font-semibold! tracking-tight! text-gray-900! sm:text-[15px]!">
            Product details
          </h2>

          <p className="mt-0.5! truncate! text-[10px]! font-medium! text-gray-500! sm:text-[11px]!">
            Basic information about your product.
          </p>
        </div>
      </div>

      {/* =====================================================
          PRODUCT TYPE
      ===================================================== */}

      <div className="mb-5!">
        <label className="mb-2! block! text-[11px]! font-semibold! text-gray-700!">
          Product type
        </label>

        <div className="grid! grid-cols-1! gap-2.5! sm:grid-cols-2!">
          {[
            {
              value: "physical" as const,
              title: "Physical",
              description:
                "Ships to customers",
              icon: Package,
            },
            {
              value: "digital" as const,
              title: "Digital",
              description:
                "Delivered as a file",
              icon: FileText,
            },
          ].map((item) => {
            const Icon = item.icon;

            const active =
              form.productType ===
              item.value;

            return (
              <button
                key={item.value}
                type="button"
                onClick={() =>
                  setType(item.value)
                }
                className={`
                  group!
                  flex!
                  min-w-0!
                  items-center!
                  justify-between!
                  rounded-xl!
                  border!
                  p-3!
                  text-left!
                  transition-all!
                  duration-150!
                  active:scale-[0.995]!
                  ${
                    active
                      ? "border-blue-500! bg-blue-50/50! ring-1! ring-blue-500/20!"
                      : "border-gray-200! bg-[#fafafa]! hover:border-gray-300! hover:bg-white!"
                  }
                `}
              >
                <div className="flex! min-w-0! items-center! gap-2.5!">
                  <div
                    className={`
                      flex!
                      h-7!
                      w-7!
                      shrink-0!
                      items-center!
                      justify-center!
                      rounded-lg!
                      transition-colors!
                      ${
                        active
                          ? "bg-blue-100! text-blue-600!"
                          : "bg-white! text-gray-500!"
                      }
                    `}
                  >
                    <Icon
                      size={14}
                      strokeWidth={1.9}
                    />
                  </div>

                  <div className="min-w-0!">
                    <p className="text-[11px]! font-semibold! text-gray-900! sm:text-xs!">
                      {item.title}
                    </p>

                    <p className="mt-0.5! truncate! text-[10px]! font-medium! text-gray-500!">
                      {item.description}
                    </p>
                  </div>
                </div>

                {active && (
                  <div className="flex! h-5! w-5! shrink-0! items-center! justify-center! rounded-full! bg-blue-600! text-white!">
                    <Check
                      size={11}
                      strokeWidth={3}
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* =====================================================
          NAME + CATEGORY
      ===================================================== */}

      <div className="grid! grid-cols-1! gap-4! sm:grid-cols-2!">
        <div className="min-w-0!">
          <label
            htmlFor="product-name"
            className="mb-1.5! block! text-[11px]! font-semibold! text-gray-700!"
          >
            Product name
          </label>

          <input
            id="product-name"
            type="text"
            value={form.productName}
            onChange={(event) =>
              updateForm(
                "productName",
                event.target.value,
              )
            }
            placeholder="Example: Nike Air Max"
            className={`${inputClass} ${
              errors?.productName
                ? "border-red-300! focus:border-red-400! focus:ring-red-500/10!"
                : ""
            }`}
          />

          {errors?.productName && (
            <p className="mt-1.5! text-[10px]! font-semibold! leading-relaxed! text-red-500!">
              {errors.productName}
            </p>
          )}
        </div>

        <div className="min-w-0!">
          <label
            htmlFor="product-category"
            className="mb-1.5! block! text-[11px]! font-semibold! text-gray-700!"
          >
            Category
          </label>

          <select
            id="product-category"
            value={form.category}
            onChange={(event) =>
              updateForm(
                "category",
                event.target.value,
              )
            }
            className={`${inputClass} cursor-pointer!`}
          >
            {categories.map(
              (category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ),
            )}
          </select>
        </div>
      </div>

      {/* =====================================================
          BRAND
      ===================================================== */}

      <div className="mt-4!">
        <label
          htmlFor="product-brand"
          className="mb-1.5! block! text-[11px]! font-semibold! text-gray-700!"
        >
          Brand{" "}
          <span className="font-normal! text-gray-400!">
            (Optional)
          </span>
        </label>

        <input
          id="product-brand"
          type="text"
          value={form.brand}
          onChange={(event) =>
            updateForm(
              "brand",
              event.target.value,
            )
          }
          placeholder="Nike, Samsung, Apple..."
          className={inputClass}
        />
      </div>

      {/* =====================================================
          DESCRIPTION
      ===================================================== */}

      <div className="mt-4!">
        <div className="mb-1.5! flex! items-center! justify-between! gap-3!">
          <label
            htmlFor="product-description"
            className="text-[11px]! font-semibold! text-gray-700!"
          >
            Description
          </label>

          <span
            className={`
              shrink-0!
              text-[10px]!
              font-medium!
              ${
                form.description.length >
                1000
                  ? "text-red-500!"
                  : "text-gray-400!"
              }
            `}
          >
            {form.description.length}/1000
          </span>
        </div>

        <textarea
          id="product-description"
          rows={5}
          maxLength={1000}
          value={form.description}
          onChange={(event) =>
            updateForm(
              "description",
              event.target.value,
            )
          }
          placeholder="Describe your product..."
          className={`
            min-h-[120px]!
            w-full!
            resize-none!
            rounded-xl!
            border!
            border-gray-200!
            bg-[#fafafa]!
            p-3!
            text-xs!
            leading-relaxed!
            text-gray-800!
            outline-none!
            transition-all!
            duration-150!
            placeholder:text-gray-400!
            focus:border-blue-500!
            focus:bg-white!
            focus:ring-2!
            focus:ring-blue-500/10!
          `}
        />

        {errors?.description && (
          <p className="mt-1.5! text-[10px]! font-semibold! leading-relaxed! text-red-500!">
            {errors.description}
          </p>
        )}
      </div>
    </section>
  );
};

/* =========================================================
   SKELETON FIELD
========================================================= */

const SkeletonField = () => {
  return (
    <div className="space-y-2!">
      <div className="skeleton h-2.5! w-20! rounded-md!" />

      <div className="skeleton h-10! w-full! rounded-xl!" />
    </div>
  );
};

export default ProductDetails;