import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
import { supabase } from '../../services/supabaseClient'

export default function AuthCallbackPage() {
  const navigate = useNavigate()
  const [message, setMessage] = useState('Finishing sign in…')

  useEffect(() => {
    const finalizeAuth = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        setMessage(error.message || 'Authentication could not be completed.')
        return
      }

      if (data.session?.user) {
        navigate('/dashboard', { replace: true })
        return
      }

      setMessage('No active session was found. Please sign in again.')
    }

    finalizeAuth()
  }, [navigate])

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-100">
      <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-8 text-center shadow-2xl shadow-black/30">
        <LoaderCircle className="mx-auto h-8 w-8 animate-spin text-violet-400" />
        <h2 className="mt-4 text-xl font-semibold">Finishing sign in…</h2>
        <p className="mt-2 text-sm text-slate-400">{message}</p>
      </div>
    </div>
  )
}
