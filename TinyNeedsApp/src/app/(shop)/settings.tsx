import { Link, Stack } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useAuth } from '../../providers/auth-provider';
import { supabase } from '../../lib/supabase';

export default function Settings() {
  const { user, mounting } = useAuth();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    try {
      setSigningOut(true);
      await supabase.auth.signOut();
    } catch (err: any) {
      Alert.alert('Sign out failed', err?.message || 'Please try again.');
    } finally {
      setSigningOut(false);
    }
  };

  if (mounting) return <ActivityIndicator />;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Settings' }} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user?.email ?? 'N/A'}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Legal</Text>
        <Link href="/privacy-policy" asChild>
          <Pressable style={styles.linkRow}>
            <Text style={styles.linkText}>Privacy Policy</Text>
          </Pressable>
        </Link>
        <Link href="/terms-conditions" asChild>
          <Pressable style={styles.linkRow}>
            <Text style={styles.linkText}>Terms & Conditions</Text>
          </Pressable>
        </Link>
      </View>

      <Pressable
        onPress={handleSignOut}
        disabled={signingOut}
        style={({ pressed }) => [
          styles.signOutButton,
          { opacity: pressed || signingOut ? 0.6 : 1 },
        ]}
      >
        <Text style={styles.signOutText}>
          {signingOut ? 'Signing out...' : 'Sign Out'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 24,
  },
  section: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#555',
  },
  linkRow: {
    paddingVertical: 10,
  },
  linkText: {
    fontSize: 16,
    color: '#1B6EF3',
    fontWeight: '600',
  },
  signOutButton: {
    marginTop: 'auto',
    backgroundColor: '#ff3b30',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  signOutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
