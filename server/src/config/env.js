import dotenv from 'dotenv'

dotenv.config()

export const env = {
  port: process.env.PORT || 4000,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'https://devforge-ai-omega.vercel.app/',
  supabaseUrl: process.env.SUPABASE_URL || '',
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY || '',
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  apiUrl: process.env.API_URL || 'http://localhost:4000',
  openRouterApiKey: process.env.OPENROUTER_API_KEY || '',
  resendApiKey: process.env.RESEND_API_KEY || '',
}
