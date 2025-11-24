# Inngest Setup Guide for ReelPilot

## What is Inngest?
Inngest provides reliable, accurate scheduled job execution - much better than GitHub Actions. Your videos will post exactly every 30 minutes!

---

## Step 1: Create Inngest Account

1. Go to [inngest.com](https://inngest.com)
2. Click "Sign Up" (free, no credit card required)
3. Create a new app called "ReelPilot"

---

## Step 2: Get Your API Keys

1. In Inngest dashboard, go to **Settings** → **Keys**
2. Copy these two keys:
   - **Event Key** (starts with `test_` for development)
   - **Signing Key** (long string for webhook verification)

---

## Step 3: Add Keys to Vercel

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add these variables:

| Name | Value |
|------|-------|
| `INNGEST_EVENT_KEY` | Your Event Key from Step 2 |
| `INNGEST_SIGNING_KEY` | Your Signing Key from Step 2 |
| `DATABASE_URL` | Keep your existing Neon DB connection string |

4. Click **Save**
5. **Redeploy** your project (Vercel → Deployments → Redeploy)

---

## Step 4: Sync Functions with Inngest

1. Wait for Vercel deployment to complete (~2 minutes)
2. Go back to Inngest dashboard
3. Click **"Sync app"** or **"Sync functions"**
4. Your `scheduled-video-post` function should appear!

---

## Step 5: Verify It's Working

### Check Inngest Dashboard
1. Go to **Functions** tab in Inngest
2. You should see: `scheduled-video-post`
3. Click on it to see the schedule: "Every 30 minutes"

### Test Manual Trigger
1. In Inngest dashboard, click your function
2. Click **"Trigger"** to manually run it
3. Watch the execution logs
4. Check if videos are posted!

### Wait for Automatic Run
1. The function will automatically run every 30 minutes
2. Check the **"Runs"** tab to see execution history
3. Each run shows:
   - ✅ Success/Failure status
   - ⏱️ Execution time
   - 📊 Detailed logs

---

## Benefits Over GitHub Actions

| Feature | GitHub Actions | Inngest |
|---------|---------------|---------|
| **Timing** | ❌ 5-60 min delays | ✅ ~1 sec accuracy |
| **Reliability** | ❌ Best effort | ✅ Guaranteed |
| **Monitoring** | ❌ Basic logs | ✅ Rich dashboard |
| **Free Tier** | ✅ Unlimited* | ✅ 25k runs/month |

*Unlimited only for public repos

---

## Troubleshooting

### Function not appearing in Inngest?
- Check that Vercel deployment succeeded
- Verify environment variables are set correctly
- Try clicking "Sync app" again in Inngest dashboard

### Function failing to execute?
- Check Inngest logs for error messages
- Verify `DATABASE_URL` is correct in Vercel
- Check Vercel function logs for errors

### Videos not posting?
- Ensure automation is enabled (click "Start Automation" in app)
- Verify Facebook Page credentials are correct
- Check Inngest execution logs for detailed errors

---

## How It Works

```
Every 30 minutes:
  ↓
Inngest triggers scheduled function
  ↓
Calls your Vercel API (/api/inngest)
  ↓
Checks if automation is enabled
  ↓
Posts next video from queue
  ↓
Logs results in Inngest dashboard
```

---

**You're all set!** Your automation now runs with **guaranteed accuracy** every 30 minutes! 🎉

Monitor all executions in the Inngest dashboard at [app.inngest.com](https://app.inngest.com)
