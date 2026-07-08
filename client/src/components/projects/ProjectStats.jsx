export function ProjectStats({ projects = [] }) {
  const total = projects.length
  const completed = projects.filter((project) => project.status === 'Completed').length
  const active = projects.filter((project) => project.status === 'In Progress' || project.status === 'Planning').length
  const archived = projects.filter((project) => project.archived).length
  const favorites = projects.filter((project) => project.favorite).length

  const items = [
    { label: 'Total Projects', value: total },
    { label: 'Completed', value: completed },
    { label: 'Active', value: active },
    { label: 'Archived', value: archived },
    { label: 'Favorites', value: favorites },
  ]

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
      {items.map((item) => (
        <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 shadow-sm shadow-black/20">
          <p className="text-sm text-slate-400">{item.label}</p>
          <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
        </div>
      ))}
    </div>
  )
}
