# 🎛️ PANDUAN ADMIN DASHBOARD HOMELINK

## 📍 Akses Admin Dashboard

### URL Development:
```
http://localhost:3001/admin
```

### URL Production:
```
https://homelink.co.id/admin
```

---

## 🔐 LOGIN & AUTHENTICATION

### Development Mode (Testing)

**Credentials untuk Testing:**
- Email: `admin@homelink.co.id`
- Password: `any password` (password apapun akan diterima di development mode)

**Cara Login:**
1. Buka `http://localhost:3001/admin/login`
2. Masukkan email: `admin@homelink.co.id`
3. Masukkan password apapun
4. Klik "Sign in (Development)"

### Production Mode

**Google OAuth:**
1. Klik tombol "Sign in with Google"
2. Login dengan Google account yang terdaftar di `ADMIN_EMAILS`
3. Otomatis redirect ke dashboard

**Admin Emails:**
Email yang bisa akses admin panel dikonfigurasi di `.env.local`:
```env
ADMIN_EMAILS=admin@homelink.co.id,your-email@example.com
```

---

## 📊 STRUKTUR DASHBOARD

### 1. 🏠 Dashboard (Home)
**URL:** `/admin`

**Fitur:**
- ✅ Statistics Cards
  - Total Properties
  - Active Listings
  - New Leads
  - Active Agents
  
- ✅ Recent Activity
  - Recent Leads (5 terbaru)
  - Recent Properties (5 terbaru)
  
- ✅ Quick Actions
  - Add New Property
  - View All Leads
  - Manage Agents

**Data Displayed:**
- Total properties count
- Active properties count
- New leads count
- Total leads count
- Active agents count
- Recent leads with contact info
- Recent properties with details

---

### 2. 🏘️ Properties Management
**URL:** `/admin/properties`

**Fitur:**
- ✅ Property List Table
  - Property image & title
  - Type (House, Apartment, Villa, etc.)
  - Price (formatted in IDR)
  - Location (City)
  - Status (Sale/Rent/Sold)
  - Listed date
  
- ✅ Actions per Property
  - 👁️ View - Preview property detail
  - ✏️ Edit - Edit di Sanity Studio
  - 🗑️ Delete - Delete property (disabled for safety)
  
- ✅ Statistics Cards
  - Total Properties
  - For Sale
  - For Rent
  - Sold
  
- ✅ Toolbar Actions
  - 🔍 Filter properties
  - 📥 Export data
  - ➕ Add New Property (redirect to Sanity Studio)

**Table Columns:**
1. Property (Image + Title)
2. Type
3. Price
4. Location
5. Status
6. Listed Date
7. Actions

---

### 3. 📧 Leads Management
**URL:** `/admin/leads`

**Fitur:**
- ✅ Leads List Table
  - Lead name
  - Contact info (email & phone)
  - Message/inquiry
  - Property interest
  - Status (New/Contacted/Qualified/Closed)
  - Priority (High/Medium/Low)
  - Received date
  
- ✅ Statistics Cards
  - Total Leads
  - New Leads
  - Contacted
  - Qualified
  
- ✅ Toolbar Actions
  - 🔍 Filter by status/priority
  - 📥 Export leads data
  
- ✅ Lead Status Management
  - Update status
  - Assign to agent
  - Add notes

**Table Columns:**
1. Name & Property
2. Contact (Email & Phone)
3. Message
4. Status
5. Priority
6. Date
7. Actions

---

### 4. 📝 Articles Management
**URL:** `/admin/articles`

**Status:** Coming Soon

**Planned Features:**
- Article list
- Create new article
- Edit existing articles
- Publish/unpublish
- Categories management
- SEO settings

---

### 5. 👥 Agents Management
**URL:** `/admin/agents`

**Status:** Coming Soon

**Planned Features:**
- Agent directory
- Agent profiles
- Performance metrics
- Property assignments
- Contact information
- Verification status

---

### 6. 📈 Analytics
**URL:** `/admin/analytics`

**Status:** Coming Soon

**Planned Features:**
- Traffic overview
- Property views
- Lead conversion rates
- Popular searches
- Location analytics
- User behavior

---

### 7. ⚙️ Settings
**URL:** `/admin/settings`

**Status:** Coming Soon

**Planned Features:**
- Site settings
- Admin user management
- Email templates
- Integration settings
- SEO configuration
- API keys management

---

## 🎨 UI COMPONENTS

### Sidebar Navigation

**Desktop:**
- Fixed sidebar di kiri
- Logo Homelink + Shield icon
- Menu items dengan icons
- Active state highlighting
- Logout button di bawah

**Mobile:**
- Floating menu button (bottom right)
- Slide-in sidebar
- Overlay background
- Close button

