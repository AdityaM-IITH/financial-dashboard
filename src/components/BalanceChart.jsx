import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useApp } from '../context/AppContext'

const monthNames = {
  '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr',
  '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Aug',
  '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec'
}

function BalanceChart() {
  const { transactions } = useApp()

  const monthlyData = {}
  transactions.forEach(t => {
    const month = t.date.slice(5, 7)
    if (!monthlyData[month]) monthlyData[month] = 0
    monthlyData[month] += t.type === 'income' ? t.amount : -t.amount
  })

  const months = Object.keys(monthlyData).sort()
  let running = 0
  const chartData = months.map(month => {
    running += monthlyData[month]
    return { date: monthNames[month], balance: running }
  })

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Balance Trend</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="date" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
          <Line type="monotone" dataKey="balance" stroke="#2563eb" strokeWidth={2} dot={true} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BalanceChart