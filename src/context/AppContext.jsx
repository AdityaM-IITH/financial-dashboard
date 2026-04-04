import { createContext, useContext, useState, useEffect } from 'react'
import { transactions as initialData } from "../data/transactions"

const AppContext = createContext()

export function AppProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
  const saved = localStorage.getItem('transactions')
  return saved ? JSON.parse(saved) : initialData
  })
  useEffect(() => {
  localStorage.setItem('transactions', JSON.stringify(transactions))
}, [transactions])
  const [role, setRole] = useState("viewer")
  const [theme, setTheme] = useState(() => {
  return localStorage.getItem('theme') || 'light'
})

useEffect(() => {
  localStorage.setItem('theme', theme)
}, [theme])
  return (
    <AppContext.Provider value={{
      transactions, setTransactions,
      role, setRole,
      theme, setTheme
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}