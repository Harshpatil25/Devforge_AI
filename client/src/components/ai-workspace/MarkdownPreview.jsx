import ReactMarkdown from 'react-markdown'

export function MarkdownPreview({ content }) {
  return (
    <div className="prose prose-invert max-w-none rounded-[20px] border border-white/10 bg-slate-950/70 p-4 text-sm leading-7 text-slate-300">
      <ReactMarkdown>{content || 'Preview will appear here.'}</ReactMarkdown>
    </div>
  )
}
