'use client';

import { Button } from '@/components/Button';
import { Logo } from '@/components/Logo';
import { useRouter } from 'next/navigation';

export function LandingHeader() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Logo />
        <div className="hidden flex-1 justify-center gap-8 md:flex">
          <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Features
          </a>
          <a href="#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            How it Works
          </a>
          <a href="#pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Pricing
          </a>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => router.push('/auth/login')}
          >
            Login
          </Button>
          <Button 
            variant="primary" 
            size="sm"
            onClick={() => router.push('/auth/signup')}
          >
            Get Started
          </Button>
        </div>
      </nav>
    </header>
  );
}
