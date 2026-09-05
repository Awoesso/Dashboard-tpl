import {
  Check,
  ChevronRight,
  Globe,
  Image as ImageIcon,
  Lock,
  Package,
  Ruler,
  Tag,
  Truck,
} from "lucide-react";

import type {
  ProductFormData,
  ProductImage,
  ProductStatus,
} from "./ProductsNew";

interface Props {
  form: ProductFormData;
  images: ProductImage[];
  status: ProductStatus;
  onStatusChange: (status: ProductStatus) => void;
  loading?: boolean;
}

const formatPrice = (value: string) => {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return "0 XOF";
  }

  return `${new Intl.NumberFormat("fr-FR").format(amount)} XOF`;
};

const getCompletion = (
  form: ProductFormData,
  images: ProductImage[],
) => {
  const checks = [
    Boolean(form.productName.trim()),
    Boolean(form.category.trim()),
    Boolean(form.description.trim()),
    Boolean(form.price.trim()) &&
      Number(form.price) >= 0,
    images.length > 0,
    form.productType === "digital"
      ? true
      : !form.trackInventory ||
        (form.stock.trim() !== "" &&
          Number(form.stock) >= 0),
    form.productType === "physical"
      ? true
      : true,
    form.hasOptions
      ? Boolean(
          form.optionName.trim() &&
            form.optionValues.some(
              (value) => value.trim(),
            ),
        )
      : true,
  ];

  const completed = checks.filter(Boolean).length;

  return Math.round(
    (completed / checks.length) * 100,
  );
};

