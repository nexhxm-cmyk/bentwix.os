'use client';

import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/lib/utils';

const FINANCIAL_DATA = [
  { month: 'Jan', revenue: 4000, expenses: 2400 },
  { month: 'Feb', revenue: 3000, expenses: 1398 },
  { month: 'Mar', revenue: 2000, expenses: 1800 },
  { month: 'Apr', revenue: 2780, expenses: 1908 },
  { month: 'May', revenue: 1890, expenses: 1600 },
  { month: 'Jun', revenue: 2390, expenses: 2200 },
];

export default function FinancePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Finance</h1>
        <p className="text-muted-foreground mt-2">Track revenue, expenses, and profitability</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(66000)}
          description="Last 6 months"
          icon="📈"
          trend={12}
        />
        <StatCard
          title="Total Expenses"
          value={formatCurrency(36306)}
          description="Last 6 months"
          icon="📉"
          trend={-5}
        />
        <StatCard
          title="Net Profit"
          value={formatCurrency(29694)}
          description="45% margin"
          icon="💰"
          trend={18}
        />
        <StatCard
          title="Monthly Avg"
          value={formatCurrency(4949)}
          description="Profit per month"
          icon="📊"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue vs Expenses</CardTitle>
          <CardDescription>Monthly comparison</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={FINANCIAL_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
              <XAxis dataKey="month" stroke="#64748B" />
              <YAxis stroke="#64748B" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F172A',
                  border: '1px solid #1E293B',
                  borderRadius: '0.5rem',
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#38BDF8" strokeWidth={2} />
              <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Profit</CardTitle>
          <CardDescription>Profit trend</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={FINANCIAL_DATA.map(d => ({
                month: d.month,
                profit: d.revenue - d.expenses,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
              <XAxis dataKey="month" stroke="#64748B" />
              <YAxis stroke="#64748B" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F172A',
                  border: '1px solid #1E293B',
                  borderRadius: '0.5rem',
                }}
              />
              <Bar dataKey="profit" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
