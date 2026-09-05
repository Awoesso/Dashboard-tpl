import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const MarketplaceHeader = () => {
  return (
    <header className="w-full! min-w-0!">
      <div className="flex! min-w-0! flex-col! gap-4! sm:flex-row! sm:items-end! sm:justify-between!">
        {/* =================================================
            TITLE
        ================================================= */}

        <div className="min-w-0!">
          <h1 className="font-heading! text-lg! font-semibold! tracking-tight! text-gray-900! sm:text-xl!">
            Marketplace
          </h1>

          <p className="mt-1! max-w-xl! text-[10px]! leading-5! text-gray-500! sm:text-[11px]!">
            Browse, manage and discover all products
            available in your store.
          </p>
        </div>

        {/* =================================================
            ACTION
        ================================================= */}

        <Link
          to="/dashboard/products/new"
          className="
            inline-flex!
            h-10!
            w-full!
            shrink-0!
            items-center!
            justify-center!
            gap-1.5!
            rounded-lg!
            bg-blue-600!
            px-3.5!
            text-[10px]!
            font-semibold!
            text-white!
            transition-all!
            duration-150!
            hover:bg-blue-700!
            active:scale-[0.99]!
            sm:w-auto!
            sm:text-[11px]!
          "
        >
          <Plus
            size={14}
            strokeWidth={2}
          />

          Add product
        </Link>
      </div>
    </header>
  );
};

export default MarketplaceHeader;