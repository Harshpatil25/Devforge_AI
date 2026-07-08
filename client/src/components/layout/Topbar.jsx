import { Command, Moon, Sun, Menu, Search as SearchIcon } from 'lucide-react'
import { SearchBar } from './SearchBar'
import { NotificationMenu } from './NotificationMenu'
import { ProfileMenu } from './ProfileMenu'

export function Topbar({ user, searchValue, onSearchChange, onToggleMobile, onOpenPalette, onToggleTheme, theme, onOpenSettings, navigate }) {
  return (
    <header className="topbar">
      <div className="topbar__left">
        <button type="button" className="topbar__mobile-toggle" onClick={onToggleMobile}>
          <Menu size={18} />
        </button>
        <div className="topbar__title-group">
          <p className="topbar__eyebrow">Authenticated workspace</p>
          <h1>DevForge AI</h1>
        </div>
      </div>

      <div className="topbar__center">
        <SearchBar value={searchValue} onChange={onSearchChange} placeholder="Search projects, bugs, notes..." />
      </div>

      <div className="topbar__actions">
        <button type="button" className="topbar__icon-button" onClick={onOpenPalette} aria-label="Command palette">
          <Command size={18} />
        </button>
        <button type="button" className="topbar__icon-button" onClick={onToggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <NotificationMenu />
        <ProfileMenu />
      </div>
    </header>
  )
}
