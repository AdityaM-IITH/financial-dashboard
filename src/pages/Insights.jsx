import { useApp } from '../context/AppContext'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const monthNames = {
  '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr',
  '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Aug',
  '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec'
}

function Insights() {
  const { transactions } = useApp()

  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-lg">No data available</p>
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

  const highestCategory =
  chartData.length > 0 ? chartData.reduce((max, item) =>
        item.value > max.value ? item : max,
        chartData[0]
      )
    : null;

  const expenseOnly = transactions.filter(t => t.type === 'expense')
  const highestExpense = expenseOnly.reduce((max, item) =>
    item.amount > max.amount ? item : max, expenseOnly[0])

  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const savingsRate = ((income - expenses) / income * 100).toFixed(1)

  const monthlyIncome = {}
  transactions
    .filter(t => t.type === 'income')
    .forEach(t => {
      const month = t.date.slice(5, 7)
      if (!monthlyIncome[month]) monthlyIncome[month] = 0
      monthlyIncome[month] += t.amount
    })

  const bestMonth = Object.keys(monthlyIncome).reduce((max, month) =>
    monthlyIncome[month] > monthlyIncome[max] ? month : max
  )

  const monthlyMap = {}
  transactions.forEach(t => {
    const month = t.date.slice(5, 7)
    if (!monthlyMap[month]) monthlyMap[month] = { income: 0, expenses: 0 }
    if (t.type === 'income') monthlyMap[month].income += t.amount
    else monthlyMap[month].expenses += t.amount
  })

  const sortedMonths = Object.keys(monthlyMap).sort()

  let momChange = null
  if (sortedMonths.length >= 2) {
    const prev = monthlyMap[sortedMonths[sortedMonths.length - 2]].expenses
    const curr = monthlyMap[sortedMonths[sortedMonths.length - 1]].expenses
    const pct = prev === 0 ? 100 : (((curr - prev) / prev) * 100).toFixed(1)
    momChange = {
      current: monthNames[sortedMonths[sortedMonths.length - 1]],
      previous: monthNames[sortedMonths[sortedMonths.length - 2]],
      pct: Number(pct),
      up: curr >= prev
    }
  }

  const monthlyChartData = sortedMonths.map(month => ({
    month: monthNames[month],
    Income: monthlyMap[month].income,
    Expenses: monthlyMap[month].expenses,
  }))

  const cardClass = "bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-100 dark:border-gray-700"
  const labelClass = "text-sm text-gray-500 dark:text-gray-400"
  const valueClass = "text-2xl font-bold text-gray-800 dark:text-white mt-1 capitalize"

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Insights</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className={cardClass}>
          <p className={labelClass}>Highest Spending Category</p>
          <p className={valueClass}>{highestCategory.name}</p>
          <p className="text-sm text-red-500 mt-1">₹{highestCategory.value.toLocaleString('en-IN')}</p>
        </div>
        <div className={cardClass}>
          <p className={labelClass}>Highest Expense</p>
          <p className={valueClass}>{highestExpense.name}</p>
          <p className="text-sm text-red-500 mt-1">₹{highestExpense.amount.toLocaleString('en-IN')}</p>
        </div>
        <div className={cardClass}>
          <p className={labelClass}>Savings Rate</p>
          <p className={valueClass}>{savingsRate}%</p>
        </div>
        <div className={cardClass}>
          <p className={labelClass}>Best Month</p>
          <p className={valueClass}>{monthNames[bestMonth]}</p>
          <p className="text-sm text-green-500 mt-1">₹{monthlyIncome[bestMonth].toLocaleString('en-IN')}</p>
        </div>
        {momChange && (
          <div className={`${cardClass} md:col-span-2`}>
            <p className={labelClass}>Month-over-Month Expenses</p>
            <p className={valueClass}>{momChange.current} vs {momChange.previous}</p>
            <p className={`text-sm mt-1 ${momChange.up ? 'text-red-500' : 'text-green-500'}`}>
              {momChange.up ? '▲' : '▼'} {Math.abs(momChange.pct)}% {momChange.up ? 'increase' : 'decrease'} in expenses
            </p>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Monthly Income vs Expenses</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlyChartData} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
            <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
            <Legend />
            <Bar dataKey="Income" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Insights