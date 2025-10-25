# Browser Testing Instructions for Admin Login

## ⚠️ IMPORTANT: Test in Browser, NOT via curl

NextAuth credentials provider memerlukan browser dengan cookies dan JavaScript aktif.

---

## 🧪 Step-by-Step Testing

### 1. Open Browser (Chrome/Firefox/Safari)

### 2. Open DevTools
- **Chrome/Firefox**: Press `F12` or `Cmd+Option+I` (Mac)
- Go to **Console** tab to see logs
- Go to **Network** tab to see requests

### 3. Navigate to Login Page
```
http://localhost:3000/admin/login
```

### 4. What You Should See
- ✅ Yellow banner: "Development Mode"
- ✅ Text: "Login with: admin@homelink.co.id (any password)"
- ✅ Email input field
- ✅ Password input field  
- ✅ Blue button: "Sign in (Development)"

### 5. Fill the Form
- **Email**: `admin@homelink.co.id`
- **Password**: `test123` (or any password)

### 6. Click "Sign in (Development)"

### 7. Check Console Logs
You should see logs like:
```
[Auth] Attempting login: admin@homelink.co.id
[Auth] Admin emails: ["admin@homelink.co.id"]
[Auth] Login successful: admin@homelink.co.id
[Auth] signIn callback: {email: "admin@homelink.co.id", account: "credentials"}
[Auth] jwt callback: {email: "admin@homelink.co.id", trigger: undefined}
[Auth] session callback: {email: "admin@homelink.co.id"}
```

### 8. Expected Result
- ✅ Redirect to: `http://localhost:3000/admin`
- ✅ See Admin Dashboard with:
  - Header with search bar, notifications, user menu
  - Sidebar with navigation
  - Dashboard stats cards
  - Recent activity section

---

## 🐛 Troubleshooting in Browser

### If Login Button Does Nothing:
1. **Check Console for Errors**
   - Look for red error messages
   - Common: "signIn is not defined" → Reload page

2. **Check Network Tab**
   - Look for POST request to `/api/auth/callback/credentials`
   - Check if it returns 200 or error

3. **Clear Cookies & Cache**
   - Settings → Privacy → Clear browsing data
   - Or: DevTools → Application → Storage → Clear site data
   - Reload page and try again

### If You See "Invalid credentials":
- Check terminal logs: `tail -f /tmp/nextjs-dev.log`
- Should see: `[Auth] Attempting login: admin@homelink.co.id`
- If not, server might need restart

### If Stuck on Login Page:
1. Check cookies in DevTools → Application → Cookies
2. Should see: `next-auth.session-token`
3. If missing, authentication failed

### If Redirect to /api/auth/signin?csrf=true:
- This is a CSRF validation error
- Solution: Clear all cookies and try again
- Make sure you're using the form on the page, not direct API calls

---

## 🔍 Debug Mode Active

Server is running with debug=true. Check terminal for detailed logs:

```bash
# Watch server logs in real-time
tail -f /tmp/nextjs-dev.log | grep -i "auth\|error"
```

You'll see:
- When authorize() is called
- Whether user is validated
- JWT token creation
- Session creation

---

## ✅ Successful Login Indicators

### In Browser:
1. URL changes from `/admin/login` to `/admin`
2. Dashboard loads with sidebar
3. User avatar/name appears in top-right
4. No errors in console

### In Cookies (DevTools → Application → Cookies):
- `next-auth.csrf-token` - Present
- `next-auth.callback-url` - Present  
- `next-auth.session-token` - **Present and valid** ✨

### In Server Logs:
```
[Auth] Attempting login: admin@homelink.co.id
[Auth] Login successful: admin@homelink.co.id
[Auth] signIn callback: {email: "admin@homelink.co.id", ...}
[Auth] jwt callback: ...
[Auth] session callback: ...
```

---

## 📸 Screenshot Checklist

If login still doesn't work, take screenshots of:

1. **Login page** - Showing the form
2. **Console tab** - Any errors (red text)
3. **Network tab** - The POST request to `/api/auth/callback/credentials`
4. **Application → Cookies** - List of cookies
5. **Terminal output** - Last 50 lines of `/tmp/nextjs-dev.log`

---

## 🔄 If Still Not Working

Try this complete reset:

```bash
# 1. Stop server
pkill -f "next dev"

# 2. Clear Next.js cache
rm -rf .next

# 3. Restart server
npm run dev

# 4. Open browser in incognito/private mode
# 5. Try login again
```

---

## 💡 Alternative: Test with cURL (For Debugging)

If browser testing fails, we can debug with curl:

```bash
# 1. Get CSRF token
CSRF=$(curl -s http://localhost:3000/api/auth/csrf | jq -r '.csrfToken')
echo "CSRF: $CSRF"

# 2. Attempt login
curl -c cookies.txt -b cookies.txt -X POST \
  "http://localhost:3000/api/auth/callback/credentials" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "csrfToken=$CSRF&email=admin@homelink.co.id&password=test&callbackUrl=%2Fadmin" \
  -L -v 2>&1 | grep -E "HTTP|location|Set-Cookie"

# 3. Check if session was created
curl -b cookies.txt http://localhost:3000/api/auth/session | jq
```

But remember: **Browser testing is the correct way!**

---

**Server URL**: http://localhost:3000  
**Login URL**: http://localhost:3000/admin/login  
**Credentials**: admin@homelink.co.id / any password

**Status**: ✅ Server running, ready for browser testing
