import { z } from 'zod'

const envSchema = z.object({
  MODE: z.enum(['production', 'development', 'test']),
  VITE_SUPABASE_URL: z.string(),
  VITE_SUPABASE_ANON_KEY: z.string(),
  VITE_REDIRECT_URL: z.string(),
})

export const env = envSchema.parse(import.meta.env)
