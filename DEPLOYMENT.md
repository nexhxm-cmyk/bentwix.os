# Bentwix OS - Deployment Guide

## Quick Start Deployment

### 1. Vercel (Recommended - 2 minutes)

#### Prerequisites
- GitHub account with repository pushed
- Vercel account

#### Steps
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Click "Import"
5. Add environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
   STRIPE_SECRET_KEY
   STRIPE_WEBHOOK_SECRET
   ```
6. Click "Deploy"
7. Wait for deployment to complete (~5 minutes)

**Result**: Your app is live at `https://bentwix-os.vercel.app`

### 2. Docker (Local/Self-hosted - 5 minutes)

```bash
# Build image
docker build -t bentwix-os .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=your-url \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key \
  -e NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-key \
  -e STRIPE_SECRET_KEY=your-secret \
  bentwix-os
```

Access at `http://localhost:3000`

### 3. DigitalOcean App Platform

1. Connect GitHub to DigitalOcean
2. Select repository
3. DigitalOcean detects Next.js automatically
4. Set environment variables
5. Click "Deploy"

### 4. Railway.app

1. Go to [railway.app](https://railway.app)
2. Connect GitHub
3. Select repository
4. Add environment variables
5. Deploy

## Pre-Deployment Checklist

### 1. Supabase Setup (30 minutes)

```bash
# Steps:
1. Create project at supabase.com
2. Go to SQL Editor
3. Paste contents of database/schema.sql
4. Click "Run"
5. Verify all tables created
6. Go to Auth Settings
7. Enable Email/Password
8. Configure email templates if needed
```

### 2. Stripe Setup (20 minutes)

```bash
# Steps:
1. Create account at stripe.com
2. Go to Products
3. Create products for each plan:
   - Name: "Bentwix Starter"
   - Price: $99/month
4. Create "Bentwix Growth" ($299/month)
5. Create "Bentwix Pro" ($799/month)
6. Copy Product IDs to code
7. Go to Webhooks
8. Add endpoint: https://yourdomain.com/api/webhooks/stripe
9. Select events: customer.subscription.*, invoice.payment_*
10. Copy webhook secret to env
```

### 3. Environment Variables

Create `.env.production`:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxx
STRIPE_SECRET_KEY=sk_live_xxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxx
NEXT_PUBLIC_API_URL=https://yourdomain.com
```

### 4. Domain Configuration

If using custom domain:
```
# In Vercel:
Settings → Domains → Add your-domain.com

# DNS Settings:
Add CNAME record pointing to Vercel
```

## Post-Deployment

### 1. Verify Deployment

```bash
# Test landing page
curl https://yourdomain.com

# Test API
curl https://yourdomain.com/api/health

# Check logs
# In Vercel: Deployments → Click latest → Logs
```

### 2. Set Up Monitoring

```bash
# Add error tracking (Sentry)
npm install @sentry/nextjs

# Add analytics (Vercel Analytics)
# Built-in, no setup needed

# Add performance monitoring
# Vercel Web Vitals
```

### 3. Configure Backups

**Supabase**:
1. Go to Database → Backups
2. Enable automatic backups
3. Set backup frequency to daily

### 4. Set Up Alerts

**Stripe**:
1. Go to Alerts
2. Enable alerts for:
   - Failed charges
   - Disputes

**Vercel**:
1. Go to Settings → Notifications
2. Enable deployment notifications
3. Enable error notifications

## Scaling Considerations

### Current Limits
- Single Vercel instance handles up to 10k concurrent users
- Supabase Free tier: 50,000 monthly active users
- 500MB database storage on free tier

### When to Scale

| Users | Action |
|-------|--------|
| 1-100 | Free tier is fine |
| 100-1k | Upgrade Supabase |
| 1k-10k | Add caching (Redis) |
| 10k+ | Multiregion deploy |

### Scaling Strategy

1. **Database**: Upgrade Supabase plan
2. **Cache**: Add Redis for sessions/data
3. **CDN**: Use Vercel's built-in CDN
4. **Microservices**: Split complex operations to separate services

## Rollback Procedure

### Vercel Rollback
```
Settings → Deployments → Previous version → Click "...'' → Redeploy
```

### Database Rollback

```sql
-- Supabase provides automatic backups
-- Steps:
1. Go to Database → Backups
2. Find restore point
3. Click "Restore"
4. Confirm backup point
5. Wait for restore (5-15 minutes)
```

## Performance Optimization Post-Deploy

### Enable Compression
```
# Vercel does this automatically
# Verify in Response Headers: Content-Encoding: gzip
```

### Add Caching Headers
```ts
// In next.config.js
headers: async () => {
  return [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Cache-Control', value: 'no-store' }
      ]
    }
  ]
}
```

### Monitor Performance

**Vercel Analytics**:
- Automatically available
- Check under Analytics tab
- Monitor Core Web Vitals

## Disaster Recovery

### 1. Database Failure
- Supabase handles automated failover
- Check status page

### 2. Service Outage
- Vercel has 99.95% uptime SLA
- Check status page for incidents

### 3. Data Loss
- Restore from backup (see Backup section)
- Restore to point-in-time within 7 days

## Cost Estimation

### Monthly Costs (Typical)

| Service | Free Tier | Pro | Enterprise |
|---------|-----------|-----|-----------|
| Vercel | Free | $20+ | Custom |
| Supabase | Free (50k users) | $25/month | Custom |
| Stripe | 2.9% + $0.30 | Same | Same |
| **Total** | Free | $50-200+ | $500+ |

## Support

- **Vercel**: [docs.vercel.com](https://docs.vercel.com)
- **Supabase**: [supabase.com/docs](https://supabase.com/docs)
- **Stripe**: [stripe.com/docs](https://stripe.com/docs)

## Troubleshooting Deployment

### Build Fails

```bash
# Check build locally
npm run build

# Check logs
npm run build -- --debug

# Common issues:
# 1. Missing environment variables
# 2. TypeScript errors
# 3. Missing dependencies
```

### Runtime Error

Check Vercel logs:
```
Deployments → Select version → Logs → Runtime logs
```

### Database Connection Error

```bash
# Verify connection string
echo $NEXT_PUBLIC_SUPABASE_URL

# Test connection
psql $DATABASE_URL -c "SELECT 1"
```

### Stripe Webhook Not Firing

```bash
# Test webhook
curl -X POST https://yourdomain.com/api/webhooks/stripe \
  -H "Content-Type: application/json" \
  -d '{"type": "test"}'

# Check Stripe dashboard
Webhooks → Endpoint → Attempted deliveries
```

---

**Estimated Time to Production**: 1-2 hours  
**Difficulty Level**: Moderate  
**Prerequisites**: GitHub, Vercel/DigitalOcean account, Supabase account, Stripe account
