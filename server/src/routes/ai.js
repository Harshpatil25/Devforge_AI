import { Router } from 'express'
import { generateAiContent, listAiHistory, saveAiHistory, toggleAiHistoryFavorite } from '../controllers/aiController.js'
import { authenticateRequest } from '../middleware/authenticate.js'

const router = Router()

router.use(authenticateRequest)
router.post('/generate', generateAiContent)
router.post('/readme', generateAiContent)
router.post('/documentation', generateAiContent)
router.post('/commit', generateAiContent)
router.post('/bug-explainer', generateAiContent)
router.post('/project-description', generateAiContent)
router.post('/release-notes', generateAiContent)
router.post('/session-summary', generateAiContent)
router.get('/history', listAiHistory)
router.post('/history', saveAiHistory)
router.patch('/history/:id/favorite', toggleAiHistoryFavorite)

export default router
