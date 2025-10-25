#!/bin/bash

# ============================
# HOMELINK INSTALLATION SCRIPT
# ============================

echo "======================================"
echo "  HOMELINK - PropTech Platform Setup"
echo "======================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Copy environment file
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo "✅ Created .env.local - Please update with your values!"
else
    echo "✅ .env.local already exists"
fi

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p public/uploads
mkdir -p public/images

# Install Sanity CLI globally (optional)
echo ""
echo "Would you like to install Sanity CLI globally? (y/n)"
read -r INSTALL_SANITY

if [ "$INSTALL_SANITY" = "y" ]; then
    echo "📦 Installing Sanity CLI..."
    npm install -g @sanity/cli
    echo "✅ Sanity CLI installed"
fi

# Build the project
echo ""
echo "Would you like to build the project now? (y/n)"
read -r BUILD_NOW

if [ "$BUILD_NOW" = "y" ]; then
    echo "🔨 Building project..."
    npm run build
    echo "✅ Build complete!"
fi

echo ""
echo "======================================"
echo "  SETUP COMPLETE!"
echo "======================================"
echo ""
echo "📋 NEXT STEPS:"
echo ""
echo "1. Update environment variables in .env.local:"
echo "   - Sanity project credentials"
echo "   - Mapbox token"
echo "   - Google OAuth credentials"
echo "   - Turnstile keys"
echo "   - Admin emails"
echo ""
echo "2. Set up Sanity Studio:"
echo "   cd sanity"
echo "   sanity init"
echo "   sanity deploy"
echo ""
echo "3. Run development server:"
echo "   npm run dev"
echo ""
echo "4. Access the application:"
echo "   http://localhost:3000"
echo ""
echo "5. Access Sanity Studio:"
echo "   http://localhost:3000/studio"
echo ""
echo "6. Access Admin Dashboard:"
echo "   http://localhost:3000/admin"
echo ""
echo "📚 Documentation: README.md"
echo "🚀 Deployment Guide: DEPLOYMENT_CHECKLIST.md"
echo ""
echo "Need help? Contact: support@homelink.co.id"
echo ""
