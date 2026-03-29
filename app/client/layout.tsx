import { Logo } from '@/components/Logo';
import Link from 'next/link';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gradient-dark">
      {/* Client sidebar - minimal */}
      <aside className="w-64 border-r border-border p-6 hidden md:block">
        <Logo />
        <nav className="mt-8 space-y-4">
          <Link href="/client" className="block text-sm text-muted-foreground hover:text-foreground transition">
            📊 Dashboard
          </Link>
          <Link href="/client/projects" className="block text-sm text-muted-foreground hover:text-foreground transition">
            📁 Projects
          </Link>
          <Link href="/client/invoices" className="block text-sm text-muted-foreground hover:text-foreground transition">
            📄 Invoices
          </Link>
          <Link href="/client/messages" className="block text-sm text-muted-foreground hover:text-foreground transition">
            💬 Messages
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
