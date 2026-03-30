export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'CEO, GrowthLabs',
    content:
      'Bentwix OS transformed how we manage our agency. Everything in one place - invoicing, projects, payroll. Saved us 20+ hours per week.',
    avatar: '🎯',
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    role: 'Operations Director, Creative Studios',
    content:
      'The Kanban boards are incredible. Team productivity went up immediately. Stripe integration is seamless for payments.',
    avatar: '⭐',
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    role: 'Founder, Digital Agency Co',
    content:
      'Finally, a platform built FOR agencies, not adapted from project management tools. Highly recommend to any agency owner.',
    avatar: '💡',
  },
  {
    id: 4,
    name: 'James Wilson',
    role: 'COO, Tech Solutions Inc',
    content:
      'The real-time collaboration features and role-based permissions are exactly what we needed for a distributed team.',
    avatar: '🚀',
  },
];

export const FEATURES = [
  {
    id: 1,
    title: 'Project Management',
    description: 'Kanban boards, milestones, and real-time collaboration',
    icon: '📊',
  },
  {
    id: 2,
    title: 'Task Management',
    description: 'Assign, track, and manage tasks with time tracking',
    icon: '✓',
  },
  {
    id: 3,
    title: 'Invoicing',
    description: 'Generate and manage invoices with Stripe integration',
    icon: '💳',
  },
  {
    id: 4,
    title: 'Financial Insights',
    description: 'Real-time revenue, expense, and profit tracking',
    icon: '📈',
  },
  {
    id: 5,
    title: 'Payroll Management',
    description: 'Salary, commission, and earnings per task',
    icon: '👥',
  },
  {
    id: 6,
    title: 'HR System',
    description: 'Employee management, leave tracking, and more',
    icon: '📋',
  },
  {
    id: 7,
    title: 'CRM Pipeline',
    description: 'Manage deals and client relationships with Kanban',
    icon: '🤝',
  },
  {
    id: 8,
    title: 'Messaging',
    description: 'Real-time chat and team communication',
    icon: '💬',
  },
  {
    id: 9,
    title: 'Contracts',
    description: 'Rich text editor and digital signature flow',
    icon: '📝',
  },
  {
    id: 10,
    title: 'Reports',
    description: 'Advanced filtering, analytics, and exports',
    icon: '📄',
  },
  {
    id: 11,
    title: 'Client Portal',
    description: 'Limited access dashboard for your clients',
    icon: '🔗',
  },
  {
    id: 12,
    title: 'Role-Based Access',
    description: 'Granular permissions and team control',
    icon: '🔐',
  },
];

export const ADD_ONS = [
  {
    id: 1,
    title: 'Graphic Design',
    description: 'Custom branding, UI/UX, and creative assets tailored to your agency.',
    icon: '🎨',
  },
  {
    id: 2,
    title: 'AI Agents',
    description: 'AI-driven workflow automation, chatbot support, and data insights.',
    icon: '🤖',
  },
  {
    id: 3,
    title: 'Web Development',
    description: 'Modern responsive websites, landing pages, and app interfaces.',
    icon: '🌐',
  },
  {
    id: 4,
    title: 'Media Buying',
    description: 'Performance media strategy, ad campaigns, and conversion optimization.',
    icon: '📣',
  },
];

export const HOW_IT_WORKS = [
  {
    id: 1,
    title: 'Sign Up',
    description: 'Create your team and invite members',
    icon: '🚀',
  },
  {
    id: 2,
    title: 'Organize',
    description: 'Set up projects, clients, and your team structure',
    icon: '📁',
  },
  {
    id: 3,
    title: 'Collaborate',
    description: 'Assign tasks, track progress, and communicate in real-time',
    icon: '👥',
  },
  {
    id: 4,
    title: 'Get Paid',
    description: 'Generate invoices and track payments with Stripe',
    icon: '💰',
  },
];

export const INTEGRATIONS = [
  { name: 'Stripe', description: 'Payments & Billing', icon: '💳' },
  { name: 'Supabase', description: 'Database & Auth', icon: '🗄️' },
  { name: 'Email', description: 'Notifications', icon: '📧' },
  { name: 'Slack', description: 'Team Sync', icon: '💬' },
];

export const PRICING = [
  {
    id: 'starter',
    name: 'Starter',
    price: 99,
    description: 'Perfect for small agencies',
    features: ['Up to 5 team members', '10 projects', 'Basic invoicing', 'Task management', 'Email support'],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 299,
    description: 'For growing agencies',
    features: [
      'Up to 20 team members',
      'Unlimited projects',
      'Advanced invoicing',
      'Payroll management',
      'CRM pipeline',
      'Priority support',
    ],
    popular: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 799,
    description: 'For enterprise agencies',
    features: [
      'Unlimited team members',
      'Unlimited projects',
      'Custom contracts',
      'Full payroll system',
      'Advanced reporting',
      'API access',
      'Dedicated support',
    ],
  },
];
