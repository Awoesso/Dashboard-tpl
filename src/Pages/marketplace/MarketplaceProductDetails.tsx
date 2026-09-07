import {
  ArrowLeft,
  BarChart3,
  CalendarDays,
  Eye,
  Image as ImageIcon,
  Pencil,
  ShoppingBag,
  Tag,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  getMarketplaceProductById,
  type MarketplaceProduct,
} from "./marketplace.service";

const ProductDetailsSkeleton = () => {
  return (
    <div className="min-w-0!">
      {/* Top navigation */}
      <div className="mb-5! flex! items-center! justify-between! gap-3!">
        <div className="skeleton! h-3! w-24!" />
        <div className="skeleton! h-9! w-28! rounded-lg!" />
      </div>

      <div className="grid! min-w-0! gap-6! lg:grid-cols-[minmax(0,1.65fr)_minmax(280px,0.8fr)]">
        {/* Main */}
        <div className="min-w-0!">
          <div className="skeleton! aspect-[16/10]! w-full! rounded-2xl!" />

          <div className="mt-5!">
            <div className="skeleton! h-7! w-2/5!" />
            <div className="skeleton! mt-3! h-3! w-24!" />
          </div>

          <div className="mt-8! border-t! border-gray-100! pt-6!">
            <div className="skeleton! h-4! w-24!" />
            <div className="skeleton! mt-4! h-3! w-full!" />
            <div className="skeleton! mt-2! h-3! w-5/6!" />
          </div>
        </div>

        {/* Sidebar */}
        <div className="min-w-0! space-y-4!">
          <div className="rounded-2xl! border! border-gray-200! bg-white! p-5!">
            <div className="skeleton! h-3! w-20!" />
            <div className="skeleton! mt-4! h-8! w-24!" />
          </div>

          <div className="rounded-2xl! border! border-gray-200! bg-white! p-5!">
            <div className="skeleton! h-3! w-28!" />

            <div className="mt-5! space-y-4!">
              <div className="flex! items-center! justify-between!">
                <div className="skeleton! h-2.5! w-16!" />
                <div className="skeleton! h-2.5! w-20!" />
              </div>

              <div className="flex! items-center! justify-between!">
                <div className="skeleton! h-2.5! w-16!" />
                <div className="skeleton! h-2.5! w-12!" />
              </div>

              <div className="flex! items-center! justify-between!">
                <div className="skeleton! h-2.5! w-16!" />
                <div className="skeleton! h-2.5! w-14!" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const formatPrice = (
  price: number,
  currency: string,
) => {
  return `${new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Number(price) || 0)} ${currency}`;
};

const formatDate = (date?: string) => {
  if (!date) return "—";

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

const MarketplaceProductDetails = () => {
  const { productId } = useParams<{
    productId: string;
  }>();

  const [product, setProduct] =
    useState<MarketplaceProduct | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadProduct = async () => {
      if (!productId) {
        setError("Product not found.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const data =
          await getMarketplaceProductById(productId);

        if (isMounted) {
          setProduct(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load this product.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [productId]);

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (error || !product) {
    return (
      <div className="flex! min-h-[420px]! items-center! justify-center!">
        <div className="w-full! max-w-md! rounded-2xl! border! border-gray-200! bg-white! p-6! text-center!">
          <div className="mx-auto! flex! h-10! w-10! items-center! justify-center! rounded-xl! bg-gray-50!">
            <Tag className="h-4! w-4! text-gray-500!" />
          </div>

          <h2 className="mt-4! text-sm! font-semibold! text-gray-900!">
            Product unavailable
          </h2>

          <p className="mt-2! text-xs! leading-5! text-gray-500!">
            {error ||
              "This product could not be found."}
          </p>

          <Link
            to="/dashboard/marketplace"
            className="
              mt-5!
              inline-flex!
              items-center!
              gap-2!
              rounded-lg!
              border!
              border-gray-200!
              bg-white!
              px-3!
              py-2!
              text-xs!
              font-medium!
              text-gray-700!
              transition!
              duration-150!
              hover:border-gray-300!
              hover:bg-gray-50!
            "
          >
            <ArrowLeft className="h-3.5! w-3.5!" />
            Back to marketplace
          </Link>
        </div>
      </div>
    );
  }

  const statusConfig = {
    published: {
      label: "Published",
      dot: "bg-green-500!",
    },
    draft: {
      label: "Draft",
      dot: "bg-gray-400!",
    },
    archived: {
      label: "Archived",
      dot: "bg-gray-300!",
    },
  } as const;

  const status =
    statusConfig[product.status];

  return (
    <div className="min-w-0! pb-8!">
      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="mb-6! flex! min-w-0! items-center! justify-between! gap-4!">
        <Link
          to="/dashboard/marketplace"
          className="
            inline-flex!
            min-w-0!
            items-center!
            gap-2!
            text-xs!
            font-medium!
            text-gray-500!
            transition!
            duration-150!
            hover:text-gray-900!
          "
        >
          <ArrowLeft className="h-3.5! w-3.5! shrink-0!" />
          <span className="truncate!">
            Marketplace
          </span>
        </Link>

        <Link
          to={`/dashboard/marketplace/${product.id}/edit`}
          className="
            inline-flex!
            shrink-0!
            items-center!
            gap-2!
            rounded-lg!
            bg-blue-600!
            px-3.5!
            py-2!
            text-xs!
            font-semibold!
            text-white!
            shadow-sm!
            transition!
            duration-150!
            hover:bg-blue-700!
          "
        >
          <Pencil className="h-3.5! w-3.5!" />
          Edit product
        </Link>
      </div>

      {/* =================================================
          CONTENT
      ================================================= */}

      <div
        className="
          grid!
          min-w-0!
          gap-6!
          lg:grid-cols-[minmax(0,1.65fr)_minmax(280px,0.8fr)]!
        "
      >
        {/* =================================================
            MAIN COLUMN
        ================================================= */}

        <main className="min-w-0!">
          {/* HERO IMAGE */}

          <div
            className="
              overflow-hidden!
              rounded-2xl!
              border!
              border-gray-200!
              bg-[#fafafa]!
            "
          >
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="
                  block!
                  aspect-[16/10]!
                  w-full!
                  object-cover!
                "
              />
            ) : (
              <div
                className="
                  flex!
                  aspect-[16/10]!
                  w-full!
                  items-center!
                  justify-center!
                  bg-gray-50!
                "
              >
                <ImageIcon className="h-6! w-6! text-gray-300!" />
              </div>
            )}
          </div>

          {/* PRODUCT HEADING */}

          <div className="mt-6! min-w-0!">
            <div className="flex! min-w-0! flex-wrap! items-center! gap-2.5!">
              {product.category && (
                <span className="text-[11px]! font-medium! text-blue-600!">
                  {product.category}
                </span>
              )}

              {product.category && (
                <span className="text-gray-300!">
                  ·
                </span>
              )}

              <span className="inline-flex! items-center! gap-1.5! text-[11px]! text-gray-500!">
                <span
                  className={`h-1.5! w-1.5! rounded-full! ${status.dot}`}
                />
                {status.label}
              </span>
            </div>

            <div
              className="
                mt-2!
                flex!
                min-w-0!
                flex-col!
                gap-3!
                sm:flex-row!
                sm:items-end!
                sm:justify-between!
              "
            >
              <div className="min-w-0!">
                <h1
                  className="
                    truncate!
                    text-[24px]!
                    font-semibold!
                    tracking-tight!
                    text-gray-950!
                    sm:text-[28px]!
                  "
                >
                  {product.name}
                </h1>

                <p className="mt-1.5! text-xs! text-gray-500!">
                  {product.slug}
                </p>
              </div>

              <div className="shrink-0!">
                <div className="mt-1 text-[20px]! font-semibold! tracking-tight text-gray-900 sm:text-[22px]!">
                  {formatPrice(
                    product.price,
                    product.currency,
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}

          <section className="mt-8! border-t! border-gray-100! pt-6!">
            <h2 className="text-sm! font-semibold! text-gray-900!">
              Description
            </h2>

            {product.description ? (
              <p className="mt-3! max-w-3xl! whitespace-pre-line! text-[13px]! leading-6! text-gray-600!">
                {product.description}
              </p>
            ) : (
              <p className="mt-3! text-xs! text-gray-400!">
                No description has been added.
              </p>
            )}
          </section>

          {/* PERFORMANCE */}

          <section className="mt-8! border-t! border-gray-100! pt-6!">
            <div className="flex! items-center! justify-between!">
              <div>
                <h2 className="text-sm! font-semibold! text-gray-900!">
                  Performance
                </h2>

                <p className="mt-1! text-[11px]! text-gray-500!">
                  Product activity
                </p>
              </div>

              <BarChart3 className="h-4! w-4! text-gray-400!" />
            </div>

            <div className="mt-4! grid! grid-cols-2! gap-3!">
              <div className="rounded-xl! border! border-gray-200! bg-[#fafafa]! p-4!">
                <div className="flex! items-center! gap-2! text-[11px]! text-gray-500!">
                  <ShoppingBag className="h-3.5! w-3.5!" />
                  Sales
                </div>

                <p className="mt-2! text-xl! font-semibold! tracking-tight! text-gray-950!">
                  {product.sales_count}
                </p>
              </div>

              <div className="rounded-xl! border! border-gray-200! bg-[#fafafa]! p-4!">
                <div className="flex! items-center! gap-2! text-[11px]! text-gray-500!">
                  <Eye className="h-3.5! w-3.5!" />
                  Views
                </div>

                <p className="mt-2! text-xl! font-semibold! tracking-tight! text-gray-950!">
                  {product.view_count}
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* =================================================
            SIDEBAR
        ================================================= */}

        <aside className="min-w-0! space-y-4!">
          {/* PRICE */}

          <section className="rounded-2xl! border! border-gray-200! bg-white! p-5!">
            <p className="text-[10px]! font-semibold! uppercase! tracking-[0.04em]! text-gray-400!">
              Current price
            </p>

            <p className="mt-2! text-2xl! font-semibold! tracking-tight! text-gray-950!">
              {formatPrice(
                product.price,
                product.currency,
              )}
            </p>
          </section>

          {/* PRODUCT INFORMATION */}

          <section className="rounded-2xl! border! border-gray-200! bg-white! p-5!">
            <div className="flex! items-center! gap-2!">
              <div className="flex! h-8! w-8! items-center! justify-center! rounded-lg! bg-gray-50!">
                <Tag className="h-3.5! w-3.5! text-gray-500!" />
              </div>

              <div>
                <h2 className="text-sm! font-semibold! text-gray-900!">
                  Product information
                </h2>

                <p className="mt-0.5! text-[10px]! text-gray-400!">
                  Basic details
                </p>
              </div>
            </div>

            <div className="mt-5! divide-y! divide-gray-100!">
              <div className="flex! items-center! justify-between! gap-4! py-3! first:pt-0!">
                <span className="text-xs! text-gray-500!">
                  Category
                </span>

                <span className="truncate! text-right! text-xs! font-medium! text-gray-900!">
                  {product.category || "—"}
                </span>
              </div>

              <div className="flex! items-center! justify-between! gap-4! py-3!">
                <span className="text-xs! text-gray-500!">
                  Status
                </span>

                <span className="inline-flex! items-center! gap-1.5! text-xs! font-medium! text-gray-900!">
                  <span
                    className={`h-1.5! w-1.5! rounded-full! ${status.dot}`}
                  />
                  {status.label}
                </span>
              </div>

              <div className="flex! items-center! justify-between! gap-4! py-3!">
                <span className="text-xs! text-gray-500!">
                  Currency
                </span>

                <span className="text-xs! font-medium! text-gray-900!">
                  {product.currency}
                </span>
              </div>

              <div className="flex! items-center! justify-between! gap-4! py-3! last:pb-0!">
                <span className="inline-flex! items-center! gap-1.5! text-xs! text-gray-500!">
                  <CalendarDays className="h-3! w-3!" />
                  Created
                </span>

                <span className="text-right! text-xs! font-medium! text-gray-900!">
                  {formatDate(
                    product.created_at,
                  )}
                </span>
              </div>
            </div>
          </section>

          {/* IMAGE */}

          {product.image_url && (
            <section className="rounded-2xl! border! border-gray-200! bg-white! p-5!">
              <div className="flex! items-center! justify-between!">
                <div>
                  <h2 className="text-sm! font-semibold! text-gray-900!">
                    Media
                  </h2>

                  <p className="mt-0.5! text-[10px]! text-gray-400!">
                    Product image
                  </p>
                </div>

                <ImageIcon className="h-4! w-4! text-gray-400!" />
              </div>

              <div className="mt-4! overflow-hidden! rounded-xl! border! border-gray-100! bg-gray-50!">
                <img
                  src={product.image_url}
                  alt=""
                  className="aspect-[4/3]! w-full! object-cover!"
                />
              </div>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
};

export default MarketplaceProductDetails;