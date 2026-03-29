# Bentwix OS Architecture & Implementation Guide

## Overview

Bentwix OS is a production-ready, enterprise-grade SaaS platform built with Next.js 15, designed for modern agencies. The application provides complete agency management capabilities in a single, unified platform.

## Core Architecture Principles

### 1. Modular Component Design
- Each UI component is self-contained and reusable
- Components accept props for configuration
- No prop drilling through multiple levels
- Consistent prop naming conventions

### 2. Type Safety
- Full TypeScript coverage across the application
- Database types generated from schema
- Form validation with Zod
- Type-safe API routes

### 3. Performance Optimization
- Code splitting with dynamic imports
- Image optimization with Next.js Image
- Optimistic UI updates
- Efficient Supabase queries with proper indexing
- Memoization of expensive computations

### 4. Security
- Environment variables for sensitive data
- Row-Level Security (RLS) on Supabase
- CSRF protection
- Input sanitization
- Secure authentication flow

## Technology Stack Justification

### Next.js 15 (App Router)
- Server components by default reduce JS bundle
- Built-in optimization (images, fonts, code splitting)
- API routes for backend logic
- Incremental Static Regeneration (ISR)
- Middleware for authentication

### Supabase
- Managed PostgreSQL with RLS
- Real-time capabilities for messaging
- Built-in authentication
- File storage integration
- Easy to self-host if needed

### TailwindCSS + shadcn/ui
- Utility-first CSS reduces maintenance
- Pre-built accessible components
- Consistent design system
- Easy to customize theme
- Small bundle size

### Stripe
- Industry standard for payments
- Webhooks for real-time updates
- Subscription management
- Handles compliance automatically

## Folder Structure Explanation

```
app/
├── api/              - API routes for backend logic
├── auth/             - Authentication pages (login/signup)
├── dashboard/        - Protected app routes
│   ├── projects/
│   ├── tasks/
│   ├── invoices/
│   ├── finance/
│   ├── payroll/
│   ├── hr/
│   ├── clients/
│   ├── contracts/
│   ├── messaging/
│   ├── reports/
│   ├── crm/
│   └── settings/
├── client/           - Client portal (limited access)
├── layout.tsx        - Root layout wrapper
├── page.tsx          - Landing page
└── globals.css       - Global styles

components/
├── landing/          - Landing page specific components
├── ui/               - Base UI components
├── Button.tsx        - Button component
├── Card.tsx          - Card component (with variants)
├── Sidebar.tsx       - Navigation sidebar
├── StatCard.tsx      - Statistics display
├── KanbanBoard.tsx   - Drag-and-drop interface
├── DataTable.tsx     - Reusable table component
└── Logo.tsx          - Brand logo

lib/
├── supabase/
│   └── client.ts     - Supabase client initialization
├── utils.ts          - Utility functions (formatting, etc.)
└── stripe.ts         - Stripe configuration

hooks/
└── useAuth.ts        - Authentication hook

types/
└── database.ts       - Database type definitions

data/
└── landing.ts        - Static landing page content

store/                - Zustand stores (expandable)
database/
└── schema.sql        - PostgreSQL schema with RLS
```

## Data Flow

### Authentication Flow
```
User Input
  ↓
Supabase Auth (email/password)
  ↓
JWT Token
  ↓
Stored in Browser
  ↓
Included in API Requests
  ↓
RLS Enforces Data Access
```

### Application State Flow
```
Component State (React)
  ↓
User Interaction
  ↓
API Call/Supabase Query
  ↓
State Update (Re-render)
  ↓
UI Update
```

## Database Design

### Key Design Decisions

1. **UUID Primary Keys**: Better for distributed systems and prevents ID enumeration
2. **Timestamps**: `created_at` and `updated_at` for audit trails
3. **Soft Deletes**: Not implemented (use archive flags if needed)
4. **Normalization**: 3NF minimizes redundancy
5. **Indexes**: Strategic indexing on foreign keys and common filters
6. **RLS Policies**: Enforce data access at database level

### Foreign Key Strategy
- CASCADING deletes for child records (tasks when project deleted)
- SET NULL for optional relationships (deleted users)
- NO ACTION for critical relationships

### Extensibility Points

The schema is designed to be extended with:
- Custom fields on teams
- Additional earning types
- More message channels
- Deal custom fields
- Invoice line items table

## Authentication & Authorization

### Role Hierarchy
```
Owner (Full access)
  ↓
Admin (Team management)
  ↓
Manager (Project management)
  ↓
Employee (Task execution)
  ↓
Client (Limited view-only)
```

### Permission Model
- Role-based access control (RBAC)
- Permissions table defines capabilities per role
- Middleware enforces routes
- RLS policies enforce data access

## Billing System

### Plan Tiers
- **Starter** ($99/mo): Up to 5 team members
- **Growth** ($299/mo): Up to 20 members, full features
- **Pro** ($799/mo): Unlimited, enterprise support

### Subscription Lifecycle
```
User Signs Up
  ↓
Choose Plan
  ↓
Stripe Payment
  ↓
Webhook Triggers
  ↓
Update Subscription Record
  ↓
Features Unlocked
```

