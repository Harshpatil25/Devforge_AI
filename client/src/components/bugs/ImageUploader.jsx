import { UploadCloud } from 'lucide-react'

export function ImageUploader({ value, onChange }) {
  return (
    <label className="block rounded-2xl border border-dashed border-white/10 bg-slate-950/70 p-4 text-sm text-slate-400">
      <span className="mb-2 block font-medium text-slate-200">Screenshot</span>
      <input type="file" accept="image/*" onChange={onChange} className="block w-full text-sm text-slate-400 file:mr-4 file:rounded-full file:border-0 file:bg-violet-600 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white" />
      {value ? <p className="mt-2 text-xs text-emerald-300">Selected file: {value}</p> : null}
    </label>
  )
}
