import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Redirect, Stack, useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';
import { Toast } from 'react-native-toast-notifications';
import { useAuth } from '../providers/auth-provider';
import { Ionicons } from '@expo/vector-icons';

const authSchema = zod.object({
  email: zod.string().email({ message: 'Invalid email address' }),
  password: zod
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
  acceptTerms: zod.boolean().refine((val) => val === true, {
    message: 'You must accept the Terms & Conditions to create an account',
  }),
});

export default function Auth() {
  const { session } = useAuth();
  const router = useRouter();

  const { control, handleSubmit, formState, watch, getValues } = useForm({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
      acceptTerms: false,
    },
  });

  const acceptTerms = watch('acceptTerms');

  // Move session check after all hooks are declared
  if (session) return <Redirect href='/' />;

  const signIn = async (data: zod.infer<typeof authSchema>) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      alert(error.message);
    } else {
      Toast.show('Logged in successfully', {
        type: 'success',
        placement: 'top',
        duration: 1500,
      });
    }
  };

  const signUp = async (data: zod.infer<typeof authSchema>) => {
    if (!data.acceptTerms) {
      alert('You must accept the Terms & Conditions to create an account');
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (error) {
      alert(error.message);
    } else {
      Toast.show('Signed up successfully', {
        type: 'success',
        placement: 'top',
        duration: 1500,
      });
    }
  };

  const handleForgotPassword = async () => {
    const email = getValues('email');
    
    if (!email) {
      Alert.alert(
        'Email Required',
        'Please enter your email address first, then try again.',
        [{ text: 'OK' }]
      );
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'helloparents://reset-password',
      });

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert(
          'Password Reset Email Sent',
          'Please check your email for password reset instructions.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to send password reset email. Please try again.');
    }
  };

  const handleTermsPress = () => {
    router.push('/terms-conditions');
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://images.pexels.com/photos/3030090/pexels-photo-3030090.jpeg?cs=srgb&dl=pexels-caleboquendo-3030090.jpg&fm=jpg',
      }}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>Please Authenticate to continue</Text>

          <Controller
            control={control}
            name='email'
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              <>
                <TextInput
                  placeholder='Email'
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholderTextColor='#aaa'
                  autoCapitalize='none'
                  editable={!formState.isSubmitting}
                />
                {error && <Text style={styles.error}>{error.message}</Text>}
              </>
            )}
          />

          <Controller
            control={control}
            name='password'
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              <>
                <TextInput
                  placeholder='Password'
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry
                  placeholderTextColor='#aaa'
                  autoCapitalize='none'
                  editable={!formState.isSubmitting}
                />
                {error && <Text style={styles.error}>{error.message}</Text>}
              </>
            )}
          />

          {/* Forgot Password Link */}
          <TouchableOpacity
            style={styles.forgotPasswordContainer}
            onPress={handleForgotPassword}
            disabled={formState.isSubmitting}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Terms and Conditions Checkbox */}
          <Controller
            control={control}
            name='acceptTerms'
            render={({
              field: { value, onChange },
              fieldState: { error },
            }) => (
              <View style={styles.termsContainer}>
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => onChange(!value)}
                  disabled={formState.isSubmitting}
                >
                  <View style={[styles.checkbox, value && styles.checkboxChecked]}>
                    {value && (
                      <Ionicons name="checkmark" size={16} color="#fff" />
                    )}
                  </View>
                  <View style={styles.termsTextContainer}>
                    <Text style={styles.termsText}>
                      I accept the{' '}
                      <Text style={styles.termsLink} onPress={handleTermsPress}>
                        Terms & Conditions
                      </Text>
                    </Text>
                  </View>
                </TouchableOpacity>
                {error && <Text style={styles.error}>{error.message}</Text>}
              </View>
            )}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(signIn)}
            disabled={formState.isSubmitting}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button, 
              styles.signUpButton,
              !acceptTerms && styles.signUpButtonDisabled
            ]}
            onPress={handleSubmit(signUp)}
            disabled={formState.isSubmitting || !acceptTerms}
          >
            <Text style={[
              styles.buttonText,
              !acceptTerms && styles.signUpButtonTextDisabled
            ]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    width: '100%',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#ddd',
    marginBottom: 32,
  },
  input: {
    width: '90%',
    padding: 12,
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#6a1b9a',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: '90%',
    alignItems: 'center',
  },
  signUpButton: {
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
  },
  signUpButtonDisabled: {
    borderColor: '#666',
    opacity: 0.5,
  },
  signUpButtonTextDisabled: {
    color: '#666',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 16,
    textAlign: 'left',
    width: '90%',
  },
  forgotPasswordContainer: {
    width: '90%',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  forgotPasswordText: {
    color: '#1BC464',
    fontSize: 14,
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  termsContainer: {
    width: '90%',
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 4,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#1BC464',
    borderColor: '#1BC464',
  },
  termsTextContainer: {
    flex: 1,
  },
  termsText: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
  },
  termsLink: {
    color: '#1BC464',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});
