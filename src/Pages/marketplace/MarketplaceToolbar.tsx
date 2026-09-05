import {
  ArrowDownUp,
  Filter,
  Search,
} from "lucide-react";
import { useState } from "react";

type MarketplaceToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onFiltersClick?: () => void;
};

const MarketplaceToolbar = ({
  search,
  onSearchChange,
  onFiltersClick,
}: MarketplaceToolbarProps) => {
  const [sort, setSort] = useState("newest");

  return (
    <div className="flex! min-w-0! flex-col! gap-3! sm:flex-row! sm:items-center! sm:justify-between!">
      {/* Search */}

      <div className="relative! min-w-0! flex-1!">
        <Search
          size={14}
          strokeWidth={1.9}
          className="pointer-events-none! absolute! left-3! top-1/2! -translate-y-1/2! text-gray-400!"
        />

        <input
          type="search"
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Search products..."
          className="
            h-10!
            w-full!
            min-w-0!
            rounded-lg!
            border!
            border-gray-200!
            bg-[#fafafa]!
            pl-9!
            pr-3!
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
          "
        />
      </div>

      {/* Actions */}

      <div className="flex! min-w-0! items-center! gap-2!">
        {/* Mobile filters */}

        <button
          type="button"
          onClick={onFiltersClick}
          className="
            inline-flex!
            h-10!
            shrink-0!
            items-center!
            justify-center!
            gap-1.5!
            rounded-lg!
            border!
            border-gray-200!
            bg-white!
            px-3!
            text-[10px]!
            font-semibold!
            text-gray-600!
            transition-all!
            duration-150!
            hover:border-gray-300!
            hover:bg-gray-50!
            hover:text-gray-900!
            active:scale-[0.99]!
            sm:hidden!
          "
        >
          <Filter
            size={13}
            strokeWidth={1.9}
          />

          Filters
        </button>

        {/* Sort */}

        <div className="relative! min-w-0! shrink-0!">
          <ArrowDownUp
            size={13}
            strokeWidth={1.9}
            className="pointer-events-none! absolute! left-3! top-1/2! -translate-y-1/2! text-gray-400!"
          />

          <select
            value={sort}
            onChange={(event) =>
              setSort(event.target.value)
            }
            className="
              h-10!
              appearance-none!
              rounded-lg!
              border!
              border-gray-200!
              bg-white!
              pl-8!
              pr-7!
              text-[10px]!
              font-semibold!
              text-gray-600!
              outline-none!
              transition-all!
              duration-150!
              focus:border-blue-500!
              focus:ring-2!
              focus:ring-blue-500/10!
            "
          >
            <option value="newest">
              Newest
            </option>

            <option value="oldest">
              Oldest
            </option>

            <option value="price-low">
              Price: Low
            </option>

            <option value="price-high">
              Price: High
            </option>

            <option value="best-selling">
              Best selling
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceToolbar;