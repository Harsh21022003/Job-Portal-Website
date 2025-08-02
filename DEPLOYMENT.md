# 🚀 Job Admin Portal - Deployment Guide

## **Quick Deploy Options**

### **1. Heroku Deployment (Recommended)**

#### **Prerequisites:**
- Heroku account
- Heroku CLI installed
- Git repository

#### **Steps:**

1. **Install Heroku CLI:**
   ```bash
   # Windows
   winget install --id=Heroku.HerokuCLI
   
   # Or download from: https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login to Heroku:**
   ```bash
   heroku login
   ```

3. **Create Heroku App:**
   ```bash
   heroku create your-app-name
   ```

4. **Set Environment Variables:**
   ```bash
   heroku config:set JWT_SECRET=your-secret-key-here
   heroku config:set MONGODB_URI=your-mongodb-connection-string
   ```

5. **Deploy:**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

6. **Open App:**
   ```bash
   heroku open
   ```

### **2. Railway Deployment**

#### **Steps:**
1. Go to [Railway.app](https://railway.app)
2. Connect your GitHub repository
3. Set environment variables:
   - `JWT_SECRET`
   - `MONGODB_URI`
4. Deploy automatically

### **3. Render Deployment**

#### **Steps:**
1. Go to [Render.com](https://render.com)
2. Connect your GitHub repository
3. Choose "Web Service"
4. Set environment variables
5. Deploy

### **4. Vercel Deployment (Frontend Only)**

For frontend-only deployment:

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   cd public
   vercel
   ```

## **Environment Variables**

Create a `.env` file for local development:

```env
JWT_SECRET=your-secret-key-here
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
PORT=5000
```

## **Production Configuration**

### **Update CORS for Production:**
```javascript
// In server.js
app.use(cors({
    origin: ['https://your-frontend-domain.com', 'http://localhost:3000'],
    credentials: true
}));
```

### **Update Frontend API URL:**
```javascript
// In public/auth.js and public/dashboard.js
const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? 'https://your-backend-domain.com/api' 
    : 'http://localhost:5000/api';
```

## **Database Setup**

### **MongoDB Atlas (Recommended):**
1. Create account at [MongoDB Atlas](https://mongodb.com/atlas)
2. Create cluster
3. Get connection string
4. Add to environment variables

### **Local MongoDB:**
```bash
# Install MongoDB locally
# Update MONGODB_URI to: mongodb://localhost:27017/job-admin-portal
```

## **SSL/HTTPS Setup**

### **For Production:**
- Heroku, Railway, Render provide SSL automatically
- For custom domains, use Let's Encrypt

## **Monitoring & Logs**

### **Heroku:**
```bash
heroku logs --tail
```

### **Railway:**
- View logs in dashboard

### **Render:**
- View logs in dashboard

## **Scaling Considerations**

1. **Database:** Use MongoDB Atlas for scalability
2. **Caching:** Add Redis for session management
3. **CDN:** Use Cloudflare for static assets
4. **Load Balancing:** Multiple instances for high traffic

## **Security Checklist**

- [ ] JWT_SECRET is strong and unique
- [ ] CORS is properly configured
- [ ] Environment variables are set
- [ ] Database connection is secure
- [ ] HTTPS is enabled
- [ ] Input validation is implemented
- [ ] Rate limiting is configured

## **Troubleshooting**

### **Common Issues:**

1. **Port Already in Use:**
   ```bash
   # Kill process on port 3000
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   
   # Kill process on port 5000
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   ```

2. **MongoDB Connection Error:**
   - Check connection string
   - Verify network access
   - Check credentials

3. **CORS Errors:**
   - Update CORS origin in server.js
   - Check frontend API URL

## **Performance Optimization**

1. **Enable Compression:**
   ```bash
   npm install compression
   ```

2. **Add to server.js:**
   ```javascript
   const compression = require('compression');
   app.use(compression());
   ```

3. **Optimize Images:**
   - Use WebP format
   - Implement lazy loading

## **Backup Strategy**

1. **Database Backup:**
   - MongoDB Atlas provides automatic backups
   - Set up manual backup scripts

2. **Code Backup:**
   - Use Git for version control
   - Regular commits and pushes

## **Support**

For deployment issues:
1. Check logs: `heroku logs --tail`
2. Verify environment variables
3. Test locally first
4. Check documentation of your chosen platform 