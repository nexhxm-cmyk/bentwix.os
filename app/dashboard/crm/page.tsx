'use client';

import { KanbanBoard, type KanbanColumn } from '@/components/KanbanBoard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import { Button } from '@/components/Button';
import { Plus } from 'lucide-react';
import { useDashboard } from '../DashboardProvider';
import { formatCurrency } from '@/lib/utils';

export default function CRMPage() {
  const { deals, addDeal, moveDeal } = useDashboard();

  const columns: KanbanColumn[] = [
    { id: 'prospecting', title: 'Prospecting', items: deals.filter(d => d.stage === 'prospecting').map(d => ({ id: d.id, title: d.title, description: `${formatCurrency(d.value)} - ${d.client}` })) },
    { id: 'negotiation', title: 'Negotiation', items: deals.filter(d => d.stage === 'negotiation').map(d => ({ id: d.id, title: d.title, description: `${formatCurrency(d.value)} - ${d.client}` })) },
    { id: 'proposal', title: 'Proposal', items: deals.filter(d => d.stage === 'proposal').map(d => ({ id: d.id, title: d.title, description: `${formatCurrency(d.value)} - ${d.client}` })) },
    { id: 'won', title: 'Won', items: deals.filter(d => d.stage === 'won').map(d => ({ id: d.id, title: d.title, description: `${formatCurrency(d.value)} - ${d.client}` })) },
  ];

  const totalDealValue = deals.reduce((sum, deal) => sum + deal.value, 0);

  const handleNewDeal = () => {
    const title = prompt('Deal title');
    const client = prompt('Client name');
    const value = Number(prompt('Deal value', '0') || '0');
    if (!title || !client || !value) return;
    addDeal({ title, client, value, stage: 'prospecting' });
  };

  const handleCardMove = (cardId: string, fromColumnId: string, toColumnId: string) => {
    if (['prospecting', 'negotiation', 'proposal', 'won'].includes(toColumnId)) {
      moveDeal(cardId, toColumnId as any);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">CRM</h1>
          <p className="text-muted-foreground mt-2">Manage sales pipeline and deals</p>
        </div>
        <Button variant="primary" className="gap-2" onClick={handleNewDeal}>
          <Plus className="h-5 w-5" />
          New Deal
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader><CardTitle className="text-sm">Total Pipeline</CardTitle></CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatCurrency(totalDealValue)}</div>
            <p className="text-xs text-muted-foreground mt-1">{deals.length} deals total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm">Avg Deal Size</CardTitle></CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{deals.length ? formatCurrency(Math.round(totalDealValue / deals.length)) : formatCurrency(0)}</div>
            <p className="text-xs text-muted-foreground mt-1">Per opportunity</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm">Win Rate</CardTitle></CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{deals.length ? `${Math.round((deals.filter(d => d.stage === 'won').length / deals.length) * 100)}%` : '0%'}</div>
            <p className="text-xs text-muted-foreground mt-1">Won deals</p>
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