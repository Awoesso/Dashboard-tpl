import StatCard from "./StatCard"

const GlobalStatCard = () => {
  return (
     <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 ">
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

  )
}

export default GlobalStatCard