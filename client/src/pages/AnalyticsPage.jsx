import { useMemo } from 'react'
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
import { useAuth } from '../context/AuthContext'
import { useProjects } from '../hooks/useProjects'
import { useBugs } from '../hooks/useBugs'

const palette = ['#7c3aed', '#38bdf8', '#f59e0b', '#34d399']

export default function AnalyticsPage() {
  const { user } = useAuth()
  const { data: projects = [] } = useProjects(user?.id)
  const { data: bugs = [] } = useBugs(user?.id)

  const stats = useMemo(() => ({
    totalProjects: projects.length,
    activeProjects: projects.filter((project) => project.status !== 'Completed').length,
    completedProjects: projects.filter((project) => project.status === 'Completed').length,
    totalBugs: bugs.length,
    solvedBugs: bugs.filter((bug) => bug.status === 'Resolved').length,
    aiGenerations: 24,
    codingSessions: 12,
  }), [projects, bugs])

  const weeklyActivity = [
    { name: 'Mon', projects: 2, bugs: 1 },
    { name: 'Tue', projects: 3, bugs: 2 },
    { name: 'Wed', projects: 2, bugs: 1 },
    { name: 'Thu', projects: 4, bugs: 3 },
    { name: 'Fri', projects: 2, bugs: 2 },
  ]

  const monthlyActivity = [
    { name: 'Jan', value: 6 },
    { name: 'Feb', value: 8 },
    { name: 'Mar', value: 10 },
    { name: 'Apr', value: 9 },
    { name: 'May', value: 12 },
    { name: 'Jun', value: 15 },
  ]

  const statusBreakdown = [
    { name: 'Active', value: stats.activeProjects },
    { name: 'Completed', value: stats.completedProjects },
    { name: 'Open Bugs', value: stats.totalBugs - stats.solvedBugs },
  ]

  return (
    <div className="page-shell">
      <div className="hero-card">
        <div>
          <p className="eyebrow">Analytics</p>
          <h2>Engineering insights and momentum</h2>
          <p className="hero-card__copy">Track focus, delivery, and project health from a single workspace view.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ['Total Projects', stats.totalProjects],
          ['Active Projects', stats.activeProjects],
          ['Completed Projects', stats.completedProjects],
          ['Total Bugs', stats.totalBugs],
        ].map(([label, value]) => <div key={label} className="rounded-[24px] border border-white/10 bg-slate-900/70 p-4"><p className="text-sm text-slate-400">{label}</p><p className="mt-2 text-2xl font-semibold text-white">{value}</p></div>)}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-4 shadow-lg shadow-black/20">
          <h3 className="text-lg font-semibold text-white">Weekly Activity</h3>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyActivity}>
                <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Line type="monotone" dataKey="projects" stroke="#7c3aed" strokeWidth={2} />
                <Line type="monotone" dataKey="bugs" stroke="#38bdf8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-4 shadow-lg shadow-black/20">
          <h3 className="text-lg font-semibold text-white">Momentum</h3>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusBreakdown} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={3}>
                  {statusBreakdown.map((entry, index) => <Cell key={entry.name} fill={palette[index % palette.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.85fr]">
        <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-4 shadow-lg shadow-black/20">
          <h3 className="text-lg font-semibold text-white">Monthly Activity</h3>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyActivity}>
                <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="value" fill="#f59e0b" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-4 shadow-lg shadow-black/20">
          <h3 className="text-lg font-semibold text-white">Key metrics</h3>
          <div className="mt-4 space-y-3">
            {[
              ['Solved Bugs', stats.solvedBugs],
              ['AI Generations', stats.aiGenerations],
              ['Coding Sessions', stats.codingSessions],
            ].map(([label, value]) => <div key={label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-300"><span>{label}</span><strong className="text-white">{value}</strong></div>)}
          </div>
        </div>
      </div>
    </div>
  )
}
