import SummaryCards from '../components/SummaryCards'
import BalanceChart from '../components/BalanceChart'
import SpendingChart from '../components/SpendingChart'

function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Dashboard</h2>
      <SummaryCards />
      <BalanceChart />
      <SpendingChart />
    </div>
  )
}

export default Dashboard