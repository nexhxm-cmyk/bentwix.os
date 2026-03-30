'use client';

import { Card, CardDescription, CardTitle } from '@/components/Card';
import { ADD_ONS, FEATURES } from '@/data/landing';

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

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Optional Add-On Services</h3>
          <p className="text-muted max-w-xl mx-auto">
            Boost your agency roadmap with optional expert services for design, AI, development, and media buying.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {ADD_ONS.map(addOn => (
            <Card key={addOn.id} hover>
              <div className="mb-4 text-4xl">{addOn.icon}</div>
              <CardTitle className="mb-2">{addOn.title}</CardTitle>
              <CardDescription>{addOn.description}</CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
