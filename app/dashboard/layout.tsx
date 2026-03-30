import { Sidebar } from '@/components/Sidebar';
import { DashboardProvider } from './DashboardProvider';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProvider>
      <div className="flex h-screen bg-gradient-dark">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-8">{children}</div>
        </main>
      </div>
    </DashboardProvider>
  );
}
