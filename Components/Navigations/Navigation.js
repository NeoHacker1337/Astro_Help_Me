import { StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OnboardingScreen from '../Screens/OnboardingScreen';
import LoginScreen from '../Screens/LoginScreen';
import SignupScreen from '../Screens/SignupScreen';
import ForgotScreen from '../Screens/ForgotScreen';
import HomeScreen from '../Screens/HomeScreen';
import AiAstroScreen from '../Screens/AiAstroScreen';
import LiveScreen from '../Screens/LiveScreen';
import AskScreen from '../Screens/AskScreen';
import HistoryScreen from '../Screens/HistoryScreen';
import Icon from 'react-native-vector-icons/Ionicons'; // Or another icon library

// Stack and Tab Navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator
const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: '#f58802' }, // Customize tab bar style
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#ddd',
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home'; // Use the icon name from your chosen library
          } else if (route.name === 'Ai Astro') {
            iconName = 'planet'; // Example icon for Ai Astro
          } else if (route.name === 'Live') {
            iconName = 'radio'; // Example icon for Live
          } else if (route.name === 'Ask') {
            iconName = 'help-circle'; // Example icon for Ask
          } else if (route.name === 'History') {
            iconName = 'time'; // Example icon for History
          }

          // Return the icon component
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Ai Astro" component={AiAstroScreen} />
      <Tab.Screen name="Live" component={LiveScreen} />
      <Tab.Screen name="Ask" component={AskScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
    </Tab.Navigator>
  );
};

// Main Navigation
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Screens without bottom tabs */}
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Forgot"
          component={ForgotScreen}
          options={{ headerShown: false }}
        />
        {/* Bottom Tab Screens */}
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
