import { Image, ImageBackground, StyleSheet, View, Animated, Text, Button } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import BottomNavigation from '../Navigations/BottomNavigation';

const OnboardingScreen = () => {

  const navigation = useNavigation()

  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {

    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: true,
      })
    ).start();


    const timer = setTimeout(() => {
      navigation.navigate("Login")
    }, 3000);


    return () => clearTimeout(timer);
  }, [rotateAnim]);


  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });



  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: "https://img.freepik.com/premium-photo/astronomical-background-with-zodiac-signs-horoscope-astrology-concept_1308175-202217.jpg" }}
        style={styles.BgImage}
      >
        {/* Apply the rotation to the image and center it */}
        <Animated.Image
          source={{ uri: "https://www.greatastro.com/img/Astrologer%20(2).png" }}
          style={[styles.Logoimage, { transform: [{ rotate: rotation }] }]}
          resizeMode='contain'
        />
      </ImageBackground>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  // Vertically center the content
    alignItems: 'center',      // Horizontally center the content
  },
  BgImage: {
    height: hp("100%"),
    width: wp("100%"),
    justifyContent: 'center',  // Ensure background image content is centered
    alignItems: 'center',      // Ensure background image content is centered
  },
  Logoimage: {
    height: hp("50%"),  // Adjust as needed
    width: wp("80%"),   // Adjust as needed
  },
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  homeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
});
