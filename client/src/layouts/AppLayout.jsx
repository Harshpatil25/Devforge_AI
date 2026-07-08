import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Command, Moon, Sun, Menu, X, Search as SearchIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { Sidebar } from '../components/layout/Sidebar'
import { SearchBar } from '../components/layout/SearchBar'
import { CommandPalette } from '../components/layout/CommandPalette'
import { NotificationMenu } from '../components/layout/NotificationMenu'
import { ProfileMenu } from '../components/layout/ProfileMenu'
import { Breadcrumbs } from '../components/layout/Breadcrumbs'

export function AppLayout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const [theme, setTheme] = useState(() => localStorage.getItem('devforge-theme') || 'dark')
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('devforge-theme', theme)
  }, [theme])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setCommandPaletteOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <div className="app-shell">
      <Sidebar
        collapsed={collapsed}
        onCollapseToggle={() => setCollapsed((value) => !value)}
        onNavigate={() => setMobileOpen(false)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {mobileOpen && <div className="sidebar-backdrop" onClick={() => setMobileOpen(false)} />}

      <main className="app-main">
        <header className="topbar">
          <div className="topbar__left">
            <button type="button" className="topbar__mobile-toggle" onClick={() => setMobileOpen(true)} aria-label="Open navigation menu">
              <Menu size={18} />
            </button>
            <div className="topbar__title-group">
              <p className="topbar__eyebrow">Authenticated workspace</p>
              <h1>DevForge AI</h1>
            </div>
          </div>

          <div className="topbar__center">
            <label className="topbar__search">
              <SearchIcon size={16} />
              <input value={searchValue} onChange={(event) => setSearchValue(event.target.value)} placeholder="Search projects, bugs, notes..." aria-label="Search workspace" />
            </label>
          </div>

          <div className="topbar__actions">
            <button type="button" className="topbar__icon-button" onClick={() => setCommandPaletteOpen(true)} aria-label="Command palette">
              <Command size={18} />
            </button>
            <button type="button" className="topbar__icon-button" onClick={() => setTheme((value) => (value === 'dark' ? 'light' : 'dark'))} aria-label="Toggle theme">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <NotificationMenu />
            <ProfileMenu />
          </div>
        </header>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.24 }} className="page-shell">
          <div className="page-shell__header">
            <Breadcrumbs />
            <div className="page-shell__user">
              <span>{user?.email || 'Signed in'}</span>
              <button type="button" className="page-shell__user-action" onClick={() => navigate('/settings')}>
                Open settings
              </button>
            </div>
          </div>
          {children || <Outlet />}
        </motion.div>
      </main>

      <CommandPalette open={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />
    </div>
  )
}
