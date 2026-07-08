const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1'

function buildHeaders(headers = {}) {
  const authToken = localStorage.getItem('devforge-auth-token')

  return {
    'Content-Type': 'application/json',
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    ...headers,
  }
}

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: buildHeaders(options.headers),
    ...options,
  })

  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(payload?.message || `Request failed with status ${response.status}`)
  }

  return payload
}
