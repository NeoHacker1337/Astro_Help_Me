import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import OnboardingScreen from '../Screens/OnboardingScreen';
import LoginScreen from '../Screens/LoginScreen';
import SignupScreen from '../Screens/SignupScreen';
import ForgotScreen from '../Screens/ForgotScreen';
import HomeScreen from '../Screens/HomeScreen';
import AiAstroScreen from '../Screens/AiAstroScreen';
import LiveScreen from '../Screens/LiveScreen';
import AskScreen from '../Screens/AskScreen';
import HistoryScreen from '../Screens/HistoryScreen';
import EnterOTPScreen from '../Screens/EnterOTPScreen';
import EnterPasswordScreen from '../Screens/EnterPasswordScreen';
import KundliScreen from '../Screens/KundliScreen';

// Stack and Tab Navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator
const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          position: 'absolute',
          width: '100%',
          // bottom: hp(3),
          // left: wp(4),
          right: wp(4),
          padding: 5,
          elevation: 0,
          backgroundColor: '#263E3E',
          // blurtype: 'regular',
          // borderRadius: 30,
          height: hp(9),
          shadowColor: '#7F5DF0',
          shadowOffset: {
            width: 0,
            height: wp(2),
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
          elevation: 5,
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#ddd',
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Ai Astro') {
            iconName = 'planet-outline';
          } else if (route.name === 'Live') {
            iconName = 'radio-outline';
          } else if (route.name === 'Ask') {
            iconName = 'help-circle-outline';
          } else if (route.name === 'History') {
            iconName = 'time-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Ai Astro" component={AiAstroScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Live" component={LiveScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Ask" component={AskScreen} options={{ headerShown: false }} />
      <Tab.Screen name="History" component={HistoryScreen} options={{ headerShown: false }} />
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
          name="EnterOTP"
          component={EnterOTPScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EnterPassword"
          component={EnterPasswordScreen}
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
        <Stack.Screen
          name="Kundli"
          component={KundliScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