const ProductSummary = ({
  form,
  images,
  status,
  onStatusChange,
  loading = false,
}: Props) => {
  /* =========================================================
     SKELETON
  ========================================================= */

  if (loading) {
    return (
      <section className="flex! h-full! min-h-0! w-full! min-w-0! flex-col! overflow-hidden! rounded-2xl! border! border-gray-200! bg-white! p-3! shadow-sm! sm:p-4!">
        <div className="animate-pulse! space-y-4!">
          <div className="flex! items-center! justify-between!">
            <div className="space-y-1.5!">
              <div className="skeleton h-3.5! w-28! rounded-md!" />
              <div className="skeleton h-2.5! w-40! rounded-md!" />
            </div>

            <div className="skeleton h-6! w-16! rounded-full!" />
          </div>

          <div className="flex! items-center! gap-3!">
            <div className="skeleton h-16! w-16! shrink-0! rounded-xl!" />

            <div className="min-w-0! flex-1! space-y-2!">
              <div className="skeleton h-3! w-32! max-w-full! rounded-md!" />
              <div className="skeleton h-2.5! w-24! rounded-md!" />
              <div className="skeleton h-2.5! w-20! rounded-md!" />
            </div>
          </div>

          <div className="space-y-2!">
            <div className="skeleton h-12! w-full! rounded-xl!" />
            <div className="skeleton h-12! w-full! rounded-xl!" />
            <div className="skeleton h-12! w-full! rounded-xl!" />
          </div>

          <div className="skeleton h-20! w-full! rounded-2xl!" />

          <div className="space-y-2!">
            <div className="skeleton h-12! w-full! rounded-xl!" />
            <div className="skeleton h-12! w-full! rounded-xl!" />
          </div>
        </div>
      </section>
    );
  }

  const completion = getCompletion(
    form,
    images,
  );

  const firstImage = images[0];

  const isInStock =
    form.trackInventory
      ? Number(form.stock) > 0
      : true;

  const stockLabel = !form.trackInventory
    ? "Inventory not tracked"
    : isInStock
      ? `${form.stock || "0"} units`
      : "Out of stock";

  const hasShippingData =
    form.weight.trim() ||
    form.length.trim() ||
    form.width.trim() ||
    form.height.trim();

  return (
    <section className="flex! h-full! min-h-0! w-full! min-w-0! flex-col! overflow-hidden! rounded-2xl! border! border-gray-200! bg-white! shadow-sm!">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="shrink-0! border-b! border-gray-100! p-3! sm:p-4!">
        <div className="flex! items-center! justify-between! gap-3!">
          <div className="min-w-0!">
            <h2 className="font-heading! text-[14px]! font-semibold! tracking-tight! text-gray-900! sm:text-[15px]!">
              Product summary
            </h2>

            <p className="mt-0.5! truncate! text-[10px]! font-medium! text-gray-500!">
              Check your product configuration.
            </p>
          </div>

          <span className="shrink-0! rounded-full! border! border-gray-200! bg-[#fafafa]! px-2! py-1! text-[9px]! font-semibold! text-gray-500!">
            {completion}% complete
          </span>
        </div>
      </div>

      {/* =====================================================
          SCROLLABLE CONTENT
      ===================================================== */}

      <div className="min-h-0! flex-1! overflow-y-auto! p-3! sm:p-4!">
        <div className="space-y-3!">
          {/* =================================================
              PRODUCT IDENTITY
          ================================================= */}

          <div className="flex! min-w-0! gap-3! rounded-2xl! border! border-gray-200! bg-[#fafafa]! p-3!">
            {firstImage ? (
              <img
                src={firstImage.preview}
                alt={
                  firstImage.file.name ||
                  "Product"
                }
                className="h-16! w-16! shrink-0! rounded-xl! border! border-gray-200! object-cover!"
              />
            ) : (
              <div className="flex! h-16! w-16! shrink-0! items-center! justify-center! rounded-xl! border! border-dashed! border-gray-200! bg-white! text-gray-400!">
                <ImageIcon
                  size={18}
                  strokeWidth={1.8}
                />
              </div>
            )}

            <div className="min-w-0! flex-1!">
              <p className="truncate! text-xs! font-semibold! text-gray-900!">
                {form.productName.trim() ||
                  "Untitled product"}
              </p>

              <p className="mt-0.5! truncate! text-[10px]! font-medium! text-gray-500!">
                {form.category ||
                  "No category"}
              </p>

              <div className="mt-2! flex! flex-wrap! items-center! gap-1.5!">
                <span className="rounded-full! border! border-gray-200! bg-white! px-2! py-1! text-[9px]! font-semibold! text-gray-500!">
                  {form.productType ===
                  "digital"
                    ? "Digital"
                    : "Physical"}
                </span>

                {form.brand.trim() && (
                  <span className="max-w-[120px]! truncate! rounded-full! border! border-gray-200! bg-white! px-2! py-1! text-[9px]! font-semibold! text-gray-500!">
                    {form.brand}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* =================================================
              PRICING
          ================================================= */}

          <SummaryBlock
            icon={<Tag size={14} strokeWidth={1.9} />}
            title="Pricing"
          >
            <div className="flex! items-end! justify-between! gap-3!">
              <div className="min-w-0!">
                <p className="text-lg! font-semibold! tracking-tight! text-gray-900!">
                  {formatPrice(form.price)}
                </p>

                {form.comparePrice.trim() && (
                  <p className="mt-0.5! truncate! text-[10px]! font-medium! text-gray-400! line-through!">
                    {formatPrice(
                      form.comparePrice,
                    )}
                  </p>
                )}
              </div>

              <span className="shrink-0! text-[9px]! font-semibold! text-gray-400!">
                XOF
              </span>
            </div>
          </SummaryBlock>

          {/* =================================================
              INVENTORY
          ================================================= */}

          <SummaryBlock
            icon={
              <Package
                size={14}
                strokeWidth={1.9}
              />
            }
            title="Inventory"
          >
            <div className="flex! items-center! justify-between! gap-3!">
              <span className="text-[11px]! font-semibold! text-gray-900!">
                {stockLabel}
              </span>

              <span
                className={`shrink-0! rounded-full! px-2! py-1! text-[9px]! font-semibold! ${
                  !form.trackInventory
                    ? "bg-gray-100! text-gray-500!"
                    : isInStock
                      ? "bg-green-50! text-green-600!"
                      : "bg-red-50! text-red-500!"
                }`}
              >
                {!form.trackInventory
                  ? "Not tracked"
                  : isInStock
                    ? "In stock"
                    : "Out of stock"}
              </span>
            </div>

            {form.sku.trim() && (
              <p className="mt-2! truncate! text-[9px]! font-medium! text-gray-400!">
                SKU: {form.sku}
              </p>
            )}
          </SummaryBlock>

          {/* =================================================
              OPTIONS
          ================================================= */}

          {form.hasOptions && (
            <SummaryBlock
              icon={
                <ChevronRight
                  size={14}
                  strokeWidth={1.9}
                />
              }
              title="Options"
            >
              <p className="text-[11px]! font-semibold! text-gray-900!">
                {form.optionName.trim() ||
                  "Option"}
              </p>

              <div className="mt-2! flex! flex-wrap! gap-1.5!">
                {form.optionValues
                  .filter(
                    (value) =>
                      value.trim(),
                  )
                  .map(
                    (value, index) => (
                      <span
                        key={`${value}-${index}`}
                        className="rounded-full! border! border-gray-200! bg-white! px-2! py-1! text-[9px]! font-medium! text-gray-600!"
                      >
                        {value}
                      </span>
                    ),
                  )}
              </div>
            </SummaryBlock>
          )}

          {/* =================================================
              SHIPPING
          ================================================= */}

          {form.productType ===
            "physical" &&
            hasShippingData && (
              <SummaryBlock
                icon={
                  <Truck
                    size={14}
                    strokeWidth={1.9}
                  />
                }
                title="Shipping"
              >
                <div className="space-y-1.5!">
                  {form.weight.trim() && (
                    <SummaryRow
                      label="Weight"
                      value={`${form.weight} kg`}
                    />
                  )}

                  {(form.length.trim() ||
                    form.width.trim() ||
                    form.height.trim()) && (
                    <SummaryRow
                      label="Dimensions"
                      value={`${form.length || "—"} × ${
                        form.width || "—"
                      } × ${
                        form.height || "—"
                      }`}
                    />
                  )}
                </div>
              </SummaryBlock>
            )}

          {/* =================================================
              IMAGES
          ================================================= */}

          <SummaryBlock
            icon={
              <ImageIcon
                size={14}
                strokeWidth={1.9}
              />
            }
            title="Images"
          >
            <div className="flex! items-center! justify-between! gap-3!">
              <span className="text-[11px]! font-semibold! text-gray-900!">
                {images.length} / 6 images
              </span>

              <span
                className={`shrink-0! rounded-full! px-2! py-1! text-[9px]! font-semibold! ${
                  images.length > 0
                    ? "bg-green-50! text-green-600!"
                    : "bg-gray-100! text-gray-500!"
                }`}
              >
                {images.length > 0
                  ? "Ready"
                  : "Missing"}
              </span>
            </div>
          </SummaryBlock>

          {/* =================================================
              COMPLETION
          ================================================= */}

          <div className="rounded-2xl! border! border-gray-200! bg-[#fafafa]! p-3!">
            <div className="flex! items-center! justify-between! gap-3!">
              <div className="min-w-0!">
                <p className="text-[11px]! font-semibold! text-gray-900!">
                  Completion
                </p>

                <p className="mt-0.5! text-[9px]! font-medium! text-gray-500!">
                  Product setup progress.
                </p>
              </div>

              <span className="shrink-0! text-[10px]! font-semibold! text-blue-600!">
                {completion}%
              </span>
            </div>

            <div className="mt-3! h-1.5! overflow-hidden! rounded-full! bg-gray-200!">
              <div
                className="h-full! rounded-full! bg-blue-600! transition-all! duration-200!"
                style={{
                  width: `${completion}%`,
                }}
              />
            </div>

            <div className="mt-3! space-y-2!">
              <CompletionRow
                done={Boolean(
                  form.productName.trim(),
                )}
                label="Product information"
              />

              <CompletionRow
                done={
                  Boolean(
                    form.price.trim(),
                  ) &&
                  Number(form.price) >= 0
                }
                label="Pricing"
              />

              <CompletionRow
                done={
                  !form.trackInventory ||
                  (form.stock.trim() !==
                    "" &&
                    Number(form.stock) >= 0)
                }
                label="Inventory"
              />

              <CompletionRow
                done={images.length > 0}
                label="Images"
              />

              {form.hasOptions && (
                <CompletionRow
                  done={Boolean(
                    form.optionName.trim() &&
                      form.optionValues.some(
                        (value) =>
                          value.trim(),
                      ),
                  )}
                  label="Options"
                />
              )}
            </div>
          </div>

          {/* =================================================
              PUBLICATION
          ================================================= */}

          <div className="rounded-2xl! border! border-gray-200! bg-white! p-3!">
            <div className="mb-3!">
              <p className="text-[11px]! font-semibold! text-gray-900!">
                Publication
              </p>

              <p className="mt-0.5! text-[9px]! font-medium! text-gray-500!">
                Choose the visibility of this product.
              </p>
            </div>

            <div className="space-y-2!">
              <PublicationOption
                active={status === "draft"}
                icon={
                  <Lock
                    size={14}
                    strokeWidth={1.9}
                  />
                }
                title="Draft"
                description="Keep the product private."
                onClick={() =>
                  onStatusChange(
                    "draft",
                  )
                }
              />

              <PublicationOption
                active={
                  status === "published"
                }
                icon={
                  <Globe
                    size={14}
                    strokeWidth={1.9}
                  />
                }
                title="Published"
                description="Make the product visible."
                onClick={() =>
                  onStatusChange(
                    "published",
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ===========================================================
   SUMMARY BLOCK
=========================================================== */

interface SummaryBlockProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const SummaryBlock = ({
  icon,
  title,
  children,
}: SummaryBlockProps) => {
  return (
    <div className="rounded-2xl! border! border-gray-200! bg-white! p-3!">
      <div className="mb-2.5! flex! items-center! gap-2!">
        <span className="flex! h-7! w-7! shrink-0! items-center! justify-center! rounded-lg! bg-[#fafafa]! text-gray-500!">
          {icon}
        </span>

        <p className="text-[10px]! font-semibold! uppercase! tracking-wide! text-gray-500!">
          {title}
        </p>
      </div>

      {children}
    </div>
  );
};

/* ===========================================================
   SUMMARY ROW
=========================================================== */

interface SummaryRowProps {
  label: string;
  value: string;
}

const SummaryRow = ({
  label,
  value,
}: SummaryRowProps) => {
  return (
    <div className="flex! items-center! justify-between! gap-3!">
      <span className="text-[9px]! font-medium! text-gray-500!">
        {label}
      </span>

      <span className="min-w-0! truncate! text-[10px]! font-semibold! text-gray-900!">
        {value}
      </span>
    </div>
  );
};

/* ===========================================================
   COMPLETION ROW
=========================================================== */

interface CompletionRowProps {
  done: boolean;
  label: string;
}

const CompletionRow = ({
  done,
  label,
}: CompletionRowProps) => {
  return (
    <div className="flex! items-center! gap-2!">
      <span
        className={`flex! h-4! w-4! shrink-0! items-center! justify-center! rounded-full! border! ${
          done
            ? "border-green-500! bg-green-500! text-white!"
            : "border-gray-200! bg-white! text-transparent!"
        }`}
      >
        <Check
          size={9}
          strokeWidth={3}
        />
      </span>

      <span
        className={`text-[9px]! font-medium! ${
          done
            ? "text-gray-700!"
            : "text-gray-400!"
        }`}
      >
        {label}
      </span>
    </div>
  );
};

/* ===========================================================
   PUBLICATION OPTION
=========================================================== */

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
      aria-pressed={active}
      className={`
        flex!
        w-full!
        min-w-0!
        items-center!
        justify-between!
        gap-3!
        rounded-xl!
        border!
        p-2.5!
        text-left!
        transition-all!
        duration-150!
        active:scale-[0.99]!
        focus:outline-none!
        focus:ring-2!
        focus:ring-blue-600/20!
        ${
          active
            ? "border-blue-200! bg-blue-50/50!"
            : "border-gray-200! bg-[#fafafa]! hover:border-gray-300! hover:bg-white!"
        }
      `}
    >
      <span className="flex! min-w-0! flex-1! items-center! gap-2.5!">
        <span
          className={`
            flex!
            h-7!
            w-7!
            shrink-0!
            items-center!
            justify-center!
            rounded-lg!
            border!
            bg-white!
            ${
              active
                ? "border-blue-200! text-blue-600!"
                : "border-gray-200! text-gray-500!"
            }
          `}
        >
          {icon}
        </span>

        <span className="min-w-0!">
          <span
            className={`block! truncate! text-[10px]! font-semibold! ${
              active
                ? "text-blue-700!"
                : "text-gray-900!"
            }`}
          >
            {title}
          </span>

          <span className="mt-0.5! block! truncate! text-[9px]! font-medium! text-gray-500!">
            {description}
          </span>
        </span>
      </span>

      <span
        className={`
          flex!
          h-5!
          w-5!
          shrink-0!
          items-center!
          justify-center!
          rounded-full!
          border!
          ${
            active
              ? "border-blue-600! bg-blue-600! text-white!"
              : "border-gray-200! bg-white! text-transparent!"
          }
        `}
      >
        <Check
          size={10}
          strokeWidth={3}
        />
      </span>
    </button>
  );
};

export default ProductSummary;