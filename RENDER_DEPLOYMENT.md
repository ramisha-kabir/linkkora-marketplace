# 🚀 LinkKora Deployment on Render with PostgreSQL

This guide will help you deploy your LinkKora marketplace to Render with a PostgreSQL database.

## 📋 Prerequisites

- GitHub account
- Render account (free at [render.com](https://render.com))
- Your LinkKora project ready

## 🗄️ **Step 1: Set Up PostgreSQL Database on Render**

### **Create PostgreSQL Database:**

1. **Go to Render Dashboard:**
   - Visit [render.com](https://render.com)
   - Sign up/Sign in with your GitHub account

2. **Create New PostgreSQL Database:**
   - Click "New" → "PostgreSQL"
   - Name: `linkkora-database`
   - Database: `linkkora`
   - User: `linkkora_user`
   - Region: Choose closest to your users
   - Plan: Free (for development)

3. **Save Database Details:**
   - Copy the **Internal Database URL** (you'll need this later)
   - It looks like: `postgresql://linkkora_user:password@host:port/linkkora`

## 🚀 **Step 2: Deploy Backend to Render**

### **Create Web Service:**

1. **Create New Web Service:**
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Name: `linkkora-backend`

2. **Configure Build Settings:**
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn flask_app_postgres:app`
   - **Environment:** Python 3

3. **Set Environment Variables:**
   - Click "Environment" tab
   - Add these variables:
     ```
     DATABASE_URL = [Your PostgreSQL URL from Step 1]
     FLASK_ENV = production
     ```

4. **Deploy:**
   - Click "Create Web Service"
   - Render will automatically deploy your backend

## 🌐 **Step 3: Deploy Frontend to Render**

### **Create Static Site:**

1. **Create New Static Site:**
   - Click "New" → "Static Site"
   - Connect your GitHub repository
   - Name: `linkkora-frontend`

2. **Configure Build Settings:**
   - **Build Command:** `cd linkkora-frontend && npm install && npm run build`
   - **Publish Directory:** `linkkora-frontend/dist`

3. **Set Environment Variables:**
   - Add this variable:
     ```
     VITE_API_URL = [Your backend URL from Step 2]
     ```

4. **Deploy:**
   - Click "Create Static Site"
   - Render will build and deploy your frontend

## 📊 **Step 4: Migrate Data to PostgreSQL**

### **Run Migration Script:**

1. **Install PostgreSQL Dependencies Locally:**
   ```bash
   pip install psycopg2-binary python-dotenv
   ```

2. **Set Up Local Environment:**
   ```bash
   cp env.example .env
   # Edit .env with your Render PostgreSQL URL
   ```

3. **Run Migration:**
   ```bash
   python3 migrate_to_postgres.py
   ```

### **Alternative: Use Render Shell**

1. **Access Render Shell:**
   - Go to your backend service
   - Click "Shell" tab
   - Run migration commands there

## 🔧 **Step 5: Update Configuration Files**

### **Update Procfile for PostgreSQL:**
```
web: gunicorn flask_app_postgres:app
```

## 🧪 **Step 6: Test Your Deployment**

### **Test Backend API:**
```bash
curl "https://your-backend-url.onrender.com/health"
curl "https://your-backend-url.onrender.com/search?q=shirt"
```

### **Test Frontend:**
- Visit your frontend URL
- Try searching for products
- Test all features

## 🎉 **Your Website URLs:**

- **Frontend:** `https://linkkora-frontend.onrender.com`
- **Backend API:** `https://linkkora-backend.onrender.com`
- **Database:** Managed by Render

## 💰 **Cost:**

- **Free Tier:** $0/month
- **Database:** 1GB storage, 90 days retention
- **Web Service:** 750 hours/month
- **Static Site:** Unlimited

## 🚀 **Benefits of This Setup:**

✅ **Scalable Database** - PostgreSQL handles large datasets  
✅ **Automatic Backups** - Render manages database backups  
✅ **Global CDN** - Fast loading worldwide  
✅ **SSL Certificates** - Secure HTTPS by default  
✅ **Easy Scaling** - Upgrade plans as needed  
✅ **Professional URLs** - Clean, branded domains  

## 🛠️ **Troubleshooting:**

### **Common Issues:**

1. **Database Connection Errors:**
   - Check DATABASE_URL environment variable
   - Verify database is running on Render

2. **Migration Failures:**
   - Run migration script locally first
   - Check database permissions

3. **Build Errors:**
   - Verify all dependencies in requirements.txt
   - Check build logs in Render dashboard

### **Useful Commands:**

```bash
# Test database connection
python3 -c "import psycopg2; print('PostgreSQL connection works')"

# Check environment variables
echo $DATABASE_URL

# Test API locally
curl "http://localhost:5050/health"
```

Your LinkKora marketplace is now ready for production with a robust PostgreSQL database! 🚀