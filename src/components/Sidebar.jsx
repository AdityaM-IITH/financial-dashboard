import { useApp } from '../context/AppContext'

function Sidebar({activePage, setActivePage}) {
  const {role, setRole, theme, setTheme } = useApp()
  const links = [
    {id: 'dashboard',label:'Dashboard'},
    {id:'transactions', label:'Transactions'},
    {id:'insights',label:'Insights'},
  ]
  return (
    <div className="w-full md:w-64 md:h-screen bg-white dark:bg-gray-800 shadow-md flex flex-row md:flex-col justify-start md:justify-between items-center md:items-stretch p-4 md:p-6 gap-4">
      <div className="flex flex-row md:flex-col items-center md:items-stretch gap-2 w-full">
        <h1 className="text-xl font-bold text-blue-500 md:mb-8 mr-4 md:mr-0">FinTrack</h1>
        <nav className="flex flex-row md:flex-col gap-2">
          {links.map(link => (
            <button
              key={link.id}
              onClick={() => setActivePage(link.id)}
              className={`text-left px-3 py-2 rounded-lg font-medium transition-colors text-sm ${
                activePage === link.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="flex md:hidden items-center gap-2 ml-auto">
        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          className="border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-2 py-1 text-xs"
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-2 py-1 text-xs"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
      <div className="hidden md:flex flex-col gap-2">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm mb-3"
        >
          {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
        <label className="text-sm text-gray-500 dark:text-gray-400 mb-1 block">Role</label>
        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm"
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>
      </div>
    </div>
  )
}

export default Sidebar