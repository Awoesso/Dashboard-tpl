import {
  Box,
  Check,
  Eye,
  FileText,
  Truck,
} from "lucide-react";

import type {
  ProductFormData,
  ProductImage,
} from "./ProductsNew";

interface Props {
  form?: ProductFormData;
  images?: ProductImage[];
  digitalFile?: File | null;
  loading?: boolean;
}

const ProductPreview = ({
  form,
  images = [],
  digitalFile,
  loading = false,
}: Props) => {
  /* =========================================================
     SKELETON
  ========================================================= */

  if (loading) {
    return (
      <div className="flex! min-h-0! w-full! flex-col! overflow-hidden! rounded-2xl! border! border-gray-200! bg-white! p-3! shadow-sm! sm:p-4!">
        <div className="animate-pulse! space-y-4!">
          {/* Header */}

          <div>
            <div className="skeleton h-3.5! w-20! rounded-md!" />

            <div className="skeleton mt-1.5! h-2.5! w-36! rounded-md!" />
          </div>

          {/* Product image */}

          <div className="skeleton aspect-[4/3]! w-full! rounded-xl!" />

          {/* Category / product name / brand */}

          <div className="space-y-2!">
            <div className="skeleton h-2.5! w-16! rounded-md!" />

            <div className="skeleton h-4! w-3/4! max-w-full! rounded-md!" />

            <div className="skeleton h-3! w-20! rounded-md!" />
          </div>

          {/* Price */}

          <div className="flex! items-center! gap-2!">
            <div className="skeleton h-5! w-24! rounded-md!" />

            <div className="skeleton h-3! w-16! rounded-md!" />
          </div>

          {/* Availability */}

          <div className="skeleton h-9! w-full! rounded-xl!" />

          {/* Shipping */}

          <div className="skeleton h-3! w-32! rounded-md!" />

          {/* CTA */}

          <div className="skeleton h-9! w-full! rounded-xl!" />
        </div>
      </div>
    );
  }

  /* =========================================================
     EMPTY STATE
  ========================================================= */

  if (!form) {
    return null;
  }

  /* =========================================================
     IMAGE
  ========================================================= */

  const previewImage =
    images.length > 0
      ? images[0].preview
      : "/dashboard-preview.png";

  /* =========================================================
     PRICE
  ========================================================= */

  const priceValue = Number(
    form.price.replace(/\s/g, ""),
  );

  const formattedPrice =
    form.price.trim() &&
    !Number.isNaN(priceValue)
      ? `${priceValue.toLocaleString(
          "fr-FR",
        )} XOF`
      : "0 XOF";

  const comparePriceValue = Number(
    form.comparePrice.replace(/\s/g, ""),
  );

  const formattedComparePrice =
    form.comparePrice.trim() &&
    !Number.isNaN(comparePriceValue)
      ? `${comparePriceValue.toLocaleString(
          "fr-FR",
        )} XOF`
      : null;

  /* =========================================================
     STOCK
  ========================================================= */

  const isPhysical =
    form.productType === "physical";

  const stockQuantity = Number(
    form.stock || 0,
  );

  const isInStock =
    !isPhysical ||
    !form.trackInventory ||
    stockQuantity > 0;

  const stockText = !isPhysical
    ? "Digital product"
    : !form.trackInventory
      ? "Available"
      : stockQuantity > 0
        ? `${form.stock} in stock`
        : "Out of stock";

  /* =========================================================
     OPTIONS
  ========================================================= */

  const validOptions =
    form.hasOptions
      ? form.optionValues.filter(
          (value) => value.trim() !== "",
        )
      : [];

  return (
    <div className="flex! min-h-0! w-full! flex-col! overflow-hidden! rounded-2xl! border! border-gray-200! bg-white! p-3! shadow-sm! transition-all! duration-200! sm:p-4!">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-3! shrink-0!">
        <div className="flex! items-center! gap-2!">
          <div className="flex! h-7! w-7! shrink-0! items-center! justify-center! rounded-full! bg-gray-900! text-white!">
            <Eye size={13} />
          </div>

          <div className="min-w-0!">
            <h2 className="text-xs! font-bold! text-gray-800!">
              Preview
            </h2>

            <p className="truncate! text-[10px]! font-medium! text-gray-400!">
              Customer-facing preview.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          CUSTOMER PRODUCT CARD
      ===================================================== */}

      <div className="min-h-0! overflow-hidden! rounded-xl! border! border-gray-200! bg-white!">
        {/* ===================================================
            IMAGE
        =================================================== */}

        <div className="group! relative! aspect-[4/3]! overflow-hidden! bg-gray-50!">
          <img
            src={previewImage}
            alt={
              form.productName ||
              "Product preview"
            }
            className="h-full! w-full! object-cover! transition-transform! duration-300! group-hover:scale-[1.02]!"
          />

          {/* Product type */}

          <div className="absolute! left-2.5! top-2.5!">
            <span className="inline-flex! items-center! gap-1! rounded-full! border! border-white/70! bg-white/95! px-2! py-1! text-[9px]! font-bold! text-gray-700! shadow-sm!">
              {isPhysical ? (
                <Box size={10} />
              ) : (
                <FileText size={10} />
              )}

              {isPhysical
                ? "Physical"
                : "Digital"}
            </span>
          </div>

          {/* Image count */}

          {images.length > 1 && (
            <div className="absolute! bottom-2.5! right-2.5!">
              <span className="rounded-full! bg-gray-900/85! px-2! py-1! text-[9px]! font-bold! text-white!">
                {images.length} images
              </span>
            </div>
          )}
        </div>

        {/* ===================================================
            PRODUCT INFO
        =================================================== */}

        <div className="p-3!">
          {/* Category */}

          <p className="text-[9px]! font-bold! uppercase! tracking-[0.12em]! text-blue-600!">
            {form.category}
          </p>

          {/* Product name */}

          <h3 className="mt-1! line-clamp-2! text-sm! font-bold! leading-snug! tracking-tight! text-gray-900!">
            {form.productName ||
              "Product Name"}
          </h3>

          {/* Brand */}

          {form.brand && (
            <p className="mt-1! text-[10px]! font-medium! text-gray-500!">
              {form.brand}
            </p>
          )}

          {/* Price */}

          <div className="mt-3! flex! flex-wrap! items-end! gap-2!">
            <span className="text-base! font-extrabold! tracking-tight! text-gray-900!">
              {formattedPrice}
            </span>

            {formattedComparePrice && (
              <span className="pb-0.5! text-[10px]! font-medium! text-gray-400! line-through!">
                {formattedComparePrice}
              </span>
            )}
          </div>

          {/* =================================================
              AVAILABILITY
          ================================================= */}

          <div className="mt-3! flex! items-center! justify-between! gap-3! rounded-xl! border! border-gray-100! bg-gray-50! px-3! py-2!">
            <div className="flex! min-w-0! items-center! gap-2!">
              {isPhysical ? (
                <Box
                  size={12}
                  className="shrink-0! text-gray-400!"
                />
              ) : (
                <FileText
                  size={12}
                  className="shrink-0! text-gray-400!"
                />
              )}

              <span className="truncate! text-[10px]! font-semibold! text-gray-500!">
                {isPhysical
                  ? "Availability"
                  : "Delivery"}
              </span>
            </div>

            <span
              className={`shrink-0! text-[10px]! font-bold! ${
                isInStock
                  ? "text-green-600!"
                  : "text-red-500!"
              }`}
            >
              {stockText}
            </span>
          </div>

          {/* =================================================
              SHIPPING
          ================================================= */}

          {isPhysical && (
            <div className="mt-2! flex! items-center! gap-2! text-[9px]! font-medium! text-gray-400!">
              <Truck
                size={11}
                className="shrink-0!"
              />

              <span>
                Shipping available
              </span>
            </div>
          )}

          {/* =================================================
              DIGITAL FILE
          ================================================= */}

          {!isPhysical &&
            digitalFile && (
              <div className="mt-2! flex! min-w-0! items-center! gap-2! text-[9px]! font-medium! text-gray-400!">
                <FileText
                  size={11}
                  className="shrink-0!"
                />

                <span className="truncate!">
                  {digitalFile.name}
                </span>
              </div>
            )}

          {/* =================================================
              OPTIONS
          ================================================= */}

          {validOptions.length > 0 && (
            <div className="mt-3!">
              <p className="mb-1.5! text-[9px]! font-bold! uppercase! tracking-wide! text-gray-400!">
                {form.optionName}
              </p>

              <div className="flex! flex-wrap! gap-1.5!">
                {validOptions
                  .slice(0, 5)
                  .map(
                    (
                      value,
                      index,
                    ) => (
                      <span
                        key={`${value}-${index}`}
                        className="rounded-lg! border! border-gray-200! bg-white! px-2! py-1! text-[9px]! font-semibold! text-gray-600! transition-colors! hover:border-gray-300!"
                      >
                        {value}
                      </span>
                    ),
                  )}

                {validOptions.length >
                  5 && (
                  <span className="rounded-lg! bg-gray-100! px-2! py-1! text-[9px]! font-semibold! text-gray-400!">
                    +
                    {validOptions.length -
                      5}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* =================================================
              CTA
          ================================================= */}

          <button
            type="button"
            className="mt-4! inline-flex! h-9! w-full! items-center! justify-center! gap-2! rounded-xl! bg-gray-900! text-[10px]! font-bold! text-white! transition-all! duration-200! hover:-translate-y-[1px]! hover:bg-gray-800! active:translate-y-0! active:scale-[0.99]!"
          >
            <Check size={12} />
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;