# Bentwix OS - Developer Quick Reference

## 🚀 Quick Commands

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run type-check       # Check TypeScript
npm run format           # Format code with Prettier

# Docker
docker build -t bentwix-os .
docker run -p 3000:3000 bentwix-os
```

## 📁 File Locations

| What | Where |
|------|-------|
| Pages | `app/dashboard/[module]/page.tsx` |
| Components | `components/` |
| Utilities | `lib/` |
| Hooks | `hooks/` |
| Types | `types/` |
| Styles | `app/globals.css` + `tailwind.config.ts` |
| Database | `database/schema.sql` |

## 🎨 Common Tasks

### Add a New Page
```bash
# Create folder
mkdir -p app/dashboard/mymodule

# Create page.tsx
touch app/dashboard/mymodule/page.tsx

# Add to Sidebar.tsx menu
```

### Create a New Component
```bash
# Create component file
touch components/MyComponent.tsx

# Basic template:
'use client';

interface MyComponentProps {
  title: string;
}

export function MyComponent({ title }: MyComponentProps) {
  return <div>{title}</div>;
}
```

### Add Database Query
```ts
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();
const { data, error } = await supabase
  .from('table_name')
  .select('*')
  .eq('id', id);
```

### Create API Route
```bash
# Create file
touch app/api/myroute/route.ts

# Template:
export async function GET(req: Request) {
  return Response.json({ message: 'Hello' });
}

export async function POST(req: Request) {
  const data = await req.json();
  return Response.json({ success: true });
}
```

## 🎯 Component Patterns

### Page Template
```tsx
'use client';

import { StatCard } from '@/components/StatCard';
import { Card } from '@/components/Card';

export default function ModulePage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Module Name</h1>
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Stat" value="123" description="Info" />
      </div>
      <Card>
        <p>Content</p>
      </Card>
    </div>
  );
}
```

### Component with Props
```tsx
interface MyProps {
  title: string;
  description?: string;
  onClick?: () => void;
}

export function MyComponent({
  title,
  description,
  onClick
}: MyProps) {
  return (
    <div onClick={onClick}>
      {title}
      {description && <p>{description}</p>}
    </div>
  );
}
```

## 🎨 Styling Classes

### Utility Classes (Defined in globals.css)
```ts
// Buttons
.btn-primary        // Sky blue filled button
.btn-secondary      // Bordered button
.btn-ghost          // Text only button

// Cards
.card               // Basic card with glass effect
.card-hover         // Card with hover effect

// Inputs
.input-base         // Styled input field
.label-base         // Styled label

// Badges
.badge              // Base badge
.badge-primary      // Blue badge
.badge-success      // Green badge
.badge-warning      // Yellow badge
.badge-danger       // Red badge

// Typography
.section-title      // Large heading
.section-subtitle   // Subheading
```

### TailwindCSS Utilities
```html
<!-- Colors -->
<div className="bg-primary text-foreground">Primary</div>
<div className="bg-background text-muted-foreground">Muted</div>

<!-- Responsive -->
<div className="md:grid-cols-2 lg:grid-cols-4">Responsive Grid</div>

<!-- Spacing -->
<div className="space-y-4">Space between children</div>
<div className="p-6 m-4">Padding/margin</div>

<!-- Effects -->
<div className="rounded-2xl shadow-glass hover:shadow-lg">Card</div>
```

## 🗄️ Database Schema Reference

### Main Tables
```
teams              - Agency information
users              - Team members
projects           - Projects
tasks              - Tasks/tickets
invoices           - Invoices
payments           - Payment records
earnings           - Employee earnings
messages           - Chat messages
deals              - CRM deals
subscriptions      - Billing subscriptions
roles_permissions  - RBAC configuration
```

### Common Queries

```sql
-- Get user's projects
SELECT * FROM projects WHERE team_id = auth.uid();

-- Get active invoices
SELECT * FROM invoices WHERE status != 'paid' AND team_id = auth.uid();

-- Get team earnings
SELECT * FROM earnings WHERE user_id IN 
  (SELECT id FROM users WHERE team_id = auth.uid());
```

## 🔐 Authentication

```tsx
import { useAuth } from '@/hooks/useAuth';

export function MyComponent() {
  const { user, loading, signOut } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Not logged in</div>;

  return (
    <div>
      <p>Welcome {user.email}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

## 📊 Charts (Recharts)

```tsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 100 },
  { name: 'Feb', value: 200 },
];

export function MyChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#38BDF8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
```

## 🚨 Error Handling

```tsx
import toast from 'react-hot-toast';

try {
  const result = await someAsyncOperation();
  toast.success('Success!');
} catch (error) {
  const message = error instanceof Error ? error.message : 'Error';
  toast.error(message);
}
```

## 🧪 Type Safety

```tsx
// Define types
interface User {
  id: string;
  name: string;
  email: string;
}

interface Props {
  users: User[];
  onSelect: (user: User) => void;
}

// Use in component
export function UserList({ users, onSelect }: Props) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id} onClick={() => onSelect(user)}>
          {user.name}
        </li>
      ))}
    </ul>
  );
}
```

## 📝 Environment Variables

```bash
# Auth
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Payments
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# App
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 🐛 Debugging

```tsx
// Console logging
console.log('Debug:', data);

// React DevTools
// Install React Developer Tools extension

// Network debugging
// Open DevTools → Network tab

// Database debugging
// Use Supabase dashboard

// Error tracking
// Use browser console for stack traces
```

## 📱 Responsive Design Tips

```tsx
// Mobile-first approach
<div className="
  text-sm md:text-base lg:text-lg
  p-4 md:p-6 lg:p-8
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4
">
```

## 🚀 Performance Tips

1. **Code Splitting**: Use dynamic imports for large components
```tsx
const HeavyComponent = dynamic(() => import('./Heavy'), { loading: () => <div>Loading...</div> });
```

2. **Memoization**: Wrap expensive components
```tsx
export const MyComponent = memo(function MyComponent(props) {
  // ...
});
```

3. **Query Optimization**: Use proper indexes and selects
```ts
.select('id, name')  // Select only needed fields
.eq('team_id', teamId)  // Use indexed columns in filters
```

## 📚 Useful Links

- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **TailwindCSS Docs**: https://tailwindcss.com/docs
- **React Docs**: https://react.dev
- **Stripe API**: https://stripe.com/docs/api

## 🤝 Contributing

1. Create a branch: `git checkout -b feature/my-feature`
2. Make changes and test
3. Commit: `git commit -am 'Add feature'`
4. Push: `git push origin feature/my-feature`
5. Create pull request

---

**Happy coding! 🎉**
