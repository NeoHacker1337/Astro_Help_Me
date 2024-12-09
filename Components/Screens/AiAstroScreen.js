import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const AiAstroScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Coming Soon</Text>
    </View>
  );
};

export default AiAstroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container takes up the full screen
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
    backgroundColor: '#f8f9fa', // Optional background color
  },
  text: {
    fontSize: 24, // Adjust font size as needed
    fontWeight: 'bold', // Makes the text bold
    color: '#333', // Optional text color
  },
});
