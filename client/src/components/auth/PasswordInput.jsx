import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export function PasswordInput({ label, id, register, error, autoComplete, placeholder, required = false }) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-200">
        {label}
        {required ? <span className="ml-1 text-rose-400">*</span> : null}
      </label>
      <div className="relative">
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={`w-full rounded-2xl border bg-slate-950/80 px-4 py-3 pr-12 text-sm text-slate-100 outline-none transition ${error ? 'border-rose-500/60' : 'border-white/10 focus:border-violet-500/40'}`}
          {...register}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-white"
          onClick={() => setShowPassword((value) => !value)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {error ? <p className="mt-2 text-sm text-rose-400">{error.message}</p> : null}
    </div>
  )
}
