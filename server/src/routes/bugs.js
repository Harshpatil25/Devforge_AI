import { Router } from 'express'
import { archiveBugHandler, createBugHandler, deleteBugHandler, favoriteBugHandler, generateAiBugHandler, getBugHandler, listBugs, updateBugHandler } from '../controllers/bugController.js'
import { authenticateRequest } from '../middleware/authenticate.js'

const router = Router()

router.use(authenticateRequest)
router.get('/', listBugs)
router.post('/', createBugHandler)
router.get('/:id', getBugHandler)
router.put('/:id', updateBugHandler)
router.delete('/:id', deleteBugHandler)
router.patch('/:id/archive', archiveBugHandler)
router.patch('/:id/favorite', favoriteBugHandler)
router.post('/:id/ai', generateAiBugHandler)

export default router
