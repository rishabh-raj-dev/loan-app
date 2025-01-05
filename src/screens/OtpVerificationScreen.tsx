import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setCurrentStep, completeStep} from '../store/slices/progressSlice';
import ProgressBar from '../components/ProgressBar';

const {width} = Dimensions.get('window');

type RootStackParamList = {
  PhoneNumber: undefined;
  OtpVerification: {phoneNumber: string};
  PanVerification: undefined;
};

type OtpVerificationScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'OtpVerification'>;
  route: RouteProp<RootStackParamList, 'OtpVerification'>;
};

const OtpVerificationScreen: React.FC<OtpVerificationScreenProps> = ({
  navigation,
  route,
}) => {
  const {phoneNumber} = route.params;
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60); // 1:00 in seconds
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    dispatch(setCurrentStep(2));
  }, [dispatch]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const isOtpComplete = otp.every(digit => digit);

  const handleVerify = () => {
    dispatch(completeStep('fetchMutualFunds'));
    navigation.navigate('PanVerification');
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
        <Text style={styles.title}>
          Enter your 6 digit <Text style={styles.highlightText}>OTP</Text>
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={[styles.otpInput, digit ? styles.otpInputFilled : null]}
              maxLength={1}
              keyboardType="number-pad"
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
            />
          ))}
        </View>

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn't get an OTP?</Text>
          <TouchableOpacity 
            style={styles.resendButton} 
            disabled={timer > 0}>
            <Text style={styles.resendOtpText}>
              Resend OTP ({formatTime(timer)})
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.nextButton, isOtpComplete && styles.nextButtonActive]}
        disabled={!isOtpComplete}
        onPress={handleVerify}>
        <Text style={[styles.nextButtonText, isOtpComplete && styles.nextButtonTextActive]}>Next</Text>
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
  title: {
    fontSize: 28,
    color: '#FFFFFF',
    marginTop: 24,
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: 24,
  },
  otpInput: {
    width: (width - 48 - 50) / 6,
    height: 56,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    color: '#FFFFFF',
    fontSize: 32,
    textAlign: 'center',
    fontWeight: '600',
    fontFamily: 'Gilroy-SemiBold',
  },
  otpInputFilled: {
    borderBottomColor: '#FFFFFF',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  resendText: {
    color: '#6FDBD4',
    fontSize: 14,
    fontFamily: 'Gilroy-SemiBold',
  },
  resendButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resendOtpText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Gilroy-SemiBold',
  },
  nextButton: {
    position: 'absolute',
    bottom: 34,
    left: 16,
    right: 16,
    height: 56,
    backgroundColor: '#6FDBD4',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonActive: {
    backgroundColor: '#6FDBD4',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Gilroy-SemiBold',
  },
  nextButtonTextActive: {
    color: '#000000',
  },
});

export default OtpVerificationScreen;
