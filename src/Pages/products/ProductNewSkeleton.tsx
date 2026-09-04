const ProductNewSkeleton = () => {
  return (
    <div className="min-h-screen! w-full! bg-[#fafafa]! px-3! py-4! sm:px-4! sm:py-5! lg:px-6! lg:py-6!">
      <div className="animate-pulse!">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <section>
          <div className="skeleton h-3! w-20! rounded-md!" />

          <div className="skeleton mt-2! h-6! w-40! rounded-md! sm:h-7! sm:w-48!" />

          <div className="skeleton mt-2! h-3! w-64! max-w-full! rounded-md! sm:w-80!" />
        </section>

        {/* =====================================================
            MAIN GRID
        ===================================================== */}

        <div className="mt-4! grid! min-w-0! grid-cols-1! gap-4! sm:mt-5! lg:grid-cols-[minmax(0,1.8fr)_minmax(280px,1fr)]!">
          {/* ===================================================
              LEFT COLUMN
          =================================================== */}

          <div className="grid! min-w-0! gap-4!">
            {/* PRODUCT DETAILS */}

            <SkeletonCard>
              <SkeletonHeader />

              <div className="grid! grid-cols-1! gap-3! sm:grid-cols-2!">
                <div className="skeleton h-16! rounded-xl!" />
                <div className="skeleton h-16! rounded-xl!" />
              </div>

              <div className="grid! grid-cols-1! gap-3! sm:grid-cols-2!">
                <SkeletonField />
                <SkeletonField />
              </div>

              <SkeletonField />

              <div>
                <div className="skeleton mb-2! h-3! w-20! rounded-md!" />
                <div className="skeleton h-24! w-full! rounded-xl!" />
              </div>
            </SkeletonCard>

            {/* PRICING */}

            <SkeletonCard>
              <SkeletonHeader />

              <div className="grid! grid-cols-1! gap-3! sm:grid-cols-2!">
                <SkeletonField />
                <SkeletonField />
              </div>
            </SkeletonCard>

            {/* INVENTORY */}

            <SkeletonCard>
              <SkeletonHeader />

              <div className="skeleton h-14! w-full! rounded-xl!" />

              <div className="grid! grid-cols-1! gap-3! sm:grid-cols-2!">
                <SkeletonField />
                <SkeletonField />
              </div>
            </SkeletonCard>

            {/* SHIPPING */}

            <SkeletonCard>
              <SkeletonHeader />

              <SkeletonField />

              <div className="grid! grid-cols-1! gap-3! sm:grid-cols-3!">
                <SkeletonField />
                <SkeletonField />
                <SkeletonField />
              </div>
            </SkeletonCard>

            {/* OPTIONS */}

            <SkeletonCard>
              <SkeletonHeader />

              <SkeletonField />
              <SkeletonField />

              <div className="space-y-2!">
                <div className="skeleton h-10! rounded-xl!" />
                <div className="skeleton h-10! rounded-xl!" />
              </div>
            </SkeletonCard>

            {/* IMAGES */}

            <SkeletonCard>
              <div className="flex! items-center! justify-between! gap-3!">
                <div>
                  <div className="skeleton h-4! w-20! rounded-md!" />

                  <div className="skeleton mt-2! h-2.5! w-44! rounded-md!" />
                </div>

                <div className="skeleton h-3! w-8! rounded-md!" />
              </div>

              <div className="grid! grid-cols-2! gap-3! sm:grid-cols-3! lg:grid-cols-4!">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="skeleton aspect-square! rounded-xl!"
                  />
                ))}
              </div>
            </SkeletonCard>
          </div>

          {/* ===================================================
              RIGHT COLUMN
          =================================================== */}

          <div className="grid! min-w-0! gap-4!">
            {/* PREVIEW */}

            <SkeletonCard className="lg:sticky! lg:top-6!">
              <SkeletonHeader />

              <div className="skeleton aspect-[4/3]! w-full! rounded-xl!" />

              <div className="space-y-2!">
                <div className="skeleton h-2.5! w-16! rounded-md!" />

                <div className="skeleton h-4! w-3/4! rounded-md!" />

                <div className="skeleton h-3! w-24! rounded-md!" />

                <div className="mt-3! flex! items-center! gap-2!">
                  <div className="skeleton h-5! w-24! rounded-md!" />

                  <div className="skeleton h-3! w-16! rounded-md!" />
                </div>

                <div className="skeleton mt-3! h-9! w-full! rounded-xl!" />
              </div>
            </SkeletonCard>

            {/* PUBLICATION */}

            <SkeletonCard>
              <SkeletonHeader />

              <div className="space-y-2!">
                <div className="skeleton h-14! w-full! rounded-xl!" />

                <div className="skeleton h-14! w-full! rounded-xl!" />
              </div>
            </SkeletonCard>

            {/* ACTIONS */}

            <SkeletonCard>
              <div className="space-y-2!">
                <div className="skeleton h-10! w-full! rounded-xl!" />

                <div className="skeleton h-10! w-full! rounded-xl!" />
              </div>
            </SkeletonCard>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   SHARED SKELETON PARTS
============================================================ */

interface SkeletonCardProps {
  children: React.ReactNode;
  className?: string;
}

const SkeletonCard = ({
  children,
  className = "",
}: SkeletonCardProps) => {
  return (
    <section
      className={`
        min-w-0!
        rounded-2xl!
        border!
        border-gray-200!
        bg-white!
        p-3!
        sm:p-4!
        ${className}
      `}
    >
      <div className="space-y-4!">
        {children}
      </div>
    </section>
  );
};

const SkeletonHeader = () => {
  return (
    <div className="flex! items-center! justify-between! gap-3!">
      <div className="min-w-0! flex-1!">
        <div className="skeleton h-3.5! w-32! rounded-md!" />

        <div className="skeleton mt-1.5! h-2.5! w-48! max-w-full! rounded-md!" />
      </div>

      <div className="skeleton h-7! w-7! shrink-0! rounded-full!" />
    </div>
  );
};

const SkeletonField = () => {
  return (
    <div className="space-y-2!">
      <div className="skeleton h-2.5! w-20! rounded-md!" />

      <div className="skeleton h-10! w-full! rounded-xl!" />
    </div>
  );
};

export default ProductNewSkeleton;