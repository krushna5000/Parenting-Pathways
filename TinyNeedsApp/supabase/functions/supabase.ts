import { createClient } from 'jsr:@supabase/supabase-js@2';
import Stripe from 'https://esm.sh/stripe@12.12.0?target=deno'; // Deno-compatible Stripe SDK

const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY')!;
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? Deno.env.get('EXPO_PUBLIC_SUPABASE_URL')!;
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY') ?? Deno.env.get('EXPO_PUBLIC_SUPABASE_ANON_KEY')!;

export const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
  httpClient: Stripe.createFetchHttpClient(),
});

export const getOrCreateStripeCustomerForSupabaseUser = async (
  req: Request
) => {
  const authHeader = req.headers.get('Authorization')!;
  const supabaseClient = createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
      global: {
        headers: {
          Authorization: authHeader,
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  console.log(user);
  if (!user) {
    throw new Error('User not found');
  }

  const { data, error } = await supabaseClient
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) throw new Error(`Error fetching user: ${error.message}`);

  if (data.stripe_customer_id) {
    return data.stripe_customer_id;
  }

  const customer = await stripe.customers.create({
    email: user.email,
    metadata: {
      supabase_user_id: user.id,
    },
  });

  await supabaseClient
    .from('users')
    .update({ stripe_customer_id: customer.id })
    .eq('id', user.id);

  return customer.id;
};
export { getOrCreateStripeCustomerForSupabaseUser as getOrCreateStripeCustonerForSupabaseUser };
