import { Link, useLocation } from 'react-router-dom'

const labels = {
  dashboard: 'Workspace',
  projects: 'Projects',
  developerMemory: 'Developer Memory',
  bugVault: 'Bug Vault',
  aiWorkspace: 'AI Workspace',
  settings: 'Settings',
  profile: 'Profile',
  knowledgeBase: 'Knowledge Base',
  analytics: 'Analytics',
}

export function Breadcrumbs() {
  const location = useLocation()
  const segments = location.pathname.split('/').filter(Boolean)

  if (!segments.length) return null

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Link to="/dashboard">Home</Link>
      {segments.map((segment, index) => {
        const path = `/${segments.slice(0, index + 1).join('/')}`
        const label = labels[segment] || segment.replace(/-/g, ' ')
        const isLast = index === segments.length - 1
        return (
          <span key={path} className="breadcrumbs__item">
            <span className="breadcrumbs__separator">/</span>
            {isLast ? <span>{label}</span> : <Link to={path}>{label}</Link>}
          </span>
        )
      })}
    </nav>
  )
}
