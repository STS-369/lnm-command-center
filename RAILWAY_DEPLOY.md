# Railway Deployment Guide for LNM Command Center Backend

## Prerequisites
- A Railway account (sign up at [Railway.app](https://railway.app))
- GitHub account with access to the LNM Command Center repository

## Steps

1. **Sign up for Railway**:
   - Go to [Railway.app](https://railway.app) and sign up using your GitHub account.

2. **Connect the GitHub Repo**:
   - Navigate to the Railway dashboard.
   - Click "New Project" and select "Deploy from GitHub repo".
   - Choose the LNM Command Center repository (`lnm-command-center`).
   - Railway will automatically detect the `railway.json` file and set up the project.

3. **Set Environment Variables**:
   - In the Railway project dashboard, go to the "Variables" tab.
   - Add the following required environment variables:
     - `GOOGLE_TOKEN`: Base64-encoded JSON of your Google API token.
     - `PORT`: (Optional) Port the server will run on (default: 3001).

4. **Deploy the Backend**:
   - Railway will automatically build and deploy the backend when the repo is connected.
   - Monitor the deployment logs in the Railway dashboard for errors.

5. **Get the Railway URL**:
   - Once deployed, Railway provides a URL (e.g., `https://lnm-api.up.railway.app`).
   - Copy this URL and update the frontend to use it as the `RAILWAY_API_URL` environment variable.

6. **Update the Frontend**:
   - Edit `/src/app/outreach/page.tsx` to use the Railway URL in production:
     ```typescript
     const apiUrl = process.env.RAILWAY_API_URL || '/api/gmail/send';
     ```
   - Ensure the frontend is rebuilt and redeployed.

7. **Verify the Deployment**:
   - Test the `/api/health` endpoint to confirm the backend is running.
   - Test the `/api/gmail/send` endpoint to verify email sending works.