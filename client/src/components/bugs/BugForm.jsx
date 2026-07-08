import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { bugSchema } from '../../lib/bugSchemas'
import { ImageUploader } from './ImageUploader'
import { CodeBlock } from './CodeBlock'

const defaultTechStack = ['React', 'Express', 'Node', 'Supabase', 'JavaScript', 'TypeScript', 'Tailwind', 'SQL', 'Git', 'Docker']

export function BugForm({ bug, onClose, onSubmit }) {
  const [customTech, setCustomTech] = useState('')
  const [selectedTech, setSelectedTech] = useState(bug?.technology || [])
  const [tags, setTags] = useState(bug?.tags || [])
  const [tagInput, setTagInput] = useState('')
  const [screenshotName, setScreenshotName] = useState(bug?.screenshotUrl || '')

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bugSchema),
    defaultValues: {
      title: bug?.title || '',
      shortDescription: bug?.shortDescription || bug?.short_description || '',
      detailedDescription: bug?.detailedDescription || bug?.detailed_description || '',
      technology: bug?.technology || bug?.technologies || [],
      programmingLanguage: bug?.programmingLanguage || bug?.programming_language || '',
      framework: bug?.framework || '',
      severity: bug?.severity || 'Medium',
      priority: bug?.priority || 'Medium',
      status: bug?.status || 'Open',
      errorMessage: bug?.errorMessage || bug?.error_message || '',
      solution: bug?.solution || '',
      rootCause: bug?.rootCause || bug?.root_cause || '',
      lessonsLearned: bug?.lessonsLearned || bug?.lessons_learned || '',
      tags: bug?.tags || [],
      screenshotUrl: bug?.screenshotUrl || bug?.screenshot_url || '',
      codeSnippet: bug?.codeSnippet || bug?.code_snippet || '',
      referenceLinks: bug?.referenceLinks || bug?.reference_links || [],
      favorite: Boolean(bug?.favorite),
      archived: Boolean(bug?.archived),
    },
    mode: 'onChange',
  })

  const watchedTech = watch('technology')

  useEffect(() => {
    setSelectedTech(watchedTech || [])
  }, [watchedTech])

  useEffect(() => {
    setValue('technology', selectedTech)
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
    onSubmit({ ...values, technology: selectedTech, tags, screenshotUrl: screenshotName })
  }

  const selectedCount = useMemo(() => selectedTech.length, [selectedTech])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-4xl overflow-y-auto rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-2xl shadow-black/40">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-violet-300">{bug ? 'Edit bug' : 'Create bug'}</p>
            <h3 className="mt-1 text-2xl font-semibold text-white">{bug ? bug.title : 'New bug entry'}</h3>
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
            <label className="mb-2 block text-sm font-medium text-slate-200">Short Description</label>
            <textarea {...register('shortDescription')} rows="2" className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none" />
            {errors.shortDescription ? <p className="mt-2 text-sm text-rose-400">{errors.shortDescription.message}</p> : null}
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-200">Detailed Description</label>
            <textarea {...register('detailedDescription')} rows="4" className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none" />
            {errors.detailedDescription ? <p className="mt-2 text-sm text-rose-400">{errors.detailedDescription.message}</p> : null}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Programming Language</label>
            <input {...register('programmingLanguage')} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Framework</label>
            <input {...register('framework')} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Severity</label>
            <select {...register('severity')} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none">
              <option>Low</option><option>Medium</option><option>High</option><option>Critical</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Priority</label>
            <select {...register('priority')} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none">
              <option>Low</option><option>Medium</option><option>High</option><option>Urgent</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Status</label>
            <select {...register('status')} className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none">
              <option>Open</option><option>Solved</option><option>Recurring</option><option>Archived</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Error Message</label>
            <textarea {...register('errorMessage')} rows="3" className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none" />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-200">Technology Stack</label>
            <div className="flex flex-wrap gap-2">
              {defaultTechStack.map((tech) => {
                const active = selectedTech.includes(tech)
                return <button key={tech} type="button" onClick={() => (active ? setSelectedTech((value) => value.filter((item) => item !== tech)) : addTech(tech))} className={`rounded-full border px-3 py-2 text-sm ${active ? 'border-violet-500/40 bg-violet-500/10 text-violet-300' : 'border-white/10 bg-slate-950/70 text-slate-300'}`}>{tech}</button>
              })}
            </div>
            <div className="mt-3 flex gap-2">
              <input value={customTech} onChange={(event) => setCustomTech(event.target.value)} placeholder="Add custom technology" className="flex-1 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none" />
              <button type="button" onClick={addCustomTech} className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-300">Add</button>
            </div>
            <p className="mt-2 text-sm text-slate-400">{selectedCount} selected</p>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-200">Solution</label>
            <textarea {...register('solution')} rows="4" className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Root Cause</label>
            <textarea {...register('rootCause')} rows="3" className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Lessons Learned</label>
            <textarea {...register('lessonsLearned')} rows="3" className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none" />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-200">Tags</label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => <span key={tag} className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-slate-300">{tag}</span>)}
            </div>
            <div className="mt-3 flex gap-2">
              <input value={tagInput} onChange={(event) => setTagInput(event.target.value)} placeholder="Add tag" className="flex-1 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none" />
              <button type="button" onClick={addTag} className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-300">Add</button>
            </div>
          </div>

          <div className="md:col-span-2">
            <ImageUploader value={screenshotName} onChange={(event) => setScreenshotName(event.target.files?.[0]?.name || '')} />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-200">Code Snippet</label>
            <textarea {...register('codeSnippet')} rows="6" className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none" />
            {watch('codeSnippet') ? <div className="mt-4"><CodeBlock code={watch('codeSnippet')} language="ts" /></div> : null}
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-200">Reference Links</label>
            <input {...register('referenceLinks')} placeholder="https://example.com" className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none" />
          </div>

          <div className="md:col-span-2 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm font-medium text-slate-300">Cancel</button>
            <button type="submit" className="rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white">Save bug</button>
          </div>
        </form>
      </div>
    </div>
  )
}
