import { supabaseAdmin } from './supabaseClient.js'

const TABLE = 'bugs'

const normalizeBug = (bug) => ({
  ...bug,
  technology: bug.technology || [],
  tags: bug.tags || [],
  reference_links: bug.reference_links || [],
  screenshots: bug.screenshots || [],
  favorite: Boolean(bug.favorite),
  archived: Boolean(bug.archived),
  activity_history: bug.activity_history || [],
})

const applyFilters = (bugs, filters = {}) => {
  const normalized = [...bugs]
  const search = (filters.search || '').toLowerCase()
  const status = (filters.status || '').toLowerCase()
  const severity = (filters.severity || '').toLowerCase()
  const technology = (filters.technology || '').toLowerCase()
  const favorite = String(filters.favorite || 'all').toLowerCase()
  const archived = String(filters.archived || 'false').toLowerCase()

  return normalized.filter((bug) => {
    const matchesSearch = !search || [bug.title, bug.short_description, bug.error_message, bug.solution, bug.tags?.join(' '), bug.technology?.join(' ')].join(' ').toLowerCase().includes(search)
    const matchesStatus = !status || (bug.status || '').toLowerCase() === status
    const matchesSeverity = !severity || (bug.severity || '').toLowerCase() === severity
    const matchesTechnology = !technology || (bug.technology || []).some((item) => item.toLowerCase().includes(technology))
    const matchesFavorite = favorite === 'all' || (favorite === 'true' ? Boolean(bug.favorite) : !bug.favorite)
    const matchesArchived = archived === 'all' || (archived === 'true' ? Boolean(bug.archived) : !bug.archived)
    return matchesSearch && matchesStatus && matchesSeverity && matchesTechnology && matchesFavorite && matchesArchived
  })
}

const applySorting = (bugs, sort = 'newest') => {
  const sorted = [...bugs]
  switch (sort) {
    case 'oldest':
      return sorted.sort((a, b) => new Date(a.created_at || 0) - new Date(b.created_at || 0))
    case 'critical':
      return sorted.sort((a, b) => (b.severity === 'Critical' ? 1 : 0) - (a.severity === 'Critical' ? 1 : 0))
    case 'updated':
      return sorted.sort((a, b) => new Date(b.updated_at || b.created_at || 0) - new Date(a.updated_at || a.created_at || 0))
    case 'newest':
    default:
      return sorted.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
  }
}

export async function getBugsForUser({ userId, filters = {} }) {
  if (!supabaseAdmin) {
    return { data: [], error: null }
  }

  const { data, error } = await supabaseAdmin.from(TABLE).select('*').eq('user_id', userId).order('created_at', { ascending: false })
  if (error) {
    return { data: null, error }
  }

  const normalized = (data || []).map(normalizeBug)
  const filtered = applyFilters(normalized, filters)
  return { data: applySorting(filtered, filters.sort), error: null }
}

export async function createBug({ userId, payload }) {
  if (!supabaseAdmin) {
    return { data: null, error: new Error('Supabase admin client is not configured.') }
  }

  const now = new Date().toISOString()
  const insertPayload = {
    user_id: userId,
    title: payload.title,
    short_description: payload.short_description || '',
    detailed_description: payload.detailed_description || '',
    technology: payload.technology || [],
    programming_language: payload.programming_language || '',
    framework: payload.framework || '',
    severity: payload.severity || 'Medium',
    priority: payload.priority || 'Medium',
    status: payload.status || 'Open',
    error_message: payload.error_message || '',
    solution: payload.solution || '',
    root_cause: payload.root_cause || '',
    lessons_learned: payload.lessons_learned || '',
    tags: payload.tags || [],
    screenshot_url: payload.screenshot_url || '',
    code_snippet: payload.code_snippet || '',
    reference_links: payload.reference_links || [],
    favorite: Boolean(payload.favorite),
    archived: Boolean(payload.archived),
    created_at: now,
    updated_at: now,
    activity_history: [{ label: 'Created', detail: 'Bug entry created.' }],
  }

  const { data, error } = await supabaseAdmin.from(TABLE).insert(insertPayload).select().single()
  return { data: data ? normalizeBug(data) : null, error }
}

export async function updateBug({ userId, bugId, payload }) {
  if (!supabaseAdmin) {
    return { data: null, error: new Error('Supabase admin client is not configured.') }
  }

  const updatePayload = {
    title: payload.title,
    short_description: payload.short_description || '',
    detailed_description: payload.detailed_description || '',
    technology: payload.technology || [],
    programming_language: payload.programming_language || '',
    framework: payload.framework || '',
    severity: payload.severity || 'Medium',
    priority: payload.priority || 'Medium',
    status: payload.status || 'Open',
    error_message: payload.error_message || '',
    solution: payload.solution || '',
    root_cause: payload.root_cause || '',
    lessons_learned: payload.lessons_learned || '',
    tags: payload.tags || [],
    screenshot_url: payload.screenshot_url || '',
    code_snippet: payload.code_snippet || '',
    reference_links: payload.reference_links || [],
    favorite: Boolean(payload.favorite),
    archived: Boolean(payload.archived),
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabaseAdmin.from(TABLE).update(updatePayload).eq('id', bugId).eq('user_id', userId).select().single()
  return { data: data ? normalizeBug(data) : null, error }
}

export async function deleteBug({ userId, bugId }) {
  if (!supabaseAdmin) {
    return { error: new Error('Supabase admin client is not configured.') }
  }

  const { error } = await supabaseAdmin.from(TABLE).delete().eq('id', bugId).eq('user_id', userId)
  return { error }
}

export async function toggleBugFlag({ userId, bugId, field, value }) {
  if (!supabaseAdmin) {
    return { data: null, error: new Error('Supabase admin client is not configured.') }
  }

  const { data, error } = await supabaseAdmin.from(TABLE).update({ [field]: value, updated_at: new Date().toISOString() }).eq('id', bugId).eq('user_id', userId).select().single()
  return { data: data ? normalizeBug(data) : null, error }
}

export async function getBugById({ userId, bugId }) {
  if (!supabaseAdmin) {
    return { data: null, error: new Error('Supabase admin client is not configured.') }
  }

  const { data, error } = await supabaseAdmin.from(TABLE).select('*').eq('id', bugId).eq('user_id', userId).single()
  return { data: data ? normalizeBug(data) : null, error }
}
