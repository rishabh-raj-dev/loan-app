import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentStep, completeStep } from '../store/slices/progressSlice';
import ProgressBar from '../components/ProgressBar';

type RootStackParamList = {
  OtpVerification: undefined;
  PanVerification: undefined;
  PanConfirmation: {
    name: string;
    panNumber: string;
  };
};

type PanVerificationScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PanVerification'>;
};

const PanVerificationScreen: React.FC<PanVerificationScreenProps> = ({
  navigation,
}) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const isFormValid = firstName.trim() !== '' && lastName.trim() !== '';

  useEffect(() => {
    dispatch(setCurrentStep(3));
  }, [dispatch]);

  const handleContinue = () => {
    dispatch(completeStep('kyc'));
    navigation.navigate('PanConfirmation', {
      name: `${firstName} ${lastName}`,
      panNumber: '',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

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
          <Text style={styles.title}>Enter your</Text>
          <Text style={styles.title}>
            <Text style={styles.highlightText}>name</Text> as per PAN
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, styles.inputLabel]}
            placeholder="Enter Your First Name"
            placeholderTextColor="#666666"
            value={firstName}
            onChangeText={setFirstName}
          />
          <Text style={styles.inputHint}>Your First Name</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, styles.inputLabel]}
            placeholder="Enter Your Last Name"
            placeholderTextColor="#666666"
            value={lastName}
            onChangeText={setLastName}
          />
          <Text style={styles.inputHint}>Your Last Name</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.continueButton,
          isFormValid && styles.continueButtonActive,
        ]}
        disabled={!isFormValid}
        onPress={handleContinue}>
        <Text
          style={[
            styles.continueButtonText,
            isFormValid && styles.continueButtonTextActive,
          ]}>
          Continue
        </Text>
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
    padding: 24,
  },
  titleContainer: {
    marginTop: 24,
  },
  title: {
    fontSize: 28,
    color: '#FFFFFF',
    fontFamily: 'Gilroy-SemiBold',
    fontWeight: '400',
    lineHeight: 36,
    textAlign: 'left',
  },
  highlightText: {
    color: '#6FDBD4',
    fontFamily: 'Gilroy-SemiBold',
    fontWeight: '400',
    fontSize: 28,
    lineHeight: 36,
  },
  inputContainer: {
    marginTop: 40,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Gilroy-SemiBold',
    fontWeight: '400',
    paddingBottom: 8,
    paddingHorizontal: 0,
  },
  inputLabel: {
    color: '#666666',
    fontSize: 20,
    fontFamily: 'Gilroy-SemiBold',
  },
  inputHint: {
    color: '#666666',
    fontSize: 14,
    fontFamily: 'Gilroy-SemiBold',
    marginTop: 8,
  },
  continueButton: {
    position: 'absolute',
    bottom: 34,
    left: 16,
    right: 16,
    height: 56,
    backgroundColor: '#333333',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonActive: {
    backgroundColor: '#6FDBD4',
  },
  continueButtonText: {
    color: '#191919',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Gilroy-SemiBold',
  },
  continueButtonTextActive: {
    color: '#000000',
  },
});

export default PanVerificationScreen;
