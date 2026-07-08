import { apiRequest } from '../lib/api'

const normalizeProject = (project) => ({
  ...project,
  techStack: project.tech_stack || project.techStack || [],
  githubRepoUrl: project.github_repo_url || project.githubRepoUrl || '',
  liveDemoUrl: project.live_demo_url || project.liveDemoUrl || '',
  thumbnailUrl: project.thumbnail_url || project.thumbnailUrl || '',
  screenshots: project.screenshots || [],
  tags: project.tags || [],
  startDate: project.start_date || project.startDate || '',
  notes: project.notes || '',
  favorite: Boolean(project.favorite),
  archived: Boolean(project.archived),
  createdAt: project.created_at || project.createdAt || '',
  updatedAt: project.updated_at || project.updatedAt || '',
  lastUpdated: project.last_updated || project.lastUpdated || '',
})

function toPayload(values) {
  return {
    title: values.title,
    description: values.description,
    status: values.status,
    category: values.category,
    tech_stack: values.techStack,
    github_repo_url: values.githubRepoUrl || null,
    live_demo_url: values.liveDemoUrl || null,
    tags: values.tags,
    start_date: values.startDate || null,
    notes: values.notes || '',
    favorite: Boolean(values.favorite),
    archived: Boolean(values.archived),
  }
}

export async function fetchProjects(params = {}) {
  const query = new URLSearchParams(params).toString()
  const response = await apiRequest(`/projects${query ? `?${query}` : ''}`)
  return (response?.data || []).map(normalizeProject)
}

export async function createProject(values) {
  const response = await apiRequest('/projects', { method: 'POST', body: JSON.stringify(toPayload(values)) })
  return normalizeProject(response.data)
}

export async function updateProject(id, values) {
  const response = await apiRequest(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(toPayload(values)) })
  return normalizeProject(response.data)
}

export async function deleteProject(id) {
  await apiRequest(`/projects/${id}`, { method: 'DELETE' })
}

export async function archiveProject(id, archived) {
  const response = await apiRequest(`/projects/${id}/archive`, { method: 'PATCH', body: JSON.stringify({ archived }) })
  return normalizeProject(response.data)
}

export async function favoriteProject(id, favorite) {
  const response = await apiRequest(`/projects/${id}/favorite`, { method: 'PATCH', body: JSON.stringify({ favorite }) })
  return normalizeProject(response.data)
}

export async function duplicateProject(project) {
  return createProject({
    ...project,
    title: `${project.title} Copy`,
    description: project.description || '',
    status: 'Planning',
    techStack: project.techStack || [],
    tags: project.tags || [],
    favorite: false,
    archived: false,
  })
}

export async function generateAiContent(id, action) {
  const response = await apiRequest(`/projects/${id}/ai`, { method: 'POST', body: JSON.stringify({ action }) })
  return response.data?.content || 'AI content is being generated.'
}
