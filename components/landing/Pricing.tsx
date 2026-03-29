'use client';

import { Button } from '@/components/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/Card';
import { PRICING } from '@/data/landing';
import { Check } from 'lucide-react';
import Link from 'next/link';

export function PricingSection() {
  return (
    <section id="pricing" className="border-t border-border py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="section-title mb-4">Simple, Transparent Pricing</h2>
          <p className="section-subtitle max-w-2xl mx-auto">Choose the plan that fits your agency</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {PRICING.map(plan => (
            <Card
              key={plan.id}
              className={plan.popular ? 'relative border-primary/50 ring-1 ring-primary/20' : ''}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-3 py-1 rounded-full">
                  <span className="text-xs font-semibold text-white">MOST POPULAR</span>
                </div>
              )}

              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>

                <ul className="space-y-3">
                  {plan.features.map(feature => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Link href="/auth/signup" className="w-full">
                  <Button
                    variant={plan.popular ? 'primary' : 'secondary'}
                    size="lg"
                    className="w-full"
                  >
                    Get Started
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
