import { apiRequest } from '../lib/api'

const normalizeHistoryItem = (item) => ({
  ...item,
  favorite: Boolean(item.favorite),
  createdAt: item.created_at || item.createdAt || '',
})

export async function generateAiContent(payload) {
  const response = await apiRequest('/ai/generate', { method: 'POST', body: JSON.stringify(payload) })
  return response.data || response
}

export async function generateReadme(payload) {
  const response = await apiRequest('/ai/readme', { method: 'POST', body: JSON.stringify(payload) })
  return response.data
}

export async function generateDocumentation(payload) {
  const response = await apiRequest('/ai/documentation', { method: 'POST', body: JSON.stringify(payload) })
  return response.data
}

export async function generateCommitMessage(payload) {
  const response = await apiRequest('/ai/commit', { method: 'POST', body: JSON.stringify(payload) })
  return response.data
}

export async function generateBugExplainer(payload) {
  const response = await apiRequest('/ai/bug-explainer', { method: 'POST', body: JSON.stringify(payload) })
  return response.data
}

export async function generateProjectDescription(payload) {
  const response = await apiRequest('/ai/project-description', { method: 'POST', body: JSON.stringify(payload) })
  return response.data
}

export async function generateReleaseNotes(payload) {
  const response = await apiRequest('/ai/release-notes', { method: 'POST', body: JSON.stringify(payload) })
  return response.data
}

export async function generateSessionSummary(payload) {
  const response = await apiRequest('/ai/session-summary', { method: 'POST', body: JSON.stringify(payload) })
  return response.data
}

export async function fetchAiHistory() {
  const response = await apiRequest('/ai/history')
  return (response?.data || []).map(normalizeHistoryItem)
}

export async function saveAiHistory(payload) {
  const response = await apiRequest('/ai/history', { method: 'POST', body: JSON.stringify(payload) })
  return normalizeHistoryItem(response.data)
}

export async function toggleFavoriteHistory(id, favorite) {
  const response = await apiRequest(`/ai/history/${id}/favorite`, { method: 'PATCH', body: JSON.stringify({ favorite }) })
  return normalizeHistoryItem(response.data)
}
