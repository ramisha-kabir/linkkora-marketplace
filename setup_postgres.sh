#!/bin/bash

# LinkKora PostgreSQL Setup Script
echo "🚀 LinkKora PostgreSQL Setup"
echo "============================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Check if Python 3 is installed
if ! command -v python3 &> /dev/null; then
    print_error "Python 3 is not installed. Please install Python 3 first."
    exit 1
fi

# Install PostgreSQL dependencies
print_status "Installing PostgreSQL dependencies..."
pip3 install psycopg2-binary python-dotenv

if [ $? -eq 0 ]; then
    print_success "PostgreSQL dependencies installed"
else
    print_error "Failed to install PostgreSQL dependencies"
    exit 1
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    print_warning "No .env file found. Creating from template..."
    cp env.example .env
    print_status "Please edit .env file with your database details"
    print_status "For local development, you can use:"
    echo "DB_HOST=localhost"
    echo "DB_NAME=linkkora"
    echo "DB_USER=postgres"
    echo "DB_PASSWORD=your_password"
    echo "DB_PORT=5432"
    echo ""
    print_status "For Render deployment, use:"
    echo "DATABASE_URL=postgresql://username:password@host:port/database"
    echo ""
    read -p "Press Enter after editing .env file..."
fi

# Test database connection
print_status "Testing database connection..."
python3 -c "
import os
from dotenv import load_dotenv
import psycopg2

load_dotenv()

try:
    db_url = os.getenv('DATABASE_URL')
    if db_url:
        conn = psycopg2.connect(db_url)
    else:
        conn = psycopg2.connect(
            host=os.getenv('DB_HOST', 'localhost'),
            database=os.getenv('DB_NAME', 'linkkora'),
            user=os.getenv('DB_USER', 'postgres'),
            password=os.getenv('DB_PASSWORD', ''),
            port=os.getenv('DB_PORT', '5432')
        )
    print('✅ Database connection successful!')
    conn.close()
except Exception as e:
    print(f'❌ Database connection failed: {e}')
    exit(1)
"

if [ $? -eq 0 ]; then
    print_success "Database connection test passed"
else
    print_error "Database connection test failed"
    print_status "Please check your .env file and database settings"
    exit 1
fi

# Run migration
print_status "Running database migration..."
python3 migrate_to_postgres.py

if [ $? -eq 0 ]; then
    print_success "Database migration completed"
else
    print_error "Database migration failed"
    exit 1
fi

# Test the new Flask app
print_status "Testing PostgreSQL Flask app..."
python3 flask_app_postgres.py &
FLASK_PID=$!

sleep 5

# Test the API
if curl -s "http://localhost:5050/health" > /dev/null; then
    print_success "PostgreSQL Flask app is working"
else
    print_error "PostgreSQL Flask app is not responding"
    kill $FLASK_PID 2>/dev/null
    exit 1
fi

# Stop the test server
kill $FLASK_PID 2>/dev/null

echo ""
print_success "PostgreSQL setup completed successfully!"
echo ""
echo "🎉 Your LinkKora app is now ready for PostgreSQL!"
echo ""
echo "Next steps:"
echo "1. Deploy to Render following RENDER_DEPLOYMENT.md"
echo "2. Or run locally with: python3 flask_app_postgres.py"
echo "3. Frontend will work with the new PostgreSQL backend"
echo ""
print_success "Happy coding! 🚀"
