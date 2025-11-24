# ReelPilot - Serverless Setup Guide

## Prerequisites
- GitHub account
- Vercel account
- Neon DB account

## Step 1: Set Up Neon DB

1. Go to [neon.tech](https://neon.tech) and sign up/login
2. Click "Create Project"
3. Choose a name (e.g., "reelpilot")
4. Select a region close to your users
5. Copy the connection string (it looks like: `postgresql://user:password@host/database`)

## Step 2: Configure GitHub Secrets

1. Go to your GitHub repository: `https://github.com/NiloyChowdhuryVR/ReelPilot`
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add:

### Secret 1: DATABASE_URL
- **Name**: `DATABASE_URL`
- **Value**: Your Neon DB connection string from Step 1

### Secret 2: CRON_SECRET
- **Name**: `CRON_SECRET`
- **Value**: Generate a random token:
  ```bash
  # On Mac/Linux:
  openssl rand -hex 32
  
  # On Windows PowerShell:
  -join ((48..57) + (97..102) | Get-Random -Count 32 | % {[char]$_})
  ```
  Copy the generated string

### Secret 3: VERCEL_URL
- **Name**: `VERCEL_URL`
- **Value**: `https://your-app-name.vercel.app` (you'll get this after deploying to Vercel)

## Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click **Add New** → **Project**
3. Import your GitHub repository: `NiloyChowdhuryVR/ReelPilot`
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`

5. Add Environment Variables:
   - Click **Environment Variables**
   - Add `DATABASE_URL` (your Neon DB connection string)
   - Add `CRON_SECRET` (same value as GitHub secret)

6. Click **Deploy**

7. Once deployed, copy your Vercel URL (e.g., `https://reel-pilot.vercel.app`)

8. Go back to GitHub Secrets and update `VERCEL_URL` with your actual Vercel URL

## Step 4: Initialize Database

1. On your local machine, update `.env`:
   ```env
   DATABASE_URL="your-neon-db-connection-string"
   ```

2. Run database migrations:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

## Step 5: Verify GitHub Actions

1. Go to your GitHub repository
2. Click **Actions** tab
3. You should see "Automated Video Scheduler" workflow
4. It will run automatically every 5 minutes
5. You can also trigger it manually by clicking **Run workflow**

## Step 6: Test the Setup

1. Go to your Vercel deployment URL
2. Create a workflow with:
   - Facebook Page node (add credentials)
   - Video Source node (add video URLs)
   - Connect them
3. Click "Start Automation"
4. Wait 5 minutes for the GitHub Action to run
5. Check the **Actions** tab on GitHub to see execution logs
6. Check your Facebook page for posted videos!

## Troubleshooting

### GitHub Actions failing?
- Check if `CRON_SECRET` matches in both GitHub and Vercel
- Verify `VERCEL_URL` is correct
- Check Actions logs for detailed error messages

### Database connection errors?
- Verify `DATABASE_URL` is correct in Vercel
- Check Neon DB dashboard for connection limits
- Ensure database is not paused (free tier auto-pauses after inactivity)

### Videos not posting?
- Check automation is enabled (green status)
- Verify Facebook Page credentials are correct
- Check Vercel function logs for errors

## How It Works

1. **GitHub Actions** runs every 5 minutes
2. It calls your `/api/scheduler` endpoint on Vercel
3. The API checks if automation is enabled
4. If enabled, it posts videos from your workflows
5. Results are logged in the application

## Customizing Cron Frequency

Edit `.github/workflows/scheduler.yml`:

```yaml
schedule:
  - cron: '*/5 * * * *'  # Every 5 minutes
  # - cron: '*/10 * * * *'  # Every 10 minutes
  # - cron: '*/15 * * * *'  # Every 15 minutes
  # - cron: '0 * * * *'     # Every hour
```

---

**You're all set!** Your automation now runs 24/7 in the cloud! 🎉
