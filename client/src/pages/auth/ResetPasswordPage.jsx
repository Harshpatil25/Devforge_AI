import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { LoaderCircle, ShieldCheck } from 'lucide-react'
import { AuthLayout } from '../../components/auth/AuthLayout'
import { PasswordInput } from '../../components/auth/PasswordInput'
import { SubmitButton } from '../../components/auth/SubmitButton'
import { AuthFooter } from '../../components/auth/AuthFooter'
import { resetPasswordSchema } from '../../lib/authSchemas'
import { useAuth } from '../../context/AuthContext'

export default function ResetPasswordPage() {
  const navigate = useNavigate()
  const { resetPassword } = useAuth()
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(resetPasswordSchema), mode: 'onChange' })

  const onSubmit = async (values) => {
    setIsSubmitting(true)
    setStatus({ type: '', message: '' })
    const { error } = await resetPassword({ password: values.password })

    if (error) {
      setStatus({ type: 'error', message: error.message || 'Unable to update your password.' })
      setIsSubmitting(false)
      return
    }

    setStatus({ type: 'success', message: 'Password updated successfully. Redirecting to sign in…' })
    setIsSubmitting(false)
    setTimeout(() => navigate('/login', { replace: true }), 1500)
  }

  return (
    <AuthLayout title="Set a new password" description="Choose a new password for your account." footer={
      <AuthFooter>
        <Link to="/login" className="font-medium text-violet-300 transition hover:text-white">Back to sign in</Link>
      </AuthFooter>
    }>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {status.message ? (
          <div className={`rounded-2xl border px-4 py-3 text-sm ${status.type === 'error' ? 'border-rose-500/30 bg-rose-500/10 text-rose-300' : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'}`}>
            {status.type === 'success' ? <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" />{status.message}</div> : status.message}
          </div>
        ) : null}

        <PasswordInput label="New Password" id="password" autoComplete="new-password" placeholder="Enter a new password" register={register('password')} error={errors.password} required />
        <PasswordInput label="Confirm Password" id="confirmPassword" autoComplete="new-password" placeholder="Confirm your password" register={register('confirmPassword')} error={errors.confirmPassword} required />

        <SubmitButton loading={isSubmitting}>
          {isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : 'Update password'}
        </SubmitButton>
      </form>
    </AuthLayout>
  )
}
