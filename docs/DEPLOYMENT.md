# PRACTICE Deployment Guide

Complete guide for deploying the PRACTICE app to production.

---

## Prerequisites

### Required Accounts
- **Vercel Account** (recommended) or any Node.js hosting platform
- **SpacetimeDB Account** - For real-time database
- **Base RPC Provider** - For blockchain reads (Alchemy, Infura, or Coinbase Node)
- **WalletConnect Project** - For wallet connections

### Required Environment Variables
```bash
# SpacetimeDB
SPACETIME_SERVER_URL=https://your-spacetimedb-instance.spacetimedb.com

# Wallet & Blockchain
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_BASE_RPC_URL=https://base-mainnet.g.alchemy.com/v2/your-api-key

# Optional: Email (for authentication)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password

# Optional: Push Notifications
VAPID_PUBLIC_KEY=your_public_key
VAPID_PRIVATE_KEY=your_private_key
VAPID_SUBJECT=mailto:your-email@example.com
```

---

## Deployment to Vercel (Recommended)

### Step 1: Prepare Repository
```bash
# Ensure all changes are committed
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Select your GitHub repository
4. Configure project settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### Step 3: Configure Environment Variables
In Vercel dashboard → Settings → Environment Variables:

Add all required variables from the list above. Make sure to:
- Use `NEXT_PUBLIC_` prefix for client-side variables
- Keep sensitive keys (API keys, private keys) without `NEXT_PUBLIC_` prefix
- Set variables for Production, Preview, and Development environments

### Step 4: Deploy
1. Click "Deploy"
2. Wait for build to complete (~2-5 minutes)
3. Vercel will assign a URL: `your-app.vercel.app`

### Step 5: Configure Custom Domain (Optional)
1. In Vercel dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for SSL certificate provisioning (~1 hour)

---

## SpacetimeDB Setup

### Step 1: Create SpacetimeDB Instance
1. Go to [spacetimedb.com](https://spacetimedb.com)
2. Create account and new database
3. Note your instance URL

### Step 2: Publish Database Module
```bash
cd spacetime-server
spacetime publish
```

This will:
- Compile the Rust module
- Deploy to your SpacetimeDB instance
- Generate client bindings

### Step 3: Verify Connection
```bash
# Test connection
curl https://your-instance.spacetimedb.com/health
```

---

## Post-Deployment Checklist

### Functionality Testing
- [ ] App loads successfully
- [ ] Can create new user
- [ ] Can pull daily card
- [ ] Wallet connection works
- [ ] Token balance loads correctly
- [ ] SpacetimeDB connection established
- [ ] Achievements unlock correctly
- [ ] Leaderboard displays data
- [ ] PWA install prompt appears (mobile)
- [ ] Push notifications work (if enabled)

### Performance Testing
- [ ] Lighthouse score > 90
- [ ] Time to Interactive < 3s
- [ ] First Contentful Paint < 1.5s
- [ ] No console errors
- [ ] No TypeScript errors in build
- [ ] Images load correctly
- [ ] Animations run smoothly

### Security Checks
- [ ] No API keys exposed in client bundle
- [ ] CORS configured correctly
- [ ] CSP headers set
- [ ] HTTPS enforced
- [ ] Environment variables secured

---

## Monitoring & Analytics

### Vercel Analytics
Enable in Vercel dashboard:
- Real-time traffic monitoring
- Core Web Vitals tracking
- Error reporting

### Error Tracking (Optional)
Integrate Sentry or similar:

```bash
npm install @sentry/nextjs
```

```typescript
// sentry.client.config.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
});
```

---

## Continuous Deployment

### Automatic Deployments
Vercel automatically deploys:
- **Production**: Pushes to `main` branch
- **Preview**: Pull requests and other branches

### Deployment Protection
Configure in Vercel → Settings → Deployment Protection:
- Enable password protection for previews
- Restrict deployment to trusted branches
- Set up approval workflows

---

## Environment-Specific Configurations

### Development
```bash
# .env.local
NEXT_PUBLIC_BASE_RPC_URL=https://base-sepolia.g.alchemy.com/v2/...
SPACETIME_SERVER_URL=http://localhost:3001
```

### Staging
Use Vercel preview environments with staging database

### Production
Full configuration with production SpacetimeDB instance

---

## Performance Optimization

### Build Optimization
```bash
# Analyze bundle size
npm run build && npm run analyze
```

### Image Optimization
- All images use Next.js `<Image>` component
- Configured in `next.config.js`:
```javascript
images: {
  remotePatterns: [
    { hostname: 'usdozf7pplhxfvrl.public.blob.vercel-storage.com' },
  ],
}
```

### Caching Strategy
- Static assets: 1 year cache
- API routes: No cache (dynamic)
- Images: Automatic optimization + CDN

---

## Rollback Procedure

### Instant Rollback (Vercel)
1. Go to Vercel dashboard → Deployments
2. Find previous successful deployment
3. Click "Promote to Production"
4. Confirm rollback

### Manual Rollback (Git)
```bash
# Find previous commit
git log

