'use client';

import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/Button';
import { Plus } from 'lucide-react';
import { useDashboard } from '../DashboardProvider';
import { formatCurrency } from '@/lib/utils';

export default function ClientsPage() {
  const { clients, addClient } = useDashboard();

  const handleNewClient = () => {
    const name = prompt('Client name');
    const email = prompt('Client email');
    if (!name || !email) return;
    addClient({
      name,
      email,
      status: 'active',
      revenue: 0,
      projects: 0,
    });
  };

  const totalRevenue = clients.reduce((sum, client) => sum + client.revenue, 0);
  const activeClients = clients.filter(c => c.status === 'active').length;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Clients</h1>
          <p className="text-muted-foreground mt-2">Manage your client relationships</p>
        </div>
        <Button variant="primary" className="gap-2" onClick={handleNewClient}>
          <Plus className="h-5 w-5" />
          New Client
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          title="Total Clients"
          value={clients.length.toString()}
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
          value={formatCurrency(Math.round(totalRevenue / Math.max(1, clients.length)))}
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
                render: (status: string) => (
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
            data={clients}
          />
        </CardContent>
      </Card>
    </div>
  );
}

