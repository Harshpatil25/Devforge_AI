import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { LoaderCircle, MailCheck } from 'lucide-react'
import { AuthLayout } from '../../components/auth/AuthLayout'
import { TextInput } from '../../components/auth/TextInput'
import { SubmitButton } from '../../components/auth/SubmitButton'
import { AuthFooter } from '../../components/auth/AuthFooter'
import { forgotPasswordSchema } from '../../lib/authSchemas'
import { useAuth } from '../../context/AuthContext'

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth()
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(forgotPasswordSchema), mode: 'onChange' })

  const onSubmit = async (values) => {
    setIsSubmitting(true)
    setStatus({ type: '', message: '' })
    const { error } = await resetPassword({ email: values.email })

    if (error) {
      setStatus({ type: 'error', message: error.message || 'Unable to send reset link right now.' })
      setIsSubmitting(false)
      return
    }

    setStatus({ type: 'success', message: 'Check your inbox for the secure reset link.' })
    setIsSubmitting(false)
  }

  return (
    <AuthLayout title="Reset your password" description="Enter your email and we will send you a secure reset link." footer={
      <AuthFooter>
        <Link to="/login" className="font-medium text-violet-300 transition hover:text-white">Back to sign in</Link>
      </AuthFooter>
    }>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {status.message ? (
          <div className={`rounded-2xl border px-4 py-3 text-sm ${status.type === 'error' ? 'border-rose-500/30 bg-rose-500/10 text-rose-300' : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'}`}>
            {status.type === 'success' ? <div className="flex items-center gap-2"><MailCheck className="h-4 w-4" />{status.message}</div> : status.message}
          </div>
        ) : null}

        <TextInput label="Email" id="email" type="email" autoComplete="email" placeholder="name@company.com" register={register('email')} error={errors.email} required />
        <SubmitButton loading={isSubmitting}>
          {isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : 'Send reset link'}
        </SubmitButton>
      </form>
    </AuthLayout>
  )
}
