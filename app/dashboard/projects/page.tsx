'use client';

import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/Button';
import { Plus } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';

const PROJECTS = [
  {
    id: '1',
    name: 'Website Redesign',
    client: 'Acme Corp',
    status: 'active',
    budget: 15000,
    spent: 9200,
    progress: 65,
  },
  {
    id: '2',
    name: 'Mobile App',
    client: 'Tech Startup',
    status: 'active',
    budget: 30000,
    spent: 18500,
    progress: 45,
  },
  {
    id: '3',
    name: 'Brand Identity',
    client: 'Digital Agency',
    status: 'completed',
    budget: 5000,
    spent: 5000,
    progress: 100,
  },
];

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground mt-2">Manage all your agency projects</p>
        </div>
        <Button variant="primary" className="gap-2">
          <Plus className="h-5 w-5" />
          New Project
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Total Projects"
          value="3"
          description="2 active"
          icon="📁"
        />
        <StatCard
          title="Budget Used"
          value={`${Math.round((27700 / 50000) * 100)}%`}
          description={`${formatCurrency(27700)} of ${formatCurrency(50000)}`}
          icon="💰"
        />
        <StatCard
          title="Avg. Progress"
          value="70%"
          description="Across all projects"
          icon="📈"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Projects</CardTitle>
          <CardDescription>Active and completed projects</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: 'name', label: 'Project' },
              { key: 'client', label: 'Client' },
              {
                key: 'status',
                label: 'Status',
                render: (status) => (
                  <span className={`badge text-xs ${
                    status === 'active' ? 'badge-primary' : 'badge-success'
                  }`}>
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
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-xs">{progress}%</span>
                  </div>
                ),
              },
              {
                key: 'spent',
                label: 'Budget',
                render: (_, item: any) => `${formatCurrency(item.spent)} / ${formatCurrency(item.budget)}`,
              },
            ]}
            data={PROJECTS}
          />
        </CardContent>
      </Card>
    </div>
  );
}
