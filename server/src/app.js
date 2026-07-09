import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { errorHandler } from './middleware/errorHandler.js'
import { notFoundHandler } from './middleware/notFoundHandler.js'
import apiRouter from './routes/index.js'

dotenv.config()

export function createApp() {
  const app = express()

  app.use(helmet())
  app.use(compression())
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || 'https://devforge-ai-omega.vercel.app/',
      credentials: true,
    }),
  )
  app.use(express.json({ limit: '1mb' }))
  app.use(cookieParser())
  app.use(morgan('dev'))

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', service: 'devforge-ai-server' })
  })

  app.use('/api/v1', apiRouter)

  app.use(notFoundHandler)
  app.use(errorHandler)

  return app
}
