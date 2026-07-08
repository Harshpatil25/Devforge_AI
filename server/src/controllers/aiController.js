import { generateProjectInsight, generateBugInsight } from '../services/geminiService.js'
import { sendError, sendSuccess } from '../lib/apiResponse.js'

const HISTORY_STORE = []

function buildHistoryEntry({ title, output, tool, favorite = false }) {
  return {
    id: `${tool}-${Date.now()}`,
    tool,
    title,
    content: output,
    favorite,
    created_at: new Date().toISOString(),
  }
}

export async function generateAiContent(req, res) {
  try {
    const { tool = 'readme', title = 'Untitled project', description = '', action = 'summary' } = req.body || {}

    const content = tool === 'bug-explainer'
      ? await generateBugInsight({ title, description, action })
      : await generateProjectInsight({ title, description, action })

    const entry = buildHistoryEntry({ title, output: content, tool })
    HISTORY_STORE.push(entry)

    return sendSuccess(res, { content, history: entry })
  } catch (error) {
    return sendError(res, error.message, 500)
  }
}

export function listAiHistory(_req, res) {
  return sendSuccess(res, HISTORY_STORE.slice().reverse())
}

export function saveAiHistory(req, res) {
  try {
    const entry = buildHistoryEntry({ title: req.body?.title || 'Untitled', output: req.body?.content || '', tool: req.body?.tool || 'readme' })
    HISTORY_STORE.push(entry)
    return sendSuccess(res, entry, 201)
  } catch (error) {
    return sendError(res, error.message, 500)
  }
}

export function toggleAiHistoryFavorite(req, res) {
  try {
    const entry = HISTORY_STORE.find((item) => item.id === req.params.id)
    if (!entry) {
      return sendError(res, 'History item not found', 404)
    }

    entry.favorite = Boolean(req.body?.favorite)
    return sendSuccess(res, entry)
  } catch (error) {
    return sendError(res, error.message, 500)
  }
}
