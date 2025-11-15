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

export default function TermsConditions() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Terms & Conditions',
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
          <Text style={styles.title}>Terms & Conditions</Text>
          <Text style={styles.lastUpdated}>Last updated: {new Date().toLocaleDateString()}</Text>

          <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
          <Text style={styles.text}>
            By downloading, installing, or using the Hello Parents mobile application ("App"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, please do not use the App.
          </Text>

          <Text style={styles.sectionTitle}>2. Description of Service</Text>
          <Text style={styles.text}>
            Hello Parents is an e-commerce platform that provides baby care and parenting products. The App allows users to browse products, place orders, and access parenting resources.
          </Text>

          <Text style={styles.sectionTitle}>3. User Accounts</Text>
          <Text style={styles.text}>
            To use certain features of the App, you must create an account. You are responsible for:{'\n'}
            • Providing accurate and complete information{'\n'}
            • Maintaining the security of your account credentials{'\n'}
            • All activities that occur under your account{'\n'}
            • Notifying us immediately of any unauthorized use
          </Text>

          <Text style={styles.sectionTitle}>4. User Responsibilities</Text>
          <Text style={styles.text}>
            You agree to:{'\n'}
            • Use the App only for lawful purposes{'\n'}
            • Provide accurate and truthful information{'\n'}
            • Respect intellectual property rights{'\n'}
            • Not attempt to gain unauthorized access to our systems{'\n'}
            • Not interfere with the App's functionality{'\n'}
            • Comply with all applicable laws and regulations
          </Text>

          <Text style={styles.sectionTitle}>5. Product Information and Orders</Text>
          <Text style={styles.text}>
            • Product descriptions and prices are subject to change{'\n'}
            • We strive for accuracy but do not guarantee product availability{'\n'}
            • Orders are subject to acceptance and availability{'\n'}
            • We reserve the right to cancel orders at our discretion{'\n'}
            • Payment is processed securely through Stripe
          </Text>

          <Text style={styles.sectionTitle}>6. Payment and Billing</Text>
          <Text style={styles.text}>
            • All prices are in the currency specified{'\n'}
            • Payment is required at the time of order{'\n'}
            • We use secure payment processing{'\n'}
            • Refunds are processed according to our refund policy{'\n'}
            • You authorize us to charge your payment method for orders
          </Text>

          <Text style={styles.sectionTitle}>7. Shipping and Delivery</Text>
          <Text style={styles.text}>
            • Delivery times are estimates only{'\n'}
            • Risk of loss transfers to you upon delivery{'\n'}
            • We are not responsible for delays beyond our control{'\n'}
            • Shipping costs are calculated at checkout{'\n'}
            • International shipping may be subject to additional fees
          </Text>

          <Text style={styles.sectionTitle}>8. Privacy and Data Protection</Text>
          <Text style={styles.text}>
            Your privacy is important to us. Please review our Privacy Policy, which is incorporated into these Terms by reference. By using the App, you consent to our collection and use of information as described in our Privacy Policy.
          </Text>

          <Text style={styles.sectionTitle}>9. Intellectual Property</Text>
          <Text style={styles.text}>
            • The App and its content are protected by copyright and other intellectual property laws{'\n'}
            • You may not copy, modify, or distribute our content without permission{'\n'}
            • User-generated content remains your property{'\n'}
            • You grant us a license to use your content for App functionality
          </Text>

          <Text style={styles.sectionTitle}>10. Disclaimers</Text>
          <Text style={styles.text}>
            THE APP IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          </Text>

          <Text style={styles.sectionTitle}>11. Limitation of Liability</Text>
          <Text style={styles.text}>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, DATA, OR USE, INCURRED BY YOU OR ANY THIRD PARTY.
          </Text>

          <Text style={styles.sectionTitle}>12. Indemnification</Text>
          <Text style={styles.text}>
            You agree to indemnify and hold harmless Hello Parents and its affiliates from any claims, damages, or expenses arising from your use of the App or violation of these Terms.
          </Text>

          <Text style={styles.sectionTitle}>13. Termination</Text>
          <Text style={styles.text}>
            We may terminate or suspend your access to the App at any time, with or without cause. You may also terminate your account at any time. Upon termination, your right to use the App ceases immediately.
          </Text>

          <Text style={styles.sectionTitle}>14. Governing Law</Text>
          <Text style={styles.text}>
            These Terms are governed by the laws of [Your Jurisdiction]. Any disputes shall be resolved in the courts of [Your Jurisdiction].
          </Text>

          <Text style={styles.sectionTitle}>15. Changes to Terms</Text>
          <Text style={styles.text}>
            We may modify these Terms at any time. We will notify you of significant changes through the App or email. Your continued use of the App after changes constitutes acceptance of the new Terms.
          </Text>

          <Text style={styles.sectionTitle}>16. Contact Information</Text>
          <Text style={styles.text}>
            For questions about these Terms, please contact us at:{'\n'}
            Email: legal@helloparents.com{'\n'}
            Address: [Your Business Address]{'\n'}
            Phone: [Your Contact Number]
          </Text>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              By using this App, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
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