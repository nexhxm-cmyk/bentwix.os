import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

export const PRICING_PLANS = {
  starter: {
    id: 'starter',
    name: 'Starter',
    price: 99,
    stripePriceId: 'price_starter', // Replace with actual Stripe price ID
  },
  growth: {
    id: 'growth',
    name: 'Growth',
    price: 299,
    stripePriceId: 'price_growth',
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    price: 799,
    stripePriceId: 'price_pro',
  },
};
