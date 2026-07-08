import { useMemo, useState } from 'react'
import { Sparkles } from 'lucide-react'
import { AIToolCard } from '../components/ai-workspace/AIToolCard'
import { CategorySidebar } from '../components/ai-workspace/CategorySidebar'
import { PromptEditor } from '../components/ai-workspace/PromptEditor'
import { OutputViewer } from '../components/ai-workspace/OutputViewer'
import { MarkdownPreview } from '../components/ai-workspace/MarkdownPreview'
import { generateAiContent } from '../services/aiWorkspace'
import toast from 'react-hot-toast'

const toolCatalog = [
  {
    id: 'readme',
    title: 'README Generator',
    description: 'Turn a project summary into a polished README.',
    category: 'Documentation',
    fields: [
      { name: 'title', label: 'Project title', type: 'text' },
      { name: 'description', label: 'Project description', type: 'textarea', rows: 5 },
      { name: 'action', label: 'Tone', type: 'select', options: ['summary', 'documentation', 'portfolio'] },
    ],
  },
  {
    id: 'documentation',
    title: 'Architecture Notes',
    description: 'Draft concise technical documentation for a feature.',
    category: 'Documentation',
    fields: [
      { name: 'title', label: 'Feature name', type: 'text' },
      { name: 'description', label: 'Context', type: 'textarea', rows: 5 },
      { name: 'action', label: 'Output style', type: 'select', options: ['documentation', 'summary'] },
    ],
  },
  {
    id: 'bug-explainer',
    title: 'Bug Explainer',
    description: 'Translate a bug report into an actionable explanation.',
    category: 'Debugging',
    fields: [
      { name: 'title', label: 'Bug title', type: 'text' },
      { name: 'description', label: 'Issue details', type: 'textarea', rows: 5 },
      { name: 'action', label: 'Action type', type: 'select', options: ['Explain Error', 'Suggest Possible Causes', 'Improve Solution'] },
    ],
  },
  {
    id: 'project-description',
    title: 'Project Positioning',
    description: 'Create product copy for showcases and portfolios.',
    category: 'Marketing',
    fields: [
      { name: 'title', label: 'Project title', type: 'text' },
      { name: 'description', label: 'Product overview', type: 'textarea', rows: 5 },
      { name: 'action', label: 'Output type', type: 'select', options: ['portfolio', 'github', 'summary'] },
    ],
  },
]

const categories = Array.from(new Set(toolCatalog.map((tool) => tool.category))).map((label) => ({
  id: label,
  label,
  tools: toolCatalog.filter((tool) => tool.category === label),
}))

export default function AIWorkspacePage() {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || 'Documentation')
  const [selectedTool, setSelectedTool] = useState(toolCatalog[0])
  const [values, setValues] = useState({ title: '', description: '', action: toolCatalog[0]?.fields?.find((field) => field.name === 'action')?.options?.[0] || '' })
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [favorite, setFavorite] = useState(false)

  const visibleTools = useMemo(() => toolCatalog.filter((tool) => tool.category === activeCategory), [activeCategory])

  const handleToolSelect = (tool) => {
    setSelectedTool(tool)
    setActiveCategory(tool.category)
    setValues({
      title: '',
      description: '',
      action: tool.fields.find((field) => field.name === 'action')?.options?.[0] || '',
    })
    setOutput('')
  }

  const handleGenerate = async () => {
    if (!selectedTool) return

    setLoading(true)
    try {
      const content = await generateAiContent({ tool: selectedTool.id, title: values.title, description: values.description, action: values.action })
      setOutput(content?.content || content?.data?.content || '')
      toast.success('AI draft generated')
    } catch (error) {
      toast.error(error.message || 'Unable to generate content')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-shell">
      <div className="hero-card">
        <div>
          <p className="eyebrow">AI-first delivery station</p>
          <h2>Turn context into polished project output</h2>
          <p className="hero-card__copy">Use the same workspace to draft READMEs, explain bugs, shape product copy, and capture documentation in a repeatable workflow.</p>
        </div>
        <div className="hero-card__badge"><Sparkles size={16} /> Focused AI workflows</div>
      </div>

      <div className="workspace-grid" style={{ gridTemplateColumns: 'minmax(240px, 280px) minmax(0, 1fr)' }}>
        <CategorySidebar categories={categories} activeCategory={activeCategory} onSelect={setActiveCategory} selectedTool={selectedTool} onToolSelect={handleToolSelect} />
        <div className="grid gap-4">
          <div className="workspace-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            {visibleTools.map((tool) => <AIToolCard key={tool.id} tool={tool} onSelect={handleToolSelect} />)}
          </div>
          <PromptEditor tool={selectedTool} values={values} onChange={(name, value) => setValues((current) => ({ ...current, [name]: value }))} onGenerate={handleGenerate} loading={loading} />
          <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
            <OutputViewer output={output} onCopy={() => navigator.clipboard.writeText(output)} onDownload={() => { const blob = new Blob([output], { type: 'text/plain' }); const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = `${selectedTool?.id || 'ai-output'}.md`; link.click(); URL.revokeObjectURL(url) }} onSave={() => toast.success('Saved locally')} onFavorite={() => setFavorite((value) => !value)} favorite={favorite} loading={loading} />
            <MarkdownPreview content={output} />
          </div>
        </div>
      </div>
    </div>
  )
}
