# Netlify Deployment Guide

## Prerequisites
1. A Netlify account (sign up at https://app.netlify.com)
2. Your project pushed to GitHub, GitLab, or Bitbucket

## Deployment Steps

### Option 1: Deploy via Netlify UI (Easiest)

1. Go to [https://app.netlify.com](https://app.netlify.com) and sign in
2. Click "Add new site" → "Import an existing project"
3. Select your Git provider (GitHub, GitLab, or Bitbucket)
4. Choose the `Recetas-online-RX` repository
5. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Click "Deploy site"

### Option 2: Deploy via Netlify CLI

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Build the project:
   ```bash
   npm install
   npm run build
   ```

3. Deploy:
   ```bash
   netlify deploy --prod --dir=dist
   ```

4. Follow the prompts to connect your Netlify account

### Option 3: Automatic Deployments with Git

Once connected via Option 1:
- Every push to your main branch automatically triggers a deployment
- Preview deployments are created for pull requests
- Configure environment variables in Netlify's Site settings

## Environment Variables

If your app uses environment variables (e.g., Supabase credentials):

1. Go to Netlify Site Settings → Environment
2. Add your variables:
   - `EXPO_PUBLIC_*` (publicly accessible)
   - Other sensitive variables

3. Redeploy after adding variables

## Build Output

- **Build output directory:** `dist`
- **Build command:** `npm run build` (runs `expo export -p web`)
- **Redirects:** Configured in `netlify.toml` for Expo Router SPA routing

## Troubleshooting

- **Build fails:** Check that `npm install` runs successfully locally
- **Routes not working:** The `netlify.toml` file handles SPA routing redirects
- **Assets not loading:** Verify asset paths in `app.json` and components

## After Deployment

Your app will be live at: `https://your-site-name.netlify.app`

To set a custom domain, go to Site Settings → Domain Management
