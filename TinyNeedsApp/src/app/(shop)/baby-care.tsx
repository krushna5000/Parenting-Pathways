import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function BabyCare() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Baby Care Guide</Text>
      <Text style={styles.subtitle}>Simple, trusted tips for everyday care</Text>

      <View style={styles.quickActions}>
        <Link href='/(shop)/baby-care-age-guides' asChild>
          <Pressable style={styles.quickAction}>
            <Text style={styles.quickActionText}>Age Guides</Text>
          </Pressable>
        </Link>
        <Link href='/(shop)/baby-care-vaccinations' asChild>
          <Pressable style={styles.quickAction}>
            <Text style={styles.quickActionText}>Vaccinations</Text>
          </Pressable>
        </Link>
        <Link href='/(shop)/baby-care-growth' asChild>
          <Pressable style={styles.quickAction}>
            <Text style={styles.quickActionText}>Growth</Text>
          </Pressable>
        </Link>
        <Link href='/(shop)/baby-care-checklists' asChild>
          <Pressable style={styles.quickAction}>
            <Text style={styles.quickActionText}>Checklists</Text>
          </Pressable>
        </Link>
        <Link href='/(shop)/baby-care-learning' asChild>
          <Pressable style={styles.quickAction}>
            <Text style={styles.quickActionText}>Learning</Text>
          </Pressable>
        </Link>
      </View>

      <Section title="Newborn Basics">
        <Bullet>Wash hands before touching your baby.</Bullet>
        <Bullet>Support head and neck when lifting.</Bullet>
        <Bullet>Keep the umbilical stump clean and dry until it falls off.</Bullet>
      </Section>

      <Section title="Feeding">
        <Bullet>Feed on demand: 8–12 times/day for newborns.</Bullet>
        <Bullet>Watch hunger cues: rooting, sucking, hands to mouth.</Bullet>
        <Bullet>Burp after feeds to reduce gas.</Bullet>
        <Bullet>For formula, follow instructions exactly; use safe water.</Bullet>
      </Section>

      <Section title="Sleep">
        <Bullet>Always place baby on their back to sleep.</Bullet>
        <Bullet>Use a firm mattress with a fitted sheet only.</Bullet>
        <Bullet>No pillows, blankets, toys, or bumpers in the crib.</Bullet>
        <Bullet>Room-share without bed-sharing for the first 6 months.</Bullet>
      </Section>

      <Section title="Diapering">
        <Bullet>Change diapers frequently to prevent rashes.</Bullet>
        <Bullet>Clean front to back; pat dry before applying cream.</Bullet>
        <Bullet>Leave skin open to air for a few minutes when possible.</Bullet>
      </Section>

      <Section title="Bathing">
        <Bullet>2–3 sponge baths/week until cord falls off.</Bullet>
        <Bullet>Use lukewarm water and mild, fragrance-free soap.</Bullet>
        <Bullet>Never leave baby unattended around water.</Bullet>
      </Section>

      <Section title="Health & Safety">
        <Bullet>Keep room temperature comfortable (around 20–22°C).</Bullet>
        <Bullet>Dress baby in one more layer than you wear.</Bullet>
        <Bullet>Use a properly installed, rear-facing car seat.</Bullet>
        <Bullet>Smoke-free environment is essential.</Bullet>
      </Section>

      <Section title="Development & Play">
        <Bullet>Short, supervised tummy time daily to build strength.</Bullet>
        <Bullet>Talk, sing, and make eye contact to support bonding.</Bullet>
        <Bullet>Follow baby’s cues and avoid overstimulation.</Bullet>
      </Section>

      <Section title="When to Call the Doctor">
        <Bullet>Fever ≥ 38°C (100.4°F) if under 3 months old.</Bullet>
        <Bullet>Poor feeding, less than 6 wet diapers/day after day 5.</Bullet>
        <Bullet>Breathing trouble, blue lips/skin, or unusual lethargy.</Bullet>
        <Bullet>Persistent vomiting, diarrhea, or signs of dehydration.</Bullet>
      </Section>

      <Section title="Emergency">
        <Bullet>Call local emergency number for breathing issues, seizures, or unresponsiveness.</Bullet>
        <Bullet>If choking and unresponsive, begin CPR and call emergency services.</Bullet>
      </Section>

      <View style={styles.footer}>
        <Text style={styles.footerText}>This guide is educational and not a substitute for medical advice. Always follow your pediatrician’s recommendations.</Text>
      </View>
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
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 12,
  },
  quickAction: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  quickActionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#6B7280',
  },
  section: {
    marginTop: 20,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  bullets: {
    gap: 8,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 4,
  },
  bulletIcon: {
    width: 18,
    fontSize: 18,
    lineHeight: 22,
    color: '#10B981',
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: '#374151',
  },
  footer: {
    marginTop: 24,
    paddingHorizontal: 4,
  },
  footerText: {
    fontSize: 12,
    color: '#6B7280',
  },
});
