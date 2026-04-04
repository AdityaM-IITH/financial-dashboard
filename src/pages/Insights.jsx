import { useApp } from '../context/AppContext'

function Insights() {
  const { transactions } = useApp()
  const categoryData = {}
  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-lg">No data available</p>
      </div>
    )
  }
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
  const highestCategory = chartData.reduce((max, item) =>
    item.value > max.value ? item : max, chartData[0])
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
  const monthNames = {
    '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr',
    '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Aug',
    '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec'
  }
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

  const cardClass = "bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-100 dark:border-gray-700"
  const labelClass = "text-sm text-gray-500 dark:text-gray-400"
  const valueClass = "text-2xl font-bold text-gray-800 dark:text-white mt-1 capitalize"

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </div>
    </div>
  )
}

export default Insights