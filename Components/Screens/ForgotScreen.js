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

const screenWidth = Dimensions.get('window').width;

const ForgotScreen = ({ navigation }) => {
  const [email, setEmail] = useState(''); // State for email input

  const handleForgotPassword = () => {
    // You can add logic here to send a password reset request
    alert('Password reset link sent to: ' + email);
    // Optionally, navigate back to the login screen after the action
    navigation.navigate('Login');
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

          {/* Email or Phone Input */}
          <TextInput
            style={styles.input}
            placeholder="Enter your email or phone number"
            keyboardType="email-address"
            placeholderTextColor="#eee"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          {/* Reset Link Button */}
          <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
            <Text style={styles.buttonText}>Send Reset Link</Text>
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
});
