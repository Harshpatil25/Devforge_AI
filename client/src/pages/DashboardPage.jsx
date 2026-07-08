import { motion } from 'framer-motion'
import { ArrowRight, Bot, Bug, FolderKanban, NotebookPen, Sparkles, Clock3, Activity, BookOpenText, PlusCircle, PlayCircle } from 'lucide-react'
import { QuickActionCard } from '../components/layout/QuickActionCard'
import { SectionHeader } from '../components/layout/SectionHeader'
import { WorkspaceCard } from '../components/layout/WorkspaceCard'
import { EmptyState } from '../components/layout/EmptyState'

const quickActions = [
  { title: 'Create Project', description: 'Start a new workspace', icon: PlusCircle, to: '/projects' },
  { title: 'Log Bug', description: 'Capture the next blocker', icon: Bug, to: '/bug-vault' },
  { title: 'Start Session', description: 'Begin a focused build', icon: PlayCircle, to: '/ai-workspace' },
  { title: 'Generate README', description: 'Draft project notes', icon: BookOpenText, to: '/ai-workspace' },
  { title: 'Open AI', description: 'Ask the assistant anything', icon: Bot, to: '/ai-workspace' },
]

const recentProjects = [
  { name: 'Devforge Core', status: 'Shipping', meta: '2 updates today' },
  { name: 'CLI Toolkit', status: 'Review', meta: 'Design sync' },
]

const activeSession = [
  { label: 'Current focus', value: 'Refining authentication shell' },
  { label: 'Time tracked', value: '1h 24m today' },
  { label: 'Next milestone', value: 'Ship workspace navigation' },
]

export default function DashboardPage() {
  return (
    <div className="page-shell">
      <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="hero-card hero-card--welcome">
        <div className="hero-card__content">
          <p className="eyebrow">Workspace Home</p>
          <h2>Welcome back to your developer workspace.</h2>
          <p className="hero-card__copy">A calm, focused environment for planning, debugging, and shipping. Everything is organized so you can move from idea to implementation without friction.</p>
        </div>
        <div className="hero-card__badge">
          <Sparkles size={18} />
          <span>Ready for today’s work</span>
        </div>
      </motion.section>

      <SectionHeader eyebrow="Quick actions" title="Start with a task" description="Every action opens the correct place in the app." />
      <div className="workspace-grid workspace-grid--actions">
        {quickActions.map((action) => (
          <QuickActionCard key={action.title} {...action} />
        ))}
      </div>

      <div className="workspace-grid">
        <WorkspaceCard title="Recent Projects" subtitle="Active workstreams" meta="Updated now">
          <div className="list-stack">
            {recentProjects.map((project) => (
              <div key={project.name} className="list-row">
                <div className="list-row__main">
                  <FolderKanban size={16} />
                  <div>
                    <strong>{project.name}</strong>
                    <p>{project.meta}</p>
                  </div>
                </div>
                <span className="pill">{project.status}</span>
              </div>
            ))}
          </div>
        </WorkspaceCard>

        <WorkspaceCard title="Today's Coding Session" subtitle="Session context" meta="Focus mode">
          <div className="stack-list">
            {activeSession.map((item) => (
              <div key={item.label} className="stack-item">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </WorkspaceCard>
      </div>

      <div className="workspace-grid">
        <WorkspaceCard title="Recent Bugs" subtitle="Latest blockers" meta="4 open">
          <div className="list-stack">
            <div className="list-row">
              <div className="list-row__main">
                <Bug size={16} />
                <div>
                  <strong>Auth callback redirect</strong>
                  <p>Needs follow-up after sign-in</p>
                </div>
              </div>
              <span className="pill">High</span>
            </div>
          </div>
        </WorkspaceCard>

        <WorkspaceCard title="Recent AI Activity" subtitle="Assistant activity" meta="Last hour">
          <div className="stack-list">
            <div className="stack-item stack-item--compact">
              <span><Bot size={15} /> AI summary</span>
              <strong>README drafted for CLI toolkit</strong>
            </div>
          </div>
        </WorkspaceCard>
      </div>

      <div className="workspace-grid">
        <WorkspaceCard title="Pinned Notes" subtitle="Reference material" meta="3 pinned">
          <EmptyState title="No notes pinned yet" description="Pin important thinking and implementation notes here." icon={NotebookPen} />
        </WorkspaceCard>

        <WorkspaceCard title="Activity Timeline" subtitle="Recent events" meta="Live">
          <div className="timeline">
            <div className="timeline__item">
              <Clock3 size={14} />
              <div>
                <strong>Workspace initialized</strong>
                <p>Shell and navigation are ready.</p>
              </div>
            </div>
            <div className="timeline__item">
              <Activity size={14} />
              <div>
                <strong>Quick actions linked</strong>
                <p>All key buttons route to the right pages.</p>
              </div>
            </div>
          </div>
        </WorkspaceCard>
      </div>
    </div>
  )
}
