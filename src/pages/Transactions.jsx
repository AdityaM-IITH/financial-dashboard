import { useState } from 'react'
import { useApp } from '../context/AppContext'

function Transactions() {
  const { transactions, setTransactions, role } = useApp()
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [sortOrder, setSortOrder] = useState('newest')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    date: '',
    name: '',
    category: '',
    type: 'income',
    amount: 0,
  })
  const filteredTransactions = transactions
    .filter(t => {
      const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase())
      const matchesType = filterType === 'all' || t.type === filterType
      return matchesSearch && matchesType
    })
    .sort((a, b) => {
      if (sortOrder === 'newest') return new Date(b.date) - new Date(a.date)
      if (sortOrder === 'oldest') return new Date(a.date) - new Date(b.date)
      if (sortOrder === 'highest') return b.amount - a.amount
      if (sortOrder === 'lowest') return a.amount - b.amount
    })
  const handleAddTransaction = () => {
    if (!form.date || !form.name || !form.category || form.amount <= 0) return
    const newTransaction = {
      id: Date.now().toString(),
      date: form.date,
      name: form.name,
      type: form.type,
      category: form.category,
      amount: form.amount,
    }
    setTransactions([...transactions,newTransaction])
    setForm({
      date: '',
      name: '',
      category: '',
      type: 'income',
      amount: 0,
    })
    setShowForm(false)
}
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Transactions</h2>
      {role === 'admin' && (
  <div className="mb-4">
    <button
      onClick={() => setShowForm(!showForm)}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
    >
      {showForm ? 'Cancel' : '+ Add Transaction'}
    </button>

    {showForm && (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mt-3 grid grid-cols-2 gap-4">
        <input
          type="date"
          value={form.date}
          onChange={e => setForm({...form, date: e.target.value})}
          className="border dark:border-gray-700 rounded-lg px-3 py-2 text-sm"
        />
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({...form, name: e.target.value})}
          className="border dark:border-gray-700 rounded-lg px-3 py-2 text-sm"
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={e => setForm({...form, category: e.target.value})}
          className="border dark:border-gray-700 rounded-lg px-3 py-2 text-sm"
        />
        <select
          value={form.type}
          onChange={e => setForm({...form, type: e.target.value})}
          className="border dark:border-gray-700 rounded-lg px-3 py-2 text-sm"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={form.amount === 0 ? '' : form.amount}
          onChange={e => setForm({...form, amount: Number(e.target.value)})}
          className="border dark:border-gray-700 rounded-lg px-3 py-2 text-sm"
        />
        <button
          onClick={handleAddTransaction}
          className="bg-green-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-green-700"
        >
          Add
        </button>
      </div>
    )}
  </div>
)}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by name or category..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 border dark:border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
          className="border dark:border-gray-700 rounded-lg px-3 py-2 text-sm"
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value)}
          className="border dark:border-gray-700 rounded-lg px-3 py-2 text-sm"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highest">Highest Amount</option>
          <option value="lowest">Lowest Amount</option>
        </select>
      </div>
      {filteredTransactions.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">No transactions found</p>
          <p className="text-sm mt-1">Try adjusting your search or filter</p>
        </div>
      )}
      {filteredTransactions.length > 0 && (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Type</th>
              <th className="px-6 py-3 text-right">Amount</th>
              {role === 'admin' && <th className="px-6 py-3 text-right">Delete</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredTransactions.map(t => (
              <tr key={t.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 dark:text-gray-300">{t.date}</td>
                <td className="px-6 py-4 dark:text-gray-300">{t.name}</td>
                <td className="px-6 py-4 capitalize dark:text-gray-300">{t.category}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    t.type === 'income'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {t.type}
                  </span>
                </td>
                <td className={`px-6 py-4 text-right font-medium ${
                  t.type === 'income' ? 'text-green-600' : 'text-red-500'
                }`}>
                  {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString('en-IN')}
                </td>
                {role === 'admin' && (
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setTransactions(transactions.filter(t2 => t2.id !== t.id))}
                      className="text-red-500 hover:bg-red-500 hover:text-white border border-red-500 dark:border-red-400 rounded px-2 py-1 text-xs font-medium"
                    >
                      ✕
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
    </div>
  )
}

export default Transactions