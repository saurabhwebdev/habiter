import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yfhfjeknlapdbzrvlfre.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmaGZqZWtubGFwZGJ6cnZsZnJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxOTA5NjQsImV4cCI6MjA2NDc2Njk2NH0.jCbYeYOlQk6FN0xsyogMUi-SXSZRAlkO9UiqNcQDoXI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 