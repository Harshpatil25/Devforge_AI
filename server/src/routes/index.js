import { Router } from 'express'
import projectsRouter from './projects.js'
import bugsRouter from './bugs.js'
import aiRouter from './ai.js'

const router = Router()

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', version: 'v1' })
})

router.use('/projects', projectsRouter)
router.use('/bugs', bugsRouter)
router.use('/ai', aiRouter)

export default router