# Revert to previous commit
git revert <commit-hash>
git push origin main
```

---

## Troubleshooting

### Build Failures

**TypeScript Errors:**
```bash
# Run type check locally
npm run type-check

# Fix all errors before pushing
```

**Missing Environment Variables:**
- Check Vercel dashboard for missing variables
- Ensure `NEXT_PUBLIC_` prefix for client variables

### Runtime Errors

**SpacetimeDB Connection Failed:**
- Verify `SPACETIME_SERVER_URL` is correct
- Check SpacetimeDB instance is running
- Review network tab for connection errors

**Wallet Connection Failed:**
- Verify `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`
- Check WalletConnect project is active
- Test with different wallets

**Token Balance Not Loading:**
- Check `NEXT_PUBLIC_BASE_RPC_URL`
- Verify RPC endpoint is responsive
- Check rate limits on RPC provider

---

## Scaling Considerations

### Current Capacity
- **Concurrent Users**: ~1,000
- **Database Writes**: ~100 req/sec
- **Database Reads**: ~500 req/sec

### Scaling to 10,000+ Users

#### Frontend (Vercel)
- Automatic scaling included
- No action needed

#### SpacetimeDB
- Upgrade to higher tier
- Enable database sharding
- Implement connection pooling

#### RPC Provider
- Upgrade plan for higher rate limits
- Use multiple RPC endpoints with fallback

---

## Backup & Recovery

### Database Backups
SpacetimeDB handles automatic backups:
- Hourly incremental backups
- Daily full backups (retained 30 days)

### Manual Backup
```bash
# Export data
spacetime export your-db-name > backup.json

# Restore from backup
spacetime import your-db-name < backup.json
```

---

## Security Best Practices

1. **Never commit sensitive keys** to Git
2. **Use environment variables** for all secrets
3. **Enable Vercel deployment protection** for non-production
4. **Regularly update dependencies**: `npm audit fix`
5. **Monitor error logs** for security issues
6. **Enable HTTPS only** (automatic on Vercel)
7. **Set CSP headers** in `next.config.js`
8. **Implement rate limiting** on API routes

---

## Support

For deployment issues:
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **SpacetimeDB Docs**: [spacetimedb.com/docs](https://spacetimedb.com/docs)
- **GitHub Issues**: Open issue for app-specific problems

---

## Deployment Checklist

Before deploying to production:

- [ ] All tests passing
- [ ] TypeScript errors resolved
- [ ] Environment variables configured
- [ ] SpacetimeDB module published
- [ ] Custom domain configured (if applicable)
- [ ] Analytics enabled
- [ ] Error tracking configured
- [ ] Performance tested (Lighthouse)
- [ ] Security scan completed
- [ ] Backup strategy in place
- [ ] Monitoring alerts set up
- [ ] Documentation updated
- [ ] Team notified of deployment

---

## Post-Launch Monitoring

First 24 hours:
- Monitor error rates closely
- Watch server response times
- Check database performance
- Review user feedback
- Track key metrics (DAU, pulls, etc.)

First week:
- Analyze user behavior
- Identify bottlenecks
- Plan optimization updates
- Gather feature requests
