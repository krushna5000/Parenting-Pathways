import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Stack } from 'expo-router';

interface Card {
  id: string;
  title: string;
  type: 'video' | 'illustration' | 'guide';
  thumbnail?: any;
}

const DEMO: Card[] = [
  { id: 'c1', title: 'Safe Sleep Setup', type: 'illustration' },
  { id: 'c2', title: 'Burping Techniques', type: 'video' },
  { id: 'c3', title: 'Diaper Change Steps', type: 'guide' },
];

export default function Learning() {
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});
  const toggle = (id: string) => setBookmarks(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: 'Learning' }} />

      <Text style={styles.title}>Media-rich Learning</Text>
      <Text style={styles.subtitle}>Short videos, illustrations, and step-by-steps</Text>

      <View style={styles.grid}>
        {DEMO.map(card => (
          <View style={styles.card} key={card.id}>
            <View style={styles.thumb} />
            <Text style={styles.cardTitle}>{card.title}</Text>
            <Text style={styles.badge}>{card.type}</Text>
            <Pressable onPress={() => toggle(card.id)} style={styles.bookmarkBtn}>
              <Text style={styles.bookmarkText}>{bookmarks[card.id] ? 'Bookmarked' : 'Bookmark'}</Text>
            </Pressable>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Bookmarks are stored locally for now.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16, paddingBottom: 32 },
  title: { fontSize: 22, fontWeight: '700', color: '#111827' },
  subtitle: { marginTop: 4, fontSize: 14, color: '#6B7280' },
  grid: { marginTop: 16, flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  card: { width: '48%', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 12, backgroundColor: '#F9FAFB' },
  thumb: { height: 80, borderRadius: 8, backgroundColor: '#E5E7EB', marginBottom: 8 },
  cardTitle: { fontWeight: '700', color: '#111827' },
  badge: { marginTop: 4, color: '#6B7280', fontSize: 12 },
  bookmarkBtn: { marginTop: 8, paddingVertical: 6, alignItems: 'center', backgroundColor: '#1BC464', borderRadius: 8 },
  bookmarkText: { color: '#fff', fontWeight: '700' },
  footer: { marginTop: 20 },
  footerText: { fontSize: 12, color: '#6B7280' },
});
