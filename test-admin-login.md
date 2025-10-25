# Testing Admin Login

## Development Login Instructions

### Method 1: Using Development Credentials (Recommended for Testing)

1. Navigate to: `http://localhost:3000/admin/login`

2. You should see:
   - Yellow banner saying "Development Mode"
   - Instructions: "Login with: admin@homelink.co.id (any password)"
   - Email and Password form fields
   - "Sign in (Development)" button

3. Enter:
   - **Email**: `admin@homelink.co.id`
   - **Password**: Any password (e.g., `test123`)

4. Click "Sign in (Development)"

5. You should be redirected to `/admin` dashboard

### Method 2: Using API Direct Test

Test the credentials provider via curl:

```bash
# Get CSRF token
curl -s http://localhost:3000/api/auth/csrf | jq -r '.csrfToken'

# Login (replace CSRF_TOKEN with actual token)
curl -X POST http://localhost:3000/api/auth/callback/credentials \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "csrfToken=CSRF_TOKEN&email=admin@homelink.co.id&password=test&callbackUrl=%2Fadmin"
```

### Troubleshooting

If login doesn't work:

1. **Check Environment Variables**:
   ```bash
   grep "ADMIN_EMAILS\|NODE_ENV" .env.local
   ```
   Should show:
   - `ADMIN_EMAILS=admin@homelink.co.id`
   - Development mode active

2. **Check Auth Providers**:
   ```bash
   curl http://localhost:3000/api/auth/providers | jq
   ```
   Should show `credentials` provider

3. **Check Dev Server Logs**:
   ```bash
   tail -f /tmp/nextjs-dev.log
   ```

4. **Restart Dev Server** if needed:
   ```bash
   pkill -f "next dev"
   npm run dev
   ```

### Expected Flow

```
1. Visit /admin → Redirects to /admin/login (not authenticated)
2. Fill login form with admin@homelink.co.id
3. Submit → NextAuth validates → Creates session
4. Redirect to /admin → Shows dashboard (authenticated as admin)
```

### Admin Dashboard Features

Once logged in, you should see:
- Admin header with notifications, theme toggle, user menu
- Sidebar with navigation (Dashboard, Properties, Leads, etc.)
- Dashboard stats cards
- Recent leads and properties
- Quick actions

### Logout

To logout, click:
- User avatar in top right → Logout
- Or visit: `/admin/logout`
