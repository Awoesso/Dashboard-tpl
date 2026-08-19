import StatCard from "./StatCard";

const Dashboard = () => {
  return (
    <div className="p-6 bg-[#fafafa]">

      {/* ================= HEADER ================= */}

      <section>
        <h1 className="font-heading text-xl font-semibold tracking-tight text-gray-900">
          Welcome Back Eli 👋
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Your academic work is now a digital work
        </p>
      </section>


      {/* ================= MILESTONE ================= */}

      

      {/* ================= CONTENT ================= */}

      <div className="mt-5 grid grid-cols-[1.8fr_1fr] gap-4">

        {/* Snapshot */}
        <section className="rounded-2xl border border-gray-200 bg-white p-4">

          {/* Header */}
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">

              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 text-white">
                <span className="text-[10px]">✦</span>
              </div>

              <span className="text-xs font-semibold text-gray-900">
                Your Creator Snapshot
              </span>

            </div>

            <button className="rounded-full border border-gray-200 px-3 py-1.5 text-xs text-gray-600 transition hover:bg-gray-50">
              Today⌄
            </button>

          </div>


          {/* Stats */}
          <div className="mt-4 grid grid-cols-3 gap-2">

            <StatCard
              title="Your Earnings"
              value={38937}
              change={23}
            />

            <StatCard
              title="Documents Uploaded"
              value={3}
              change={0}
            />

            <StatCard
              title="Downloads"
              value={43}
              change={9}
            />

          </div>

        </section>


        {/* Future chart */}
        <section className="min-h-[150px] rounded-2xl border border-gray-200 bg-white">
        </section>

      </div>

    </div>
  );
};

export default Dashboard;