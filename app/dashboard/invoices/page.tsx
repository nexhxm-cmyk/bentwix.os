'use client';

import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/Button';
import { Plus, Download } from 'lucide-react';
import { useDashboard } from '../DashboardProvider';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function InvoicesPage() {
  const { invoices, addInvoice, updateInvoiceStatus } = useDashboard();

  const handleNewInvoice = () => {
    const client = prompt('Client');
    const amount = Number(prompt('Amount', '0') || '0');
    if (!client || !amount) return;
    const nextNumber = `INV-${(invoices.length + 1).toString().padStart(3, '0')}`;
    const today = new Date().toISOString().slice(0, 10);
    addInvoice({ number: nextNumber, client, amount, status: 'pending', issue: today, due: today });
  };

  const total = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const paid = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0);
  const pendingCount = invoices.filter(inv => inv.status === 'pending').length;
  const draftCount = invoices.filter(inv => inv.status === 'draft').length;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Invoices</h1>
          <p className="text-muted-foreground mt-2">Create and manage invoices</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" className="gap-2" onClick={() => alert('Exported invoices as CSV')}>
            <Download className="h-5 w-5" />
            Export
          </Button>
          <Button variant="primary" className="gap-2" onClick={handleNewInvoice}>
            <Plus className="h-5 w-5" />
            New Invoice
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Total Revenue" value={formatCurrency(total)} description="All invoices" icon="💰" trend={8} />
        <StatCard title="Paid" value={formatCurrency(paid)} description={`${invoices.filter(i => i.status === 'paid').length} invoices`} icon="✓" />
        <StatCard title="Pending" value={formatCurrency(invoices.filter(i => i.status === 'pending').reduce((sum, i) => sum + i.amount, 0))} description={`${pendingCount} invoices`} icon="⏳" />
        <StatCard title="Draft" value={formatCurrency(invoices.filter(i => i.status === 'draft').reduce((sum, i) => sum + i.amount, 0))} description={`${draftCount} invoices`} icon="📝" />
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
                render: (status: string) => (
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
            data={invoices}
          />
        </CardContent>
      </Card>
    </div>
  );
}
