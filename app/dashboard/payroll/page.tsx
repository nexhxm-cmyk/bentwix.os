'use client';

import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/Button';
import { Plus } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const PAYROLL_DATA = [
  { id: '1', employee: 'John Smith', salary: 5000, commission: 500, bonus: 200, total: 5700 },
  { id: '2', employee: 'Sarah Chen', salary: 4500, commission: 800, bonus: 150, total: 5450 },
  { id: '3', employee: 'Mike Johnson', salary: 4000, commission: 300, bonus: 100, total: 4400 },
  { id: '4', employee: 'Elena Davis', salary: 4500, commission: 600, bonus: 200, total: 5300 },
];

export default function PayrollPage() {
  const totalPaid = PAYROLL_DATA.reduce((sum, item) => sum + item.total, 0);
  const avgSalary = Math.round(PAYROLL_DATA.reduce((sum, item) => sum + item.salary, 0) / PAYROLL_DATA.length);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Payroll</h1>
          <p className="text-muted-foreground mt-2">Manage employee compensation</p>
        </div>
        <Button variant="primary" className="gap-2">
          <Plus className="h-5 w-5" />
          Process Payroll
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          title="Total Payroll"
          value={formatCurrency(totalPaid)}
          description="This month"
          icon="💰"
        />
        <StatCard
          title="Avg Salary"
          value={formatCurrency(avgSalary)}
          description={`${PAYROLL_DATA.length} employees`}
          icon="👥"
        />
        <StatCard
          title="Commissions"
          value={formatCurrency(2200)}
          description="This period"
          icon="🎯"
        />
        <StatCard
          title="Bonuses"
          value={formatCurrency(650)}
          description="Total bonuses"
          icon="🎁"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payroll Summary</CardTitle>
          <CardDescription>Employee compensation breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { key: 'employee', label: 'Employee' },
              { key: 'salary', label: 'Salary', render: (val) => formatCurrency(val) },
              { key: 'commission', label: 'Commission', render: (val) => formatCurrency(val) },
              { key: 'bonus', label: 'Bonus', render: (val) => formatCurrency(val) },
              { key: 'total', label: 'Total', render: (val) => formatCurrency(val) },
            ]}
            data={PAYROLL_DATA}
          />
        </CardContent>
      </Card>
    </div>
  );
}
