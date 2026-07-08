export function logger(message, level = 'info') {
  const prefix = level.toUpperCase()
  console.log(`[${prefix}] ${message}`)
}
