import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { AIActionPanel } from '../components/bugs/AIActionPanel'
import { BugGrid } from '../components/bugs/BugGrid'
import { BugModal } from '../components/bugs/BugModal'
import { BugTable } from '../components/bugs/BugTable'
import { EmptyState } from '../components/bugs/EmptyState'
import { FilterBar } from '../components/bugs/FilterBar'
import { SearchBar } from '../components/bugs/SearchBar'
import { Stats } from '../components/bugs/Stats'
import { BugTimeline } from '../components/bugs/BugTimeline'
import { RelatedBugCard } from '../components/bugs/RelatedBugCard'
import { CodeBlock } from '../components/bugs/CodeBlock'
import { SeverityBadge } from '../components/bugs/SeverityBadge'
import { StatusBadge } from '../components/bugs/StatusBadge'
import { archiveBug, createBug, deleteBug, duplicateBug, favoriteBug, fetchBugs, generateBugInsight, updateBug } from '../services/bugs'

const defaultFilters = { search: '', status: '', severity: '', technology: '', favorite: '', archived: 'false', sort: 'newest' }

export default function BugVaultPage() {
  const { user } = useAuth()
  const [bugs, setBugs] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedBug, setSelectedBug] = useState(null)
  const [viewMode, setViewMode] = useState('grid')
  const [filters, setFilters] = useState(defaultFilters)
  const [selectedBugDetail, setSelectedBugDetail] = useState(null)
  const [busyId, setBusyId] = useState(null)

  const loadBugs = async () => {
    if (!user) return
    setLoading(true)
    try {
      const data = await fetchBugs({
        search: filters.search,
        status: filters.status,
        severity: filters.severity,
        technology: filters.technology,
        favorite: filters.favorite,
        archived: filters.archived,
        sort: filters.sort,
      })
      setBugs(data)
    } catch (error) {
      toast.error(error.message || 'Unable to load bugs')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBugs()
  }, [user])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (user) {
        loadBugs()
      }
    }, 250)
    return () => window.clearTimeout(timer)
  }, [filters.search, filters.status, filters.severity, filters.technology, filters.favorite, filters.archived, filters.sort, user])

  const filteredBugs = useMemo(() => bugs, [bugs])
  const relatedBugs = useMemo(() => {
    if (!selectedBugDetail) return []
    return bugs.filter((bug) => bug.id !== selectedBugDetail.id && (bug.technology || []).some((item) => (selectedBugDetail.technology || []).includes(item)) && (bug.tags || []).some((tag) => (selectedBugDetail.tags || []).includes(tag))).slice(0, 3)
  }, [bugs, selectedBugDetail])

  const handleCreate = () => {
    setSelectedBug(null)
    setModalOpen(true)
  }

  const handleEdit = (bug) => {
    setSelectedBug(bug)
    setModalOpen(true)
  }

  const handleSubmit = async (values) => {
    try {
      if (selectedBug) {
        const updated = await updateBug(selectedBug.id, values)
        setBugs((current) => current.map((bug) => (bug.id === updated.id ? updated : bug)))
        toast.success('Bug updated')
      } else {
        const created = await createBug(values)
        setBugs((current) => [created, ...current])
        toast.success('Bug created')
      }
      setModalOpen(false)
      setSelectedBugDetail(null)
    } catch (error) {
      toast.error(error.message || 'Unable to save bug')
    }
  }

  const handleDelete = async (bug) => {
    if (!window.confirm(`Delete ${bug.title}?`)) return
    try {
      setBusyId(bug.id)
      await deleteBug(bug.id)
      setBugs((current) => current.filter((item) => item.id !== bug.id))
      toast.success('Bug deleted')
    } catch (error) {
      toast.error(error.message || 'Unable to delete bug')
    } finally {
      setBusyId(null)
    }
  }

  const handleDuplicate = async (bug) => {
    try {
      setBusyId(bug.id)
      const created = await duplicateBug(bug)
      setBugs((current) => [created, ...current])
      toast.success('Bug duplicated')
    } catch (error) {
      toast.error(error.message || 'Unable to duplicate bug')
    } finally {
      setBusyId(null)
    }
  }

  const handleArchive = async (bug) => {
    try {
      setBusyId(bug.id)
      const updated = await archiveBug(bug.id, !bug.archived)
      setBugs((current) => current.map((item) => (item.id === updated.id ? updated : item)))
      toast.success(bug.archived ? 'Bug restored' : 'Bug archived')
    } catch (error) {
      toast.error(error.message || 'Unable to update bug')
    } finally {
      setBusyId(null)
    }
  }

  const handleFavorite = async (bug) => {
    try {
      setBusyId(bug.id)
      const updated = await favoriteBug(bug.id, !bug.favorite)
      setBugs((current) => current.map((item) => (item.id === updated.id ? updated : item)))
      toast.success(updated.favorite ? 'Added to favorites' : 'Removed from favorites')
    } catch (error) {
      toast.error(error.message || 'Unable to update favorite state')
    } finally {
      setBusyId(null)
    }
  }

  const handleAi = async (bug, action) => {
    try {
      setBusyId(bug.id)
      const content = await generateBugInsight(bug.id, action)
      toast.success('AI insight ready')
      window.alert(`${action}:\n\n${content}`)
    } catch (error) {
      toast.error(error.message || 'Unable to generate AI insight')
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-violet-300">Bug Vault</p>
          <h2 className="text-2xl font-semibold text-white">Capture every bug, solution, and lesson learned.</h2>
        </div>
        <button type="button" onClick={handleCreate} className="inline-flex items-center rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-500">New bug</button>
      </div>

      <Stats bugs={filteredBugs} />

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
      ) : filteredBugs.length === 0 ? (
        <EmptyState />
      ) : viewMode === 'grid' ? (
        <BugGrid bugs={filteredBugs} onView={(bug) => setSelectedBugDetail(bug)} onEdit={handleEdit} onDelete={handleDelete} onDuplicate={handleDuplicate} onArchive={handleArchive} onFavorite={handleFavorite} />
      ) : (
        <BugTable bugs={filteredBugs} onView={(bug) => setSelectedBugDetail(bug)} onEdit={handleEdit} onDelete={handleDelete} onDuplicate={handleDuplicate} onArchive={handleArchive} onFavorite={handleFavorite} />
      )}

      {selectedBugDetail ? (
        <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-violet-300">Bug detail</p>
                <h3 className="mt-1 text-2xl font-semibold text-white">{selectedBugDetail.title}</h3>
              </div>
              <div className="flex gap-2">
                <SeverityBadge severity={selectedBugDetail.severity} />
                <StatusBadge status={selectedBugDetail.status} />
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-400">{selectedBugDetail.detailedDescription}</p>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="rounded-[24px] border border-white/10 bg-slate-950/60 p-4">
                <div className="text-sm font-medium text-white">Error</div>
                <div className="mt-3 text-sm text-slate-400">{selectedBugDetail.errorMessage}</div>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-slate-950/60 p-4">
                <div className="text-sm font-medium text-white">Solution</div>
                <div className="mt-3 text-sm text-slate-400">{selectedBugDetail.solution}</div>
              </div>
            </div>
            {selectedBugDetail.codeSnippet ? <div className="mt-6"><CodeBlock code={selectedBugDetail.codeSnippet} language="ts" /></div> : null}
            {selectedBugDetail.screenshotUrl ? <div className="mt-6"><img src={selectedBugDetail.screenshotUrl} alt={selectedBugDetail.title} className="h-64 w-full rounded-[24px] border border-white/10 object-cover" /></div> : null}
            <div className="mt-6 rounded-[24px] border border-white/10 bg-slate-950/60 p-4">
              <div className="text-sm font-medium text-white">Root Cause</div>
              <div className="mt-2 text-sm text-slate-400">{selectedBugDetail.rootCause}</div>
            </div>
          </div>
          <div className="space-y-6">
            <AIActionPanel onAction={(action) => handleAi(selectedBugDetail, action)} />
            <div className="rounded-[24px] border border-white/10 bg-slate-900/70 p-4">
              <div className="text-sm font-medium text-white">Related Bugs</div>
              <div className="mt-4 space-y-3">
                {relatedBugs.length === 0 ? <p className="text-sm text-slate-400">No related bugs yet.</p> : relatedBugs.map((bug) => <RelatedBugCard key={bug.id} bug={bug} onClick={() => setSelectedBugDetail(bug)} />)}
              </div>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-slate-900/70 p-4">
              <div className="text-sm font-medium text-white">Activity History</div>
              <div className="mt-4"><BugTimeline history={selectedBugDetail.activityHistory || []} /></div>
            </div>
          </div>
        </div>
      ) : null}

      <AnimatePresence>
        {modalOpen ? <BugModal open={modalOpen} bug={selectedBug} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} /> : null}
      </AnimatePresence>
    </div>
  )
}
