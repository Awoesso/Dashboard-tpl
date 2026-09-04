import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

import type { ProductStatus } from "./ProductsNew";

interface Props {
  status?: ProductStatus;
  loading?: boolean;
}

const ProductHeader = ({
  status = "draft",
  loading = false,
}: Props) => {
  /* =========================================================
     SKELETON
  ========================================================= */

  if (loading) {
    return (
      <header className="mb-4! animate-pulse! sm:mb-5!">
        <div className="skeleton h-3! w-20! rounded-md!" />

        <div className="mt-2! flex! items-start! justify-between! gap-3!">
          <div className="min-w-0! flex-1!">
            <div className="skeleton h-6! w-40! rounded-md! sm:h-7! sm:w-48!" />

            <div className="skeleton mt-2! h-2.5! w-64! max-w-full! rounded-md! sm:h-3! sm:w-80!" />
          </div>

          <div className="skeleton h-6! w-16! shrink-0! rounded-full!" />
        </div>
      </header>
    );
  }

  const isPublished = status === "published";

  return (
    <header className="mb-4! sm:mb-5!">
      {/* =====================================================
          BREADCRUMB
      ===================================================== */}

      <Link
        to="/dashboard/products"
        className="
          inline-flex!
          items-center!
          gap-1!
          text-[10px]!
          font-medium!
          text-gray-400!
          transition-colors!
          duration-150!
          hover:text-gray-700!
        "
      >
        <ChevronLeft
          size={13}
          strokeWidth={1.8}
        />

        Products
      </Link>

      {/* =====================================================
          TITLE AREA
      ===================================================== */}

      <div className="mt-2! flex! min-w-0! items-start! justify-between! gap-3!">
        <div className="min-w-0! flex-1!">
          <h1 className="font-heading! text-[20px]! font-semibold! leading-tight! tracking-tight! text-gray-900! sm:text-[22px]!">
            Add product
          </h1>

          <p className="mt-1! max-w-xl! text-[10px]! font-medium! leading-relaxed! text-gray-500! sm:text-[11px]!">
            Create and configure a new product
            for your store.
          </p>
        </div>

        {/* =================================================
            STATUS
        ================================================= */}

        <span
          className={`
            shrink-0!
            rounded-full!
            border!
            px-2.5!
            py-1!
            text-[9px]!
            font-semibold!
            transition-colors!
            duration-150!
            ${
              isPublished
                ? "border-blue-200! bg-blue-50! text-blue-600!"
                : "border-gray-200! bg-gray-50! text-gray-600!"
            }
          `}
        >
          {isPublished
            ? "Published"
            : "Draft"}
        </span>
      </div>
    </header>
  );
};

export default ProductHeader;