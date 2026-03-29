'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import {
  LayoutDashboard,
  Folder,
  CheckSquare,
  FileText,
  DollarSign,
  Users,
  Heart,
  Briefcase,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';

const MENU_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Folder, label: 'Projects', href: '/dashboard/projects' },
  { icon: CheckSquare, label: 'Tasks', href: '/dashboard/tasks' },
  { icon: FileText, label: 'Invoices', href: '/dashboard/invoices' },
  { icon: DollarSign, label: 'Finance', href: '/dashboard/finance' },
  { icon: Users, label: 'Payroll', href: '/dashboard/payroll' },
  { icon: Heart, label: 'HR', href: '/dashboard/hr' },
  { icon: Briefcase, label: 'Clients', href: '/dashboard/clients' },
  { icon: Briefcase, label: 'Contracts', href: '/dashboard/contracts' },
  { icon: MessageSquare, label: 'Messaging', href: '/dashboard/messaging' },
  { icon: BarChart3, label: 'Reports', href: '/dashboard/reports' },
  { icon: Briefcase, label: 'CRM', href: '/dashboard/crm' },
];

export function Sidebar() {
  const [open, setOpen] = useState(false);
  const { signOut } = useAuth();

  async function handleSignOut() {
    try {
      await signOut();
      toast.success('Signed out');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-background border border-border"
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-background/95 backdrop-blur-sm transition-transform duration-300 md:relative md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <Logo />

          <nav className="mt-8 flex-1 space-y-2">
            {MENU_ITEMS.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/20 hover:text-foreground"
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="space-y-2 border-t border-border pt-4">
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/20 hover:text-foreground"
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 rounded-lg px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-400"
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
