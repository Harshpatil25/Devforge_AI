import { createProject, deleteProject, getProjectById, getProjectsForUser, toggleProjectFlag, updateProject } from '../services/projectService.js'
import { generateProjectInsight } from '../services/geminiService.js'
import { sendError, sendSuccess } from '../lib/apiResponse.js'

export async function listProjects(req, res) {
  try {
    const user = req.user
    const filters = {
      search: req.query.search || '',
      status: req.query.status || '',
      tech: req.query.tech || '',
      favorite: req.query.favorite || 'all',
      archived: req.query.archived || 'false',
      sort: req.query.sort || 'updated',
    }

    const { data, error } = await getProjectsForUser({ userId: user.id, filters })
    if (error) {
      return sendError(res, error.message, 500)
    }

    return sendSuccess(res, data)
  } catch (error) {
    return sendError(res, error.message, 401)
  }
}

export async function createProjectHandler(req, res) {
  try {
    const user = req.user
    const { data, error } = await createProject({ userId: user.id, payload: req.body })
    if (error) {
      return sendError(res, error.message, 500)
    }

    return sendSuccess(res, data, 201)
  } catch (error) {
    return sendError(res, error.message, 401)
  }
}

export async function updateProjectHandler(req, res) {
  try {
    const user = req.user
    const { data, error } = await updateProject({ userId: user.id, projectId: req.params.id, payload: req.body })
    if (error) {
      return sendError(res, error.message, 500)
    }

    return sendSuccess(res, data)
  } catch (error) {
    return sendError(res, error.message, 401)
  }
}

export async function deleteProjectHandler(req, res) {
  try {
    const user = req.user
    const { error } = await deleteProject({ userId: user.id, projectId: req.params.id })
    if (error) {
      return sendError(res, error.message, 500)
    }

    return sendSuccess(res, { deleted: true })
  } catch (error) {
    return sendError(res, error.message, 401)
  }
}

export async function archiveProjectHandler(req, res) {
  try {
    const user = req.user
    const { data, error } = await toggleProjectFlag({ userId: user.id, projectId: req.params.id, field: 'archived', value: req.body.archived })
    if (error) {
      return sendError(res, error.message, 500)
    }

    return sendSuccess(res, data)
  } catch (error) {
    return sendError(res, error.message, 401)
  }
}

export async function favoriteProjectHandler(req, res) {
  try {
    const user = req.user
    const { data, error } = await toggleProjectFlag({ userId: user.id, projectId: req.params.id, field: 'favorite', value: req.body.favorite })
    if (error) {
      return sendError(res, error.message, 500)
    }

    return sendSuccess(res, data)
  } catch (error) {
    return sendError(res, error.message, 500)
  }
}

export async function getProjectHandler(req, res) {
  try {
    const user = req.user
    const { data, error } = await getProjectById({ userId: user.id, projectId: req.params.id })
    if (error) {
      return sendError(res, error.message, 500)
    }

    return sendSuccess(res, data)
  } catch (error) {
    return sendError(res, error.message, 401)
  }
}

export async function generateAiContentHandler(req, res) {
  try {
    const user = req.user
    const { data: projectData } = await getProjectById({ userId: user.id, projectId: req.params.id })
    if (!projectData) {
      return sendError(res, 'Project not found', 404)
    }

    const content = await generateProjectInsight({ title: projectData.title, description: projectData.description, action: req.body.action || 'summary' })
    return sendSuccess(res, { content })
  } catch (error) {
    return sendError(res, error.message, 401)
  }
}
