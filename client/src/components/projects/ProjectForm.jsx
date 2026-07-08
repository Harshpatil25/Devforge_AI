import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { projectSchema } from '../../lib/projectSchemas'
import { X } from 'lucide-react'

const defaultTechStack = ['React', 'Node.js', 'Express', 'Supabase', 'Tailwind', 'TypeScript']

export function ProjectForm({ project, onClose, onSubmit }) {
  const [customTech, setCustomTech] = useState('')
  const [selectedTech, setSelectedTech] = useState(project?.techStack || [])
  const [tags, setTags] = useState(project?.tags || [])
  const [tagInput, setTagInput] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project?.title || '',
      description: project?.description || '',
      status: project?.status || 'Planning',
      category: project?.category || 'Product',
      techStack: project?.techStack || [],
      githubRepoUrl: project?.githubRepoUrl || '',
      liveDemoUrl: project?.liveDemoUrl || '',
      tags: project?.tags || [],
      startDate: project?.startDate || '',
      notes: project?.notes || '',
      favorite: Boolean(project?.favorite),
      archived: Boolean(project?.archived),
    },
    mode: 'onChange',
  })

  const watchedTech = watch('techStack')
  useEffect(() => {
    setSelectedTech(watchedTech || [])
  }, [watchedTech])

  useEffect(() => {
    setValue('techStack', selectedTech)
  }, [selectedTech, setValue])

  useEffect(() => {
    setValue('tags', tags)
  }, [tags, setValue])

  const addTech = (tech) => {
    if (!tech || selectedTech.includes(tech)) return
    setSelectedTech((value) => [...value, tech])
  }

  const addCustomTech = () => {
    if (!customTech.trim()) return
    addTech(customTech.trim())
    setCustomTech('')
  }

  const addTag = () => {
    if (!tagInput.trim() || tags.includes(tagInput.trim())) return
    setTags((value) => [...value, tagInput.trim()])
    setTagInput('')
  }

  const submit = (values) => {
    onSubmit({ ...values, techStack: selectedTech, tags })
  }

  const selectedCount = useMemo(() => selectedTech.length, [selectedTech])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-3xl rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-2xl shadow-black/40">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-violet-300">{project ? 'Edit project' : 'Create project'}</p>
            <h3 className="mt-1 text-2xl font-semibold text-white">{project ? project.title : 'New project'}</h3>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-white/10 p-2 text-slate-400 transition hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit(submit)}>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-200">Title</label>
            <input {...register('title')} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none" />
            {errors.title ? <p className="mt-2 text-sm text-rose-400">{errors.title.message}</p> : null}
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-200">Description</label>
            <textarea {...register('description')} rows="4" className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none" />
            {errors.description ? <p className="mt-2 text-sm text-rose-400">{errors.description.message}</p> : null}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Status</label>
            <select {...register('status')} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none">
              <option>Planning</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>Archived</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Category</label>
            <input {...register('category')} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none" />
            {errors.category ? <p className="mt-2 text-sm text-rose-400">{errors.category.message}</p> : null}
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-200">Tech Stack</label>
            <div className="flex flex-wrap gap-2">
              {defaultTechStack.map((tech) => {
                const active = selectedTech.includes(tech)
                return <button key={tech} type="button" onClick={() => (active ? setSelectedTech((value) => value.filter((item) => item !== tech)) : addTech(tech))} className={`rounded-full border px-3 py-2 text-sm ${active ? 'border-violet-500/40 bg-violet-500/10 text-violet-300' : 'border-white/10 bg-slate-950/70 text-slate-300'}`}>{tech}</button>
              })}
            </div>
            <div className="mt-3 flex gap-2">
              <input value={customTech} onChange={(event) => setCustomTech(event.target.value)} placeholder="Add a custom technology" className="flex-1 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none" />
              <button type="button" onClick={addCustomTech} className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-300">Add</button>
            </div>
            <p className="mt-2 text-sm text-slate-400">{selectedCount} selected</p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">GitHub Repository</label>
            <input {...register('githubRepoUrl')} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none" />
            {errors.githubRepoUrl ? <p className="mt-2 text-sm text-rose-400">{errors.githubRepoUrl.message}</p> : null}
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Live Demo</label>
            <input {...register('liveDemoUrl')} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none" />
            {errors.liveDemoUrl ? <p className="mt-2 text-sm text-rose-400">{errors.liveDemoUrl.message}</p> : null}
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-200">Tags</label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => <span key={tag} className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-slate-300">{tag}</span>)}
            </div>
            <div className="mt-3 flex gap-2">
              <input value={tagInput} onChange={(event) => setTagInput(event.target.value)} placeholder="Add a tag" className="flex-1 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none" />
              <button type="button" onClick={addTag} className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-300">Add</button>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Start Date</label>
            <input type="date" {...register('startDate')} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Notes</label>
            <textarea {...register('notes')} rows="3" className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none" />
          </div>

          <div className="md:col-span-2 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm font-medium text-slate-300">Cancel</button>
            <button type="submit" className="rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white">Save project</button>
          </div>
        </form>
      </div>
    </div>
  )
}
