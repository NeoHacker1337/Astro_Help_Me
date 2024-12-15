import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { BASE_URL } from '../config'; // Correct relative path

const EnterOTPScreen = ({ route, navigation }) => {
    const { phone, user_id } = route.params; // Retrieve phone and user_id from route params
    const [otp, setOtp] = useState(''); // State for OTP input
    const [loading, setLoading] = useState(false); // State for loader
  
    // Function to validate OTP format (5 digits as per backend)
    const validateOtp = (otp) => {
      const re = /^\d{5}$/; // Updated for 5 digits
      return re.test(otp);
    };
  
    
    // Handle OTP verification
    const handleVerifyOtp = async () => {
        if (!otp) {
          Alert.alert('Error', 'Please enter the OTP.');
          return;
        }
      
        setLoading(true);
      
        try {
          const response = await fetch(`${BASE_URL}register/verify-otp`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id, otp }), // Use the user_id and otp here
          });
      
          const data = await response.json();
          setLoading(false);
      
          if (response.ok) {
            // Proceed with successful OTP verification
            navigation.navigate('EnterPassword', { user_id });
          } else {
            Alert.alert('Error', data.message || 'OTP verification failed!');
          }
        } catch (error) {
          setLoading(false);
          console.error('Error during OTP verification:', error);
          Alert.alert('Error', error.message || 'Something went wrong');
        }
      };
      
  
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Enter OTP sent to {phone}</Text>
  
        {/* OTP Input Field */}
        <TextInput
          style={styles.input}
          placeholder="Enter 5-digit OTP"
          keyboardType="number-pad"
          maxLength={5}
          value={otp}
          onChangeText={setOtp}
          placeholderTextColor="#aaa"
        />
  
        {/* Verify Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleVerifyOtp}
          disabled={loading} // Disable button when loading
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Verify OTP</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };
  
export default EnterOTPScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#f5f5f5',
    },
    text: {
        fontSize: 18,
        color: '#333',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
        color: '#333',
        fontSize: 16,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#8015cf',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
