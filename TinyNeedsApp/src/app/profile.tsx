import { Stack } from 'expo-router';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native';
import { useAuth } from '../providers/auth-provider';
import { supabase } from '../lib/supabase';

export default function Profile() {
  const { user, mounting } = useAuth();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch {}
  };

  if (mounting) return <ActivityIndicator />;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Profile' }} />
      <View style={styles.header}>
        <Image
          source={{
            uri:
              user?.avatar_url ||
              'https://i.pravatar.cc/100?img=12',
          }}
          style={styles.avatar}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.name} numberOfLines={1}>
            {user?.email || 'Parent'}
          </Text>
          <Text style={styles.subText}>Welcome to Parenting Pathways</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user?.email ?? 'N/A'}</Text>
        </View>
      </View>

      <Pressable onPress={handleSignOut} style={styles.signOutButton}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  subText: {
    color: '#6B7280',
    fontSize: 12,
    marginTop: 2,
  },
  section: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  label: {
    color: '#6B7280',
  },
  value: {
    color: '#111827',
    fontWeight: '600',
  },
  signOutButton: {
    marginTop: 'auto',
    backgroundColor: '#EF4444',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
  },
  signOutText: {
    color: '#fff',
    fontWeight: '700',
  },
});
