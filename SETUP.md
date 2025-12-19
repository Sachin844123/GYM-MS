# Setup Guide

## Quick Start

### 1. Supabase Setup

1. Go to [supabase.com](https://supabase.com) and create an account
2. Create a new project
3. Wait for the project to be ready (2-3 minutes)

### 2. Database Setup

1. In your Supabase dashboard, go to SQL Editor
2. Copy the entire content from `database/schema.sql`
3. Paste and run it in the SQL Editor
4. Verify tables are created in the Table Editor

### 3. Create Admin User

1. In Supabase dashboard, go to Authentication > Users
2. Click "Add user" and create an admin account
3. Copy the user ID
4. Go to SQL Editor and run:
```sql
INSERT INTO profiles (id, role) VALUES ('YOUR_USER_ID', 'admin');
```

### 4. Configure Application

1. In Supabase dashboard, go to Settings > API
2. Copy your Project URL and anon/public key
3. Open `js/config.js` in your project
4. Replace:
   - `YOUR_SUPABASE_URL` with your Project URL
   - `YOUR_SUPABASE_ANON_KEY` with your anon key

### 5. Run the Application

**Option A: Simple (double-click)**
- Open `index.html` in your browser

**Option B: Local Server (recommended)**
```bash
npm install
npm start
```

Then open http://localhost:3000

### 6. Test the Application

**Test Credentials:**

**Admin Login:**
- Email: `admin@gym.com`
- Password: `admin123`

**Member Login:**
- Email: `member@gym.com`
- Password: `member123`

**Testing Steps:**
1. Go to Login page
2. Login with admin credentials above
3. Add a test member
4. Create a bill for the member
5. Logout and login as member to view receipts

## Troubleshooting

**Issue: "Invalid API key"**
- Check that you copied the correct anon key from Supabase
- Ensure no extra spaces in config.js

**Issue: "Table does not exist"**
- Run the schema.sql again in Supabase SQL Editor
- Check for any SQL errors

**Issue: "Not authorized"**
- Ensure RLS policies are created
- Check that admin profile was created correctly

**Issue: Module errors**
- Ensure Supabase CDN script is loaded before your scripts
- Check browser console for specific errors

## Storage Setup (for receipts and diet plans)

1. In Supabase dashboard, go to Storage
2. Create a new bucket called `receipts`
3. Create another bucket called `diet-plans`
4. Set both buckets to public or configure RLS policies

## Email Notifications (optional)

1. In Supabase dashboard, go to Authentication > Email Templates
2. Customize the email templates
3. Configure SMTP settings if needed

## Next Steps

- Customize the UI in `css/styles.css`
- Add more features in the JavaScript files
- Deploy to hosting (Vercel, Netlify, etc.)
