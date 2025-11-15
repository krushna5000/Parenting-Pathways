import { Stack } from 'expo-router';
import { ToastProvider } from 'react-native-toast-notifications';
import AuthProvider from '../providers/auth-provider';
import QueryProvider from '../providers/query-provider';
import { StripeProvider } from '@stripe/stripe-react-native';
import NotificationProvider from '../providers/notification-provider';
import TermsProvider from '../providers/terms-provider';

export default function RootLayout() {
  return (
    <ToastProvider>
      <TermsProvider>
        <AuthProvider>
          <QueryProvider>
            <StripeProvider
              publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
            >
              <NotificationProvider>
                <Stack>
                  <Stack.Screen
                    name='(shop)'
                    options={{ headerShown: false, title: 'Shop' }}
                  />
                  <Stack.Screen
                    name='categories'
                    options={{ headerShown: false, title: 'Categories' }}
                  />
                  <Stack.Screen
                    name='product'
                    options={{ headerShown: false, title: 'Product' }}
                  />
                  <Stack.Screen
                    name='cart'
                    options={{
                      presentation: 'modal',
                      title: 'Shopping Cart',
                    }}
                  />
                  <Stack.Screen name='auth' options={{ headerShown: false }} />
                  <Stack.Screen
                    name='privacy-policy'
                    options={{
                      title: 'Privacy Policy',
                      headerShown: true,
                    }}
                  />
                  <Stack.Screen
                    name='terms-conditions'
                    options={{
                      title: 'Terms & Conditions',
                      headerShown: true,
                    }}
                  />
                  <Stack.Screen
                    name='terms-acceptance'
                    options={{
                      title: 'Welcome',
                      headerShown: false,
                    }}
                  />
                                  </Stack>
              </NotificationProvider>
            </StripeProvider>
          </QueryProvider>
        </AuthProvider>
      </TermsProvider>
    </ToastProvider>
  );
}
