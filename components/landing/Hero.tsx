'use client';

import { Button } from '@/components/Button';
import { ArrowRight, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative min-h-screen overflow-hidden pb-20 pt-32">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2">
          <Zap className="h-4 w-4 text-primary" />
          <span className="text-sm text-primary">Now available - Start with 30 free days</span>
        </div>

        <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
          Run Your Entire <br />
          <span className="bg-gradient-primary bg-clip-text text-transparent">Agency From One OS</span>
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Project management, invoicing, payroll, CRM, and everything else your agency needs. All built for teams
          that want to grow faster.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button 
            variant="primary" 
            size="lg" 
            className="gap-2 cursor-pointer"
            onClick={() => router.push('/auth/signup')}
          >
            Start Now <ArrowRight className="h-5 w-5" />
          </Button>
          <Button 
            variant="secondary" 
            size="lg"
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Features
          </Button>
        </div>

        <div className="mt-16 rounded-2xl border border-border bg-background/50 p-2 backdrop-blur-sm">
          <div className="aspect-video w-full rounded-lg bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">📊</div>
              <p className="text-muted-foreground">Dashboard Preview</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
