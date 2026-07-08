import { supabaseAdmin } from '../services/supabaseClient.js'

const TABLE = 'projects'

const normalizeProject = (project) => ({
  ...project,
  tech_stack: project.tech_stack || [],
  screenshots: project.screenshots || [],
  tags: project.tags || [],
})

const applyFilters = (projects, filters = {}) => {
  const search = (filters.search || '').toLowerCase()
  const status = (filters.status || '').toLowerCase()
  const tech = (filters.tech || '').toLowerCase()
  const favoriteOnly = filters.favorite === 'true'
  const archivedOnly = filters.archived === 'true'
  const archivedMode = filters.archived === 'all' ? null : archivedOnly

  return projects.filter((project) => {
    const matchesSearch = !search || [project.title, project.description, project.category, project.status, ...(project.tags || []), ...(project.tech_stack || [])]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
      .includes(search)

    const matchesStatus = !status || project.status?.toLowerCase() === status
    const matchesTech = !tech || (project.tech_stack || []).some((value) => value.toLowerCase().includes(tech))
    const matchesFavorite = !favoriteOnly || Boolean(project.favorite)
    const matchesArchived = archivedMode === null ? true : Boolean(project.archived) === archivedOnly

    return matchesSearch && matchesStatus && matchesTech && matchesFavorite && matchesArchived
  })
}

const applySorting = (projects, sort = 'updated') => {
  const sorted = [...projects]

  switch (sort) {
    case 'newest':
      return sorted.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
    case 'oldest':
      return sorted.sort((a, b) => new Date(a.created_at || 0) - new Date(b.created_at || 0))
    case 'alphabetical':
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
    case 'updated':
    default:
      return sorted.sort((a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0))
  }
}

export async function getProjectsForUser({ userId, filters = {} }) {
  if (!supabaseAdmin) {
    return { data: [], error: null }
  }

  const { data, error } = await supabaseAdmin.from(TABLE).select('*').eq('user_id', userId).order('updated_at', { ascending: false })

  if (error) {
    return { data: [], error }
  }

  const normalized = (data || []).map(normalizeProject)
  const filtered = applyFilters(normalized, filters)
  return { data: applySorting(filtered, filters.sort), error: null }
}

export async function createProject({ userId, payload }) {
  if (!supabaseAdmin) {
    return { data: null, error: new Error('Supabase admin client is not configured.') }
  }

  const insertPayload = {
    user_id: userId,
    title: payload.title,
    description: payload.description || '',
    status: payload.status || 'Planning',
    category: payload.category || 'Product',
    tech_stack: payload.tech_stack || [],
    github_repo_url: payload.github_repo_url || null,
    live_demo_url: payload.live_demo_url || null,
    thumbnail_url: payload.thumbnail_url || null,
    screenshots: payload.screenshots || [],
    tags: payload.tags || [],
    start_date: payload.start_date || null,
    notes: payload.notes || '',
    favorite: Boolean(payload.favorite),
    archived: Boolean(payload.archived),
    last_updated: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabaseAdmin.from(TABLE).insert(insertPayload).select().single()
  return { data: data ? normalizeProject(data) : null, error }
}

export async function updateProject({ userId, projectId, payload }) {
  if (!supabaseAdmin) {
    return { data: null, error: new Error('Supabase admin client is not configured.') }
  }

  const updatePayload = {
    ...payload,
    last_updated: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabaseAdmin.from(TABLE).update(updatePayload).eq('id', projectId).eq('user_id', userId).select().single()
  return { data: data ? normalizeProject(data) : null, error }
}

export async function deleteProject({ userId, projectId }) {
  if (!supabaseAdmin) {
    return { error: new Error('Supabase admin client is not configured.') }
  }

  const { error } = await supabaseAdmin.from(TABLE).delete().eq('id', projectId).eq('user_id', userId)
  return { error }
}

export async function toggleProjectFlag({ userId, projectId, field, value }) {
  if (!supabaseAdmin) {
    return { data: null, error: new Error('Supabase admin client is not configured.') }
  }

  const { data, error } = await supabaseAdmin.from(TABLE).update({ [field]: value, last_updated: new Date().toISOString(), updated_at: new Date().toISOString() }).eq('id', projectId).eq('user_id', userId).select().single()
  return { data: data ? normalizeProject(data) : null, error }
}

export async function getProjectById({ userId, projectId }) {
  if (!supabaseAdmin) {
    return { data: null, error: new Error('Supabase admin client is not configured.') }
  }

  const { data, error } = await supabaseAdmin.from(TABLE).select('*').eq('id', projectId).eq('user_id', userId).single()
  return { data: data ? normalizeProject(data) : null, error }
}
