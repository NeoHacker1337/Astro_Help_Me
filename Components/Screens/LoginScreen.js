import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const LoginScreen = ({ navigation }) => {  // Destructure navigation from props
    return (
        <LinearGradient
            colors={['#8015cf', '#f58802']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <Text style={styles.appName}>Astro Help Me</Text>

            <Image
                source={require('../../assets/images/logo.png')} // Correct relative path
                style={styles.image}
            />

            <TextInput
                style={styles.input}
                placeholder="Phone"
                keyboardType="phone-pad"
                placeholderTextColor="#eee"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                placeholderTextColor="#eee"
            />

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <View style={styles.linkContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
                    <Text style={styles.linkText}>Forgot Password?</Text>
                </TouchableOpacity>

                {/* Wrap "Sign Up" text inside the Text component */}
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.linkText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
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
        width: screenWidth * 0.5, // 50% of screen width (adjust as needed)
        height: screenWidth * 0.5, // Make height equal to width
        borderRadius: screenWidth * 0.25, // Half of width/height for a perfect circle
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
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent background
        color: '#fff', // Text color
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
