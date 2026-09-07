const MarketplaceSkeleton = () => {
  return (
    <section className="w-full! min-w-0!">
      {/* =================================================
          TOOLBAR
      ================================================= */}

      <div className="mb-5! flex! flex-col! gap-3! sm:flex-row! sm:items-center! sm:justify-between!">
        <div className="skeleton h-10! w-full! rounded-lg! sm:max-w-[520px]!" />

        <div className="skeleton h-10! w-28! rounded-lg!" />
      </div>

      {/* =================================================
          LIST
      ================================================= */}

      <div className="min-w-0! overflow-hidden! rounded-2xl! border! border-gray-200! bg-white!">
        {/* Header */}

        <div className="hidden! h-10! items-center! gap-4! border-b! border-gray-200! bg-[#fafafa]! px-4! sm:flex!">
          <div className="skeleton h-2.5! w-16! flex-1! rounded-md!" />
          <div className="skeleton h-2.5! w-10! rounded-md!" />
          <div className="skeleton h-2.5! w-10! rounded-md!" />
          <div className="skeleton h-2.5! w-10! rounded-md!" />
          <div className="skeleton h-2.5! w-12! rounded-md!" />
        </div>

        {/* Rows */}

        {Array.from({
          length: 7,
        }).map((_, index) => (
          <ProductRowSkeleton
            key={index}
          />
        ))}

        {/* Footer */}

        <div className="border-t! border-gray-100! px-4! py-3!">
          <div className="skeleton h-2.5! w-20! rounded-md!" />
        </div>
      </div>
    </section>
  );
};

const ProductRowSkeleton = () => {
  return (
    <div className="border-b! border-gray-100! px-3.5! py-3.5! last:border-b-0! sm:px-4!">
      <div className="flex! items-center! gap-3!">
        <div className="skeleton h-12! w-12! shrink-0! rounded-xl!" />

        <div className="min-w-0! flex-1! space-y-2!">
          <div className="skeleton h-3! w-40! max-w-[70%]! rounded-md!" />
          <div className="skeleton h-2.5! w-28! rounded-md!" />
        </div>

        <div className="hidden! w-32! sm:block!">
          <div className="skeleton h-3! w-20! rounded-md!" />
          <div className="skeleton mt-1.5! h-2.5! w-8! rounded-md!" />
        </div>

        <div className="hidden! w-20! lg:block!">
          <div className="skeleton h-3! w-8! rounded-md!" />
        </div>

        <div className="hidden! w-28! lg:block!">
          <div className="skeleton h-3! w-10! rounded-md!" />
        </div>

        <div className="hidden! w-28! sm:block!">
          <div className="skeleton h-2.5! w-14! rounded-md!" />
        </div>
      </div>
    </div>
  );
};

export default MarketplaceSkeleton;