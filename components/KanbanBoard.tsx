'use client';

import { useState } from 'react';
import { Card } from '@/components/Card';
import { GripVertical, Trash2 } from 'lucide-react';

export interface KanbanItem {
  id: string;
  title: string;
  description?: string;
  labels?: string[];
}

export interface KanbanColumn {
  id: string;
  title: string;
  items: KanbanItem[];
}

interface KanbanBoardProps {
  columns: KanbanColumn[];
  onCardMove?: (cardId: string, fromColumn: string, toColumn: string) => void;
  onCardDelete?: (cardId: string) => void;
}

export function KanbanBoard({ columns, onCardMove, onCardDelete }: KanbanBoardProps) {
  const [draggedItem, setDraggedItem] = useState<{ cardId: string; columnId: string } | null>(null);

  function handleDragStart(e: React.DragEvent, cardId: string, columnId: string) {
    setDraggedItem({ cardId, columnId });
    e.dataTransfer.effectAllowed = 'move';
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }

  function handleDrop(e: React.DragEvent, targetColumnId: string) {
    e.preventDefault();
    if (draggedItem && onCardMove) {
      if (draggedItem.columnId !== targetColumnId) {
        onCardMove(draggedItem.cardId, draggedItem.columnId, targetColumnId);
      }
    }
    setDraggedItem(null);
  }

  return (
    <div className="flex gap-6 overflow-x-auto pb-4">
      {columns.map(column => (
        <div key={column.id} className="flex flex-col min-w-80">
          <h3 className="font-semibold mb-4 text-sm">{column.title}</h3>
          <div
            className="flex-1 space-y-3 rounded-lg border border-border bg-background/30 p-4"
            onDragOver={handleDragOver}
            onDrop={e => handleDrop(e, column.id)}
          >
            {column.items.map(item => (
              <Card
                key={item.id}
                className="cursor-move p-4"
                draggable
                onDragStart={e => handleDragStart(e, item.id, column.id)}
              >
                <div className="flex items-start gap-3">
                  <GripVertical className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm line-clamp-2">{item.title}</p>
                    {item.description && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                    )}
                    {item.labels && item.labels.length > 0 && (
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {item.labels.map(label => (
                          <span key={label} className="badge-primary text-xs">
                            {label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  {onCardDelete && (
                    <button
                      onClick={() => onCardDelete(item.id)}
                      className="text-muted-foreground hover:text-red-400 transition flex-shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
