'use client';

import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/Button';
import { Plus, Download } from 'lucide-react';
import { useDashboard } from '../DashboardProvider';
import { formatDate } from '@/lib/utils';

export default function ContractsPage() {
  const { contracts, addContract } = useDashboard();

  const handleNewContract = () => {
    const name = prompt('New contract name');
    const client = prompt('Client name');
    const startDate = prompt('Start date (YYYY-MM-DD)');
    const endDate = prompt('End date (YYYY-MM-DD)');
    if (!name || !client || !startDate || !endDate) return;
    addContract({
      name,
      client,
      status: 'pending',
      startDate,
      endDate,
    });
  };

  const activeCount = contracts.filter(c => c.status === 'active').length;
  const pendingCount = contracts.filter(c => c.status === 'pending').length;
  const signedCount = contracts.filter(c => c.status === 'signed').length;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Contracts</h1>
          <p className="text-muted-foreground mt-2">Create and manage contracts and agreements</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" className="gap-2" onClick={() => alert('Download template opened')}>
            <Download className="h-5 w-5" />
            Template
          </Button>
          <Button variant="primary" className="gap-2" onClick={handleNewContract}>
            <Plus className="h-5 w-5" />
            New Contract
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Total Contracts" value={contracts.length.toString()} description="Active and pending" icon="📝" />
        <StatCard title="Active" value={activeCount.toString()} description="In effect" icon="✓" />
        <StatCard title="Pending Signature" value={pendingCount.toString()} description="Awaiting sign-off" icon="✍️" />
        <StatCard title="Signed" value={signedCount.toString()} description="Completed" icon="🎉" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Contracts</CardTitle>
          <CardDescription>View, edit, and sign contracts</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: 'name', label: 'Contract' },
              { key: 'client', label: 'Client' },
              {
                key: 'status',
                label: 'Status',
                render: (status: string) => (
                  <span className={`badge text-xs ${
                    status === 'active' ? 'badge-success'
                      : status === 'pending' ? 'badge-warning'
                      : 'badge-primary'
                  }`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                ),
              },
              { key: 'startDate', label: 'Start Date', render: (val) => formatDate(val) },
              { key: 'endDate', label: 'End Date', render: (val) => formatDate(val) },
            ]}
            data={contracts}
          />
        </CardContent>
      </Card>
    </div>
  );
}

