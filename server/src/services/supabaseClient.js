import { createClient } from '@supabase/supabase-js'
import { env } from '../config/env.js'

export const supabaseAdmin = env.supabaseUrl && env.supabaseServiceRoleKey
  ? createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
      auth: { persistSession: false },
    })
  : null

export const supabasePublic = env.supabaseUrl && env.supabaseAnonKey
  ? createClient(env.supabaseUrl, env.supabaseAnonKey)
  : null
