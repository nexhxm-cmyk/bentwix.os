'use client';

import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/Button';
import { Plus, Download } from 'lucide-react';
import { formatDate } from '@/lib/utils';

const CONTRACTS = [
  { id: '1', name: 'Service Agreement - Acme Corp', client: 'Acme Corp', status: 'active', startDate: '2026-01-15', endDate: '2027-01-15' },
  { id: '2', name: 'Development Contract - Tech Startup', client: 'Tech Startup', status: 'pending', startDate: '2026-04-01', endDate: '2026-09-30' },
  { id: '3', name: 'NDA - Digital Agency', client: 'Digital Agency', status: 'signed', startDate: '2026-02-20', endDate: '2027-02-20' },
  { id: '4', name: 'Retainer Agreement - Creative Co', client: 'Creative Co', status: 'active', startDate: '2025-06-01', endDate: '2026-05-31' },
];

export default function ContractsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Contracts</h1>
          <p className="text-muted-foreground mt-2">Create and manage contracts and agreements</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" className="gap-2">
            <Download className="h-5 w-5" />
            Template
          </Button>
          <Button variant="primary" className="gap-2">
            <Plus className="h-5 w-5" />
            New Contract
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          title="Total Contracts"
          value={CONTRACTS.length.toString()}
          description="Active and pending"
          icon="📝"
        />
        <StatCard
          title="Active"
          value="2"
          description="In effect"
          icon="✓"
        />
        <StatCard
          title="Pending Signature"
          value="1"
          description="Awaiting sign-off"
          icon="✍️"
        />
        <StatCard
          title="Signed"
          value="1"
          description="Completed"
          icon="🎉"
        />
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
                render: (status) => (
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
            data={CONTRACTS}
          />
        </CardContent>
      </Card>
    </div>
  );
}
