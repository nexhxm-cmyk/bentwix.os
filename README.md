# Bentwix OS - All-in-One Agency Management Platform

> Run your entire agency from one OS. Project management, invoicing, payroll, CRM, and everything else your agency needs.

## Features

- **Project Management**: Kanban boards, milestones, budget tracking
- **Task Management**: CRUD operations, status, priority, time tracking
- **Invoicing**: Invoice generator, payment status, Stripe integration
- **Financial Insights**: Revenue, expense, and profit tracking with charts
- **Payroll Management**: Salary, commission, earnings per task
- **HR System**: Employee management, leave tracking
- **CRM Pipeline**: Deal management with Kanban interface
- **Messaging**: Real-time team communication
- **Client Portal**: Limited access dashboard for clients
- **Contracts**: Rich text editor and signature flow
- **Reports**: Advanced filtering, analytics, and exports
- **Role-Based Access Control**: Granular permissions system

## Tech Stack

- **Frontend**: Next.js 15 (App Router) + React 19
- **Styling**: TailwindCSS + shadcn/ui components
- **Database**: Supabase (PostgreSQL) with RLS
- **Authentication**: Supabase Auth (email/password)
- **Payments**: Stripe integration
- **Charts**: Recharts
- **Real-time**: Supabase Real-time subscriptions
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation
- **Notifications**: React Hot Toast

## Project Structure

```
bentwix-os/
├── app/                    # Next.js app router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard and app pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── landing/          # Landing page components
│   ├── ui/               # Base UI components
│   ├── Button.tsx        # Button component
│   ├── Card.tsx          # Card component
│   ├── Sidebar.tsx       # Dashboard sidebar
│   ├── KanbanBoard.tsx   # Kanban component
│   └── DataTable.tsx     # Data table component
├── lib/                   # Utility functions
│   ├── supabase/         # Supabase client
│   ├── utils.ts          # Helper functions
│   └── stripe.ts         # Stripe configuration
├── hooks/                # Custom React hooks
│   └── useAuth.ts        # Authentication hook
├── types/                # TypeScript types
│   └── database.ts       # Database types
├── data/                 # Static data
│   └── landing.ts        # Landing page content
├── store/                # State management
├── public/               # Static assets
├── database/             # Database schema
│   └── schema.sql        # PostgreSQL schema
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
├── tailwind.config.ts    # Tailwind config
└── next.config.js        # Next.js config
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Stripe account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bentwix-os
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Update `.env.local` with your credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-key
   STRIPE_SECRET_KEY=your-stripe-secret
   ```

4. **Set up Supabase**
   - Create a new project in Supabase
   - Go to SQL Editor and run the schema from `database/schema.sql`
   - Enable Authentication (email/password)
   - Configure your user profiles

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see the landing page.

## Key Pages & Routes

### Public Routes
- `/` - Landing page
- `/auth/login` - Login page
- `/auth/signup` - Sign up page

### Protected Routes (Dashboard)
- `/dashboard` - Main dashboard
- `/dashboard/projects` - Project management
- `/dashboard/tasks` - Task board (Kanban)
- `/dashboard/invoices` - Invoice management
- `/dashboard/finance` - Financial analytics
- `/dashboard/payroll` - Payroll management
- `/dashboard/hr` - HR management
- `/dashboard/clients` - Client management
- `/dashboard/contracts` - Contract management
- `/dashboard/messaging` - Team messaging
- `/dashboard/reports` - Analytics & reports
- `/dashboard/crm` - CRM pipeline
- `/dashboard/settings` - Settings

## Key Components

### StatCard
Displays KPI metrics with title, value, and trend indicators.
```tsx
<StatCard
  title="Revenue"
  value={formatCurrency(12450)}
  description="This month"
  icon="💰"
  trend={12}
/>
```

### KanbanBoard
Drag-and-drop Kanban interface for tasks and deals.
```tsx
<KanbanBoard
  columns={columns}
  onCardMove={handleCardMove}
  onCardDelete={handleCardDelete}
/>
```

### DataTable
Reusable table component with sorting and filtering.
```tsx
<DataTable
  columns={columns}
  data={data}
  onRowClick={handleRowClick}
/>
```

## Database Schema

The application uses PostgreSQL with the following main tables:

- **teams** - Agency/team information
- **users** - Team members with roles
- **projects** - Project details and budgets
- **tasks** - Project tasks with assignments
- **invoices** - Billing and invoices
- **payments** - Payment records
- **earnings** - Employee earnings tracking
- **messages** - Team messaging
- **deals** - CRM deals/opportunities
- **subscriptions** - Billing subscriptions
- **roles_permissions** - RBAC configuration

See `database/schema.sql` for complete schema with relationships and indexes.

## Authentication Flow

1. User signs up/logs in via Supabase Auth
2. JWT token stored in browser
3. Token included in API requests
4. Row-level security (RLS) enforces data access
5. Role-based permissions control feature access

## Billing Integration

- Plans: Starter ($99/mo), Growth ($299/mo), Pro ($799/mo)
- Stripe handles payment processing
- Webhooks update subscription status
- Subscriptions table tracks active plans

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

```bash
vercel deploy
```

### Docker

```bash
docker build -t bentwix-os .
docker run -p 3000:3000 bentwix-os
```

## API Routes

### Stripe Webhook
- `POST /api/webhooks/stripe` - Handle Stripe events

## Configuration

### Tailwind Theme

The application uses a custom dark theme:
- Primary: Sky Blue (#38BDF8)
- Background: Dark gradient (#0B1220 → #0F172A)
- Accent: Sky Blue (#38BDF8)

Customize in `tailwind.config.ts`

### Icons

Uses `lucide-react` for all icons. Replace with your preferred icon library if needed.

## Performance Optimizations

- Images optimized with Next.js Image component
- Code splitting with dynamic imports
- Optimistic UI updates
- Debounced search and filters
- Efficient Supabase queries

## Security

- Environment variables for sensitive data
- Supabase Row-Level Security (RLS)
- CSRF protection in forms
- Input sanitization with Zod
- Rate limiting on API routes

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT

## Support

For support, email support@bentwix.com or visit the documentation.

---

Built with ❤️ for agencies that want to grow faster.
