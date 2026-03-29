import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tsikfhjhlujrfwqslswl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzaWtmaGpobHVqcmZ3cXNsc3dsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3Njc5OTUsImV4cCI6MjA5MDM0Mzk5NX0.5GQ_m27aqCGnNVK9fWe5THtlmLyr4xjiPgTlY-Ib5j8'

export default createClient(supabaseUrl, supabaseKey)