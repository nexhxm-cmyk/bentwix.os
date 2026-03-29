'use client';

import { Card, CardDescription, CardTitle } from '@/components/Card';
import { FEATURES } from '@/data/landing';

export function FeaturesSection() {
  return (
    <section id="features" className="border-t border-border py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="section-title mb-4">Powerful Features Built for Agencies</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Everything you need to manage projects, teams, finance, and clients in one platform.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(feature => (
            <Card key={feature.id} hover>
              <div className="mb-4 text-4xl">{feature.icon}</div>
              <CardTitle className="mb-2">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
