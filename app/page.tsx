import { LandingHeader } from '@/components/landing/Header';
import { HeroSection } from '@/components/landing/Hero';
import { FeaturesSection } from '@/components/landing/Features';
import { HowItWorksSection } from '@/components/landing/HowItWorks';
import { TestimonialsSection } from '@/components/landing/Testimonials';
import { PricingSection } from '@/components/landing/Pricing';
import { CTASection } from '@/components/landing/CTA';
import { FooterSection } from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <LandingHeader />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
      </main>
      <FooterSection />
    </div>
  );
}
