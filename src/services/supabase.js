
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://ajlzltefctckddtemhod.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqbHpsdGVmY3Rja2RkdGVtaG9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MDU2MTAsImV4cCI6MjA3ODE4MTYxMH0.-6D1m76ZVHFSWmW4EzJUWmybpxpeCwsj3DDw9oNsSgo"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase