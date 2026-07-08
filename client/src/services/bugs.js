import { apiRequest } from '../lib/api'

const normalizeBug = (bug) => ({
  ...bug,
  technologies: bug.technologies || bug.technology || [],
  technology: bug.technology || bug.technologies || [],
  tags: bug.tags || [],
  referenceLinks: bug.reference_links || bug.referenceLinks || [],
  reference_links: bug.reference_links || bug.referenceLinks || [],
  screenshots: bug.screenshots || [],
  screenshotUrl: bug.screenshot_url || bug.screenshotUrl || '',
  screenshot_url: bug.screenshot_url || bug.screenshotUrl || '',
  codeSnippet: bug.code_snippet || bug.codeSnippet || '',
  code_snippet: bug.code_snippet || bug.codeSnippet || '',
  shortDescription: bug.short_description || bug.shortDescription || '',
  short_description: bug.short_description || bug.shortDescription || '',
  detailedDescription: bug.detailed_description || bug.detailedDescription || '',
  detailed_description: bug.detailed_description || bug.detailedDescription || '',
  errorMessage: bug.error_message || bug.errorMessage || '',
  error_message: bug.error_message || bug.errorMessage || '',
  rootCause: bug.root_cause || bug.rootCause || '',
  root_cause: bug.root_cause || bug.rootCause || '',
  lessonsLearned: bug.lessons_learned || bug.lessonsLearned || '',
  lessons_learned: bug.lessons_learned || bug.lessonsLearned || '',
  programmingLanguage: bug.programming_language || bug.programmingLanguage || '',
  programming_language: bug.programming_language || bug.programmingLanguage || '',
  createdAt: bug.created_at || bug.createdAt || '',
  updatedAt: bug.updated_at || bug.updatedAt || '',
  favorite: Boolean(bug.favorite),
  archived: Boolean(bug.archived),
  activityHistory: bug.activity_history || bug.activityHistory || [],
  activity_history: bug.activity_history || bug.activityHistory || [],
})

function toPayload(values) {
  return {
    title: values.title,
    short_description: values.shortDescription || '',
    detailed_description: values.detailedDescription || '',
    technology: values.technology || values.technologies || [],
    programming_language: values.programmingLanguage || '',
    framework: values.framework || '',
    severity: values.severity || 'Medium',
    priority: values.priority || 'Medium',
    status: values.status || 'Open',
    error_message: values.errorMessage || '',
    solution: values.solution || '',
    root_cause: values.rootCause || '',
    lessons_learned: values.lessonsLearned || '',
    tags: values.tags || [],
    screenshot_url: values.screenshotUrl || '',
    code_snippet: values.codeSnippet || '',
    reference_links: values.referenceLinks || [],
    favorite: Boolean(values.favorite),
    archived: Boolean(values.archived),
  }
}

export async function fetchBugs(params = {}) {
  const query = new URLSearchParams(params).toString()
  const response = await apiRequest(`/bugs${query ? `?${query}` : ''}`)
  return (response?.data || []).map(normalizeBug)
}

export async function createBug(values) {
  const response = await apiRequest('/bugs', { method: 'POST', body: JSON.stringify(toPayload(values)) })
  return normalizeBug(response.data)
}

export async function updateBug(id, values) {
  const response = await apiRequest(`/bugs/${id}`, { method: 'PUT', body: JSON.stringify(toPayload(values)) })
  return normalizeBug(response.data)
}

export async function deleteBug(id) {
  await apiRequest(`/bugs/${id}`, { method: 'DELETE' })
}

export async function archiveBug(id, archived) {
  const response = await apiRequest(`/bugs/${id}/archive`, { method: 'PATCH', body: JSON.stringify({ archived }) })
  return normalizeBug(response.data)
}

export async function favoriteBug(id, favorite) {
  const response = await apiRequest(`/bugs/${id}/favorite`, { method: 'PATCH', body: JSON.stringify({ favorite }) })
  return normalizeBug(response.data)
}

export async function duplicateBug(bug) {
  return createBug({
    ...bug,
    title: `${bug.title} Copy`,
    shortDescription: bug.shortDescription || bug.short_description || '',
    detailedDescription: bug.detailedDescription || bug.detailed_description || '',
    technology: bug.technology || bug.technologies || [],
    programmingLanguage: bug.programmingLanguage || bug.programming_language || '',
    framework: bug.framework || '',
    severity: 'Medium',
    priority: 'Medium',
    status: 'Open',
    errorMessage: bug.errorMessage || bug.error_message || '',
    solution: bug.solution || '',
    rootCause: bug.rootCause || bug.root_cause || '',
    lessonsLearned: bug.lessonsLearned || bug.lessons_learned || '',
    tags: bug.tags || [],
    screenshotUrl: bug.screenshotUrl || bug.screenshot_url || '',
    codeSnippet: bug.codeSnippet || bug.code_snippet || '',
    referenceLinks: bug.referenceLinks || bug.reference_links || [],
    favorite: false,
    archived: false,
  })
}

export async function generateBugInsight(id, action) {
  const response = await apiRequest(`/bugs/${id}/ai`, { method: 'POST', body: JSON.stringify({ action }) })
  return response.data?.content || 'AI insight is being prepared.'
}
