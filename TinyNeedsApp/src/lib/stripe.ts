// 1 setup payment sheet
// 2 Open stripe checkout form

import {
  initPaymentSheet,
  presentPaymentSheet,
} from '@stripe/stripe-react-native';
import { supabase } from './supabase';
import { CollectionMode } from '@stripe/stripe-react-native/lib/typescript/src/types/PaymentSheet';

const fetchStripekeys = async (totalAmount: number) => {
  console.log("Hello12",totalAmount)
  const { data, error } = await supabase.functions.invoke('stripe-checkout', {
    body: {
      totalAmount,
    },
  });
  console.log("Data: ",data, error)

  if (error) throw new Error(error.message);

  return data;
};

export const setupStripePaymentSheet = async (totalAmount: number) => {
  // Fetch paymentIntent and publishable key from server
  console.log("Hello",totalAmount)
  const { paymentIntent, publicKey, ephemeralKey, customer } =
    await fetchStripekeys(totalAmount);

  console.log("Hello1",paymentIntent, publicKey, ephemeralKey, customer);

  if (!paymentIntent || !publicKey) {
    throw new Error('Failed to fetch Stripe keys');
  }

  await initPaymentSheet({
    merchantDisplayName: 'Codewithlari',
    paymentIntentClientSecret: paymentIntent,
    customerId: customer,
    customerEphemeralKeySecret: ephemeralKey,
    billingDetailsCollectionConfiguration: {
      name: 'always' as CollectionMode,
      phone: 'always' as CollectionMode,
    },
  });
};

export const openStripeCheckout = async () => {
  const { error } = await presentPaymentSheet();

  if (error) {
    
    throw new Error(error.message);
  }

  return true;
};
