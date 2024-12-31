import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';

type RootStackParamList = {
  PhoneNumber: undefined;
  OtpVerification: {phoneNumber: string};
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
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    // In a real app, you would verify the OTP here
    console.log('OTP:', otp.join(''));
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(30);
      // In a real app, you would make an API call to resend OTP
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Icon name="chevron-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Progress Bar */}
      <View style={styles.progressBar}>
        <View style={styles.progressFill} />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}>
        <View>
          <Text style={styles.title}>
            Enter the{'\n'}
            <Text style={styles.highlightText}>verification code</Text>
          </Text>

          <Text style={styles.subtitle}>
            We've sent a verification code to{'\n'}
            +91 {phoneNumber}
          </Text>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={styles.otpInput}
                maxLength={1}
                keyboardType="number-pad"
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
              />
            ))}
          </View>

          <TouchableOpacity 
            style={styles.resendButton} 
            onPress={handleResend}
            disabled={timer > 0}>
            <Text style={[styles.resendText, timer > 0 && styles.resendTextDisabled]}>
              Resend OTP {timer > 0 ? `(${timer}s)` : ''}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Verify Button */}
      <TouchableOpacity
        style={[styles.verifyButton, otp.every(digit => digit) && styles.verifyButtonActive]}
        onPress={handleVerify}
        disabled={!otp.every(digit => digit)}>
        <Text style={styles.verifyButtonText}>Verify</Text>
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
    padding: 16,
  },
  progressBar: {
    height: 2,
    backgroundColor: '#333333',
    marginHorizontal: 16,
  },
  progressFill: {
    width: '66%',
    height: '100%',
    backgroundColor: '#00E6C3',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 32,
    color: '#FFFFFF',
    marginTop: 24,
    lineHeight: 40,
    fontWeight: '600',
  },
  highlightText: {
    color: '#00E6C3',
  },
  subtitle: {
    color: '#666666',
    fontSize: 14,
    marginTop: 16,
    lineHeight: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
  },
  otpInput: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#1A1A1A',
    color: '#FFFFFF',
    fontSize: 24,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  resendButton: {
    marginTop: 24,
    alignSelf: 'center',
  },
  resendText: {
    color: '#00E6C3',
    fontSize: 14,
  },
  resendTextDisabled: {
    color: '#666666',
  },
  verifyButton: {
    backgroundColor: '#333333',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  verifyButtonActive: {
    backgroundColor: '#00E6C3',
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OtpVerificationScreen;