## Deployment Checklist

### Pre-Deployment
- [ ] All environment variables configured
- [ ] Database migrations applied
- [ ] Stripe products/prices created
- [ ] Supabase RLS policies verified
- [ ] Email configuration (if using)

### Vercel Deployment
- [ ] GitHub repository connected
- [ ] Environment variables added in Vercel dashboard
- [ ] Database backups scheduled
- [ ] Monitoring setup (Sentry/LogRocket)
- [ ] Analytics (Vercel Analytics)

### Post-Deployment
- [ ] DNS configured
- [ ] SSL certificate verified
- [ ] Health checks monitoring
- [ ] Error tracking enabled
- [ ] Backup verification

## Performance Optimization Strategies

### Frontend
1. **Code Splitting**: Dynamic imports for heavy components
2. **Image Optimization**: Next.js Image component
3. **Memoization**: React.memo for expensive renders
4. **Caching**: ISR for static content

### Backend
1. **Database Indexing**: Strategic indexes on queries
2. **Query Optimization**: Join on indexed columns only
3. **Rate Limiting**: Protect API endpoints
4. **Pagination**: Limit query results

### Monitoring
1. **Error Tracking**: Implement Sentry
2. **Performance Monitoring**: Web Vitals
3. **Logging**: Structured logging to external service
4. **Alerting**: Set up alerts for critical errors

## Scalability Considerations

### Current Limitations
- Single Supabase instance (scales to millions of rows)
- No caching layer (can add Redis)
- No CDN for assets (can add Cloudflare)
- Single app instance (horizontal scale with Vercel)

### Future Improvements
1. Add Redis for caching
2. Implement CDN for static assets
3. Database replication for disaster recovery
4. Background jobs with Bull/Agenda
5. Microservices for complex operations

## Security Hardening

### Implemented
✅ HTTPS/TLS encryption
✅ Supabase RLS policies
✅ Environment variable management
✅ Input validation with Zod
✅ CORS configuration

### Recommended
- [ ] Rate limiting on API endpoints
- [ ] DDoS protection (Cloudflare)
- [ ] WAF (Web Application Firewall)
- [ ] Regular security audits
- [ ] Penetration testing
- [ ] Two-factor authentication
- [ ] Audit logging

## Testing Strategy

### Unit Tests
```bash
npm run test
```

### Integration Tests
- Test authentication flow
- Test CRUD operations
- Test Stripe webhooks
- Test RLS policies

### E2E Tests
- Test complete user journeys
- Test edge cases
- Test error handling

## Customization Guide

### Changing the Theme
Edit `tailwind.config.ts`:
```ts
colors: {
  primary: '#YOUR_COLOR',
  background: '#YOUR_BG',
}
```

### Adding a New Module
1. Create folder in `app/dashboard/[module]/`
2. Create `page.tsx` with content
3. Add menu item to `Sidebar.tsx`
4. Create database tables if needed

### Adding a New Component
1. Create file in `components/`
2. Export as named export
3. Add prop types interface
4. Document with JSDoc comments

## Common Tasks

### Adding a New API Route
1. Create file: `app/api/[route]/route.ts`
2. Export method function (GET, POST, etc.)
3. Validate request body
4. Query database
5. Return response

### Adding a New Database Table
1. Add table definition to `database/schema.sql`
2. Create RLS policies
3. Add indexes
4. Update types in `types/database.ts`
5. Create hooks for CRUD operations

### Connecting a New Service
1. Add API key to `.env.local`
2. Create service file in `lib/`
3. Implement client initialization
4. Create hooks/utilities for usage
5. Test integration

## Monitoring & Maintenance

### Regular Tasks
- Monitor error logs daily
- Review performance metrics weekly
- Update dependencies monthly
- Security audit quarterly
- Database backup verification

### Useful Queries
```sql
-- Check table sizes
SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename))
FROM pg_tables WHERE schemaname != 'pg_catalog' ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Find slow queries
SELECT query, calls, mean_exec_time FROM pg_stat_statements ORDER BY mean_exec_time DESC LIMIT 10;

-- Check index usage
SELECT schemaname, tablename, indexname, idx_scan FROM pg_stat_user_indexes ORDER BY idx_scan ASC;
```

## Troubleshooting

### Common Issues

**Authentication fails**
- Check Supabase credentials in `.env.local`
- Verify email is confirmed in Supabase
- Clear browser cookies and try again

**Database connection error**
- Confirm Supabase URL and key
- Check RLS policies aren't blocking access
- Verify user has correct role

**Stripe integration issues**
- Check webhook secret is correct
- Verify Stripe keys in environment
- Check webhook delivery logs in Stripe dashboard

**Deployment failures**
- Check environment variables in deployment platform
- Ensure build script succeeds locally
- Check for missing dependencies

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Stripe API Docs](https://stripe.com/docs/api)
- [React Documentation](https://react.dev)

## Support & Contributing

For issues or contributions, please refer to the GitHub repository.

---

**Version**: 1.0.0  
**Last Updated**: March 2026  
**Maintainer**: Bentwix Team
