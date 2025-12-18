import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

// Wait for Supabase to load from CDN
const initSupabase = () => {
    if (typeof window.supabase === 'undefined') {
        console.error('Supabase not loaded. Make sure the CDN script is included.');
        return null;
    }
    return window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
};

// Initialize Supabase client
export const supabase = initSupabase();

// Logger utility
export const logger = {
    log: (action, details) => {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] ${action}:`, details);
        // Store logs in Supabase only if initialized
        if (supabase) {
            supabase.from('logs').insert({
                action,
                details: JSON.stringify(details),
                timestamp
            }).then(({ error }) => {
                if (error) console.error('Log insert error:', error);
            });
        }
    }
};
