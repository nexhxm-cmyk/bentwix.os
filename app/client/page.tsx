'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import { StatCard } from '@/components/StatCard';
import { DataTable } from '@/components/DataTable';
import { formatCurrency, formatDate } from '@/lib/utils';

const PROJECTS = [
  {
    id: '1',
    name: 'Website Redesign',
    status: 'active',
    progress: 65,
    dueDate: '2026-04-30',
  },
  {
    id: '2',
    name: 'Mobile App',
    status: 'in-progress',
    progress: 45,
    dueDate: '2026-05-15',
  },
];

const INVOICES = [
  {
    id: '1',
    number: 'INV-001',
    amount: 2500,
    status: 'paid',
    dueDate: '2026-04-15',
  },
  {
    id: '2',
    number: 'INV-002',
    amount: 1200,
    status: 'pending',
    dueDate: '2026-04-20',
  },
];

export default function ClientDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Client Portal</h1>
        <p className="text-muted-foreground mt-2">View your projects, invoices, and communications</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Active Projects"
          value="2"
          description="In progress"
          icon="📁"
        />
        <StatCard
          title="Outstanding Balance"
          value={formatCurrency(1200)}
          description="Due soon"
          icon="💰"
        />
        <StatCard
          title="Total Spent"
          value={formatCurrency(3700)}
          description="With your team"
          icon="📊"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Projects</CardTitle>
          <CardDescription>View project status and progress</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: 'name', label: 'Project' },
              {
                key: 'status',
                label: 'Status',
                render: (status) => (
                  <span className="badge badge-primary text-xs">
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                ),
              },
              {
                key: 'progress',
                label: 'Progress',
                render: (progress) => (
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-muted/30 rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
                    </div>
                    <span className="text-xs">{progress}%</span>
                  </div>
                ),
              },
              { key: 'dueDate', label: 'Due Date', render: (val) => formatDate(val) },
            ]}
            data={PROJECTS}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
          <CardDescription>Your billing history</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: 'number', label: 'Invoice #' },
              { key: 'amount', label: 'Amount', render: (val) => formatCurrency(val) },
              {
                key: 'status',
                label: 'Status',
                render: (status) => (
                  <span className={`badge text-xs ${
                    status === 'paid' ? 'badge-success' : 'badge-warning'
                  }`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                ),
              },
              { key: 'dueDate', label: 'Due Date', render: (val) => formatDate(val) },
            ]}
            data={INVOICES}
          />
        </CardContent>
      </Card>
    </div>
  );
}
