import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Stack } from 'expo-router';

export default function GrowthTracker() {
  const [height, setHeight] = useState(''); // cm
  const [weight, setWeight] = useState(''); // kg
  const [head, setHead] = useState(''); // cm

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: 'Growth Tracker' }} />

      <Text style={styles.title}>Growth Tracker</Text>
      <Text style={styles.subtitle}>Enter measurements and track progress over time</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Height (cm)</Text>
        <TextInput value={height} onChangeText={setHeight} style={styles.input} keyboardType="numeric" />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Weight (kg)</Text>
        <TextInput value={weight} onChangeText={setWeight} style={styles.input} keyboardType="numeric" />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Head circumference (cm)</Text>
        <TextInput value={head} onChangeText={setHead} style={styles.input} keyboardType="numeric" />
      </View>

      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>Charts will appear here (WHO percentiles)</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16, paddingBottom: 32 },
  title: { fontSize: 22, fontWeight: '700', color: '#111827' },
  subtitle: { marginTop: 4, fontSize: 14, color: '#6B7280' },
  row: { marginTop: 12 },
  label: { fontSize: 14, color: '#374151', marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, padding: 10, fontSize: 16 },
  placeholder: { marginTop: 16, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 24, alignItems: 'center' },
  placeholderText: { color: '#6B7280' },
});
