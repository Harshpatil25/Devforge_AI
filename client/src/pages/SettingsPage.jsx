import { useState } from 'react'
import { Download, LogOut, ShieldCheck, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

export default function SettingsPage() {
  const { logout } = useAuth()
  const [settings, setSettings] = useState({ theme: 'dark', language: 'English', timezone: 'UTC', emailNotifications: true, aiNotifications: true, projectNotifications: true })

  const handleToggle = (field) => {
    setSettings((current) => ({ ...current, [field]: !current[field] }))
    toast.success('Preference updated')
  }

  const handleExport = () => {
    const payload = { exportedAt: new Date().toISOString(), settings }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'devforge-account-data.json'
    link.click()
    URL.revokeObjectURL(url)
    toast.success('Account data exported')
  }

  const handleDelete = () => {
    if (window.confirm('Delete your account? This action cannot be undone.')) {
      toast('Account deletion is wired for a future backend integration.', { icon: '⚠️' })
    }
  }

  return (
    <div className="page-shell">
      <div className="hero-card">
        <div>
          <p className="eyebrow">Settings</p>
          <h2>Control your workspace experience</h2>
          <p className="hero-card__copy">Customize notifications, appearance, privacy, and account actions in one place.</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-[28px] border border-white/10 bg-slate-900/70 p-4 shadow-lg shadow-black/20">
          <h3 className="text-lg font-semibold text-white">General</h3>
          <div className="mt-4 grid gap-3">
            <label className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-300">
              <span>Theme</span>
              <select value={settings.theme} onChange={(event) => setSettings((current) => ({ ...current, theme: event.target.value }))} className="rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white">
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="system">System</option>
              </select>
            </label>
            <label className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-300">
              <span>Language</span>
              <select value={settings.language} onChange={(event) => setSettings((current) => ({ ...current, language: event.target.value }))} className="rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white">
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
              </select>
            </label>
            <label className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-300">
              <span>Time Zone</span>
              <input value={settings.timezone} onChange={(event) => setSettings((current) => ({ ...current, timezone: event.target.value }))} className="rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white" />
            </label>
          </div>
        </section>

        <section className="rounded-[28px] border border-white/10 bg-slate-900/70 p-4 shadow-lg shadow-black/20">
          <h3 className="text-lg font-semibold text-white">Notifications</h3>
          <div className="mt-4 grid gap-3">
            {[
              ['emailNotifications', 'Email notifications'],
              ['aiNotifications', 'AI notifications'],
              ['projectNotifications', 'Project notifications'],
            ].map(([key, label]) => (
              <label key={key} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-300">
                <span>{label}</span>
                <input type="checkbox" checked={settings[key]} onChange={() => handleToggle(key)} className="h-4 w-4 rounded border-white/10 bg-slate-900" />
              </label>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-white/10 bg-slate-900/70 p-4 shadow-lg shadow-black/20">
          <h3 className="text-lg font-semibold text-white">Security</h3>
          <div className="mt-4 space-y-3">
            <button type="button" className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-300"><span>Change password</span><ShieldCheck size={16} /></button>
            <button type="button" className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-300"><span>Logout all devices</span><LogOut size={16} /></button>
          </div>
        </section>

        <section className="rounded-[28px] border border-white/10 bg-slate-900/70 p-4 shadow-lg shadow-black/20">
          <h3 className="text-lg font-semibold text-white">Account</h3>
          <div className="mt-4 space-y-3">
            <button type="button" onClick={handleExport} className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-300"><span>Export account data</span><Download size={16} /></button>
            <button type="button" onClick={handleDelete} className="flex w-full items-center justify-between rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-300"><span>Delete account</span><Trash2 size={16} /></button>
          </div>
        </section>
      </div>
    </div>
  )
}
