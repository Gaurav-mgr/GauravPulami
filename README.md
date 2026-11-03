# Gaurav Pulami: Portfolio

React + Tailwind CSS v4 + GSAP, built with Vite.

## Run locally

```bash
npm install
npm run dev
```

## Deploy to Vercel

### Option A: GitHub + Vercel dashboard (recommended, auto-redeploys on every push)

1. Create a new GitHub repository and push this folder to it:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/Gaurav-mgr/gaurav-portfolio.git
   git push -u origin main
   ```
2. Go to https://vercel.com/new and sign in (GitHub login works).
3. Click **Import** on the repository.
4. Vercel detects Vite automatically (Build command `npm run build`, Output directory `dist`). Click **Deploy**.
5. In about a minute you get a public `https://<name>.vercel.app` link that works on phones and any device.

### Option B: Vercel CLI (no GitHub needed)

```bash
npm install -g vercel
vercel          # first run: log in and accept the defaults to get a preview link
vercel --prod   # publish to production
```

## Before you share the link

Open `src/Portfolio.jsx` and edit the content at the top of the file:

- `PROFILE.email` and `PROFILE.linkedin` (currently placeholders)
- `PROJECTS` (replace the placeholder cards with your real repositories)
- `TIMELINE` (check the CreativeLaya bullet points, add dates if you like)

## Custom domain

In the Vercel dashboard open your project, then **Settings → Domains** and add your domain.
