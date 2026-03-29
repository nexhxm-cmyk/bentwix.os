'use client';

import { KanbanBoard, type KanbanColumn } from '@/components/KanbanBoard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import { Button } from '@/components/Button';
import { Plus, Zap } from 'lucide-react';
import { useState } from 'react';

const INITIAL_COLUMNS: KanbanColumn[] = [
  {
    id: 'todo',
    title: 'To Do',
    items: [
      { id: '1', title: 'Design landing page', description: 'Create mockups and wireframes' },
      { id: '2', title: 'Research competitors', description: 'Analyze market positioning' },
    ],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    items: [
      { id: '3', title: 'Setup authentication', description: 'Implement Supabase auth' },
      { id: '4', title: 'Create database schema', description: 'Design tables and relationships' },
    ],
  },
  {
    id: 'in-review',
    title: 'In Review',
    items: [
      { id: '5', title: 'API implementation', description: 'REST endpoints' },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    items: [
      { id: '6', title: 'Project kickoff', description: 'Team meeting' },
      { id: '7', title: 'Requirement gathering', description: 'Client feedback' },
    ],
  },
];

export default function TasksPage() {
  const [columns, setColumns] = useState<KanbanColumn[]>(INITIAL_COLUMNS);

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

  function handleCardDelete(cardId: string) {
    setColumns(prev =>
      prev.map(col => ({
        ...col,
        items: col.items.filter(item => item.id !== cardId),
      }))
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-muted-foreground mt-2">Organize and track your team's work</p>
        </div>
        <Button variant="primary" className="gap-2">
          <Plus className="h-5 w-5" />
          New Task
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Task Board</CardTitle>
          <CardDescription>Drag and drop tasks to update their status</CardDescription>
        </CardHeader>
        <CardContent>
          <KanbanBoard
            columns={columns}
            onCardMove={handleCardMove}
            onCardDelete={handleCardDelete}
          />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">26</div>
            <p className="text-xs text-muted-foreground mt-1">This sprint</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">46% done</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-400">2</div>
            <p className="text-xs text-muted-foreground mt-1">Need attention</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
