import { supabaseAdmin } from '../services/supabaseClient.js'

export async function authenticateRequest(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''

  if (!token) {
    return res.status(401).json({ success: false, message: 'Missing bearer token' })
  }

  const { data, error } = await supabaseAdmin.auth.getUser(token)
  if (error || !data?.user) {
    return res.status(401).json({ success: false, message: error?.message || 'Unable to authenticate request' })
  }

  req.user = data.user
  next()
}
