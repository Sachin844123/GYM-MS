import { supabase, logger } from './supabase.js';
import { ROLES } from './config.js';

const loginForm = document.getElementById('login-form');
const errorMsg = document.getElementById('error-msg');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Clear previous errors
    errorMsg.textContent = '';

    try {
        // Check if Supabase is initialized
        if (!supabase) {
            throw new Error('Database connection not initialized. Please refresh the page.');
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) throw error;

        if (!data.user) {
            throw new Error('Login failed. Please try again.');
        }

        logger.log('LOGIN', { email, success: true });

        // Get user role
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', data.user.id)
            .single();

        if (profileError) {
            console.error('Profile error:', profileError);
            throw new Error('Unable to load user profile. Please contact support.');
        }

        // Redirect based on role
        if (profile?.role === ROLES.ADMIN) {
            window.location.href = '../pages/admin.html';
        } else {
            window.location.href = '../pages/member.html';
        }
    } catch (error) {
        console.error('Login error:', error);
        errorMsg.textContent = error.message || 'Login failed. Please try again.';
        logger.log('LOGIN_FAILED', { email, error: error.message });
    }
});
