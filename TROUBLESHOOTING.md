g# Login & Authentication Troubleshooting Guide

## Issues Fixed

### 1. Wrong Redirect Paths
**Problem**: After login, redirects to `admin.html` and `member.html` failed because files are in `pages/` folder.
**Solution**: Updated paths to `/pages/admin.html` and `/pages/member.html`

### 2. Supabase Initialization
**Problem**: Supabase client may not be initialized if CDN script hasn't loaded.
**Solution**: Added initialization check with error handling.

### 3. Missing Profile Records
**Problem**: Users can authenticate but have no profile record, causing login to fail.
**Solution**: Created `database/profile-trigger.sql` to automatically create profiles for new users.

## Setup Checklist

### Step 1: Database Setup
Run these SQL files in your Supabase SQL Editor in order:

1. `database/schema.sql` - Creates all tables and RLS policies
2. `database/profile-trigger.sql` - Sets up automatic profile creation
3. `database/sample-data.sql` - (Optional) Adds test data

### Step 2: Create Test Users

In Supabase Dashboard > Authentication > Users:

1. **Create Admin User**:
   - Email: `admin@gym.com`
   - Password: `Admin123!`
   - After creation, note the User ID

2. **Create Member User**:
   - Email: `member@gym.com`
   - Password: `Member123!`
   - After creation, note the User ID

### Step 3: Set Admin Role

Run this SQL in Supabase SQL Editor (replace with actual admin user ID):

```sql
-- Update the admin user's role
UPDATE profiles 
SET role = 'admin' 
WHERE id = 'YOUR_ADMIN_USER_ID_HERE';
```

### Step 4: Verify Configuration

Check `js/config.js` has your correct Supabase credentials:
- SUPABASE_URL
- SUPABASE_ANON_KEY

### Step 5: Test Login

1. Open `pages/login.html` in browser
2. Try logging in with test credentials
3. Check browser console (F12) for any errors

## Common Issues & Solutions

### Issue: "Database connection not initialized"
**Cause**: Supabase CDN script not loaded
**Solution**: 
- Check that `<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>` is in the HTML
- Make sure it loads BEFORE your module scripts
- Check browser console for CDN loading errors

### Issue: "Unable to load user profile"
**Cause**: No profile record exists for the user
**Solutions**:
1. Run `database/profile-trigger.sql` to enable automatic profile creation
2. Manually create profile:
```sql
INSERT INTO profiles (id, role) 
VALUES ('USER_ID_HERE', 'member');
```

### Issue: "Invalid login credentials"
**Causes**:
- Wrong email/password
- User doesn't exist in Supabase Auth
- Email not confirmed (if email confirmation is enabled)

**Solutions**:
- Verify user exists in Supabase Dashboard > Authentication
- Check if email confirmation is required in Supabase settings
- Try resetting password

### Issue: Redirects to wrong page or 404
**Cause**: File paths incorrect
**Solution**: 
- Verify files exist at `/pages/admin.html` and `/pages/member.html`
- Check that you're using correct relative paths based on where login.html is located

### Issue: "infinite recursion detected in policy for relation profiles"
**Cause**: RLS policy creates circular dependency when checking admin role
**Solution**: Run `database/quick-fix-profiles.sql` in Supabase SQL Editor:
```sql
-- Quick fix
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
GRANT SELECT ON profiles TO authenticated;
```

For a more secure solution, run `database/fix-rls-policies.sql` which uses a function to avoid recursion.

### Issue: "Row Level Security policy violation"
**Cause**: RLS policies blocking access
**Solutions**:
1. Verify RLS policies are set up correctly from `schema.sql`
2. Check user has correct role in profiles table:
```sql
SELECT * FROM profiles WHERE id = 'USER_ID';
```
3. Run the quick fix above to disable RLS temporarily

## Testing Authentication Flow

### Test Admin Login:
1. Go to `pages/login.html`
2. Login with admin credentials
3. Should redirect to `/pages/admin.html`
4. Check console for "LOGIN" log entry

### Test Member Login:
1. Go to `pages/login.html`
2. Login with member credentials
3. Should redirect to `/pages/member.html`
4. Check console for "LOGIN" log entry

## Debug Mode

To enable detailed logging, open browser console (F12) and check for:
- Supabase initialization messages
- Login attempt logs
- Profile fetch results
- Any error messages

## Still Having Issues?

1. Check browser console (F12) for JavaScript errors
2. Check Supabase Dashboard > Logs for database errors
3. Verify all SQL scripts ran successfully
4. Ensure you're using a modern browser (Chrome, Firefox, Edge)
5. Try clearing browser cache and cookies
6. Test with browser dev tools Network tab to see API calls

## Quick Test Script

Run this in browser console on login page to test Supabase connection:

```javascript
// Test Supabase connection
const testConnection = async () => {
    const { data, error } = await supabase.from('profiles').select('count');
    if (error) {
        console.error('Connection failed:', error);
    } else {
        console.log('Connection successful!', data);
    }
};
testConnection();
```
