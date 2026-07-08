import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'

const demoResults = [
  { id: 1, title: 'Projects', description: 'Browse your current workstreams', path: '/projects' },
  { id: 2, title: 'Bug Vault', description: 'Find issue context and fixes', path: '/bug-vault' },
  { id: 3, title: 'AI Workspace', description: 'Generate docs and summaries', path: '/ai-workspace' },
]

export function SearchOverlay({ open, onClose }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!open) {
      setQuery('')
    }
  }, [open])

  const results = useMemo(() => {
    const value = query.trim().toLowerCase()
    if (!value) return demoResults
    return demoResults.filter((item) => [item.title, item.description].join(' ').toLowerCase().includes(value))
  }, [query])

  if (!open) return null

  return (
    <div className="command-palette-overlay" onClick={onClose}>
      <div className="command-palette" onClick={(event) => event.stopPropagation()}>
        <div className="command-palette__header">
          <div className="command-palette__input-shell">
            <Search size={16} />
            <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects, bugs, docs" aria-label="Search" />
          </div>
        </div>
        <div className="command-palette__body">
          {results.map((item) => (
            <button key={item.id} type="button" className="command-palette__item" onClick={() => { navigate(item.path); onClose() }}>
              <span>{item.title}</span>
              <span className="text-sm text-slate-400">{item.description}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
