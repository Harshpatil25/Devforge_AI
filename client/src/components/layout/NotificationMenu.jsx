import { AnimatePresence, motion } from 'framer-motion'
import { Bell, CheckCheck, Sparkles, Trash2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

const seedNotifications = [
  { id: 1, title: 'Project updated', body: 'Your latest project received a new milestone.', read: false },
  { id: 2, title: 'Bug resolved', body: 'A bug was marked as resolved and moved to review.', read: true },
]

export function NotificationMenu() {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState(seedNotifications)

  useEffect(() => {
    if (!open) return
    const timer = window.setTimeout(() => setItems((current) => current.map((item) => ({ ...item, read: true }))), 180)
    return () => window.clearTimeout(timer)
  }, [open])

  const unreadCount = useMemo(() => items.filter((item) => !item.read).length, [items])

  const markAllAsRead = () => {
    setItems((current) => current.map((item) => ({ ...item, read: true })))
    toast.success('All notifications marked as read')
  }

  const removeItem = (id) => {
    setItems((current) => current.filter((item) => item.id !== id))
    toast.success('Notification removed')
  }

  return (
    <div className="topbar__icon-wrap">
      <button type="button" className="topbar__icon-button" aria-label="Notifications" onClick={() => setOpen((value) => !value)}>
        <Bell size={18} />
        {unreadCount ? <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-violet-500" /> : null}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="dropdown-card">
            <div className="dropdown-card__header">
              <h3>Notifications</h3>
              <button type="button" className="dropdown-card__action" onClick={markAllAsRead}>
                <CheckCheck size={14} />
                Mark all as read
              </button>
            </div>
            {items.length ? (
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className={`rounded-2xl border px-3 py-2 ${item.read ? 'border-white/10 bg-slate-950/60' : 'border-violet-500/20 bg-violet-500/10'}`}>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-white">{item.title}</p>
                        <p className="mt-1 text-sm text-slate-400">{item.body}</p>
                      </div>
                      <button type="button" onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-white"><Trash2 size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="dropdown-card__empty">
                <Sparkles size={16} />
                <p>No new activity yet.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
