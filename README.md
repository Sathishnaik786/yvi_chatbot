# YVI Technologies Assistant

An intelligent AI chatbot for YVI Technologies, built with React, Flask, and Gemini AI.

## Prerequisites

- Python 3.9+
- Node.js 16+
- Supabase account
- Gemini API key

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Create a `.env` file in the backend directory with the following content:
   ```env
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_KEY=your_supabase_anon_key
   GEMINI_API_KEY=your_gemini_api_key
   FLASK_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

6. Run the backend server:
   ```bash
   python app.py
   ```
   The backend will be available at http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory with the following content:
   ```env
   VITE_BACKEND_URL=http://localhost:5000
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at http://localhost:3000

## Usage

1. Start both the backend and frontend servers
2. Open your browser and navigate to http://localhost:3000
3. Start chatting with the YVI Technologies Assistant!

## Deployment

### Backend (Render)

The backend is configured for deployment on Render. The `render.yaml` file contains the deployment configuration.

### Frontend (Netlify)

The frontend is configured for deployment on Netlify. Make sure to set the `VITE_BACKEND_URL` environment variable in Netlify to your deployed backend URL.

## Troubleshooting

### Request Timeout Issues

If you're experiencing timeout issues:

1. Ensure both backend and frontend servers are running
2. Check that the backend URL in the frontend `.env` file matches the backend server address
3. Verify your Gemini API key is valid and has sufficient quota
4. Check your internet connection
5. Try reducing the complexity of your questions

### Common Issues

1. **"Request timeout. Please try again."**
   - Make sure the backend server is running
   - Check that the ports are not blocked by firewall
   - Verify environment variables are correctly set

2. **"Network error. Please check your connection."**
   - Ensure the backend server is accessible
   - Check if CORS is properly configured

3. **Import errors in backend**
   - Make sure all dependencies are installed with `pip install -r requirements.txt`
   - Ensure you're using the correct Python version (3.9+)