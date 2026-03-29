'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/ui/input';
import { Download, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const REPORT_DATA = [
  { type: 'Development', hours: 120 },
  { type: 'Design', hours: 80 },
  { type: 'Management', hours: 40 },
  { type: 'Testing', hours: 60 },
];

const DISTRIBUTION_DATA = [
  { name: 'Acme Corp', value: 35 },
  { name: 'Tech Startup', value: 25 },
  { name: 'Digital Agency', value: 30 },
  { name: 'Creative Co', value: 10 },
];

const COLORS = ['#38BDF8', '#0EA5E9', '#06B6D4', '#10B981'];

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground mt-2">Analytics and insights</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Report Filters</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4 flex-wrap">
          <Input placeholder="Date range..." className="w-40" />
          <select className="input-base">
            <option>All Teams</option>
            <option>Team A</option>
            <option>Team B</option>
          </select>
          <select className="input-base">
            <option>All Clients</option>
            <option>Acme Corp</option>
            <option>Tech Startup</option>
          </select>
          <Button variant="secondary" className="gap-2">
            <Filter className="h-5 w-5" />
            Apply Filters
          </Button>
          <Button variant="secondary" className="gap-2 ml-auto">
            <Download className="h-5 w-5" />
            Export CSV
          </Button>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Hours by Type</CardTitle>
            <CardDescription>Time allocation</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={REPORT_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="type" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    border: '1px solid #1E293B',
                    borderRadius: '0.5rem',
                  }}
                />
                <Bar dataKey="hours" fill="#38BDF8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Distribution</CardTitle>
            <CardDescription>By client</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={DISTRIBUTION_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {DISTRIBUTION_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    border: '1px solid #1E293B',
                    borderRadius: '0.5rem',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Report Summary</CardTitle>
          <CardDescription>Key metrics and KPIs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Hours</p>
              <p className="text-2xl font-bold">300h</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Billable Hours</p>
              <p className="text-2xl font-bold">240h</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Utilization</p>
              <p className="text-2xl font-bold">80%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Realization</p>
              <p className="text-2xl font-bold">92%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
