// supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase project URL and public anon key
const supabaseUrl = 'https://your-project-url.supabase.co';
const supabaseKey = 'your-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;