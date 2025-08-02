#!/bin/bash

# 🚀 Job Admin Portal - Quick Deploy Script

echo "🚀 Starting deployment process..."

# Check if Heroku CLI is installed
if ! command -v heroku &> /dev/null; then
    echo "❌ Heroku CLI not found. Installing..."
    # For Windows, you'll need to install manually
    echo "Please install Heroku CLI from: https://devcenter.heroku.com/articles/heroku-cli"
    exit 1
fi

# Check if logged in to Heroku
if ! heroku auth:whoami &> /dev/null; then
    echo "🔐 Please login to Heroku..."
    heroku login
fi

# Get app name
read -p "Enter your Heroku app name (or press Enter to create one): " app_name

if [ -z "$app_name" ]; then
    echo "Creating new Heroku app..."
    app_name=$(heroku create --json | grep -o '"name":"[^"]*"' | cut -d'"' -f4)
    echo "Created app: $app_name"
else
    echo "Using existing app: $app_name"
fi

# Set environment variables
echo "🔧 Setting up environment variables..."

# Get MongoDB URI
read -p "Enter your MongoDB Atlas connection string: " mongodb_uri

# Generate JWT secret
jwt_secret=$(openssl rand -base64 32)

# Set config vars
heroku config:set JWT_SECRET="$jwt_secret" --app "$app_name"
heroku config:set MONGODB_URI="$mongodb_uri" --app "$app_name"
heroku config:set NODE_ENV=production --app "$app_name"

echo "✅ Environment variables set!"

# Deploy
echo "📦 Deploying to Heroku..."
git add .
git commit -m "Deploy to Heroku"
git push heroku main

# Open the app
echo "🌐 Opening your app..."
heroku open --app "$app_name"

echo "🎉 Deployment complete!"
echo "Your app is live at: https://$app_name.herokuapp.com"
echo ""
echo "📋 Next steps:"
echo "1. Test the application"
echo "2. Set up custom domain (optional)"
echo "3. Monitor logs: heroku logs --tail --app $app_name" 