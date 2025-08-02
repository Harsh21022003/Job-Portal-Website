# Deployment Guide for Job Admin Portal

## Prerequisites
- Node.js project with all dependencies installed
- MongoDB Atlas account (for cloud database)
- Git repository

## Option 1: Deploy to Heroku (Recommended)

### Step 1: Prepare Your Project
1. Make sure you have a `server.js` file (already created)
2. Ensure `package.json` has the correct start script
3. Create a `.env` file with your production variables

### Step 2: Set up MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get your connection string
4. Replace `<password>` with your database password

### Step 3: Deploy to Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create Heroku app
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI="your-mongodb-atlas-connection-string"
heroku config:set JWT_SECRET="your-super-secret-jwt-key"
heroku config:set NODE_ENV="production"

# Deploy
git add .
git commit -m "Deploy to Heroku"
git push heroku main

# Open your app
heroku open
```

## Option 2: Deploy to Railway

### Step 1: Connect to Railway
1. Go to [Railway](https://railway.app/)
2. Connect your GitHub repository
3. Railway will automatically detect your Node.js app

### Step 2: Configure Environment Variables
In Railway dashboard, add these environment variables:
- `MONGODB_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: Your secret key
- `NODE_ENV`: production

### Step 3: Deploy
Railway will automatically deploy when you push to your main branch.

## Option 3: Deploy to Render

### Step 1: Connect to Render
1. Go to [Render](https://render.com/)
2. Connect your GitHub repository
3. Choose "Web Service"

### Step 2: Configure
- **Build Command**: `npm install`
- **Start Command**: `node server.js`
- **Environment**: Node

### Step 3: Set Environment Variables
Add the same environment variables as above.

## Environment Variables Setup

Create a `.env` file in your project root:
```env
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/admin-dashboard
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=production
```

## MongoDB Atlas Setup

1. **Create Cluster**:
   - Go to MongoDB Atlas
   - Create a free cluster
   - Choose your preferred cloud provider and region

2. **Set up Database Access**:
   - Create a database user with read/write permissions
   - Remember the username and password

3. **Set up Network Access**:
   - Add your IP address or use `0.0.0.0/0` for all IPs (less secure)

4. **Get Connection String**:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password

## Post-Deployment Checklist

- [ ] Test the application login/signup
- [ ] Verify candidate CRUD operations work
- [ ] Check that static files are served correctly
- [ ] Test responsive design on mobile
- [ ] Verify environment variables are set correctly
- [ ] Check application logs for any errors

## Troubleshooting

### Common Issues:

1. **MongoDB Connection Error**:
   - Verify your connection string
   - Check if your IP is whitelisted in MongoDB Atlas
   - Ensure database user has correct permissions

2. **Port Issues**:
   - Most platforms set PORT automatically
   - Don't hardcode port 3000 in production

3. **Static Files Not Loading**:
   - Ensure `public` folder is in the correct location
   - Check file paths in your HTML files

4. **CORS Errors**:
   - Update your frontend API calls to use the deployed URL
   - Check CORS configuration in server.js

## Security Considerations

1. **Environment Variables**: Never commit `.env` files to Git
2. **JWT Secret**: Use a strong, unique secret key
3. **MongoDB**: Use strong passwords and limit network access
4. **HTTPS**: Most platforms provide HTTPS automatically

## Monitoring

- Set up logging to monitor your application
- Use platform-specific monitoring tools
- Set up alerts for errors and downtime

## Scaling

- Most platforms offer easy scaling options
- Consider using a CDN for static assets
- Implement caching strategies as needed 