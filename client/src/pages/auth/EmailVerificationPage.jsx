import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LoaderCircle, MailCheck } from 'lucide-react'
import { AuthLayout } from '../../components/auth/AuthLayout'
import { AuthFooter } from '../../components/auth/AuthFooter'
import { SubmitButton } from '../../components/auth/SubmitButton'
import { supabase } from '../../services/supabaseClient'

export default function EmailVerificationPage() {
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const resendEmail = async () => {
    setIsSubmitting(true)
    setStatus({ type: '', message: '' })
    const { error } = await supabase.auth.resend({ type: 'signup' })

    if (error) {
      setStatus({ type: 'error', message: error.message || 'Unable to resend the verification email.' })
    } else {
      setStatus({ type: 'success', message: 'Verification email resent. Check your inbox.' })
    }

    setIsSubmitting(false)
  }

  return (
    <AuthLayout title="Check your inbox" description="We sent a verification email to your address. Please confirm it to continue." footer={
      <AuthFooter>
        <Link to="/login" className="font-medium text-violet-300 transition hover:text-white">Return to sign in</Link>
      </AuthFooter>
    }>
      <div className="space-y-4">
        {status.message ? (
          <div className={`rounded-2xl border px-4 py-3 text-sm ${status.type === 'error' ? 'border-rose-500/30 bg-rose-500/10 text-rose-300' : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'}`}>
            {status.type === 'success' ? <div className="flex items-center gap-2"><MailCheck className="h-4 w-4" />{status.message}</div> : status.message}
          </div>
        ) : null}

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm leading-6 text-emerald-300">
          Your account is set up. Open the confirmation email and follow the link to activate your workspace.
        </div>

        <SubmitButton loading={isSubmitting} onClick={resendEmail}>
          {isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : 'Resend verification email'}
        </SubmitButton>
      </div>
    </AuthLayout>
  )
}
