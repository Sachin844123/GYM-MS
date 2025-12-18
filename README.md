# Gym Management System

A modern web-based gym management application built with HTML, CSS, JavaScript, and Supabase for digitalized membership and billing operations.

## Features

### Admin Features
- Secure login authentication
- Add, update, and delete members
- Create and manage bills
- Assign fee packages (Basic, Premium, VIP)
- Generate and export reports (CSV)
- Upload diet plans
- Manage supplement store
- Send notifications to members

### Member Features
- Secure login
- View profile information
- Access payment receipts
- View diet plans
- Receive fee reminders

### Public Features
- Explore gym details
- Browse supplement products

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Supabase (Authentication, Database, Storage)
- **Database**: PostgreSQL (via Supabase)

## Installation & Setup

### Prerequisites
- Modern web browser
- Supabase account

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/Sachin844123/GYM-MS.git
cd GYM-MS
```

2. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key
   - Run the SQL schema from `database/schema.sql` in Supabase SQL Editor

3. **Configure the application**
   - Open `js/config.js`
   - Replace `YOUR_SUPABASE_URL` with your Supabase project URL
   - Replace `YOUR_SUPABASE_ANON_KEY` with your Supabase anon key

4. **Add Supabase JS library**
   - Add this script tag to all HTML files before your module scripts:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
   ```

5. **Run the application**
   - Open `index.html` in your browser, or
   - Use a local server (recommended):
   ```bash
   npx serve
   ```

## Project Structure

```
gym-management-system/
├── index.html              # Landing page
├── pages/
│   ├── login.html         # Login page
│   ├── admin.html         # Admin dashboard
│   └── member.html        # Member dashboard
├── css/
│   └── styles.css         # Global styles
├── js/
│   ├── config.js          # Configuration
│   ├── supabase.js        # Supabase client & logger
│   ├── auth.js            # Authentication logic
│   ├── admin.js           # Admin functionality
│   ├── member.js          # Member functionality
│   └── public.js          # Public page logic
├── database/
│   └── schema.sql         # Database schema
└── README.md
```

## Database Schema

The application uses the following tables:
- `profiles` - User profiles with roles
- `members` - Member information
- `bills` - Payment records
- `products` - Supplement store items
- `logs` - System activity logs

## Usage

### Admin Login
1. Navigate to Login page
2. Enter admin credentials
3. Access admin dashboard to manage members, billing, and reports

### Member Login
1. Navigate to Login page
2. Enter member credentials
3. View profile, receipts, and diet plans

## Security Features

- Supabase Authentication for secure login
- Row Level Security (RLS) policies
- Encrypted password storage
- Role-based access control

## Logging

All major actions are logged including:
- Login/logout events
- CRUD operations on members
- Bill creation
- Report exports
- Notification sends

## Future Enhancements

- Online supplement store with cart
- Nutrition guidance system
- Personal training appointment booking
- Mobile app version
- Payment gateway integration
- Attendance tracking
- Workout plan management

## License

MIT License

## Contact

For questions or support, please open an issue on GitHub.
