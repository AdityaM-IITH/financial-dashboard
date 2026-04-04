import { useApp } from '../context/AppContext'

function SummaryCards() {
  const { transactions } = useApp()

  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = income - expenses

  const cards = [
    { label: 'Total Balance', value: balance, color: 'text-blue-600' },
    { label: 'Total Income', value: income, color: 'text-green-600' },
    { label: 'Total Expenses', value: expenses, color: 'text-red-500' },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {cards.map(card => (
        <div key={card.label} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">{card.label}</p>
          <p className={`text-2xl font-bold mt-1 ${card.color}`}>
            ₹{card.value.toLocaleString('en-IN')}
          </p>
        </div>
      ))}
    </div>
  )
}

export default SummaryCards