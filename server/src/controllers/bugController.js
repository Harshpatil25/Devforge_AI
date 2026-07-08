import { createBug, deleteBug, getBugById, getBugsForUser, toggleBugFlag, updateBug } from '../services/bugService.js'
import { generateBugInsight } from '../services/geminiService.js'
import { sendError, sendSuccess } from '../lib/apiResponse.js'

export async function listBugs(req, res) {
  try {
    const user = req.user
    const filters = {
      search: req.query.search || '',
      status: req.query.status || '',
      severity: req.query.severity || '',
      technology: req.query.technology || '',
      favorite: req.query.favorite || 'all',
      archived: req.query.archived || 'false',
      sort: req.query.sort || 'newest',
    }

    const { data, error } = await getBugsForUser({ userId: user.id, filters })
    if (error) {
      return sendError(res, error.message, 500)
    }

    return sendSuccess(res, data)
  } catch (error) {
    return sendError(res, error.message, 401)
  }
}

export async function createBugHandler(req, res) {
  try {
    const user = req.user
    const { data, error } = await createBug({ userId: user.id, payload: req.body })
    if (error) {
      return sendError(res, error.message, 500)
    }

    return sendSuccess(res, data, 201)
  } catch (error) {
    return sendError(res, error.message, 401)
  }
}

export async function updateBugHandler(req, res) {
  try {
    const user = req.user
    const { data, error } = await updateBug({ userId: user.id, bugId: req.params.id, payload: req.body })
    if (error) {
      return sendError(res, error.message, 500)
    }

    return sendSuccess(res, data)
  } catch (error) {
    return sendError(res, error.message, 401)
  }
}

export async function deleteBugHandler(req, res) {
  try {
    const user = req.user
    const { error } = await deleteBug({ userId: user.id, bugId: req.params.id })
    if (error) {
      return sendError(res, error.message, 500)
    }

    return sendSuccess(res, { deleted: true })
  } catch (error) {
    return sendError(res, error.message, 401)
  }
}

export async function archiveBugHandler(req, res) {
  try {
    const user = req.user
    const { data, error } = await toggleBugFlag({ userId: user.id, bugId: req.params.id, field: 'archived', value: req.body.archived })
    if (error) {
      return sendError(res, error.message, 500)
    }

    return sendSuccess(res, data)
  } catch (error) {
    return sendError(res, error.message, 401)
  }
}

export async function favoriteBugHandler(req, res) {
  try {
    const user = req.user
    const { data, error } = await toggleBugFlag({ userId: user.id, bugId: req.params.id, field: 'favorite', value: req.body.favorite })
    if (error) {
      return sendError(res, error.message, 500)
    }

    return sendSuccess(res, data)
  } catch (error) {
    return sendError(res, error.message, 401)
  }
}

export async function getBugHandler(req, res) {
  try {
    const user = req.user
    const { data, error } = await getBugById({ userId: user.id, bugId: req.params.id })
    if (error) {
      return sendError(res, error.message, 500)
    }

    return sendSuccess(res, data)
  } catch (error) {
    return sendError(res, error.message, 401)
  }
}

export async function generateAiBugHandler(req, res) {
  try {
    const user = req.user
    const { data: bugData } = await getBugById({ userId: user.id, bugId: req.params.id })
    if (!bugData) {
      return sendError(res, 'Bug not found', 404)
    }

    const content = await generateBugInsight({ title: bugData.title, description: bugData.detailed_description || bugData.short_description || '', action: req.body.action || 'summary' })
    return sendSuccess(res, { content })
  } catch (error) {
    return sendError(res, error.message, 401)
  }
}
