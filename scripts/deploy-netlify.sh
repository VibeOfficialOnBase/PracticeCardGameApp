#!/bin/bash

# 🚀 PRACTICE APP - Netlify Deployment Script
# Automates deployment to Netlify with all environment variables

set -e  # Exit on error

echo "🚀 PRACTICE APP - Netlify Deployment"
echo "====================================="
echo ""

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI not found. Installing..."
    npm install -g netlify-cli
fi

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local not found!"
    echo "Please create .env.local from .env.example and fill in your values."
    exit 1
fi

echo "✅ Environment file found"
echo ""

# Login to Netlify
echo "🔐 Logging in to Netlify..."
netlify login

echo ""
echo "📦 Initializing project..."
netlify init

echo ""
echo "🔧 Setting environment variables..."

# Read .env.local and set each variable in Netlify
while IFS='=' read -r key value; do
    # Skip comments and empty lines
    if [[ $key =~ ^#.*$ ]] || [[ -z $key ]]; then
        continue
    fi
    
    # Remove quotes from value
    value=$(echo $value | sed 's/^"\(.*\)"$/\1/' | sed "s/^'\(.*\)'$/\1/")
    
    # Set environment variable in Netlify
    echo "  Setting $key..."
    netlify env:set $key "$value" 2>/dev/null || true
done < .env.local

echo ""
echo "🏗️  Building project..."
npm run build

echo ""
echo "🚀 Deploying to production..."
netlify deploy --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🎉 Your PRACTICE app is now live on Netlify!"
echo ""
echo "Next steps:"
echo "1. Visit your deployment URL"
echo "2. Configure custom domain (optional)"
echo "3. Test all features"
echo "4. Set up continuous deployment from Git"
echo ""
echo "Need help? Check DEPLOYMENT_GUIDE.md"
