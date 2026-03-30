'use client';

import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import { DataTable } from '@/components/DataTable';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, DollarSign, Briefcase, Users } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const REVENUE_DATA = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 2000 },
  { month: 'Apr', revenue: 2780 },
  { month: 'May', revenue: 1890 },
  { month: 'Jun', revenue: 2390 },
];

const RECENT_INVOICES = [
  {
    id: '1',
    client: 'Acme Corp',
    amount: 2500,
    status: 'paid',
    dueDate: '2026-04-15',
  },
  {
    id: '2',
    client: 'Tech Startup Inc',
    amount: 1200,
    status: 'pending',
    dueDate: '2026-04-20',
  },
  {
    id: '3',
    client: 'Digital Agency Co',
    amount: 3500,
    status: 'draft',
    dueDate: '2026-04-25',
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back! Here&apos;s what&apos;s happening with your agency.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          title="Revenue"
          value={formatCurrency(12450)}
          description="This month"
          icon="💰"
          trend={12}
        />
        <StatCard
          title="Active Projects"
          value="8"
          description="2 on hold"
          icon="📁"
          trend={5}
        />
        <StatCard
          title="Tasks"
          value="24"
          description="Due this week"
          icon="✓"
          trend={-3}
        />
        <StatCard
          title="Team Members"
          value="12"
          description="All active"
          icon="👥"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly recurring revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={REVENUE_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="month" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    border: '1px solid #1E293B',
                    borderRadius: '0.5rem',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#38BDF8"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Status</CardTitle>
            <CardDescription>Tasks by status</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  { status: 'Todo', count: 8 },
                  { status: 'In Progress', count: 6 },
                  { status: 'Done', count: 12 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="status" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    border: '1px solid #1E293B',
                    borderRadius: '0.5rem',
                  }}
                />
                <Bar dataKey="count" fill="#38BDF8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Invoices */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
          <CardDescription>Your latest invoice activity</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: 'client', label: 'Client' },
              { key: 'amount', label: 'Amount', render: (val) => formatCurrency(val) },
              {
                key: 'status',
                label: 'Status',
                render: (status) => (
                  <span
                    className={`badge text-xs ${
                      status === 'paid'
                        ? 'badge-success'
                        : status === 'pending'
                          ? 'badge-warning'
                          : 'badge-primary'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                ),
              },
              { key: 'dueDate', label: 'Due Date' },
            ]}
            data={RECENT_INVOICES}
          />
        </CardContent>
      </Card>
    </div>
  );
}
