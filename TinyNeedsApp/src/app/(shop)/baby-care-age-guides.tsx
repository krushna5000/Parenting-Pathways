import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Stack } from 'expo-router';

export default function BabyCareAgeGuides() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: 'Age-based Guides' }} />

      <Text style={styles.title}>Age-based Guides</Text>
      <Text style={styles.subtitle}>Tips tailored to your baby's stage</Text>

      <Section title="0–3 months (Newborn)">
        <Bullet>Skin-to-skin contact to promote bonding and regulate temperature.</Bullet>
        <Bullet>Feed on demand; expect frequent night wakings.</Bullet>
        <Bullet>Supervised tummy time 1–5 minutes, 2–3 times daily.</Bullet>
        <Bullet>Soothing: swaddle, shush, sway; keep lights low at night.</Bullet>
      </Section>

      <Section title="3–6 months">
        <Bullet>Increase tummy time to 20–30 minutes total per day.</Bullet>
        <Bullet>Introduce simple toys: rattles, soft books, mirrors.</Bullet>
        <Bullet>Begin a calming bedtime routine at a consistent time.</Bullet>
        <Bullet>Watch readiness for solids (around 6 months): good head control, interest in food.</Bullet>
      </Section>

      <Section title="6–12 months">
        <Bullet>Offer a variety of purees/soft foods; single ingredients first.</Bullet>
        <Bullet>Encourage sitting, crawling, pulling up with safe spaces.</Bullet>
        <Bullet>Read daily; point and name objects for language development.</Bullet>
        <Bullet>Maintain safe sleep: back to sleep, crib free of pillows/blankets.</Bullet>
      </Section>
    </ScrollView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.bullets}>{children}</View>
    </View>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.bulletRow}>
      <Text style={styles.bulletIcon}>•</Text>
      <Text style={styles.bulletText}>{children}</Text>
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
  bullets: { gap: 8 },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 4 },
  bulletIcon: { width: 18, fontSize: 18, lineHeight: 22, color: '#10B981' },
  bulletText: { flex: 1, fontSize: 14, lineHeight: 20, color: '#374151' },
});
