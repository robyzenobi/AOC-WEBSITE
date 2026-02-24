import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase;
let initializationError = null;

try {
    if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === "YOUR_SUPABASE_URL" || supabaseAnonKey === "YOUR_SUPABASE_ANON_KEY") {
        throw new Error("Supabase credentials are missing. Please check your .env file or provide them.");
    }

    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log("Supabase initialized successfully");
} catch (error) {
    console.error("Supabase Initialization Error:", error);
    initializationError = error.message;
}

export { supabase, initializationError };
