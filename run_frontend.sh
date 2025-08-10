#!/bin/bash

# LinkKora Frontend Startup Script
echo "🚀 Starting LinkKora Frontend..."
echo "=================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Change to frontend directory
cd linkkora-frontend

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the development server
echo "🎯 Starting development server..."
echo "Frontend will be available at: http://localhost:3000"
echo "Make sure your Flask backend is running on: http://localhost:5050"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev 