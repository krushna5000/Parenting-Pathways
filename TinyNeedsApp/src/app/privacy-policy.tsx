import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function PrivacyPolicy() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Privacy Policy',
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#1BC464" />
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>Privacy Policy</Text>
          <Text style={styles.lastUpdated}>Last updated: {new Date().toLocaleDateString()}</Text>

          <Text style={styles.sectionTitle}>1. Information We Collect</Text>
          <Text style={styles.text}>
            We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.
          </Text>
          
          <Text style={styles.subsectionTitle}>Personal Information:</Text>
          <Text style={styles.text}>
            • Email address{'\n'}
            • Phone number{'\n'}
            • Full name{'\n'}
            • Shipping address{'\n'}
            • Payment information (processed securely through Stripe){'\n'}
            • Device information and push notification tokens
          </Text>

          <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
          <Text style={styles.text}>
            We use the information we collect to:{'\n'}
            • Process your orders and payments{'\n'}
            • Send order confirmations and updates{'\n'}
            • Provide customer support{'\n'}
            • Send push notifications about orders and promotions{'\n'}
            • Improve our services and user experience{'\n'}
            • Comply with legal obligations
          </Text>

          <Text style={styles.sectionTitle}>3. Information Sharing</Text>
          <Text style={styles.text}>
            We do not sell, trade, or otherwise transfer your personal information to third parties except:{'\n'}
            • Payment processors (Stripe) for secure payment processing{'\n'}
            • Shipping partners to fulfill your orders{'\n'}
            • When required by law or to protect our rights
          </Text>

          <Text style={styles.sectionTitle}>4. Data Security</Text>
          <Text style={styles.text}>
            We implement appropriate security measures to protect your personal information, including:{'\n'}
            • Encryption of sensitive data{'\n'}
            • Secure storage practices{'\n'}
            • Regular security assessments{'\n'}
            • Limited access to personal information
          </Text>

          <Text style={styles.sectionTitle}>5. Data Retention</Text>
          <Text style={styles.text}>
            We retain your personal information for as long as necessary to provide our services and comply with legal obligations. You may request deletion of your account and associated data at any time.
          </Text>

          <Text style={styles.sectionTitle}>6. Your Rights</Text>
          <Text style={styles.text}>
            You have the right to:{'\n'}
            • Access your personal information{'\n'}
            • Correct inaccurate information{'\n'}
            • Request deletion of your data{'\n'}
            • Opt-out of marketing communications{'\n'}
            • Control push notification preferences
          </Text>

          <Text style={styles.sectionTitle}>7. Children's Privacy</Text>
          <Text style={styles.text}>
            Our app is designed for parents and caregivers. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.
          </Text>

          <Text style={styles.sectionTitle}>8. Changes to This Policy</Text>
          <Text style={styles.text}>
            We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy in the app and updating the "Last updated" date.
          </Text>

          <Text style={styles.sectionTitle}>9. Contact Us</Text>
          <Text style={styles.text}>
            If you have any questions about this privacy policy or our data practices, please contact us at:{'\n'}
            Email: privacy@helloparents.com{'\n'}
            Address: [Your Business Address]{'\n'}
            Phone: [Your Contact Number]
          </Text>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              By using this app, you agree to the collection and use of information in accordance with this policy.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1BC464',
    marginBottom: 10,
    textAlign: 'center',
  },
  lastUpdated: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    marginTop: 10,
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    lineHeight: 22,
    color: '#555',
    marginBottom: 15,
  },
  footer: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  footerText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    fontStyle: 'italic',
  },
}); 