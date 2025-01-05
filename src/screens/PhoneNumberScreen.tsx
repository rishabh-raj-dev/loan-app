import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { setCurrentStep, completeStep } from '../store/slices/progressSlice';
import ProgressBar from '../components/ProgressBar';

type RootStackParamList = {
  PhoneNumber: undefined;
  OtpVerification: { phoneNumber: string };
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PhoneNumber'>;
};

const PhoneNumberScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    dispatch(setCurrentStep(1));
  }, [dispatch]);

  const handleNext = () => {
    dispatch(completeStep('phoneVerification'));
    navigation.navigate('OtpVerification', { phoneNumber });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <View style={styles.backButtonCircle}>
          <Text style={styles.backButtonText}>‹</Text>
        </View>
      </TouchableOpacity>

      <ProgressBar style={styles.progressBar} />

      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            What is your{'\n'}phone <Text style={styles.highlightText}>number</Text>?
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.phoneInputContainer}>
            <Text style={styles.countryCode}>+91</Text>
            <Text style={styles.separator}>|</Text>
            <TextInput
              style={styles.input}
              placeholder="7709988002"
              placeholderTextColor="#666666"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>
          <View style={styles.underline} />
        </View>

        <Text style={styles.disclaimer}>
          By continuing, I agree to{' '}
          <Text style={styles.link}>Privacy Policy</Text>,{' '}
          <Text style={styles.link}>T&C</Text> and{' '}
          <Text style={styles.link}>Credit Information</Text>
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.nextButton,
          {
            backgroundColor: phoneNumber.length === 10 ? '#6FDBD4' : '#6FDBD4',
          },
        ]}
        disabled={phoneNumber.length !== 10}
        onPress={handleNext}>
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
  backButton: {
    marginTop: 27,
    marginLeft: 16,
    zIndex: 1,
  },
  backButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '300',
    lineHeight: 28,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
    paddingTop: 1,
  },
  progressBar: {
    height: 4,
    marginTop: 24,
    marginHorizontal: 20,
    borderRadius: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 40,
  },
  titleContainer: {
    marginBottom: 60,
  },
  title: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '600',
    lineHeight: 38,
    fontFamily: 'Gilroy-SemiBold',
  },
  highlightText: {
    color: '#6FDBD4',
  },
  inputContainer: {
    marginBottom: 24,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  countryCode: {
    color: '#FFFFFF',
    fontSize: 28,
    fontFamily: 'Gilroy-Medium',
    marginRight: 12,
  },
  separator: {
    color: '#333333',
    fontSize: 28,
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 28,
    fontFamily: 'Gilroy-Medium',
    padding: 0,
  },
  underline: {
    height: 1,
    backgroundColor: '#333333',
    marginTop: 8,
  },
  disclaimer: {
    color: '#999999',
    fontSize: 14,
    fontFamily: 'Gilroy-Medium',
    lineHeight: 20,
    marginTop: 16,
  },
  link: {
    color: '#6FDBD4',
    textDecorationLine: 'underline',
  },
  nextButton: {
    position: 'absolute',
    bottom: 34,
    left: 16,
    right: 16,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#191919',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Gilroy-SemiBold',
  },
});

export default PhoneNumberScreen;
