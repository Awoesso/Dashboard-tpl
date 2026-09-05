import MarketplaceHeader from "./MarketplaceHeader";

const Marketplace = () => {
  return (
    <main className="w-full! min-w-0! bg-[#fafafa]!">
      <div className="mx-auto! w-full! max-w-[1600px]! px-3! py-4! sm:px-4! sm:py-5! lg:px-5!">
        {/* ===================================================
            HEADER
        =================================================== */}

        <MarketplaceHeader />

        {/* ===================================================
            MARKETPLACE CONTENT
        =================================================== */}

        <section className="mt-4! min-w-0! sm:mt-5!">
          <div className="rounded-2xl! border! border-gray-200! bg-white!">
            {/* Temporary content area.
                Products grid, filters and states
                will be added next. */}
            <div className="flex! min-h-[280px]! items-center! justify-center! p-5! sm:min-h-[360px]!">
              <div className="max-w-sm! text-center!">
                <p className="text-xs! font-semibold! text-gray-900! sm:text-sm!">
                  Marketplace
                </p>

                <p className="mt-1.5! text-[10px]! leading-5! text-gray-500! sm:text-[11px]!">
                  Your products will appear here.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Marketplace;