**Menu Items:**
1. 📊 Dashboard
2. 🏘️ Properties (with badge)
3. 📧 Leads (with "new" badge)
4. 📝 Articles
5. 👥 Agents
6. 📈 Analytics
7. ⚙️ Settings

---

### Header Bar

**Left Section:**
- "Homelink Admin" title
- Search bar (global search)

**Right Section:**
- 🌓 Theme toggle (Light/Dark mode)
- 🔔 Notifications (with unread count)
- 👤 User menu
  - Profile
  - Settings
  - Logout

---

### Statistics Cards

**Design:**
- Card dengan shadow
- Icon di kanan (brand gold background)
- Title di atas
- Large number value
- Change indicator (↑ increase / ↓ decrease)
- Clickable untuk detail

**Example:**
```
┌─────────────────────────────┐
│ Total Properties        🏠  │
│ 156                         │
│ ↑ +12% from last month      │
└─────────────────────────────┘
```

---

### Data Tables

**Features:**
- Responsive design
- Sortable columns
- Hover effects
- Action buttons per row
- Empty state message
- Loading states

**Actions:**
- 👁️ View
- ✏️ Edit
- 🗑️ Delete

---

## 🔄 DATA FLOW

### Current State (Development):

```
User Request
    ↓
Admin Page (Server Component)
    ↓
Sanity Fetcher
    ↓
Try: Fetch from Sanity CMS
    ↓
Catch: Use Dummy Data (Fallback)
    ↓
Render UI with Data
```

### Production State:

```
User Request
    ↓
Admin Page (Server Component)
    ↓
Sanity Fetcher (with API Token)
    ↓
Fetch Real Data from Sanity
    ↓
Cache (60s revalidation)
    ↓
Render UI with Real Data
```

---

## 🛡️ SECURITY FEATURES

### Authentication:
- ✅ NextAuth.js integration
- ✅ Google OAuth
- ✅ Session-based auth
- ✅ JWT tokens
- ✅ Secure cookies

### Authorization:
- ✅ Email-based admin access
- ✅ Middleware protection
- ✅ Role checking
- ✅ Redirect unauthorized users

### Route Protection:
```typescript
// All /admin/* routes protected
// Except /admin/login
middleware.ts → checks admin email
```

---

## 🎯 QUICK ACTIONS

### Menambah Property Baru:
1. Klik "Add Property" di dashboard
2. Redirect ke Sanity Studio
3. Fill property details
4. Upload images
5. Publish

### Melihat Lead Baru:
1. Klik "Leads" di sidebar
2. Filter by "New" status
3. View lead details
4. Update status
5. Contact customer

### Export Data:
1. Go to Properties/Leads page
2. Click "Export" button
3. Download CSV/Excel

---

## 🔧 TROUBLESHOOTING

### Tidak Bisa Login:

**Problem:** Email tidak diterima
**Solution:** 
- Check `ADMIN_EMAILS` di `.env.local`
- Pastikan email ada dalam list
- Restart development server

**Problem:** Google OAuth error
**Solution:**
- Check `GOOGLE_CLIENT_ID` dan `GOOGLE_CLIENT_SECRET`
- Verify OAuth consent screen
- Check authorized redirect URIs

### Data Tidak Muncul:

**Problem:** Empty tables
**Solution:**
- Check Sanity connection
- Verify `SANITY_API_TOKEN`
- Check browser console for errors
- Fallback to dummy data should work

### Build Errors:

**Problem:** Prerender errors
**Solution:**
- Normal jika Sanity belum configured
- Add `export const dynamic = 'force-dynamic'`
- Configure Sanity API token

---

## 📱 RESPONSIVE DESIGN

### Desktop (≥1024px):
- Full sidebar visible
- Wide tables
- Multi-column layouts
- All features accessible

### Tablet (768px - 1023px):
- Collapsible sidebar
- Responsive tables
- 2-column layouts
- Touch-friendly buttons

### Mobile (<768px):
- Hidden sidebar (floating button)
- Stacked cards
- Single column
- Mobile-optimized tables
- Swipe gestures

---

## 🎨 THEME SUPPORT

### Light Mode:
- White backgrounds
- Dark text
- Subtle shadows
- Brand gold accents

### Dark Mode:
- Dark backgrounds
- Light text
- Elevated cards
- Brand gold accents

**Toggle:** Click moon/sun icon di header

---

## 📞 SUPPORT & HELP

### Documentation:
- `/README.md` - General setup
- `/ADMIN_SETUP.md` - Admin configuration
- `/DEPLOYMENT_CHECKLIST.md` - Deployment guide
- `/SYSTEM_AUDIT_REPORT.md` - System status

### Contact:
- Email: admin@homelink.co.id
- Support: [Contact Form]

---

**Last Updated:** 27 Oktober 2025  
**Version:** 1.0.0  
**Status:** ✅ Fully Functional

