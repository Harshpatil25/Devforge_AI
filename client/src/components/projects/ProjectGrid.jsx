import { ProjectCard } from './ProjectCard'

export function ProjectGrid({ projects, onView, onEdit, onDelete, onDuplicate, onArchive, onFavorite, onAi }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onView={onView} onEdit={onEdit} onDelete={onDelete} onDuplicate={onDuplicate} onArchive={onArchive} onFavorite={onFavorite} onAi={onAi} />
      ))}
    </div>
  )
}
