'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { useState } from 'react';

const CHANNELS = [
  { id: '1', name: 'general', unread: 0 },
  { id: '2', name: 'projects', unread: 3 },
  { id: '3', name: 'announcements', unread: 0 },
  { id: '4', name: 'random', unread: 2 },
];

const MESSAGES = [
  { id: '1', author: 'John Smith', message: 'Hey team, project kickoff is tomorrow at 10 AM', timestamp: '10:30 AM' },
  { id: '2', author: 'Sarah Chen', message: "Got it! I'll prepare the requirements document", timestamp: '10:35 AM' },
  { id: '3', author: 'Mike Johnson', message: 'Count me in! See you then', timestamp: '10:40 AM' },
  { id: '4', author: 'John Smith', message: "Perfect, let's make it great!", timestamp: '10:42 AM' },
];

export default function MessagingPage() {
  const [message, setMessage] = useState('');

  return (
    <div className="grid gap-6 md:grid-cols-4 h-[calc(100vh-200px)]">
      {/* Sidebar */}
      <Card className="md:col-span-1 overflow-hidden flex flex-col">
        <CardHeader>
          <CardTitle className="text-base">Channels</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto space-y-2">
          {CHANNELS.map(channel => (
            <button
              key={channel.id}
              className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-muted/20 transition text-left"
            >
              <span className="text-sm">#{channel.name}</span>
              {channel.unread > 0 && (
                <span className="badge-primary text-xs">{channel.unread}</span>
              )}
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Messages */}
      <Card className="md:col-span-3 overflow-hidden flex flex-col">
        <CardHeader>
          <CardTitle>#projects</CardTitle>
          <CardDescription>Team project discussions</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto mb-4 space-y-4">
          {MESSAGES.map(msg => (
            <div key={msg.id} className="flex gap-3 pb-4 border-b border-border/50 last:border-0">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold">
                  {msg.author[0]}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-medium text-sm">{msg.author}</span>
                  <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{msg.message}</p>
              </div>
            </div>
          ))}
        </CardContent>
        <div className="border-t border-border pt-4 flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="input-base flex-1"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <Button variant="primary" size="sm">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
