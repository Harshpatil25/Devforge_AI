import { Router } from 'express'
import { archiveProjectHandler, createProjectHandler, deleteProjectHandler, favoriteProjectHandler, generateAiContentHandler, getProjectHandler, listProjects, updateProjectHandler } from '../controllers/projectController.js'
import { authenticateRequest } from '../middleware/authenticate.js'

const router = Router()

router.use(authenticateRequest)
router.get('/', listProjects)
router.post('/', createProjectHandler)
router.get('/:id', getProjectHandler)
router.put('/:id', updateProjectHandler)
router.delete('/:id', deleteProjectHandler)
router.patch('/:id/archive', archiveProjectHandler)
router.patch('/:id/favorite', favoriteProjectHandler)
router.post('/:id/ai', generateAiContentHandler)

export default router
