#!/bin/bash
# Bentwix OS - Quick Setup Script

set -e

echo "🚀 Bentwix OS - Setup Script"
echo "============================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install it from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

echo ""
echo "✅ Dependencies installed!"
echo ""

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local file..."
    cp .env.local.example .env.local
    echo ""
    echo "⚠️  IMPORTANT: Edit .env.local with your credentials:"
    echo "   - Supabase URL and key"
    echo "   - Stripe keys"
    echo ""
fi

echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env.local with your credentials"
echo "2. Set up database: https://supabase.com/docs"
echo "3. Configure Stripe: https://stripe.com/docs"
echo "4. Run: npm run dev"
echo ""
echo "📚 For detailed instructions, see:"
echo "   - README.md"
echo "   - DEPLOYMENT.md"
echo "   - ARCHITECTURE.md"
echo ""
