'use client';

import { Logo } from '@/components/Logo';
import Link from 'next/link';

export function FooterSection() {
  return (
    <footer className="border-t border-border bg-background py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-5">
          <div>
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              The all-in-one platform for modern agencies.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#features" className="hover:text-foreground transition">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-foreground transition">Pricing</Link></li>
              <li><Link href="#" className="hover:text-foreground transition">Security</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition">About</Link></li>
              <li><Link href="#" className="hover:text-foreground transition">Blog</Link></li>
              <li><Link href="#" className="hover:text-foreground transition">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition">Documentation</Link></li>
              <li><Link href="#" className="hover:text-foreground transition">API</Link></li>
              <li><Link href="#" className="hover:text-foreground transition">Support</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition">Privacy</Link></li>
              <li><Link href="#" className="hover:text-foreground transition">Terms</Link></li>
              <li><Link href="#" className="hover:text-foreground transition">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>&copy; 2026 Bentwix OS. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-foreground transition">Twitter</a>
            <a href="#" className="hover:text-foreground transition">LinkedIn</a>
            <a href="#" className="hover:text-foreground transition">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
