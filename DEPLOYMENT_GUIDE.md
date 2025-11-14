# Deployment Guide: Frontend on Netlify, Backend on Render

## Prerequisites

1. Create accounts:
   - [Netlify](https://netlify.com)
   - [Render](https://render.com)

2. Ensure you have your Supabase credentials:
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
   
3. Get your Gemini API key from [Google AI Studio](https://aistudio.google.com/)

## Frontend Deployment (Netlify)

### Option 1: Manual Deployment
1. Build your frontend:
   ```bash
   cd frontend
   npm run build
   ```
   This creates a `dist` folder with your production build.

2. Go to Netlify dashboard and drag-drop the `dist` folder to deploy.

### Option 2: Git-based Deployment (Recommended)
1. Push your code to GitHub/GitLab
2. Connect Netlify to your repository
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add environment variables:
   - `VITE_BACKEND_URL`: Your Render backend URL (e.g., https://your-app.onrender.com)

## Backend Deployment (Render)

### 1. Prepare for Render Deployment
Create a `requirements.txt` file in your backend directory with these dependencies:
```
Flask==2.3.2
flask-cors==4.0.0
supabase==2.4.5
python-dotenv==1.0.0
gunicorn==20.1.0
requests==2.31.0
```

### 2. Create a `render.yaml` file in your project root:
```yaml
services:
  - type: web
    name: yvi-backend
    runtime: python
    buildCommand: pip install -r backend/requirements.txt
    startCommand: gunicorn --bind 0.0.0.0:$PORT app:app
    envVars:
      - key: PYTHON_VERSION
        value: 3.9.16
      - key: FLASK_ENV
        value: production
```

### 3. Deploy to Render
1. Push your code to GitHub/GitLab
2. Connect Render to your repository
3. Select "Web Service"
4. Render will automatically detect the Flask app
5. Add environment variables:
   - `SUPABASE_URL`: your Supabase URL
   - `SUPABASE_KEY`: your Supabase service role key
   - `GEMINI_API_KEY`: your Gemini API key
   - `FRONTEND_URL`: your Netlify frontend URL (e.g., https://your-app.netlify.app)

## Post-Deployment Configuration

### Update Frontend API URLs
After deploying your backend, update your frontend to point to the Render backend URL instead of localhost.

In your frontend code, look for API calls to `http://localhost:5000` and replace with your Render URL.

### Environment Variables
Set these environment variables in Netlify for your frontend:
- `VITE_BACKEND_URL`: Your Render backend URL

## Troubleshooting

### Common Issues
1. **CORS errors**: Make sure your Flask CORS configuration allows your Netlify domain
2. **Environment variables not loading**: Double-check variable names and values
3. **Build failures**: Ensure all dependencies are in requirements.txt
4. **Request timeout errors**: 
   - Check that your backend is properly deployed and running
   - Verify your Gemini API key is valid
   - Ensure your frontend is pointing to the correct backend URL
   - Check Render logs for any errors

### Timeout Configuration
The application is configured with appropriate timeouts:
- Backend Supabase queries: 10 seconds
- Backend Gemini API calls: 30 seconds
- Frontend API requests: 30 seconds

If you're experiencing timeout issues:
1. Check your internet connection
2. Verify your Gemini API key has sufficient quota
3. Try simplifying your questions
4. Check Render logs for any backend errors

### Checking Logs
- Netlify: Check deploy logs in the Netlify dashboard
- Render: Check service logs in the Render dashboard

## Cost Considerations

Both platforms offer free tiers:
- **Netlify**: 100GB bandwidth, 300 build minutes/month
- **Render**: 512MB RAM, 1GB disk space for free web services

For production use, consider their paid plans for better performance and support.