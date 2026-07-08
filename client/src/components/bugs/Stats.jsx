export function Stats({ bugs = [] }) {
  const total = bugs.length
  const solved = bugs.filter((bug) => bug.status === 'Solved').length
  const recurring = bugs.filter((bug) => bug.status === 'Recurring').length
  const critical = bugs.filter((bug) => bug.severity === 'Critical').length
  const favorites = bugs.filter((bug) => bug.favorite).length

  const items = [
    { label: 'Total Bugs', value: total },
    { label: 'Solved Bugs', value: solved },
    { label: 'Recurring Bugs', value: recurring },
    { label: 'Critical Bugs', value: critical },
    { label: 'Favorite Bugs', value: favorites },
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
