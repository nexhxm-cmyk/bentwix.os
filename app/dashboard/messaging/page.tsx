'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { useDashboard } from '../DashboardProvider';
import { useState } from 'react';

const CHANNELS = ['general', 'projects', 'announcements', 'random'];

export default function MessagingPage() {
  const { activeChannel, setActiveChannel, messages, sendMessage } = useDashboard();
  const [message, setMessage] = useState('');

  const filteredMessages = messages.filter(msg => msg.channel === activeChannel);

  const handleSend = () => {
    if (!message.trim()) return;
    sendMessage(message, 'team');
    setMessage('');
  };


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
              key={channel}
              onClick={() => setActiveChannel(channel)}
              className={`w-full flex items-center justify-between p-2 rounded-lg transition text-left ${
                activeChannel === channel ? 'bg-primary/20' : 'hover:bg-muted/20'
              }`}
            >
              <span className="text-sm">#{channel}</span>
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
          {filteredMessages.map(msg => (
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
            onKeyDown={e => e.key === 'Enter' && handleSend()}
          />
          <Button variant="primary" size="sm" onClick={handleSend}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
