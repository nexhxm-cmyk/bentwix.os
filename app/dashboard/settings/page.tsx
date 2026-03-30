'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/ui/input';

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account and team settings</p>
      </div>

      {/* Team Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Team Information</CardTitle>
          <CardDescription>Update your team details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="label-base mb-2 block">Team Name</label>
            <Input placeholder="Your Agency Name" />
          </div>
          <div>
            <label className="label-base mb-2 block">Team Slug</label>
            <Input placeholder="your-agency" />
          </div>
          <div>
            <label className="label-base mb-2 block">Description</label>
            <textarea className="input-base min-h-24 resize-none" placeholder="Tell us about your agency" />
          </div>
          <Button variant="primary">Save Changes</Button>
        </CardContent>
      </Card>

      {/* Billing */}
      <Card>
        <CardHeader>
          <CardTitle>Billing & Subscription</CardTitle>
          <CardDescription>Manage your billing and plan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="font-semibold">Pro Plan</p>
              <p className="text-sm text-muted-foreground">$799/month • Annual billing</p>
            </div>
            <Button variant="secondary">Manage</Button>
          </div>
        </CardContent>
      </Card>

      {/* Integrations */}
      <Card>
        <CardHeader>
          <CardTitle>Integrations</CardTitle>
          <CardDescription>Connect external services</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="font-semibold">Manual Payment</p>
              <p className="text-sm text-muted-foreground">Enabled (cash/bank/custom tracking)</p>
            </div>
            <Button variant="secondary">Configure</Button>
          </div>
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="font-semibold">Slack</p>
              <p className="text-sm text-muted-foreground">Not connected</p>
            </div>
            <Button variant="secondary">Connect</Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-500/30">
        <CardHeader>
          <CardTitle className="text-red-400">Danger Zone</CardTitle>
          <CardDescription>Irreversible actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="secondary" className="w-full text-red-400 border-red-500/30">
            Delete Team
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
