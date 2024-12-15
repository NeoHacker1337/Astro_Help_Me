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
import { BASE_URL } from '../config';  // Correct relative path

// Define screen width for responsive design
const screenWidth = Dimensions.get('window').width;

const LoginScreen = ({ navigation }) => {
  // State variables to manage input fields and loading state
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  // Phone number validation regex
  const validatePhone = (phone) => {
    const re = /^\d{10}$/;
    return re.test(phone);
  };

  // Handle login
  const handleLogin = async () => {
    // Check if the fields are empty
    if (!phone || !password) {
      Alert.alert('Error', 'Both fields are required.');
      return;
    }

    // Validate phone number
    if (!validatePhone(phone)) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number.');
      return;
    }

    // Show loader
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone,
          password,
        }),
      });

      const data = await response.json();

      // Hide loader
      setLoading(false);

      if (response.ok) {
        Alert.alert('Success', 'Login successful!');
        navigation.navigate('Main', { screen: 'Home' });
      } else {
        Alert.alert('Error', data.message || 'Login failed!');
      }
    } catch (error) {
      // Hide loader on error
      setLoading(false);
      console.error('Error during login:', error);
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
            placeholder="Phone"
            keyboardType="phone-pad"
            maxLength={10}
            value={phone}
            onChangeText={setPhone}
            placeholderTextColor="#eee"
          />

          {/* Password Input */}
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#eee"
          />

          {/* Login Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <ActivityIndicator size="small" color="#000" /> // Show loader when loading
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>

          {/* Forgot Password and Sign Up Links */}
          <View style={styles.linkContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
              <Text style={styles.linkText}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.linkText}>Sign Up</Text>
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
