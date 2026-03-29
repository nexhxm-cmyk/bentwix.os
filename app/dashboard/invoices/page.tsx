'use client';

import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/Button';
import { Plus, Download } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';

const INVOICES = [
  { id: '1', number: 'INV-001', client: 'Acme Corp', amount: 2500, status: 'paid', issue: '2026-03-15', due: '2026-04-15' },
  { id: '2', number: 'INV-002', client: 'Tech Startup', amount: 1200, status: 'pending', issue: '2026-03-20', due: '2026-04-20' },
  { id: '3', number: 'INV-003', client: 'Digital Agency', amount: 3500, status: 'draft', issue: '2026-03-25', due: '2026-04-25' },
  { id: '4', number: 'INV-004', client: 'Creative Co', amount: 2000, status: 'paid', issue: '2026-03-10', due: '2026-04-10' },
];

export default function InvoicesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Invoices</h1>
          <p className="text-muted-foreground mt-2">Create and manage invoices</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" className="gap-2">
            <Download className="h-5 w-5" />
            Export
          </Button>
          <Button variant="primary" className="gap-2">
            <Plus className="h-5 w-5" />
            New Invoice
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(9200)}
          description="This month"
          icon="💰"
          trend={8}
        />
        <StatCard
          title="Paid"
          value={formatCurrency(4500)}
          description="2 invoices"
          icon="✓"
        />
        <StatCard
          title="Pending"
          value={formatCurrency(1200)}
          description="1 invoice"
          icon="⏳"
        />
        <StatCard
          title="Draft"
          value={formatCurrency(3500)}
          description="1 invoice"
          icon="📝"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Invoices</CardTitle>
          <CardDescription>View and manage your invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: 'number', label: 'Invoice #' },
              { key: 'client', label: 'Client' },
              { key: 'amount', label: 'Amount', render: (val) => formatCurrency(val) },
              {
                key: 'status',
                label: 'Status',
                render: (status) => (
                  <span className={`badge text-xs ${
                    status === 'paid' ? 'badge-success' : status === 'pending' ? 'badge-warning' : 'badge-primary'
                  }`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                ),
              },
              { key: 'issue', label: 'Issued', render: (val) => formatDate(val) },
              { key: 'due', label: 'Due', render: (val) => formatDate(val) },
            ]}
            data={INVOICES}
          />
        </CardContent>
      </Card>
    </div>
  );
}
