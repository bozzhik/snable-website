import {createClient} from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_SUPABASE_URL!
const supabaseKey = process.env.NEXT_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables. Please check NEXT_SUPABASE_URL and NEXT_SUPABASE_ANON_KEY in .env.local')
}

export const supabase = createClient(supabaseUrl, supabaseKey)
