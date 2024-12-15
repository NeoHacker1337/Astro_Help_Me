import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Dimensions } from 'react-native';
import { BASE_URL } from '../config'; // Correct relative path


const screenWidth = Dimensions.get('window').width;

const ForgotScreen = ({ navigation }) => {
  const [phone, setPhone] = useState(''); // State for phone input
  const [loading, setLoading] = useState(false); // To track loading state
  const [errorMessage, setErrorMessage] = useState(''); // For error message

  const handleForgotPassword = async () => {
    setLoading(true);
    setErrorMessage(''); // Reset error message

    try {
      // Send a POST request to the API
      const response = await fetch(`${BASE_URL}forgot-password`, {
        method: 'POST', // Ensure it's a POST request
        headers: {
          'Content-Type': 'application/json', // Set Content-Type for JSON request
        },
        body: JSON.stringify({ phone }), // Send phone number in request body
      });

      const responseData = await response.json(); // Parse the response to JSON

      if (response.ok) {
        if (responseData.status === 'success') {
          alert('OTP sent successfully. Please check your phone for the OTP.');
          // Navigate to OTP screen or any other screen
          navigation.navigate('EnterOTP', { phone: phone });
        } else {
          setErrorMessage(responseData.message || 'Something went wrong. Please try again.');
        }
      } else {
        setErrorMessage(responseData.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <LinearGradient
      colors={['#8015cf', '#f58802']}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {/* App Name */}
          <Text style={styles.appName}>Astro Help Me</Text>

          {/* Logo */}
          <Image
            source={require('../../assets/images/logo.png')} // Correct relative path
            style={styles.image}
          />

          {/* Phone Input */}
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            placeholderTextColor="#eee"
            value={phone}
            onChangeText={(text) => setPhone(text)}
          />

          {/* Error Message */}
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}

          {/* Reset Link Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleForgotPassword}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </Text>
          </TouchableOpacity>

          {/* Back to Login Link */}
          <View style={styles.linkContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.linkText}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default ForgotScreen;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  image: {
    width: screenWidth * 0.5,
    height: screenWidth * 0.5,
    borderRadius: screenWidth * 0.01,
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 15,
  },
  linkText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
});
