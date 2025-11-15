  // Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.import Stripe from "npm:stripe@12.12.0";
import { getOrCreateStripeCustomerForSupabaseUser } from '../supabase';


const STRIPE_PUBLISHABLE_KEY = Deno.env.get('STRIPE_PUBLISHABLE_KEY');
const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY');




export const stripe = Stripe(STRIPE_SECRET_KEY!, {
  
  httpClient: Stripe.createFetchHttpClient(),
});
Deno.serve(async (req: Request) => {
  try {
    const body = await req.json();
    console.log("Received body:", body);
    console.log("Stripe Secret Key:", STRIPE_SECRET_KEY, !!STRIPE_SECRET_KEY);

    const { totalAmount } = body;
    if (!totalAmount) throw new Error("Missing totalAmount");

    // const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    const stripeKey = STRIPE_SECRET_KEY;

    console.log("Stripe Key Present:", !!stripeKey);

    const customer = await getOrCreateStripeCustomerForSupabaseUser(req);
eStripeCustonerForSupabaseUser(req);
    console.log("Customer:", customer);

    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer },
      { apiVersion: '2020-08-27' }
    );
    console.log("Ephemeral Key created");

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: 'usd',
      customer,
    });
    console.log("PaymentIntent created");

    const response = {
      paymentIntent: paymentIntent.client_secret,
      // publicKey: Deno.env.get('STRIPE_PUBLISHABLE_KEY'),
      publicKey: STRIPE_PUBLISHABLE_KEY,
      ephemeralKey: ephemeralKey.secret,
      customer,
    };

    return new Response(JSON.stringify(response), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    let message = 'Unknown error';
    if (err instanceof Error) message = err.message;
    console.error("Function Error:", err);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/stripe-checkout' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"totalAmount":"4000"}'

*/
