import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { BadgeCheck, LoaderCircle } from 'lucide-react'
import { AuthLayout } from '../../components/auth/AuthLayout'
import { TextInput } from '../../components/auth/TextInput'
import { PasswordInput } from '../../components/auth/PasswordInput'
import { OAuthButton } from '../../components/auth/OAuthButton'
import { FormDivider } from '../../components/auth/FormDivider'
import { SubmitButton } from '../../components/auth/SubmitButton'
import { AuthFooter } from '../../components/auth/AuthFooter'
import { loginSchema } from '../../lib/authSchemas'
import { supabase } from '../../services/supabaseClient'
import { useAuth } from '../../context/AuthContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, loading: authLoading, login } = useAuth()
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema), mode: 'onChange' })

  useEffect(() => {
    if (!authLoading && user) {
      const redirectTo = location.state?.from?.pathname || '/dashboard'
      navigate(redirectTo, { replace: true })
    }
  }, [authLoading, location.state, navigate, user])

  const onSubmit = async (values) => {
    setIsSubmitting(true)
    setStatus({ type: '', message: '' })
    const { error } = await login(values.email, values.password)

    if (error) {
      setStatus({ type: 'error', message: error.message || 'Unable to sign in right now.' })
      setIsSubmitting(false)
      return
    }

    setStatus({ type: 'success', message: 'Signed in successfully.' })
    setIsSubmitting(false)
    const redirectTo = location.state?.from?.pathname || '/dashboard'
    navigate(redirectTo, { replace: true })
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
    <AuthLayout title="Welcome back" description="Sign in to continue building with DevForge AI." footer={
      <AuthFooter>
        <span>Don’t have an account?</span>{' '}
        <Link to="/register" className="font-medium text-violet-300 transition hover:text-white">Create one</Link>
      </AuthFooter>
    }>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {status.message ? (
          <div className={`rounded-2xl border px-4 py-3 text-sm ${status.type === 'error' ? 'border-rose-500/30 bg-rose-500/10 text-rose-300' : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'}`}>
            {status.message}
          </div>
        ) : null}

        <TextInput label="Email" id="email" type="email" autoComplete="email" placeholder="name@company.com" register={register('email')} error={errors.email} required />
        <PasswordInput label="Password" id="password" autoComplete="current-password" placeholder="Enter your password" register={register('password')} error={errors.password} required />

        <div className="flex items-center justify-between text-sm text-slate-400">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded border-white/10 bg-slate-950" />
            Remember me
          </label>
          <Link to="/forgot-password" className="font-medium text-violet-300 transition hover:text-white">Forgot password?</Link>
        </div>

        <SubmitButton loading={isSubmitting} disabled={authLoading}>
          {authLoading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : 'Sign in'}
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
