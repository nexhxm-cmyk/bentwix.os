'use client';

import { cn } from '@/lib/utils';

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: any, item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T extends { id: string }> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
}

export function DataTable<T extends { id: string }>({
  columns,
  data,
  onRowClick,
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/30">
            {columns.map(col => (
              <th
                key={String(col.key)}
                className="px-4 py-3 text-left font-medium text-muted-foreground"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr
              key={item.id}
              onClick={() => onRowClick?.(item)}
              className={cn(
                'border-b border-border transition-colors',
                onRowClick && 'cursor-pointer hover:bg-muted/10'
              )}
            >
              {columns.map(col => (
                <td
                  key={String(col.key)}
                  className={cn('px-4 py-3', col.className)}
                >
                  {col.render
                    ? col.render(item[col.key], item)
                    : String(item[col.key] || '-')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
