# Admin Panel Setup Guide

## 🔐 Authentication System

Homelink admin panel mendukung dua metode autentikasi:

### 1. Development Mode (Currently Active)
- **Email**: `admin@homelink.co.id`
- **Password**: Any password (e.g., `test123`)
- Tidak memerlukan Google OAuth credentials
- Otomatis aktif saat `NODE_ENV=development`

### 2. Production Mode (Google OAuth)
- Memerlukan Google Cloud Console setup
- Memerlukan GOOGLE_CLIENT_ID dan GOOGLE_CLIENT_SECRET
- Email harus terdaftar di ADMIN_EMAILS

---

## 🚀 Quick Start - Admin Login

### Step 1: Buka Admin Login
```
http://localhost:3000/admin/login
```

### Step 2: Login dengan Development Credentials
- **Email**: `admin@homelink.co.id`
- **Password**: `test123` (atau password apapun)
- Klik tombol **"Sign in (Development)"**

### Step 3: Akses Dashboard
Setelah login sukses, Anda akan diarahkan ke:
```
http://localhost:3000/admin
```

---

## 📋 Admin Panel Features

### Dashboard (`/admin`)
- **Statistics Cards**: Total properties, active listings, leads, agents
- **Recent Leads**: Daftar leads terbaru dengan status
- **Recent Properties**: Properti yang baru ditambahkan
- **Quick Actions**: Shortcut ke fitur-fitur utama

### Properties Management (`/admin/properties`)
- View all properties
- Filter by status (sale/rent)
- Edit property details (via Sanity Studio)
- View property analytics

### Leads Management (`/admin/leads`)
- View all incoming leads
- Filter by status (new/contacted/closed)
- Contact information dan messages
- Lead assignment to agents

### Articles (`/admin/articles`)
- Manage blog posts/insights
- Create new articles
- Edit existing content

### Agents (`/admin/agents`)
- Manage agent profiles
- View agent performance
- Assign properties to agents

### Analytics (`/admin/analytics`)
- Property views
- Lead conversion rates
- Search analytics
- Popular locations

### Settings (`/admin/settings`)
- Site configuration
- Admin user management
- Email templates
- Integration settings

---

## 🔧 Environment Configuration

### Current Development Setup
```env
# .env.local
NODE_ENV=development
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=development-secret-key-change-in-production
ADMIN_EMAILS=admin@homelink.co.id

# Google OAuth (Not required in development)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Adding More Admin Users
Edit `.env.local`:
```env
ADMIN_EMAILS=admin@homelink.co.id,admin2@example.com,admin3@example.com
```

---

## 🔐 Security Notes

### Development Mode
- ⚠️ **WARNING**: Development mode memungkinkan login tanpa validasi password
- Hanya untuk testing dan development
- **JANGAN** deploy ke production dengan development mode

### Production Mode
1. Set `NODE_ENV=production`
2. Configure valid Google OAuth credentials
3. Use strong NEXTAUTH_SECRET (generate with `openssl rand -base64 32`)
4. Whitelist admin emails carefully
5. Enable 2FA on Google accounts

---

## 🛠 Troubleshooting

### Cannot Access Admin Panel
```bash
# Check if you're redirected to login
curl -I http://localhost:3000/admin
# Should return 307 redirect to /admin/login
```

### Login Not Working
1. **Check providers**:
   ```bash
   curl http://localhost:3000/api/auth/providers | jq
   ```
   Should show `credentials` provider in development

2. **Check admin emails**:
   ```bash
   grep ADMIN_EMAILS .env.local
   ```

3. **Check dev server logs**:
   ```bash
   tail -f /tmp/nextjs-dev.log | grep -i auth
   ```

4. **Clear browser cookies**:
   - Open DevTools → Application → Cookies
   - Clear all cookies for localhost:3000

### Session Not Persisting
1. Check NEXTAUTH_SECRET is set
2. Clear browser cookies
3. Restart dev server:
   ```bash
   pkill -f "next dev"
   npm run dev
   ```

### 403 Forbidden After Login
- Email tidak ada di ADMIN_EMAILS list
- Add email ke `.env.local`:
  ```env
  ADMIN_EMAILS=admin@homelink.co.id,your-email@example.com
  ```

---

## 📝 Admin Panel Navigation

```
Admin Panel
├── Dashboard (/)
│   ├── Stats Overview
│   ├── Recent Activity
│   └── Quick Actions
│
├── Properties (/properties)
│   ├── All Properties List
│   ├── Filter & Search
│   └── Property Details
│
├── Leads (/leads)
│   ├── All Leads List
│   ├── Lead Status Management
│   └── Contact Details
│
├── Articles (/articles)
│   ├── Published Articles
│   ├── Draft Articles
│   └── Create New
│
├── Agents (/agents)
│   ├── Agent Directory
│   ├── Performance Metrics
│   └── Agent Management
│
├── Analytics (/analytics)
│   ├── Traffic Overview
│   ├── Conversion Rates
│   └── Popular Searches
│
└── Settings (/settings)
    ├── Site Settings
    ├── User Management
    └── Integrations
```

---

## 🎨 UI Components

### Admin Header
- Search bar
- Theme toggle (light/dark)
- Notifications dropdown
- User menu with profile & logout

### Admin Sidebar
- Collapsible navigation
- Active route highlighting
- Badge notifications (e.g., "New" leads)
- Mobile-responsive burger menu

### Dashboard Cards
- Stat cards with icons
- Trend indicators (↑ increase, ↓ decrease)
- Click-through to detail pages

---

## 🔄 Session Management

### Session Duration
- **Development**: 30 days
- **Production**: 7 days (recommended)

### Auto Logout
Sessions expire based on JWT expiration. User will be redirected to login when:
- Session expires
- NEXTAUTH_SECRET changes
- Cookies are cleared

### Manual Logout
- Click user avatar → Logout
- Visit `/admin/logout`
- All devices will be logged out (JWT invalidated)

---

## 📊 Data Integration

### Sanity CMS
Currently returning empty data in development mode. To configure:

1. Create Sanity project at https://sanity.io
2. Update `.env.local`:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your-read-write-token
   ```
3. Restart dev server

### Accessing Sanity Studio
- URL: `http://localhost:3000/studio`
- Manage properties, articles, and content
- Real-time preview

---

## 🚀 Next Steps

1. ✅ **Login to Admin Panel**: Use development credentials
2. ✅ **Explore Dashboard**: Check all navigation items
3. ⏭️ **Configure Sanity**: Add real property data
4. ⏭️ **Setup Google OAuth**: For production deployment
5. ⏭️ **Customize Settings**: Brand colors, email templates
6. ⏭️ **Add Admin Users**: Invite team members

---

## 📞 Support

If you encounter issues:
1. Check this guide first
2. Review dev server logs
3. Check browser console for errors
4. Restart dev server if needed

**Admin Email**: admin@homelink.co.id (development)

---

**Last Updated**: 2025-10-25
**Version**: 1.0.0
**Status**: ✅ Development Mode Active
