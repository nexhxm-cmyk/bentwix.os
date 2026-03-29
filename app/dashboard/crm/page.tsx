'use client';

import { KanbanBoard, type KanbanColumn } from '@/components/KanbanBoard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import { Button } from '@/components/Button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { formatCurrency, formatDate } from '@/lib/utils';

const INITIAL_DEALS: KanbanColumn[] = [
  {
    id: 'prospecting',
    title: 'Prospecting',
    items: [
      { id: '1', title: 'Startup Alpha', description: '$50k - New lead' },
      { id: '2', title: 'Company Beta', description: '$35k - Cold reach out' },
    ],
  },
  {
    id: 'negotiation',
    title: 'Negotiation',
    items: [
      { id: '3', title: 'Gamma Corp', description: '$120k - Under discussion' },
    ],
  },
  {
    id: 'proposal',
    title: 'Proposal',
    items: [
      { id: '4', title: 'Delta Inc', description: '$80k - Quote sent' },
      { id: '5', title: 'Epsilon Ltd', description: '$45k - Awaiting response' },
    ],
  },
  {
    id: 'won',
    title: 'Won',
    items: [
      { id: '6', title: 'Zeta Industries', description: '$150k - Contract signed' },
      { id: '7', title: 'Eta Systems', description: '$95k - Onboarded' },
    ],
  },
];

export default function CRMPage() {
  const [columns, setColumns] = useState<KanbanColumn[]>(INITIAL_DEALS);

  function handleCardMove(cardId: string, fromColumnId: string, toColumnId: string) {
    setColumns(prev =>
      prev.map(col => {
        if (col.id === fromColumnId) {
          return {
            ...col,
            items: col.items.filter(item => item.id !== cardId),
          };
        }
        if (col.id === toColumnId) {
          const card = prev
            .find(c => c.id === fromColumnId)
            ?.items.find(item => item.id === cardId);
          if (card) {
            return { ...col, items: [...col.items, card] };
          }
        }
        return col;
      })
    );
  }

  const totalDealValue = INITIAL_DEALS.reduce(
    (sum, col) =>
      sum +
      col.items.reduce((colSum, item) => {
        const match = item.description?.match(/\$(\d+)k/);
        return colSum + (match ? parseInt(match[1]) * 1000 : 0);
      }, 0),
    0
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">CRM</h1>
          <p className="text-muted-foreground mt-2">Manage sales pipeline and deals</p>
        </div>
        <Button variant="primary" className="gap-2">
          <Plus className="h-5 w-5" />
          New Deal
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatCurrency(totalDealValue)}</div>
            <p className="text-xs text-muted-foreground mt-1">8 deals total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Avg Deal Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatCurrency(Math.round(totalDealValue / 8))}</div>
            <p className="text-xs text-muted-foreground mt-1">Per opportunity</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Win Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">25%</div>
            <p className="text-xs text-muted-foreground mt-1">2 won this month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sales Pipeline</CardTitle>
          <CardDescription>Drag deals between stages to update status</CardDescription>
        </CardHeader>
        <CardContent>
          <KanbanBoard columns={columns} onCardMove={handleCardMove} />
        </CardContent>
      </Card>
    </div>
  );
}
