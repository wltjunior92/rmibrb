import { createClient } from '@supabase/supabase-js'

import { env } from '@/env'

const supabaseUrl = env.VITE_SUPABASE_URL ?? ''
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY ?? ''

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase
