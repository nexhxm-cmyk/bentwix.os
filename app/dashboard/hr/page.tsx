'use client';

import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/Button';
import { Plus } from 'lucide-react';

const EMPLOYEES = [
  { id: '1', name: 'John Smith', position: 'Senior Developer', status: 'active', joinDate: '2023-01-15' },
  { id: '2', name: 'Sarah Chen', position: 'Project Manager', status: 'active', joinDate: '2023-03-20' },
  { id: '3', name: 'Mike Johnson', position: 'Designer', status: 'active', joinDate: '2023-06-10' },
  { id: '4', name: 'Elena Davis', position: 'Account Manager', status: 'active', joinDate: '2023-09-05' },
];

const LEAVE_REQUESTS = [
  { id: '1', employee: 'John Smith', type: 'Vacation', days: 5, status: 'approved', date: '2026-04-01' },
  { id: '2', employee: 'Sarah Chen', type: 'Sick Leave', days: 2, status: 'pending', date: '2026-03-30' },
  { id: '3', employee: 'Mike Johnson', type: 'Personal', days: 3, status: 'approved', date: '2026-04-15' },
];

export default function HRPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">HR Management</h1>
          <p className="text-muted-foreground mt-2">Manage team and employee information</p>
        </div>
        <Button variant="primary" className="gap-2">
          <Plus className="h-5 w-5" />
          Add Employee
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          title="Total Employees"
          value="12"
          description="All active"
          icon="👥"
        />
        <StatCard
          title="New This Month"
          value="2"
          description="Onboarded"
          icon="🆕"
        />
        <StatCard
          title="Leave Pending"
          value="3"
          description="Requests"
          icon="📅"
        />
        <StatCard
          title="Departments"
          value="4"
          description="Teams"
          icon="🏢"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>All employees in your agency</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: 'name', label: 'Name' },
              { key: 'position', label: 'Position' },
              {
                key: 'status',
                label: 'Status',
                render: (status) => (
                  <span className="badge badge-success text-xs">
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                ),
              },
              { key: 'joinDate', label: 'Join Date' },
            ]}
            data={EMPLOYEES}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Leave Requests</CardTitle>
          <CardDescription>Pending and approved leave requests</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: 'employee', label: 'Employee' },
              { key: 'type', label: 'Type' },
              { key: 'days', label: 'Days' },
              {
                key: 'status',
                label: 'Status',
                render: (status) => (
                  <span className={`badge text-xs ${
                    status === 'approved' ? 'badge-success' : 'badge-warning'
                  }`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                ),
              },
              { key: 'date', label: 'Date' },
            ]}
            data={LEAVE_REQUESTS}
          />
        </CardContent>
      </Card>
    </div>
  );
}
