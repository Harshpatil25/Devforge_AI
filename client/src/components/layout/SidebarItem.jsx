import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

export function SidebarItem({ to, label, icon: Icon, collapsed, onNavigate }) {
  return (
    <motion.li whileHover={{ x: 2, scale: 1.01 }} transition={{ duration: 0.2 }}>
      <NavLink
        to={to}
        onClick={onNavigate}
        className={({ isActive }) =>
          `sidebar__item ${collapsed ? 'is-collapsed' : ''} ${isActive ? 'is-active' : ''}`
        }
      >
        <Icon className="sidebar__icon" size={18} />
        {!collapsed && <span>{label}</span>}
      </NavLink>
    </motion.li>
  )
}
