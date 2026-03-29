'use client';

import { Card } from '@/components/Card';
import { TESTIMONIALS } from '@/data/landing';

export function TestimonialsSection() {
  return (
    <section className="border-t border-border py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="section-title mb-4">Loved by Agency Leaders</h2>
          <p className="section-subtitle max-w-2xl mx-auto">See how top agencies are using Bentwix OS</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map(testimonial => (
            <Card key={testimonial.id} hover>
              <div className="mb-4 text-2xl">{testimonial.avatar}</div>
              <p className="mb-6 text-sm text-muted-foreground italic">"{testimonial.content}"</p>
              <div>
                <p className="font-semibold text-sm">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">{testimonial.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
