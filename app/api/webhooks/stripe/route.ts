export async function POST() {
  return new Response('Stripe webhook endpoint retired - using manual payment mode', { status: 410 });
}
