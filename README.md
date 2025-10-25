# Homelink - PropTech Platform Indonesia

Platform properti digital modern yang menghubungkan pembeli, penjual, dan agen properti di seluruh Indonesia.

## 🚀 Features

- **Property Search & Discovery**
  - Advanced search filters
  - Map-based property search with clustering
  - Location-based search
  - Save favorites locally

- **Property Listings**
  - Detailed property pages with image galleries
  - Property specifications and amenities
  - Virtual tours support
  - Agent contact integration

- **Lead Management**
  - Contact forms with Turnstile captcha
  - WhatsApp integration
  - Lead tracking and analytics
  - Email notifications

- **Admin Dashboard**
  - Google OAuth authentication
  - Role-based access control (RBAC)
  - Property management
  - Lead management
  - Analytics dashboard

- **Content Management**
  - Sanity CMS integration
  - Blog/Insight articles
  - Dynamic content updates
  - SEO optimized

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Framer Motion
- **CMS**: Sanity v3
- **Maps**: Mapbox GL JS
- **Authentication**: NextAuth.js with Google OAuth
- **Forms**: React Hook Form, Zod validation
- **Security**: Cloudflare Turnstile
- **Analytics**: Google Analytics 4, Facebook Pixel
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- Sanity account and project
- Mapbox account
- Google Cloud Console project (for OAuth)
- Cloudflare account (for Turnstile)
- Vercel account (for deployment)

## 🔧 Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/homelink.git
cd homelink
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```
Edit `.env.local` and fill in your values:
- Sanity project credentials
- Mapbox token
- Google OAuth credentials
- Turnstile keys
- Admin emails

4. **Set up Sanity Studio**
```bash
cd sanity
npm install
sanity init
sanity deploy
```

5. **Import Sanity schemas**
```bash
sanity dataset import production.tar.gz production
```

6. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
homelink/
├── app/                    # Next.js app directory
│   ├── (public)/          # Public pages
│   │   ├── page.tsx       # Home page
│   │   ├── search/        # Search page
│   │   ├── listing/       # Property details
│   │   ├── about/         # About page
│   │   ├── contact/       # Contact page
│   │   └── insight/       # Blog/Articles
│   ├── admin/             # Admin dashboard (protected)
│   ├── api/               # API routes
│   └── studio/            # Sanity Studio
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── property/         # Property components
│   ├── search/           # Search components
│   ├── admin/            # Admin components
│   └── contact/          # Contact forms
├── lib/                   # Utility functions
│   ├── sanity/           # Sanity client & queries
│   ├── auth/             # Authentication utilities
│   └── analytics.ts      # Analytics tracking
├── public/               # Static assets
├── sanity/               # Sanity CMS configuration
└── types/                # TypeScript types
```

## 🔐 Environment Variables

### Required Variables

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=

# Mapbox
NEXT_PUBLIC_MAPBOX_TOKEN=

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
ADMIN_EMAILS=admin@homelink.co.id

# Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

### Optional Variables

```env
# Analytics
NEXT_PUBLIC_GA4_ID=
NEXT_PUBLIC_FB_PIXEL_ID=

# Email
EMAIL_HOST=
EMAIL_PORT=
EMAIL_USER=
EMAIL_PASSWORD=
```

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

```bash
vercel --prod
```

### Deploy Sanity Studio

```bash
cd sanity
sanity deploy
```

## 📊 Admin Access

1. Add your email to `ADMIN_EMAILS` in environment variables
2. Navigate to `/admin`
3. Sign in with Google
4. Access admin dashboard

## 🔒 Security Features

- Google OAuth authentication
- Role-based access control
- Cloudflare Turnstile captcha
- Rate limiting on API endpoints
- Input validation with Zod
- CSP headers
- XSS protection
- SQL injection prevention (via Sanity)

## 📈 Analytics Integration

The platform includes comprehensive analytics tracking:

- Page views
- Property views
- Search queries
- Lead submissions
- Contact clicks
- Map interactions

Configure GA4 and Facebook Pixel IDs in environment variables.

## 🧪 Testing

```bash
# Run tests
npm test

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 📝 API Documentation

### Public Endpoints

- `GET /api/listings` - Get property listings
- `GET /api/search` - Search properties
- `POST /api/leads` - Submit lead form
- `GET /api/sitemap` - Generate sitemap

### Protected Endpoints (Admin only)

- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/leads` - Manage leads
- `GET /api/admin/properties` - Manage properties

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

## 👥 Team

- **Development**: Your Team
- **Design**: UI/UX Team
- **Product**: Product Team

## 📞 Support

For support, email support@homelink.co.id or join our Slack channel.

## 🔄 Updates

Check [CHANGELOG.md](CHANGELOG.md) for version history and updates.

---

Built with ❤️ by Homelink Team
