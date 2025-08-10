#!/bin/bash

# LinkKora Deployment Script
echo "🚀 LinkKora Deployment Script"
echo "=============================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if git is installed
if ! command -v git &> /dev/null; then
    print_error "Git is not installed. Please install Git first."
    exit 1
fi

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    print_status "Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit"
    print_success "Git repository initialized"
else
    print_status "Git repository already exists"
fi

# Check if remote origin exists
if ! git remote get-url origin &> /dev/null; then
    print_warning "No remote origin found. Please add your GitHub repository:"
    echo "git remote add origin https://github.com/YOUR_USERNAME/linkkora.git"
    echo "git push -u origin main"
    echo ""
    print_status "After adding the remote, run this script again."
    exit 1
fi

# Build frontend
print_status "Building frontend..."
cd linkkora-frontend

if [ ! -d "node_modules" ]; then
    print_status "Installing frontend dependencies..."
    npm install
fi

print_status "Building frontend for production..."
npm run build

if [ $? -eq 0 ]; then
    print_success "Frontend built successfully"
else
    print_error "Frontend build failed"
    exit 1
fi

cd ..

# Test backend locally
print_status "Testing backend locally..."
python3 flask_app.py &
BACKEND_PID=$!

# Wait for backend to start
sleep 5

# Test the API
if curl -s "http://localhost:5050/search?q=test" > /dev/null; then
    print_success "Backend is working locally"
else
    print_error "Backend is not responding locally"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

# Stop local backend
kill $BACKEND_PID 2>/dev/null

# Commit and push changes
print_status "Committing and pushing changes..."
git add .
git commit -m "Prepare for deployment"
git push origin main

if [ $? -eq 0 ]; then
    print_success "Code pushed to GitHub successfully"
else
    print_error "Failed to push to GitHub"
    exit 1
fi

echo ""
echo "🎉 Deployment preparation complete!"
echo ""
echo "Next steps:"
echo "1. Deploy backend to Railway:"
echo "   - Go to https://railway.app"
echo "   - Connect your GitHub repository"
echo "   - Deploy the main folder (not linkkora-frontend)"
echo ""
echo "2. Deploy frontend to Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Connect your GitHub repository"
echo "   - Set root directory to 'linkkora-frontend'"
echo "   - Add environment variable VITE_API_URL with your Railway backend URL"
echo ""
echo "3. Update environment variables:"
echo "   - Set VITE_API_URL in Vercel to your Railway backend URL"
echo ""
print_success "Your LinkKora marketplace will be live soon! 🚀"
