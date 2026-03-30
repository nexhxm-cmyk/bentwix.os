'use client';

import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/Button';
import { Plus } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { useDashboard } from '../DashboardProvider';

export default function ProjectsPage() {
  const { projects, addProject } = useDashboard();

  const handleNewProject = () => {
    const name = prompt('Project name');
    const client = prompt('Client name');
    const budget = Number(prompt('Budget', '0') || '0');
    if (!name || !client) return;
    addProject({
      name,
      client,
      status: 'active',
      budget,
      spent: 0,
      progress: 0,
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground mt-2">Manage all your agency projects</p>
        </div>
        <Button variant="primary" className="gap-2" onClick={handleNewProject}>
          <Plus className="h-5 w-5" />
          New Project
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Total Projects"
          value={projects.length.toString()}
          description={`${projects.filter(p => p.status === 'active').length} active`}
          icon="📁"
        />
        <StatCard
          title="Budget Used"
          value={
            `${Math.round((projects.reduce((sum, item) => sum + item.spent, 0) / Math.max(1, projects.reduce((sum, item) => sum + item.budget, 0))) * 100)}%`
          }
          description={`${formatCurrency(projects.reduce((sum, item) => sum + item.spent, 0))} of ${formatCurrency(projects.reduce((sum, item) => sum + item.budget, 0))}`}
          icon="💰"
        />
        <StatCard
          title="Avg. Progress"
          value={`${Math.round(projects.reduce((sum, item) => sum + item.progress, 0) / Math.max(1, projects.length))}%`}
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
            data={projects}
          />
        </CardContent>
      </Card>
    </div>
  );
}
