import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { BASE_URL } from '../config'; // Correct relative path

const EnterPasswordScreen = ({ route, navigation }) => {
    const { user_id } = route.params; // Retrieve user_id from route params
    const [password, setPassword] = useState(''); // State for password input
    const [loading, setLoading] = useState(false); // State for loader

    // Function to validate password (at least 8 characters, with one letter and one number)
    const validatePassword = (password) => {
        const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return re.test(password);
    };

    // Handle password submission
    const handleSetPassword = async () => {
        // Validate password input
        if (!validatePassword(password)) {
            Alert.alert('Error', 'Password must be at least 8 characters long and contain both letters and numbers.');
            return;
        }

        // Show loader
        setLoading(true);

        try {
            const response = await fetch(`${BASE_URL}register/set-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id, // Pass user_id
                    set_password: password, // Pass new password
                }),
            });

            const data = await response.json();
            setLoading(false);

            if (response.ok) {
                Alert.alert('Success', 'Password set successfully!');
                navigation.navigate('Login'); // Navigate to Login screen
            } else {
                Alert.alert('Error', data.error || 'Failed to set password!');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error during password set:', error);
            Alert.alert('Error', error.message || 'Something went wrong');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Enter your new password</Text>

            {/* Password Input Field */}
            <TextInput
                style={styles.input}
                placeholder="Enter new password"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#aaa"
            />

            {/* Submit Button */}
            <TouchableOpacity
                style={styles.button}
                onPress={handleSetPassword}
                disabled={loading} // Disable button when loading
            >
                {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Set Password</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default EnterPasswordScreen;

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
