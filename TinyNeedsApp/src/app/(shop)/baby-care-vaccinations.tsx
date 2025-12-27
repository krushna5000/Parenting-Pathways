import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Stack } from 'expo-router';

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function fmt(d: Date) {
  return d.toISOString().slice(0, 10);
}

export default function VaccinationSchedule() {
  const [dob, setDob] = useState(''); // yyyy-mm-dd

  const schedule = useMemo(() => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) return [] as { name: string; due: string }[];
    const base = new Date(dob + 'T00:00:00');
    // Example baseline schedule (simplified). You can adjust per local guidelines.
    const items = [
      { name: 'At Birth: BCG, HepB-1, OPV-0', due: fmt(addDays(base, 0)) },
      { name: '6 Weeks: DTP-1, IPV-1, Hib-1, HepB-2, Rotavirus-1', due: fmt(addDays(base, 42)) },
      { name: '10 Weeks: DTP-2, IPV-2, Hib-2, Rotavirus-2', due: fmt(addDays(base, 70)) },
      { name: '14 Weeks: DTP-3, IPV-3, Hib-3', due: fmt(addDays(base, 98)) },
      { name: '6 Months: HepB-3 (if schedule requires)', due: fmt(addDays(base, 183)) },
      { name: '9 Months: Measles/MMR-1', due: fmt(addDays(base, 274)) },
      { name: '12 Months: MMR-2, Varicella-1', due: fmt(addDays(base, 365)) },
    ];
    return items;
  }, [dob]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: 'Vaccination Schedule' }} />

      <Text style={styles.title}>Vaccination Schedule</Text>
      <Text style={styles.subtitle}>Auto-calculated based on your baby’s Date of Birth</Text>

      <View style={styles.inputRow}>
        <Text style={styles.label}>Date of Birth (yyyy-mm-dd)</Text>
        <TextInput
          placeholder="e.g., 2025-01-15"
          value={dob}
          onChangeText={setDob}
          style={styles.input}
          keyboardType="numbers-and-punctuation"
        />
      </View>

      {schedule.length === 0 ? (
        <Text style={styles.help}>Enter a valid DOB to see the schedule.</Text>
      ) : (
        <View style={styles.list}>
          {schedule.map(item => (
            <View key={item.name} style={styles.card}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardDue}>Due: {item.due}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Reminders and downloads will be added here. Always follow your pediatrician’s local immunization guidance.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16, paddingBottom: 32 },
  title: { fontSize: 22, fontWeight: '700', color: '#111827' },
  subtitle: { marginTop: 4, fontSize: 14, color: '#6B7280' },
  inputRow: { marginTop: 16 },
  label: { fontSize: 14, color: '#374151', marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, padding: 10, fontSize: 16 },
  help: { marginTop: 10, color: '#6B7280' },
  list: { marginTop: 16, gap: 12 },
  card: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 12, backgroundColor: '#F9FAFB' },
  cardTitle: { fontWeight: '700', color: '#111827' },
  cardDue: { marginTop: 4, color: '#374151' },
  footer: { marginTop: 20 },
  footerText: { fontSize: 12, color: '#6B7280' },
});
