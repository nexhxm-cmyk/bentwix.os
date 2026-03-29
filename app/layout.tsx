import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bentwix OS - Run Your Entire Agency From One OS',
  description: 'All-in-one platform for agencies. Project management, invoicing, payroll, CRM, and more.',
  keywords: ['agency management', 'project management', 'invoicing', 'payroll', 'CRM'],
  authors: [{ name: 'Bentwix' }],
  openGraph: {
    title: 'Bentwix OS - Run Your Entire Agency From One OS',
    description: 'All-in-one platform for agencies',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gradient-dark text-foreground antialiased">
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
