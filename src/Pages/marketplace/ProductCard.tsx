import {
  Eye,
  Package,
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";

export type MarketplaceProduct = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  category?: string | null;
  product_type: "physical" | "digital";
  price: number;
  currency: string;
  stock_quantity?: number | null;
  track_inventory?: boolean;
  status: "draft" | "published" | "archived";
  sales_count?: number;
  view_count?: number;
  image_url?: string | null;
};

type ProductCardProps = {
  product: MarketplaceProduct;
};

const ProductCard = ({
  product,
}: ProductCardProps) => {
  const isPublished =
    product.status === "published";

  const isOutOfStock =
    product.product_type === "physical" &&
    product.track_inventory &&
    (product.stock_quantity ?? 0) <= 0;

  const formattedPrice = new Intl.NumberFormat(
    "fr-FR",
    {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    },
  ).format(product.price);

  return (
    <article className="group flex! min-w-0! flex-col! overflow-hidden! rounded-2xl! border! border-gray-200! bg-white! transition-shadow! duration-150! hover:shadow-sm!">
      {/* =================================================
          IMAGE
      ================================================= */}

      <Link
        to={`/dashboard/marketplace/${product.id}`}
        className="block! min-w-0!"
      >
        <div className="relative! aspect-[4/3]! overflow-hidden! bg-[#fafafa]!">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              loading="lazy"
              className="
                h-full!
                w-full!
                object-cover!
                transition-transform!
                duration-200!
                group-hover:scale-[1.02]!
              "
            />
          ) : (
            <div className="flex! h-full! w-full! items-center! justify-center! text-gray-300!">
              <Package
                size={28}
                strokeWidth={1.5}
              />
            </div>
          )}

          {/* Status */}

          <div className="absolute! left-3! top-3!">
            <span
              className={`
                inline-flex!
                items-center!
                rounded-full!
                px-2!
                py-1!
                text-[9px]!
                font-semibold!
                backdrop-blur-sm!
                ${
                  isPublished
                    ? "bg-white/90! text-green-700! ring-1! ring-gray-200!"
                    : product.status === "draft"
                      ? "bg-white/90! text-gray-600! ring-1! ring-gray-200!"
                      : "bg-white/90! text-gray-500! ring-1! ring-gray-200!"
                }
              `}
            >
              {product.status}
            </span>
          </div>

          {/* Out of stock */}

          {isOutOfStock && (
            <div className="absolute! bottom-3! left-3!">
              <span className="inline-flex! items-center! rounded-full! bg-red-50! px-2! py-1! text-[9px]! font-semibold! text-red-600! ring-1! ring-red-100!">
                Out of stock
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="flex! min-w-0! flex-1! flex-col! p-3.5! sm:p-4!">
        {/* Category / type */}

        <div className="flex! min-w-0! items-center! gap-1.5!">
          <span className="truncate! text-[9px]! font-medium! uppercase! tracking-wide! text-gray-400!">
            {product.category || "Uncategorized"}
          </span>

          <span className="text-gray-300!">•</span>

          <span className="shrink-0! text-[9px]! font-medium! text-gray-400!">
            {product.product_type}
          </span>
        </div>

        {/* Name */}

        <Link
          to={`/dashboard/marketplace/${product.id}`}
          className="mt-1.5! min-w-0!"
        >
          <h3 className="line-clamp-2! min-w-0! text-xs! font-semibold! leading-5! text-gray-900! transition-colors! duration-150! group-hover:text-blue-600! sm:text-[13px]!">
            {product.name}
          </h3>
        </Link>

        {/* Description */}

        {product.description && (
          <p className="mt-1! line-clamp-2! text-[9px]! leading-4! text-gray-500! sm:text-[10px]!">
            {product.description}
          </p>
        )}

        {/* Price */}

        <div className="mt-3! flex! items-end! justify-between! gap-3!">
          <div className="min-w-0!">
            <p className="text-base! font-semibold! tracking-tight! text-gray-900! sm:text-lg!">
              {formattedPrice}
              <span className="ml-1! text-[9px]! font-medium! text-gray-400! sm:text-[10px]!">
                {product.currency}
              </span>
            </p>
          </div>

          {product.product_type ===
            "physical" &&
            product.track_inventory && (
              <div className="flex! shrink-0! items-center! gap-1! text-[9px]! font-medium! text-gray-500!">
                <ShoppingBag
                  size={11}
                  strokeWidth={1.8}
                />

                {product.stock_quantity ?? 0}
              </div>
            )}
        </div>

        {/* Footer */}

        <div className="mt-3! flex! items-center! justify-between! border-t! border-gray-100! pt-3!">
          <div className="flex! min-w-0! items-center! gap-2.5! text-[9px]! font-medium! text-gray-400!">
            <span className="inline-flex! min-w-0! items-center! gap-1!">
              <ShoppingBag
                size={11}
                strokeWidth={1.8}
              />

              {product.sales_count ?? 0}
              <span className="hidden! sm:inline!">
                sales
              </span>
            </span>

            <span className="inline-flex! items-center! gap-1!">
              <Eye
                size={11}
                strokeWidth={1.8}
              />

              {product.view_count ?? 0}
            </span>
          </div>

          <Link
            to={`/dashboard/marketplace/${product.id}`}
            className="
              inline-flex!
              h-8!
              shrink-0!
              items-center!
              justify-center!
              gap-1!
              rounded-lg!
              border!
              border-gray-200!
              bg-white!
              px-2.5!
              text-[9px]!
              font-semibold!
              text-gray-600!
              transition-all!
              duration-150!
              hover:border-blue-200!
              hover:bg-blue-50!
              hover:text-blue-600!
              active:scale-[0.99]!
            "
          >
            <Eye
              size={11}
              strokeWidth={1.9}
            />

            View
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;