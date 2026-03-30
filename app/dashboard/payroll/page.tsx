'use client';

import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/Button';
import { Plus } from 'lucide-react';
import { useDashboard } from '../DashboardProvider';
import { formatCurrency } from '@/lib/utils';

export default function PayrollPage() {
  const { payroll, addPayrollRecord } = useDashboard();

  const handleProcessPayroll = () => {
    const employee = prompt('Employee name');
    const salary = Number(prompt('Salary', '0') || '0');
    const commission = Number(prompt('Commission', '0') || '0');
    const bonus = Number(prompt('Bonus', '0') || '0');
    if (!employee || salary <= 0) return;
    addPayrollRecord({ employee, salary, commission, bonus });
  };

  const totalPaid = payroll.reduce((sum, item) => sum + item.total, 0);
  const avgSalary = payroll.length ? Math.round(payroll.reduce((sum, item) => sum + item.salary, 0) / payroll.length) : 0;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Payroll</h1>
          <p className="text-muted-foreground mt-2">Manage employee compensation</p>
        </div>
        <Button variant="primary" className="gap-2" onClick={handleProcessPayroll}>
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
          description={`${payroll.length} employees`}
          icon="👥"
        />
        <StatCard
          title="Commissions"
          value={formatCurrency(payroll.reduce((sum, item) => sum + item.commission, 0))}
          description="This period"
          icon="🎯"
        />
        <StatCard
          title="Bonuses"
          value={formatCurrency(payroll.reduce((sum, item) => sum + item.bonus, 0))}
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
            data={payroll}
          />
        </CardContent>
      </Card>
    </div>
  );
}

