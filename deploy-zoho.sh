#!/bin/bash
# Zoho Catalyst Deployment Script for Multi Purpose Engineering School
# This script helps deploy the static website to Zoho Catalyst

set -e

echo "🚀 Multi Purpose Engineering School - Zoho Catalyst Deployment"
echo "=============================================================="

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Zoho Catalyst CLI is installed
if ! command -v zc &> /dev/null; then
    echo -e "${YELLOW}⚠️  Zoho Catalyst CLI not found.${NC}"
    echo "Please install it using one of these methods:"
    echo ""
    echo "  Method 1 (recommended):"
    echo "    npm install -g @zoho/catalyst-cli"
    echo ""
    echo "  Method 2 (via Zoho Marketplace):"
    echo "    Download from: https://www.zoho.com/catalyst/developer-documentation/catalyst-cli.html"
    echo ""
    echo "  Method 3 (manual download):"
    echo "    Visit: https://github.com/zoho/catalyst-cli/releases"
    echo ""
    echo "After installation, run: zc login"
    echo "Then return and run this script again."
    exit 1
fi

echo -e "${BLUE}✅ Zoho Catalyst CLI found${NC}"

# Check if user is logged in
if ! zc whoami &> /dev/null; then
    echo -e "${YELLOW}⚠️  Not logged in to Zoho.${NC}"
    echo "Please run: zc login"
    echo "Then return and run this script again."
    exit 1
fi

echo -e "${GREEN}✅ Logged in to Zoho${NC}"

# Initialize Catalyst project (if not already done)
if [ ! -f ".catalyst" ]; then
    echo -e "${YELLOW}⚠️  Catalyst project not initialized.${NC}"
    echo "Initializing..."
    zc init
fi

# Check git configuration
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Git repository not found.${NC}"
    echo "Initializing git repository..."
    git init
fi

# Make sure we're on main/master branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ] && [ "$CURRENT_BRANCH" != "master" ]; then
    echo -e "${BLUE}ℹ️  Current branch: $CURRENT_BRANCH${NC}"
    echo "Switching to main branch..."
    git checkout -B main
fi

# Add all changes
echo "📦 Adding files..."
git add -A

# Commit changes
echo "💾 Committing changes..."
git commit -m "Update for Zoho Catalyst deployment" || echo "No changes to commit"

# Push to remote (if configured)
if git remote get-url origin &> /dev/null; then
    echo "📤 Pushing to remote..."
    git push origin main
fi

# Deploy to Zoho Catalyst
echo -e "${BLUE}🚀 Deploying to Zoho Catalyst...${NC}"
zc push

echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo "Next steps:"
echo "  1. Go to Zoho Catalyst Console: https://console.catalyst.zoho.com"
echo "  2. Select your project: mp-engineering-school"
echo "  3. Navigate to Website section"
echo "  4. Your website will be available at the deployed URL"
echo ""
echo "To view live logs:"
echo "  zc logs --tail"
echo ""