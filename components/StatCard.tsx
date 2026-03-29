'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon?: React.ReactNode;
  trend?: number;
}

export function StatCard({ title, value, description, icon, trend }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="text-2xl opacity-50">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">
          {description}
          {trend !== undefined && (
            <span className={trend > 0 ? 'text-green-400' : 'text-red-400'}>
              {' '}
              {trend > 0 ? '+' : ''}{trend}%
            </span>
          )}
        </p>
      </CardContent>
    </Card>
  );
}
