import { AnimatePresence, motion } from 'framer-motion'
import { LogOut, Settings, UserCircle2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../services/supabaseClient'

export function ProfileMenu() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login', { replace: true })
  }

  return (
    <div className="topbar__icon-wrap">
      <button type="button" className="topbar__avatar" onClick={() => setOpen((value) => !value)} aria-label="Profile menu">
        <span>{(user?.email || 'U').slice(0, 1).toUpperCase()}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="dropdown-card dropdown-card--profile">
            <div className="dropdown-card__profile">
              <div className="topbar__avatar topbar__avatar--large"><span>{(user?.email || 'U').slice(0, 1).toUpperCase()}</span></div>
              <div>
                <h3>{user?.email || 'Developer'}</h3>
                <p>Signed in</p>
              </div>
            </div>
            <button type="button" className="dropdown-card__item" onClick={() => navigate('/profile')}>
              <UserCircle2 size={16} />
              Profile
            </button>
            <button type="button" className="dropdown-card__item" onClick={() => navigate('/settings')}>
              <Settings size={16} />
              Settings
            </button>
            <button type="button" className="dropdown-card__item dropdown-card__item--danger" onClick={handleLogout}>
              <LogOut size={16} />
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
