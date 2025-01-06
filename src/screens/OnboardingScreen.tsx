import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Onboarding: undefined;
  PhoneNumber: undefined;
};

type OnboardingScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;
};

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({navigation}) => {
  const handleNext = () => {
    navigation.navigate('PhoneNumber');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <View style={styles.header}>
        <Text style={styles.logo}>CashUp.</Text>
        <TouchableOpacity>
          <Text style={styles.skipButton}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Sign up</Text>
        <Text style={styles.subtitle}>for CashUp</Text>

        <View style={styles.timerSection}>
          <View style={styles.timerIcon} />
          <Text style={styles.timerText}>
            <Text style={styles.mediumText}>Open your cashUp account in </Text>
            <Text style={styles.boldText}>10 minutes </Text>
            <Text style={styles.regularText}>and </Text>
            <Text style={styles.boldText}>5 easy steps</Text>
          </Text>
        </View>

        <View style={styles.stepsContainer}>
          {[
            'Mobile Number Verification',
            'Fetch Mutual Funds',
            'KYC',
            'Pledge Mutual Funds',
            'Adding Bank Account',
            'E-Sign',
          ].map((step, index) => (
            <View key={index} style={styles.stepRow}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={styles.nextButton}
        onPress={handleNext}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  logo: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'Gilroy-Bold',
    fontWeight: '400',
    lineHeight: 30.72,
    textAlign: 'left',
  },
  skipButton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Gilroy-SemiBold',
    borderWidth: 1,
    borderColor: '#333333',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 40,
    color: '#FFFFFF',
    fontFamily: 'Gilroy-SemiBold',
    fontWeight: '400',
    marginTop: 40,
  },
  subtitle: {
    fontSize: 40,
    color: '#FFFFFF',
    fontFamily: 'Gilroy-SemiBold',
    fontWeight: '400',
    marginTop: 4,
  },
  timerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  timerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    marginRight: 12,
  },
  timerText: {
    flex: 1,
    lineHeight: 20.48,
  },
  mediumText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Gilroy-Medium',
    fontWeight: '400',
    lineHeight: 20.48,
    textAlign: 'left',
  },
  regularText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Gilroy-Regular',
    fontWeight: '400',
    lineHeight: 20.48,
    textAlign: 'left',
  },
  boldText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Gilroy-Bold',
    fontWeight: '400',
    lineHeight: 20.48,
    textAlign: 'left',
  },
  stepsContainer: {
    marginTop: 32,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    color: '#000000',
    fontSize: 20,
    fontFamily: 'Gilroy-SemiBold',
    fontWeight: '600',
  },
  stepText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Gilroy-Medium',
    fontWeight: '400',
    lineHeight: 17.92,
    textAlign: 'left',
  },
  nextButton: {
    position: 'absolute',
    bottom: 34,
    left: 16,
    right: 16,
    backgroundColor: '#6FDBD4',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Gilroy-SemiBold',
  },
});

export default OnboardingScreen;
