import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, Dimensions } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { width, height } = Dimensions.get('window');

type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Splash'>;
};

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  // Animation values
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const dotScale = useRef(new Animated.Value(0)).current;
  const circleScale = useRef(new Animated.Value(0)).current;
  const circleRotate = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const backgroundAnim = useRef(new Animated.Value(0)).current;

  // Create multiple circles
  const circles = Array(5).fill(0).map((_, i) => ({
    scale: useRef(new Animated.Value(0)).current,
    rotate: useRef(new Animated.Value(0)).current,
    delay: i * 200,
  }));

  useEffect(() => {
    // Logo animation
    Animated.sequence([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 10,
        friction: 2,
        useNativeDriver: true,
      }),
    ]).start();

    // Dot animation
    Animated.sequence([
      Animated.delay(400),
      Animated.spring(dotScale, {
        toValue: 1,
        tension: 50,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();

    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Circles animation
    circles.forEach(({ scale, rotate, delay }) => {
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.spring(scale, {
            toValue: 1,
            tension: 20,
            friction: 2,
            useNativeDriver: true,
          }),
          Animated.loop(
            Animated.timing(rotate, {
              toValue: 1,
              duration: 3000,
              useNativeDriver: true,
            })
          ),
        ]),
      ]).start();
    });

    // Background fade
    Animated.timing(backgroundAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Navigate after animation
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 3500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.background,
          {
            opacity: backgroundAnim,
          },
        ]}
      />
      
      {circles.map((circle, index) => {
        const rotate = circle.rotate.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        });
        
        return (
          <Animated.View
            key={index}
            style={[
              styles.circle,
              {
                transform: [
                  { scale: circle.scale },
                  { rotate },
                  { translateX: 100 * Math.cos(index * (2 * Math.PI / 5)) },
                  { translateY: 100 * Math.sin(index * (2 * Math.PI / 5)) },
                ],
              },
            ]}
          />
        );
      })}

      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: logoOpacity,
            transform: [
              { scale: logoScale },
              { translateY: -20 },
            ],
          },
        ]}>
        <Animated.Text style={styles.logo}>
          Cash
          <Animated.Text style={[styles.highlight]}>Up</Animated.Text>
        </Animated.Text>
        <Animated.View
          style={[
            styles.dot,
            {
              transform: [
                { scale: dotScale },
                { translateY: -5 },
              ],
            },
          ]}>
          <Animated.View
            style={[
              styles.innerDot,
              {
                transform: [{ scale: pulseAnim }],
              },
            ]}
          />
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000',
  },
  logoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  logo: {
    fontSize: 48,
    color: '#FFFFFF',
    fontWeight: '600',
    fontFamily: 'Gilroy-SemiBold',
  },
  highlight: {
    color: '#6FDBD4',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#6FDBD4',
    marginLeft: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  circle: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#6FDBD4',
    opacity: 0.2,
  },
});

export default SplashScreen;
