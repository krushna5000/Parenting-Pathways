import React, { createContext, useContext, useEffect, useState, PropsWithChildren } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useSegments } from 'expo-router';

type TermsContextType = {
  termsAccepted: boolean;
  loading: boolean;
  checkTermsAcceptance: () => Promise<void>;
};

const TermsContext = createContext<TermsContextType>({
  termsAccepted: false,
  loading: true,
  checkTermsAcceptance: async () => {},
});

export const useTerms = () => useContext(TermsContext);

export default function TermsProvider({ children }: PropsWithChildren) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  const checkTermsAcceptance = async () => {
    try {
      const privacyAccepted = await AsyncStorage.getItem('privacy_accepted');
      const termsAccepted = await AsyncStorage.getItem('terms_accepted');
      
      const accepted = privacyAccepted === 'true' && termsAccepted === 'true';
      setTermsAccepted(accepted);
      
      if (!accepted) {
        // Check if we're not already on the terms acceptance screen
        const currentPath = segments.join('/');
        if (currentPath !== 'terms-acceptance' && currentPath !== 'privacy-policy' && currentPath !== 'terms-conditions') {
          router.replace('/terms-acceptance');
        }
      }
    } catch (error) {
      console.error('Error checking terms acceptance:', error);
      // If there's an error, assume terms haven't been accepted
      setTermsAccepted(false);
      router.replace('/terms-acceptance');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkTermsAcceptance();
  }, []);

  return (
    <TermsContext.Provider value={{ termsAccepted, loading, checkTermsAcceptance }}>
      {children}
    </TermsContext.Provider>
  );
} 