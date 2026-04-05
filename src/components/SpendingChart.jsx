import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useApp } from '../context/AppContext'

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

function SpendingChart() {
  const { transactions } = useApp()
  const hasExpenses = transactions.some(t => t.type === 'expense')
  
  if (!hasExpenses) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex items-center justify-center h-[320px] text-gray-500">
        No expense data to display
      </div>
    )
  }
  const categoryData = {}
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      if (!categoryData[t.category]) categoryData[t.category] = 0
      categoryData[t.category] += t.amount
    })

  const chartData = Object.keys(categoryData).map(key => ({
    name: key,
    value: categoryData[key]
  }))

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Spending by Category</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
            {chartData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SpendingChart