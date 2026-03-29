'use client';

import { Card } from '@/components/Card';
import { HOW_IT_WORKS } from '@/data/landing';

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="border-t border-border py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="section-title mb-4">Get Started in 4 Steps</h2>
          <p className="section-subtitle max-w-2xl mx-auto">Simple onboarding process to get your team productive</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS.map((step, index) => (
            <div key={step.id} className="relative">
              <Card className="flex min-h-[200px] flex-col items-center justify-center text-center">
                <div className="mb-4 text-5xl">{step.icon}</div>
                <h3 className="mb-2 font-semibold text-lg">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </Card>

              {index < HOW_IT_WORKS.length - 1 && (
                <div className="absolute -right-4 top-1/2 hidden h-0.5 w-8 -translate-y-1/2 bg-border lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
