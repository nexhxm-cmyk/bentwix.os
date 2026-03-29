'use client';

import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/Button';
import { Plus } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const CLIENTS = [
  { id: '1', name: 'Acme Corp', email: 'contact@acme.com', status: 'active', revenue: 12500, projects: 3 },
  { id: '2', name: 'Tech Startup', email: 'hello@techstartup.com', status: 'active', revenue: 8200, projects: 2 },
  { id: '3', name: 'Digital Agency', email: 'info@digitalagency.com', status: 'active', revenue: 15000, projects: 4 },
  { id: '4', name: 'Creative Co', email: 'contact@creative.co', status: 'inactive', revenue: 5000, projects: 1 },
];

export default function ClientsPage() {
  const totalRevenue = CLIENTS.reduce((sum, client) => sum + client.revenue, 0);
  const activeClients = CLIENTS.filter(c => c.status === 'active').length;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Clients</h1>
          <p className="text-muted-foreground mt-2">Manage your client relationships</p>
        </div>
        <Button variant="primary" className="gap-2">
          <Plus className="h-5 w-5" />
          New Client
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          title="Total Clients"
          value={CLIENTS.length.toString()}
          description={`${activeClients} active`}
          icon="🤝"
        />
        <StatCard
          title="Revenue"
          value={formatCurrency(totalRevenue)}
          description="Total lifetime"
          icon="💰"
        />
        <StatCard
          title="Active Projects"
          value="9"
          description="In progress"
          icon="📁"
        />
        <StatCard
          title="Avg Value"
          value={formatCurrency(Math.round(totalRevenue / CLIENTS.length))}
          description="Per client"
          icon="📊"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Clients</CardTitle>
          <CardDescription>View and manage your clients</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email' },
              {
                key: 'status',
                label: 'Status',
                render: (status) => (
                  <span className={`badge text-xs ${
                    status === 'active' ? 'badge-success' : 'badge-primary'
                  }`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                ),
              },
              { key: 'revenue', label: 'Revenue', render: (val) => formatCurrency(val) },
              { key: 'projects', label: 'Projects' },
            ]}
            data={CLIENTS}
          />
        </CardContent>
      </Card>
    </div>
  );
}
