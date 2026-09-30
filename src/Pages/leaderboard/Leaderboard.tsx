import LeaderboardHeader from "./LeaderboardHeader"
import LeaderboardStatcard from "./LeaderboardStatcard"

const Leaderboard = () => {
  return (
<section className="bg-[#fafafa] px-3 py-4 sm:px-4 sm:py-5 lg:px-6 lg:py-6 min-h-screen">
<LeaderboardHeader/>
<LeaderboardStatcard/>
</section>
  )
}

export default Leaderboard