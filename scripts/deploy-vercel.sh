#!/bin/bash

# 🚀 PRACTICE APP - Vercel Deployment Script
# Automates deployment to Vercel with all environment variables

set -e  # Exit on error

echo "🚀 PRACTICE APP - Vercel Deployment"
echo "===================================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local not found!"
    echo "Please create .env.local from .env.example and fill in your values."
    exit 1
fi

echo "✅ Environment file found"
echo ""

# Login to Vercel (if not already)
echo "🔐 Logging in to Vercel..."
vercel login

echo ""
echo "📦 Linking project..."
vercel link

echo ""
echo "🔧 Setting environment variables..."

# Read .env.local and set each variable in Vercel
while IFS='=' read -r key value; do
    # Skip comments and empty lines
    if [[ $key =~ ^#.*$ ]] || [[ -z $key ]]; then
        continue
    fi
    
    # Remove quotes from value
    value=$(echo $value | sed 's/^"\(.*\)"$/\1/' | sed "s/^'\(.*\)'$/\1/")
    
    # Set environment variable in Vercel
    echo "  Setting $key..."
    vercel env add $key production <<< "$value" 2>/dev/null || true
done < .env.local

echo ""
echo "🏗️  Building and deploying to production..."
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🎉 Your PRACTICE app is now live!"
echo ""
echo "Next steps:"
echo "1. Visit your deployment URL"
echo "2. Test wallet connection"
echo "3. Verify card pulls work"
echo "4. Check real-time features"
echo "5. Test PWA installation"
echo ""
echo "Need help? Check DEPLOYMENT_GUIDE.md"
