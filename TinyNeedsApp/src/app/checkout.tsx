import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useCartStore } from '../store/cart-store';
import { createOrder, createOrderItem, getMyProfile, updateMyAddress } from '../api/api';
import { openStripeCheckout, setupStripePaymentSheet } from '../lib/stripe';
import { Tables } from '../types/database.types';

type AddressFormData = {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  district: string;
  taluka: string;
  pincode: string;
};

type ContactFormData = {
  fullName: string;
  phone: string;
  email: string;
  alternatePhone: string;
};

export default function Checkout() {
  const router = useRouter();
  const { items, getTotalPrice, resetCart } = useCartStore();
  
  const [addressForm, setAddressForm] = useState<AddressFormData>({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    district: '',
    taluka: '',
    pincode: '',
  });
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(true);

  const [contactForm, setContactForm] = useState<ContactFormData>({
    fullName: '',
    phone: '',
    email: '',
    alternatePhone: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutateAsync: createSupabaseOrder } = createOrder();
  const { mutateAsync: createSupabaseOrderItem } = createOrderItem();

  const { data: userProfile } = getMyProfile();
  const updateAddressMutation = updateMyAddress();

  // Autofill address from user profile on mount
  useEffect(() => {
    if (userProfile && userProfile.address_line1) {
      setAddressForm({
        addressLine1: userProfile.address_line1 || '',
        addressLine2: userProfile.address_line2 || '',
        city: userProfile.city || '',
        state: userProfile.state || '',
        district: userProfile.district || '',
        taluka: userProfile.taluka || '',
        pincode: userProfile.pincode || '',
      });
      setShowAddressForm(false);
    }
  }, [userProfile]);

  // Helper to map DB address to form
  const mapDbAddressToForm = (address: Tables<'addresses'>): AddressFormData => ({
    addressLine1: address.address_line1,
    addressLine2: address.address_line2 || '',
    city: address.city,
    state: address.state,
    district: address.district,
    taluka: address.taluka,
    pincode: address.pincode,
  });

  // Select a saved address for use
  const handleSelectAddress = (address: Tables<'addresses'>) => {
    setAddressForm(mapDbAddressToForm(address));
    setEditingAddressId(null);
    setShowAddressForm(false);
  };

  // Edit a saved address
  const handleEditAddress = () => {
    setShowAddressForm(true);
  };

  // Add new address
  const handleAddNewAddress = () => {
    setAddressForm({
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      district: '',
      taluka: '',
      pincode: '',
    });
    setEditingAddressId(null);
    setShowAddressForm(true);
  };

  // Handler for using the default address
  const handleUseDefaultAddress = () => {
    if (userProfile) {
      setAddressForm({
        addressLine1: userProfile.address_line1 || '',
        addressLine2: userProfile.address_line2 || '',
        city: userProfile.city || '',
        state: userProfile.state || '',
        district: userProfile.district || '',
        taluka: userProfile.taluka || '',
        pincode: userProfile.pincode || '',
      });
      setShowAddressForm(false);
    }
  };

  const updateAddressField = (field: keyof AddressFormData, value: string) => {
    setAddressForm(prev => ({ ...prev, [field]: value }));
  };

  const updateContactField = (field: keyof ContactFormData, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    const requiredAddressFields = ['addressLine1', 'city', 'state', 'district', 'taluka', 'pincode'];
    const requiredContactFields = ['fullName', 'phone', 'email'];

    for (const field of requiredAddressFields) {
      if (!addressForm[field as keyof AddressFormData]) {
        Alert.alert('Error', `Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }

    for (const field of requiredContactFields) {
      if (!contactForm[field as keyof ContactFormData]) {
        Alert.alert('Error', `Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }

    // Validate pincode (6 digits)
    if (!/^\d{6}$/.test(addressForm.pincode)) {
      Alert.alert('Error', 'Please enter a valid 6-digit pincode');
      return false;
    }

    // Validate phone number (10 digits)
    if (!/^\d{10}$/.test(contactForm.phone)) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      return false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactForm.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    const totalPrice = parseFloat(getTotalPrice());
    try {
      await setupStripePaymentSheet(Math.floor(totalPrice * 100));
      const result = await openStripeCheckout();
      if (!result) {
        Alert.alert('An error occurred while processing the payment');
        return;
      }
      await createSupabaseOrder(
        {
          totalPrice,
          shippingAddress: addressForm,
          contactDetails: contactForm,
        },
        {
          onSuccess: async (data) => {
            createSupabaseOrderItem(
              items.map(item => ({
                orderId: data.id,
                productId: item.id,
                quantity: item.quantity,
              })),
              {
                onSuccess: async () => {
                  Alert.alert(
                    'Order Placed Successfully!',
                    'Your order has been placed and will be delivered to the provided address.',
                    [
                      {
                        text: 'OK',
                        onPress: () => {
                          resetCart();
                          router.push('/(shop)');
                        },
                      },
                    ]
                  );
                },
              }
            );
          },
        }
      );
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while creating the order');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Checkout</Text>
        
        {/* Shipping Address Section (Form) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{editingAddressId ? 'Edit Address' : 'Add New Address'}</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address Line 1 *</Text>
            <TextInput
              style={styles.input}
              value={addressForm.addressLine1}
              onChangeText={(value) => updateAddressField('addressLine1', value)}
              placeholder="House/Flat number, Street name"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address Line 2 (Optional)</Text>
            <TextInput
              style={styles.input}
              value={addressForm.addressLine2}
              onChangeText={(value) => updateAddressField('addressLine2', value)}
              placeholder="Apartment, suite, etc."
            />
          </View>
          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>City *</Text>
              <TextInput
                style={styles.input}
                value={addressForm.city}
                onChangeText={(value) => updateAddressField('city', value)}
                placeholder="Enter city"
              />
            </View>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>State *</Text>
              <TextInput
                style={styles.input}
                value={addressForm.state}
                onChangeText={(value) => updateAddressField('state', value)}
                placeholder="Enter state"
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>District *</Text>
              <TextInput
                style={styles.input}
                value={addressForm.district}
                onChangeText={(value) => updateAddressField('district', value)}
                placeholder="Enter district"
              />
            </View>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>Taluka *</Text>
              <TextInput
                style={styles.input}
                value={addressForm.taluka}
                onChangeText={(value) => updateAddressField('taluka', value)}
                placeholder="Enter taluka"
              />
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Pincode *</Text>
            <TextInput
              style={styles.input}
              value={addressForm.pincode}
              onChangeText={(value) => updateAddressField('pincode', value)}
              placeholder="Enter 6-digit pincode"
              keyboardType="numeric"
              maxLength={6}
            />
          </View>
        </View>

        {/* Contact Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Details</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name *</Text>
            <TextInput
              style={styles.input}
              value={contactForm.fullName}
              onChangeText={(value) => updateContactField('fullName', value)}
              placeholder="Enter your full name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number *</Text>
            <TextInput
              style={styles.input}
              value={contactForm.phone}
              onChangeText={(value) => updateContactField('phone', value)}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={styles.input}
              value={contactForm.email}
              onChangeText={(value) => updateContactField('email', value)}
              placeholder="Enter your email address"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Alternate Phone (Optional)</Text>
            <TextInput
              style={styles.input}
              value={contactForm.alternatePhone}
              onChangeText={(value) => updateContactField('alternatePhone', value)}
              placeholder="Enter alternate phone number"
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.orderSummary}>
            <Text style={styles.summaryText}>Items: {items.length}</Text>
            <Text style={styles.summaryText}>Total: Rs {getTotalPrice()}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Place Order Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.placeOrderButton, isSubmitting && styles.disabledButton]}
          onPress={handlePlaceOrder}
          disabled={isSubmitting}
        >
          <Text style={styles.placeOrderButtonText}>
            {isSubmitting ? 'Processing...' : 'Place Order'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  orderSummary: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  placeOrderButton: {
    backgroundColor: '#28a745',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#6c757d',
  },
  placeOrderButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 