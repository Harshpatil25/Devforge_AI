import { useMemo, useState } from 'react'
import { Camera, Link2, LoaderCircle, Save } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../services/supabaseClient'

export default function ProfilePage() {
  const { user, profile, updateProfile } = useAuth()
  const [form, setForm] = useState({ full_name: profile?.full_name || '', username: profile?.username || '', bio: profile?.bio || '', github_url: profile?.github_url || '', linkedin_url: profile?.linkedin_url || '', portfolio_url: profile?.portfolio_url || '' })
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  const avatarUrl = useMemo(() => profile?.avatar_url || user?.user_metadata?.avatar_url || '', [profile, user])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file || !user?.id) return

    setUploading(true)
    const filePath = `avatars/${user.id}/${Date.now()}-${file.name}`
    const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file, { upsert: true })
    if (uploadError) {
      toast.error(uploadError.message || 'Avatar upload failed')
      setUploading(false)
      return
    }

    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
    const { error } = await updateProfile({ avatar_url: data.publicUrl })
    if (error) {
      toast.error(error.message || 'Unable to save avatar')
    } else {
      toast.success('Avatar updated')
    }

    setUploading(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    const { error } = await updateProfile({
      full_name: form.full_name,
      username: form.username,
      bio: form.bio,
      github_url: form.github_url,
      linkedin_url: form.linkedin_url,
      portfolio_url: form.portfolio_url,
    })

    if (error) {
      toast.error(error.message || 'Unable to save profile')
    } else {
      toast.success('Profile updated')
    }
    setLoading(false)
  }

  return (
    <div className="page-shell">
      <div className="hero-card">
        <div>
          <p className="eyebrow">Profile</p>
          <h2>Shape your developer identity</h2>
          <p className="hero-card__copy">Keep your public profile and links aligned with the work you are shipping.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-[28px] border border-white/10 bg-slate-900/70 p-4 shadow-lg shadow-black/20">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-slate-950 text-lg font-semibold text-white">
              {avatarUrl ? <img src={avatarUrl} alt="Profile avatar" className="h-full w-full object-cover" /> : (profile?.full_name || user?.email || 'U').slice(0, 1).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium text-violet-300">Avatar</p>
              <p className="text-sm text-slate-400">Upload a photo to personalize your workspace.</p>
            </div>
          </div>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-slate-300">
            <Camera size={16} />
            {uploading ? 'Uploading…' : 'Upload avatar'}
            <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
          </label>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-200">Full name</span>
            <input name="full_name" value={form.full_name} onChange={handleChange} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none" required />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-200">Username</span>
            <input name="username" value={form.username} onChange={handleChange} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none" required />
          </label>
          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm font-medium text-slate-200">Bio</span>
            <textarea name="bio" rows={4} value={form.bio} onChange={handleChange} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none" placeholder="Tell the team what you build and what you care about." />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-200">GitHub URL</span>
            <input name="github_url" value={form.github_url} onChange={handleChange} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none" placeholder="https://github.com/username" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-200">LinkedIn URL</span>
            <input name="linkedin_url" value={form.linkedin_url} onChange={handleChange} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none" placeholder="https://linkedin.com/in/username" />
          </label>
          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm font-medium text-slate-200">Portfolio URL</span>
            <input name="portfolio_url" value={form.portfolio_url} onChange={handleChange} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none" placeholder="https://your-site.com" />
          </label>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button type="submit" disabled={loading} className="inline-flex items-center gap-2 rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:opacity-60">
            {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save profile
          </button>
          <div className="flex items-center gap-2 text-sm text-slate-400"><Link2 className="h-4 w-4" /> Links are stored securely with your account.</div>
        </div>
      </form>
    </div>
  )
}
