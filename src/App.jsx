import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Insights from './pages/Insights'
import { useApp } from './context/AppContext'

function App() {
  const { theme } = useApp()
  useEffect(() => {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}, [theme])
  
  const [activePage, setActivePage] = useState('dashboard')
  return (
  <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900">
    <Sidebar activePage={activePage} setActivePage={setActivePage} />
    <main className="flex-1 overflow-y-auto p-4 md:p-6">
      {activePage === 'dashboard' && <Dashboard />}
      {activePage === 'transactions' && <Transactions />}
      {activePage === 'insights' && <Insights />}
    </main>
  </div>
)
  
}

export default App