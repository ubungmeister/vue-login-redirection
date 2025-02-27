import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://wzdcckyxnohaovqblfrr.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6ZGNja3l4bm9oYW92cWJsZnJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0OTI1MDksImV4cCI6MjA1NjA2ODUwOX0.azmB2OMQNN0GhPnOpi-QSqoOX0AGLieJZt3OgdPLH0E'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
