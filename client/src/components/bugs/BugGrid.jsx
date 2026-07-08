import { BugCard } from './BugCard'

export function BugGrid({ bugs, onView, onEdit, onDelete, onDuplicate, onArchive, onFavorite }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {bugs.map((bug) => (
        <BugCard key={bug.id} bug={bug} onView={onView} onEdit={onEdit} onDelete={onDelete} onDuplicate={onDuplicate} onArchive={onArchive} onFavorite={onFavorite} />
      ))}
    </div>
  )
}
