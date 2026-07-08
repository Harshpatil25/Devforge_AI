import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { BadgeCheck, LoaderCircle, ShieldCheck } from 'lucide-react'
import { AuthLayout } from '../../components/auth/AuthLayout'
import { TextInput } from '../../components/auth/TextInput'
import { PasswordInput } from '../../components/auth/PasswordInput'
import { OAuthButton } from '../../components/auth/OAuthButton'
import { FormDivider } from '../../components/auth/FormDivider'
import { SubmitButton } from '../../components/auth/SubmitButton'
import { AuthFooter } from '../../components/auth/AuthFooter'
import { registerSchema } from '../../lib/authSchemas'
import { supabase } from '../../services/supabaseClient'
import { useAuth } from '../../context/AuthContext'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { user, loading: authLoading, register: registerUser } = useAuth()
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [password, setPassword] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema), mode: 'onChange' })

  useEffect(() => {
    if (!authLoading && user) {
      navigate('/dashboard', { replace: true })
    }
  }, [authLoading, navigate, user])

  const passwordValue = watch('password', '')
  const passwordStrength = useMemo(() => {
    if (!passwordValue) return { label: 'Enter a password', score: 0 }
    let score = 0
    if (passwordValue.length >= 8) score += 1
    if (/[A-Z]/.test(passwordValue)) score += 1
    if (/[0-9]/.test(passwordValue)) score += 1
    if (/[^A-Za-z0-9]/.test(passwordValue)) score += 1
    if (score <= 1) return { label: 'Weak', score }
    if (score === 2) return { label: 'Fair', score }
    if (score === 3) return { label: 'Good', score }
    return { label: 'Strong', score }
  }, [passwordValue])

  useEffect(() => {
    setPassword(passwordValue)
  }, [passwordValue])

  const onSubmit = async (values) => {
    setIsSubmitting(true)
    setStatus({ type: '', message: '' })

    const { data, error } = await registerUser(values.email, values.password, {
      full_name: values.fullName,
      username: values.username,
    })

    if (error) {
      setStatus({ type: 'error', message: error.message || 'Unable to create your account.' })
      setIsSubmitting(false)
      return
    }

    if (data?.user && !data.session) {
      setStatus({ type: 'success', message: 'Check your inbox to verify your email before signing in.' })
      navigate('/verify-email', { replace: true })
    } else if (data?.session) {
      navigate('/dashboard', { replace: true })
    }

    setIsSubmitting(false)
  }

  const handleGoogle = async () => {
    setStatus({ type: '', message: '' })
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })

    if (error) {
      setStatus({ type: 'error', message: error.message || 'Google sign-in failed.' })
    }
  }

  return (
    <AuthLayout title="Create your account" description="Start using DevForge AI with a secure workspace." footer={
      <AuthFooter>
        <span>Already have an account?</span>{' '}
        <Link to="/login" className="font-medium text-violet-300 transition hover:text-white">Sign in</Link>
      </AuthFooter>
    }>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {status.message ? (
          <div className={`rounded-2xl border px-4 py-3 text-sm ${status.type === 'error' ? 'border-rose-500/30 bg-rose-500/10 text-rose-300' : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'}`}>
            {status.message}
          </div>
        ) : null}

        <TextInput label="Full Name" id="fullName" autoComplete="name" placeholder="Alex Morgan" register={register('fullName')} error={errors.fullName} required />
        <TextInput label="Username" id="username" autoComplete="username" placeholder="alexm" register={register('username')} error={errors.username} required />
        <TextInput label="Email" id="email" type="email" autoComplete="email" placeholder="name@company.com" register={register('email')} error={errors.email} required />
        <PasswordInput label="Password" id="password" autoComplete="new-password" placeholder="Create a strong password" register={register('password')} error={errors.password} required />
        <div className="-mt-2 text-sm">
          <div className="mb-1 flex items-center justify-between text-slate-400">
            <span>Password strength</span>
            <span className="font-medium text-slate-200">{passwordStrength.label}</span>
          </div>
          <div className="h-2 rounded-full bg-slate-800">
            <div className="h-2 rounded-full bg-linear-to-r from-rose-500 via-amber-500 to-emerald-500 transition-all" style={{ width: `${(passwordStrength.score / 4) * 100}%` }} />
          </div>
        </div>
        <PasswordInput label="Confirm Password" id="confirmPassword" autoComplete="new-password" placeholder="Confirm your password" register={register('confirmPassword')} error={errors.confirmPassword} required />

        <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-400">
          <input type="checkbox" className="mt-0.5 rounded border-white/10 bg-slate-950" required />
          <span>I agree to the <span className="font-medium text-slate-200">Terms</span> and <span className="font-medium text-slate-200">Privacy Policy</span>.</span>
        </label>

        <SubmitButton loading={isSubmitting} disabled={authLoading}>
          {authLoading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : 'Create account'}
        </SubmitButton>
      </form>

      <FormDivider />

      <OAuthButton loading={isSubmitting} onClick={handleGoogle}>
        <BadgeCheck className="h-4 w-4" />
        Continue with Google
      </OAuthButton>
    </AuthLayout>
  )
}
