import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

if (supabase) {
  console.log('✅ Supabase conectado con éxito')
} else {
  console.error('Error al conectar a Supabase')
}
