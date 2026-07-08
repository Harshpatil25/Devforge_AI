import { Sparkles } from 'lucide-react'

export function PromptEditor({ tool, values, onChange, onGenerate, loading }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-slate-900/70 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-violet-300">{tool.title}</p>
          <h3 className="text-xl font-semibold text-white">{tool.description}</h3>
        </div>
        <button type="button" onClick={onGenerate} disabled={loading} className="inline-flex items-center gap-2 rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60">
          <Sparkles className="h-4 w-4" /> {loading ? 'Generating…' : 'Generate'}
        </button>
      </div>

      <div className="mt-6 grid gap-4">
        {tool.fields?.map((field) => (
          <label key={field.name} className="block">
            <span className="mb-2 block text-sm font-medium text-slate-200">{field.label}</span>
            {field.type === 'textarea' ? (
              <textarea value={values[field.name] || ''} onChange={(event) => onChange(field.name, event.target.value)} rows={field.rows || 4} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none" />
            ) : field.type === 'select' ? (
              <select value={values[field.name] || ''} onChange={(event) => onChange(field.name, event.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none">
                {field.options?.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            ) : (
              <input value={values[field.name] || ''} onChange={(event) => onChange(field.name, event.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none" />
            )}
          </label>
        ))}
      </div>
    </div>
  )
}
