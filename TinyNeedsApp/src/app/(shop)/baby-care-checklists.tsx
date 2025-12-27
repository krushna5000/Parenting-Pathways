import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Stack } from 'expo-router';

function useChecklist(initial: string[]) {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const toggle = (item: string) => setDone(prev => ({ ...prev, [item]: !prev[item] }));
  return { done, toggle };
}

function Item({ label, checked, onPress }: { label: string; checked: boolean; onPress: () => void }) {
  return (
    <Text onPress={onPress} style={[styles.item, checked && styles.itemDone]}>
      {checked ? '✔ ' : '○ '}
      {label}
    </Text>
  );
}

export default function Checklists() {
  const daily = ['Wash hands before handling', 'Feed on demand', 'Burp after feeds', 'Back to sleep', 'Tummy time'];
  const hospital = ['ID cards and insurance', 'Maternity clothes', 'Baby outfit and blanket', 'Diapers and wipes'];
  const postpartum = ['Rest and hydration', 'Perineal care', 'Follow-up appointment', 'Mental health check'];
  const solids = ['Sit upright', 'Single-ingredient foods', 'Allergy watch', 'Water in small sips'];

  const dailyC = useChecklist(daily);
  const hospitalC = useChecklist(hospital);
  const postpartumC = useChecklist(postpartum);
  const solidsC = useChecklist(solids);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: 'Checklists' }} />

      <Text style={styles.title}>Checklists</Text>
      <Text style={styles.subtitle}>Tap to mark an item done</Text>

      <Section title="Daily Care">
        {daily.map(i => (
          <Item key={i} label={i} checked={!!dailyC.done[i]} onPress={() => dailyC.toggle(i)} />
        ))}
      </Section>
      <Section title="Hospital Bag">
        {hospital.map(i => (
          <Item key={i} label={i} checked={!!hospitalC.done[i]} onPress={() => hospitalC.toggle(i)} />
        ))}
      </Section>
      <Section title="Postpartum">
        {postpartum.map(i => (
          <Item key={i} label={i} checked={!!postpartumC.done[i]} onPress={() => postpartumC.toggle(i)} />
        ))}
      </Section>
      <Section title="Introducing Solids">
        {solids.map(i => (
          <Item key={i} label={i} checked={!!solidsC.done[i]} onPress={() => solidsC.toggle(i)} />
        ))}
      </Section>
    </ScrollView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={{ gap: 8 }}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16, paddingBottom: 32 },
  title: { fontSize: 22, fontWeight: '700', color: '#111827' },
  subtitle: { marginTop: 4, fontSize: 14, color: '#6B7280' },
  section: { marginTop: 20, backgroundColor: '#F9FAFB', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 8 },
  item: { fontSize: 14, color: '#374151' },
  itemDone: { textDecorationLine: 'line-through', color: '#10B981' },
});
