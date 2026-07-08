export function EmptyState({ title, description, icon: Icon }) {
  return (
    <div className="empty-state">
      {Icon && <div className="empty-state__icon"><Icon size={18} /></div>}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}
