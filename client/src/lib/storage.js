const STORAGE_PREFIX = 'devforge:'

export function readStorage(key, fallback = null) {
  if (typeof window === 'undefined') return fallback

  try {
    const rawValue = window.localStorage.getItem(`${STORAGE_PREFIX}${key}`)
    return rawValue ? JSON.parse(rawValue) : fallback
  } catch {
    return fallback
  }
}

export function writeStorage(key, value) {
  if (typeof window === 'undefined') return

  window.localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value))
}

export function removeStorage(key) {
  if (typeof window === 'undefined') return

  window.localStorage.removeItem(`${STORAGE_PREFIX}${key}`)
}

export function createId(prefix = 'item') {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `${prefix}-${crypto.randomUUID()}`
  }

  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`
}
