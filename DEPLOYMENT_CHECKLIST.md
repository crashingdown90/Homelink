# 🚀 HOMELINK DEPLOYMENT CHECKLIST

## ✅ Pre-Deployment Checklist

### 1️⃣ Environment Setup
- [ ] Copy `.env.example` to `.env.local`
- [ ] Fill in all required environment variables:
  - [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - [ ] `NEXT_PUBLIC_SANITY_DATASET`
  - [ ] `SANITY_API_TOKEN`
  - [ ] `NEXT_PUBLIC_MAPBOX_TOKEN`
  - [ ] `NEXTAUTH_URL`
  - [ ] `NEXTAUTH_SECRET`
  - [ ] `GOOGLE_CLIENT_ID`
  - [ ] `GOOGLE_CLIENT_SECRET`
  - [ ] `ADMIN_EMAILS`
  - [ ] `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
  - [ ] `TURNSTILE_SECRET_KEY`

### 2️⃣ Sanity CMS Setup
- [ ] Create Sanity project at [sanity.io](https://www.sanity.io/manage)
- [ ] Install Sanity CLI: `npm install -g @sanity/cli`
- [ ] Initialize Sanity: `cd sanity && sanity init`
- [ ] Deploy Sanity Studio: `sanity deploy`
- [ ] Create API token with read+write permissions
- [ ] Add CORS origins for your domain

### 3️⃣ Google OAuth Setup
- [ ] Go to [Google Cloud Console](https://console.cloud.google.com/)
- [ ] Create new project or select existing
- [ ] Enable Google+ API
- [ ] Create OAuth 2.0 credentials
- [ ] Add authorized redirect URIs:
  - `http://localhost:3000/api/auth/callback/google` (dev)
  - `https://your-domain.com/api/auth/callback/google` (prod)
- [ ] Add admin emails to `ADMIN_EMAILS` env variable

### 4️⃣ Mapbox Setup
- [ ] Create account at [mapbox.com](https://account.mapbox.com/)
- [ ] Generate public access token
- [ ] Configure allowed URLs for token
- [ ] Add token to `NEXT_PUBLIC_MAPBOX_TOKEN`

### 5️⃣ Cloudflare Turnstile Setup
- [ ] Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
- [ ] Navigate to Turnstile
- [ ] Add site with your domain
- [ ] Copy Site Key and Secret Key
- [ ] Add to environment variables

### 6️⃣ Database Seeding
- [ ] Create initial admin user in Sanity
- [ ] Add sample properties (optional)
- [ ] Create initial blog posts (optional)
- [ ] Test lead submission

## 🔨 Build & Test

### Local Testing
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Test production build locally
npm run start
```

### Testing Checklist
- [ ] Home page loads correctly
- [ ] Search functionality works
- [ ] Map displays properly
- [ ] Property details page works
- [ ] Contact forms submit successfully
- [ ] Admin login works (Google OAuth)
- [ ] Admin dashboard accessible
- [ ] Mobile responsive design
- [ ] Dark mode toggle works

## 🌐 Deployment to Vercel

### Initial Setup
1. [ ] Push code to GitHub repository
2. [ ] Go to [vercel.com](https://vercel.com)
3. [ ] Import GitHub repository
4. [ ] Configure project settings:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Environment Variables in Vercel
5. [ ] Add all environment variables from `.env.local`
6. [ ] Set `NEXTAUTH_URL` to `https://your-domain.com`
7. [ ] Set `NODE_ENV` to `production`

### Deploy
8. [ ] Click "Deploy"
9. [ ] Wait for build to complete
10. [ ] Test deployed site

## 🔒 Post-Deployment Security

### Security Headers
- [ ] Verify CSP headers are working
- [ ] Check HTTPS enforcement
- [ ] Test rate limiting on forms
- [ ] Verify Turnstile is blocking bots

### Admin Access
- [ ] Test admin login with authorized email
- [ ] Verify unauthorized emails are blocked
- [ ] Check admin routes are protected
- [ ] Test logout functionality

## 📊 Analytics Setup

### Google Analytics 4
- [ ] Create GA4 property
- [ ] Add measurement ID to `NEXT_PUBLIC_GA4_ID`
- [ ] Verify events are tracking:
  - Page views
  - Property views
  - Search queries
  - Lead submissions

### Facebook Pixel (Optional)
- [ ] Create Facebook Pixel
- [ ] Add Pixel ID to `NEXT_PUBLIC_FB_PIXEL_ID`
- [ ] Verify events are tracking

## 🎯 Performance Optimization

### Lighthouse Scores Target
- [ ] Performance: >90
- [ ] Accessibility: >95
- [ ] Best Practices: >95
- [ ] SEO: >95

### Optimization Checklist
- [ ] Images optimized (WebP format)
- [ ] Fonts preloaded
- [ ] Critical CSS inlined
- [ ] JavaScript minified
- [ ] Lazy loading implemented
- [ ] CDN configured (optional)

## 📱 Final Testing

### Cross-Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

### Device Testing
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

### User Flow Testing
- [ ] Complete property search flow
- [ ] Submit contact form
- [ ] Save favorite properties
- [ ] Admin login and management
- [ ] Newsletter subscription

## 🚨 Monitoring Setup

### Error Monitoring (Optional)
- [ ] Setup Sentry account
- [ ] Add Sentry DSN to environment
- [ ] Verify error reporting works

### Uptime Monitoring
- [ ] Setup monitoring service (UptimeRobot, Pingdom, etc.)
- [ ] Configure alerts for downtime
- [ ] Set up status page

## 📝 Documentation

- [ ] Update README with production URL
- [ ] Document API endpoints
- [ ] Create user guide for admin panel
- [ ] Document deployment process
- [ ] Create troubleshooting guide

## ✅ Launch Checklist

### DNS & Domain
- [ ] Configure custom domain in Vercel
- [ ] Update DNS records
- [ ] Verify SSL certificate
- [ ] Set up www redirect

### SEO
- [ ] Submit sitemap to Google Search Console
- [ ] Verify robots.txt is accessible
- [ ] Check meta tags on all pages
- [ ] Test Open Graph tags

### Legal
- [ ] Privacy Policy page live
- [ ] Terms of Service page live
- [ ] Cookie consent (if needed)
- [ ] GDPR compliance (if applicable)

## 🎉 Go Live!

- [ ] Announce launch
- [ ] Monitor for issues
- [ ] Gather user feedback
- [ ] Plan first updates

---

## 📞 Support Contacts

- **Technical Issues**: tech@homelink.co.id
- **Sanity Support**: [sanity.io/contact](https://www.sanity.io/contact)
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Emergency**: +62 812 3456 7890

## 🔄 Post-Launch Tasks

- [ ] Monitor performance metrics
- [ ] Review error logs
- [ ] Analyze user behavior
- [ ] Plan feature updates
- [ ] Schedule regular backups
- [ ] Review security logs

---

**Last Updated**: October 2024
**Version**: 1.0.0
**Status**: READY FOR DEPLOYMENT ✅
