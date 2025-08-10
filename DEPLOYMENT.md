# 🚀 LinkKora Deployment Guide

This guide will help you deploy your LinkKora marketplace to the internet using free and low-cost hosting services.

## 📋 Prerequisites

- GitHub account
- Node.js installed locally
- Python 3.9+ installed locally
- Git installed locally

## 🎯 Deployment Options

### **Option 1: Vercel (Frontend) + Railway (Backend) - RECOMMENDED**

This is the easiest and most cost-effective approach for beginners.

#### **Step 1: Deploy Frontend to Vercel**

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/linkkora.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account
   - Click "New Project"
   - Import your GitHub repository
   - Set the root directory to `linkkora-frontend`
   - Add environment variable:
     - Name: `VITE_API_URL`
     - Value: `https://your-backend-url.railway.app` (you'll get this after backend deployment)
   - Click "Deploy"

#### **Step 2: Deploy Backend to Railway**

1. **Go to Railway:**
   - Visit [railway.app](https://railway.app)
   - Sign up with your GitHub account

2. **Create New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Set the root directory to the main folder (not linkkora-frontend)

3. **Configure Environment:**
   - Railway will automatically detect it's a Python project
   - It will install dependencies from `requirements.txt`
   - The `Procfile` will tell it how to run the app

4. **Get Your Backend URL:**
   - Once deployed, Railway will give you a URL like `https://your-app-name.railway.app`
   - Copy this URL

5. **Update Frontend Environment Variable:**
   - Go back to Vercel dashboard
   - Update the `VITE_API_URL` environment variable with your Railway URL
   - Redeploy the frontend

### **Option 2: Netlify (Frontend) + Render (Backend)**

#### **Frontend Deployment (Netlify)**

1. **Build the frontend locally:**
   ```bash
   cd linkkora-frontend
   npm run build
   ```

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up and click "New site from Git"
   - Connect your GitHub repository
   - Set build command: `cd linkkora-frontend && npm install && npm run build`
   - Set publish directory: `linkkora-frontend/dist`
   - Add environment variable `VITE_API_URL` with your backend URL

#### **Backend Deployment (Render)**

1. **Go to Render:**
   - Visit [render.com](https://render.com)
   - Sign up with your GitHub account

2. **Create Web Service:**
   - Click "New Web Service"
   - Connect your GitHub repository
   - Set build command: `pip install -r requirements.txt`
   - Set start command: `gunicorn flask_app:app`
   - Choose the free plan

### **Option 3: Heroku (Both Frontend and Backend)**

#### **Deploy Backend to Heroku**

1. **Install Heroku CLI:**
   ```bash
   # macOS
   brew tap heroku/brew && brew install heroku
   
   # Or download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Deploy Backend:**
   ```bash
   heroku login
   heroku create your-app-name-backend
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

3. **Get Backend URL:**
   ```bash
   heroku info
   # Copy the web URL
   ```

#### **Deploy Frontend to Heroku**

1. **Create a new Heroku app for frontend:**
   ```bash
   heroku create your-app-name-frontend
   ```

2. **Set buildpacks:**
   ```bash
   heroku buildpacks:set heroku/nodejs
   heroku buildpacks:add heroku/static
   ```

3. **Deploy frontend:**
   ```bash
   cd linkkora-frontend
   heroku git:remote -a your-app-name-frontend
   git add .
   git commit -m "Deploy frontend"
   git push heroku main
   ```

## 🔧 Environment Variables

### **Frontend Environment Variables**
- `VITE_API_URL`: Your backend API URL (e.g., `https://your-backend.railway.app`)

### **Backend Environment Variables**
- `FLASK_ENV`: Set to `production` for production deployment
- `PORT`: Usually set automatically by the hosting platform

## 📁 File Structure for Deployment

```
linkorra-main/
├── linkkora-frontend/          # Frontend React app
│   ├── src/
│   ├── package.json
│   ├── vercel.json            # Vercel configuration
│   └── dist/                  # Built files (generated)
├── flask_app.py               # Main Flask application
├── requirements.txt           # Python dependencies
├── Procfile                  # Heroku/Railway configuration
├── runtime.txt               # Python version
└── *.xlsx                    # Data files
```

## 🚀 Quick Deployment Commands

### **For Vercel + Railway (Recommended)**

1. **Prepare repository:**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Deploy backend to Railway:**
   - Follow Railway steps above
   - Get your backend URL

3. **Deploy frontend to Vercel:**
   - Follow Vercel steps above
   - Set `VITE_API_URL` to your Railway backend URL

### **For Heroku**

1. **Deploy backend:**
   ```bash
   heroku create your-app-backend
   git push heroku main
   ```

2. **Deploy frontend:**
   ```bash
   cd linkkora-frontend
   heroku create your-app-frontend
   heroku buildpacks:set heroku/nodejs
   heroku buildpacks:add heroku/static
   git push heroku main
   ```

## 🔍 Testing Your Deployment

1. **Test Backend API:**
   ```bash
   curl "https://your-backend-url.com/search?q=shirt"
   ```

2. **Test Frontend:**
   - Visit your frontend URL
   - Try searching for products
   - Test the favorites functionality

## 🛠️ Troubleshooting

### **Common Issues:**

1. **CORS Errors:**
   - Make sure your backend has CORS properly configured
   - Check that the frontend URL is allowed in CORS settings

2. **Environment Variables:**
   - Verify `VITE_API_URL` is set correctly in your frontend deployment
   - Check that the backend URL is accessible

3. **Build Errors:**
   - Ensure all dependencies are in `package.json` (frontend) and `requirements.txt` (backend)
   - Check that the correct Node.js and Python versions are specified

4. **File Not Found Errors:**
   - Make sure your Excel files are included in the deployment
   - Check file paths in your code

### **Debugging Commands:**

```bash
# Check if backend is running
curl "https://your-backend-url.com/search?q=test"

# Check frontend build
cd linkkora-frontend
npm run build

# Check Python dependencies
pip install -r requirements.txt
```

## 💰 Cost Comparison

| Platform | Frontend | Backend | Monthly Cost |
|----------|----------|---------|--------------|
| Vercel + Railway | Free | Free tier | $0 |
| Netlify + Render | Free | Free tier | $0 |
| Heroku | Free tier | Free tier | $0 |
| AWS | Pay per use | Pay per use | $5-20 |
| DigitalOcean | $5/month | $5/month | $10 |

## 🎉 Success!

Once deployed, your LinkKora marketplace will be accessible worldwide at:
- **Frontend**: `https://your-app-name.vercel.app`
- **Backend API**: `https://your-app-name.railway.app`

Your marketplace is now live and ready for users! 🚀
