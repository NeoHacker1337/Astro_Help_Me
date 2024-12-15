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
  Alert,
  ActivityIndicator, // Import ActivityIndicator for loader
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Dimensions } from 'react-native';
import { BASE_URL } from '../config'; // Correct relative path

const screenWidth = Dimensions.get('window').width;

const LoginScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const validatePhone = (phone) => {
    const re = /^\d{10}$/;
    return re.test(phone);
  };

  const handleSignup = async () => {
    if (!validatePhone(phone)) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}register/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        const { user_id, otp } = data.data;  // Destructure the user_id from the response

        if (user_id) {
          // Pass both phone and user_id to the EnterOTPScreen
          navigation.navigate('EnterOTP', { phone, user_id });
        } else {
          Alert.alert('Error', 'User ID is missing in the response.');
        }
      } else {
        Alert.alert('Error', data.message || 'Failed to send OTP!');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error during signup:', error);
      Alert.alert('Error', error.message || 'Something went wrong');
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
          <Text style={styles.appName}>Astro Help Me</Text>

          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.image}
          />

          <TextInput
            style={styles.input}
            placeholder="Phone"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            placeholderTextColor="#eee"
          />

          {/* Signup Button with Loader */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleSignup}
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              <Text style={styles.buttonText}>Sign Up</Text>
            )}
          </TouchableOpacity>

          <View style={styles.linkContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.linkText}>Already have an account? Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default LoginScreen;

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
    width: screenWidth * 0.7,
    height: screenWidth * 0.7,
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
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
  },
  linkText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});
