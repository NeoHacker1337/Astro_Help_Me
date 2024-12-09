import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';

const Tab = createBottomTabNavigator();
const BottomNavigation = () => {
  return (
   <NavigationContainer>
    <Tab.Navigator>
        <Tab.Screen name='Home' component={HomeScreen}/>
    </Tab.Navigator>
   </NavigationContainer>
  )
}

export default BottomNavigation

const styles = StyleSheet.create({})