import { Copy, Sparkles } from 'lucide-react'
import { useMemo } from 'react'

function highlight(code) {
  const escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  return escaped
    .replace(/(\/\/.*$)/gm, '<span class="text-emerald-400">$1</span>')
    .replace(/(\b(const|let|var|function|return|if|else|try|catch|await|import|from|new|class)\b)/g, '<span class="text-violet-300">$1</span>')
    .replace(/(["'].*?["'])/g, '<span class="text-amber-300">$1</span>')
}

export function CodeBlock({ code, language = 'ts' }) {
  const html = useMemo(() => highlight(code || ''), [code])

  const copy = async () => {
    await navigator.clipboard.writeText(code || '')
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/90">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2 text-xs uppercase tracking-[0.2em] text-slate-400">
        <span>{language}</span>
        <div className="flex items-center gap-2">
          <button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-2.5 py-1 text-slate-300 transition hover:text-white">
            <Copy className="h-3.5 w-3.5" /> Copy
          </button>
        </div>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-6 text-slate-200"><code dangerouslySetInnerHTML={{ __html: html }} /></pre>
    </div>
  )
}
