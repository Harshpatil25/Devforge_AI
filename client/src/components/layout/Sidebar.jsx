import { PanelLeftClose, PanelLeftOpen, Sparkles, FolderKanban, Brain, Bug, BookOpenText, BarChart3, Settings, LayoutGrid, Bot } from 'lucide-react'
import { SidebarItem } from './SidebarItem'

const navItems = [
  { to: '/dashboard', label: 'Workspace', icon: LayoutGrid },
  { to: '/projects', label: 'Projects', icon: FolderKanban },
  { to: '/developer-memory', label: 'Developer Memory', icon: Brain },
  { to: '/bug-vault', label: 'Bug Vault', icon: Bug },
  { to: '/ai-workspace', label: 'AI Workspace', icon: Bot },
  { to: '/knowledge-base', label: 'Knowledge Base', icon: BookOpenText },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export function Sidebar({ collapsed, onCollapseToggle, onNavigate, mobileOpen, onMobileClose }) {
  return (
    <aside className={`sidebar ${collapsed ? 'is-collapsed' : ''} ${mobileOpen ? 'is-open' : ''}`}>
      <div className="sidebar__header">
        <div className="sidebar__brand">
          <div className="sidebar__brand-mark">
            <Sparkles size={16} />
          </div>
          {!collapsed && <div>
            <p className="sidebar__brand-name">DevForge AI</p>
            <p className="sidebar__brand-caption">Workspace</p>
          </div>}
        </div>
        <button type="button" className="sidebar__collapse" onClick={onCollapseToggle} aria-label="Toggle sidebar">
          {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>

      <nav className="sidebar__nav" aria-label="Primary">
        <ul>
          {navItems.map((item) => (
            <SidebarItem key={item.to} {...item} collapsed={collapsed} onNavigate={onNavigate} />
          ))}
        </ul>
      </nav>

      <div className="sidebar__footer">
        <button type="button" className="sidebar__footer-action" onClick={onMobileClose}>
          <Settings size={16} />
          {!collapsed && <span>Quick actions</span>}
        </button>
      </div>
    </aside>
  )
}
