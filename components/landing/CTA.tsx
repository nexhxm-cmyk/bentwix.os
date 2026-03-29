'use client';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function CTASection() {
  const router = useRouter();

  return (
    <section className="border-t border-border py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Card className="text-center">
          <h2 className="section-title mb-4">Ready to Transform Your Agency?</h2>
          <p className="section-subtitle mb-8 max-w-2xl mx-auto">
            Join hundreds of agencies already using Bentwix OS to streamline their operations and grow faster.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button 
              variant="primary" 
              size="lg" 
              className="gap-2"
              onClick={() => router.push('/auth/signup')}
            >
              Start Your Free Trial <ArrowRight className="h-5 w-5" />
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Contact Sales
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
