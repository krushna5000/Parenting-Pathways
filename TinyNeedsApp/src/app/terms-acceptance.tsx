import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TermsAcceptance() {
  const router = useRouter();
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleAccept = async () => {
    if (!privacyAccepted || !termsAccepted) {
      Alert.alert(
        'Acceptance Required',
        'Please accept both the Privacy Policy and Terms & Conditions to continue.',
        [{ text: 'OK' }]
      );
      return;
    }

    try {
      await AsyncStorage.setItem('terms_accepted', 'true');
      await AsyncStorage.setItem('privacy_accepted', 'true');
      await AsyncStorage.setItem('terms_accepted_date', new Date().toISOString());
      
      // Navigate to the main app
      router.replace('/(shop)');
    } catch (error) {
      console.error('Error saving terms acceptance:', error);
      Alert.alert('Error', 'Failed to save acceptance. Please try again.');
    }
  };

  const handlePrivacyPolicy = () => {
    router.push('/privacy-policy');
  };

  const handleTermsConditions = () => {
    router.push('/terms-conditions');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Welcome to Hello Parents',
          headerShown: false,
        }}
      />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Ionicons name="heart" size={60} color="#1BC464" />
            <Text style={styles.title}>Welcome to Hello Parents</Text>
            <Text style={styles.subtitle}>
              Your trusted partner for baby care and parenting essentials
            </Text>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>Before you start shopping...</Text>
            <Text style={styles.infoText}>
              We want to ensure you have a safe and secure experience. Please review and accept our terms to continue.
            </Text>
          </View>

          <View style={styles.checkboxSection}>
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setPrivacyAccepted(!privacyAccepted)}
            >
              <View style={[styles.checkbox, privacyAccepted && styles.checkboxChecked]}>
                {privacyAccepted && <Ionicons name="checkmark" size={16} color="white" />}
              </View>
              <View style={styles.checkboxText}>
                <Text style={styles.checkboxTitle}>
                  I have read and agree to the{' '}
                  <Text style={styles.link} onPress={handlePrivacyPolicy}>
                    Privacy Policy
                  </Text>
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setTermsAccepted(!termsAccepted)}
            >
              <View style={[styles.checkbox, termsAccepted && styles.checkboxChecked]}>
                {termsAccepted && <Ionicons name="checkmark" size={16} color="white" />}
              </View>
              <View style={styles.checkboxText}>
                <Text style={styles.checkboxTitle}>
                  I have read and agree to the{' '}
                  <Text style={styles.link} onPress={handleTermsConditions}>
                    Terms & Conditions
                  </Text>
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonSection}>
            <TouchableOpacity
              style={[
                styles.acceptButton,
                (!privacyAccepted || !termsAccepted) && styles.acceptButtonDisabled
              ]}
              onPress={handleAccept}
              disabled={!privacyAccepted || !termsAccepted}
            >
              <Text style={styles.acceptButtonText}>Continue to App</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              By continuing, you acknowledge that you have read, understood, and agree to our Privacy Policy and Terms & Conditions.
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
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1BC464',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  infoSection: {
    marginBottom: 30,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },
  checkboxSection: {
    marginBottom: 40,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 4,
    marginRight: 12,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#1BC464',
    borderColor: '#1BC464',
  },
  checkboxText: {
    flex: 1,
  },
  checkboxTitle: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  link: {
    color: '#1BC464',
    textDecorationLine: 'underline',
  },
  buttonSection: {
    marginBottom: 30,
  },
  acceptButton: {
    backgroundColor: '#1BC464',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
  },
  acceptButtonDisabled: {
    backgroundColor: '#ccc',
  },
  acceptButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  footerText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    lineHeight: 18,
  },
}); 