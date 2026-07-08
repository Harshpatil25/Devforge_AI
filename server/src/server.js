import express from 'express'
import dotenv from 'dotenv'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { createApp } from './app.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = createApp()
const port = process.env.PORT || 4000

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'public')))
}

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
