import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { ProjectActions } from '../components/projects/ProjectActions'
import { EmptyProjects } from '../components/projects/EmptyProjects'
import { FilterBar } from '../components/projects/FilterBar'
import { ProjectGrid } from '../components/projects/ProjectGrid'
import { ProjectHeader } from '../components/projects/ProjectHeader'
import { ProjectModal } from '../components/projects/ProjectModal'
import { ProjectStats } from '../components/projects/ProjectStats'
import { ProjectTable } from '../components/projects/ProjectTable'
import { SearchBar } from '../components/projects/SearchBar'
import { archiveProject, createProject, deleteProject, duplicateProject, favoriteProject, fetchProjects, generateAiContent, updateProject } from '../services/projects'

const defaultFilters = { search: '', status: '', tech: '', favorite: '', archived: 'false', sort: 'updated' }

export default function ProjectsPage() {
  const { user } = useAuth()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [viewMode, setViewMode] = useState('grid')
  const [filters, setFilters] = useState(defaultFilters)
  const [busyId, setBusyId] = useState(null)

  const loadProjects = async () => {
    if (!user) return
    setLoading(true)
    try {
      const data = await fetchProjects({
        search: filters.search,
        status: filters.status,
        tech: filters.tech,
        favorite: filters.favorite,
        archived: filters.archived,
        sort: filters.sort,
      })
      setProjects(data)
    } catch (error) {
      toast.error(error.message || 'Unable to load projects')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProjects()
  }, [user])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (user) {
        loadProjects()
      }
    }, 250)
    return () => window.clearTimeout(timer)
  }, [filters.search, filters.status, filters.tech, filters.favorite, filters.archived, filters.sort, user])

  const filteredProjects = useMemo(() => projects, [projects])

  const handleCreate = () => {
    setSelectedProject(null)
    setModalOpen(true)
  }

  const handleEdit = (project) => {
    setSelectedProject(project)
    setModalOpen(true)
  }

  const handleSubmit = async (values) => {
    try {
      if (selectedProject) {
        const updated = await updateProject(selectedProject.id, values)
        setProjects((current) => current.map((project) => (project.id === updated.id ? updated : project)))
        toast.success('Project updated')
      } else {
        const created = await createProject(values)
        setProjects((current) => [created, ...current])
        toast.success('Project created')
      }
      setModalOpen(false)
    } catch (error) {
      toast.error(error.message || 'Unable to save project')
    }
  }

  const handleDelete = async (project) => {
    if (!window.confirm(`Delete ${project.title}?`)) return
    try {
      setBusyId(project.id)
      await deleteProject(project.id)
      setProjects((current) => current.filter((item) => item.id !== project.id))
      toast.success('Project deleted')
    } catch (error) {
      toast.error(error.message || 'Unable to delete project')
    } finally {
      setBusyId(null)
    }
  }

  const handleDuplicate = async (project) => {
    try {
      setBusyId(project.id)
      const created = await duplicateProject(project)
      setProjects((current) => [created, ...current])
      toast.success('Project duplicated')
    } catch (error) {
      toast.error(error.message || 'Unable to duplicate project')
    } finally {
      setBusyId(null)
    }
  }

  const handleArchive = async (project) => {
    try {
      setBusyId(project.id)
      const updated = await archiveProject(project.id, !project.archived)
      setProjects((current) => current.map((item) => (item.id === updated.id ? updated : item)))
      toast.success(project.archived ? 'Project restored' : 'Project archived')
    } catch (error) {
      toast.error(error.message || 'Unable to update project')
    } finally {
      setBusyId(null)
    }
  }

  const handleFavorite = async (project) => {
    try {
      setBusyId(project.id)
      const updated = await favoriteProject(project.id, !project.favorite)
      setProjects((current) => current.map((item) => (item.id === updated.id ? updated : item)))
      toast.success(updated.favorite ? 'Added to favorites' : 'Removed from favorites')
    } catch (error) {
      toast.error(error.message || 'Unable to update favorite state')
    } finally {
      setBusyId(null)
    }
  }

  const handleAi = async (project, action) => {
    try {
      setBusyId(project.id)
      const content = await generateAiContent(project.id, action)
      toast.success('AI content generated')
      window.alert(`${action}:\n\n${content}`)
    } catch (error) {
      toast.error(error.message || 'Unable to generate AI content')
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div className="page-shell space-y-6">
      <ProjectHeader onCreate={handleCreate} />
      <ProjectStats projects={filteredProjects} />
      <ProjectActions onCreate={handleCreate} onImport={() => toast('GitHub import is ready for the next iteration')} onGenerate={() => toast('Generate README is ready for the selected project')} onShare={() => toast('Share project is ready for the next iteration')} />

      <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-4 shadow-lg shadow-black/20">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <SearchBar value={filters.search} onChange={(value) => setFilters((current) => ({ ...current, search: value }))} />
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setViewMode('grid')} className={`rounded-2xl px-3 py-2 text-sm ${viewMode === 'grid' ? 'bg-violet-600 text-white' : 'border border-white/10 bg-slate-950/70 text-slate-300'}`}>Grid</button>
            <button type="button" onClick={() => setViewMode('table')} className={`rounded-2xl px-3 py-2 text-sm ${viewMode === 'table' ? 'bg-violet-600 text-white' : 'border border-white/10 bg-slate-950/70 text-slate-300'}`}>Table</button>
          </div>
        </div>
        <div className="mt-4">
          <FilterBar filters={filters} onChange={setFilters} />
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => <motion.div key={index} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="h-44 animate-pulse rounded-[24px] border border-white/10 bg-slate-900/70" />)}
        </div>
      ) : filteredProjects.length === 0 ? (
        <EmptyProjects />
      ) : viewMode === 'grid' ? (
        <ProjectGrid projects={filteredProjects} onView={(project) => handleAi(project, 'summary')} onEdit={handleEdit} onDelete={handleDelete} onDuplicate={handleDuplicate} onArchive={handleArchive} onFavorite={handleFavorite} onAi={handleAi} />
      ) : (
        <ProjectTable projects={filteredProjects} onView={(project) => handleAi(project, 'summary')} onEdit={handleEdit} onDelete={handleDelete} onDuplicate={handleDuplicate} onArchive={handleArchive} onFavorite={handleFavorite} />
      )}

      <AnimatePresence>
        {modalOpen ? <ProjectModal open={modalOpen} project={selectedProject} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} /> : null}
      </AnimatePresence>
    </div>
  )
}
