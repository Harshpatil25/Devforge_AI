export function TextInput({ label, id, register, error, type = 'text', autoComplete, placeholder, required = false }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-200">
        {label}
        {required ? <span className="ml-1 text-rose-400">*</span> : null}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={`w-full rounded-2xl border bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none transition ${error ? 'border-rose-500/60' : 'border-white/10 focus:border-violet-500/40'}`}
        {...register}
      />
      {error ? <p className="mt-2 text-sm text-rose-400">{error.message}</p> : null}
    </div>
  )
}
