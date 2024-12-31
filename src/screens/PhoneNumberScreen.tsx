import React, {useState} from 'react';
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

type RootStackParamList = {
  PhoneNumber: undefined;
  OtpVerification: {phoneNumber: string};
};

type PhoneNumberScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PhoneNumber'>;
};

const PhoneNumberScreen: React.FC<PhoneNumberScreenProps> = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleNext = () => {
    if (phoneNumber.length === 10) {
      navigation.navigate('OtpVerification', {phoneNumber});
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton}>
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
            What is your{'\n'}
            <Text style={styles.highlightText}>phone number</Text>?
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.prefix}>+91</Text>
            <TextInput
              style={styles.input}
              placeholder="XXXXXXXXXX"
              placeholderTextColor="#666666"
              keyboardType="number-pad"
              maxLength={10}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>

          <Text style={styles.terms}>
            By continuing, I agree to{' '}
            <Text style={styles.link}>Privacy Policy</Text>,{' '}
            <Text style={styles.link}>T&C</Text> and{' '}
            <Text style={styles.link}>Credit Information</Text>
          </Text>
        </View>
      </KeyboardAvoidingView>

      {/* Next Button */}
      <TouchableOpacity
        style={[styles.nextButton, phoneNumber.length === 10 && styles.nextButtonActive]}
        onPress={handleNext}
        disabled={phoneNumber.length !== 10}>
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
    padding: 16,
  },
  progressBar: {
    height: 2,
    backgroundColor: '#333333',
    marginHorizontal: 16,
  },
  progressFill: {
    width: '33%',
    height: '100%',
    backgroundColor: '#00E6C3',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    paddingBottom: 8,
  },
  prefix: {
    color: '#FFFFFF',
    fontSize: 16,
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    padding: 0,
  },
  terms: {
    color: '#666666',
    fontSize: 12,
    marginTop: 16,
    lineHeight: 18,
  },
  link: {
    color: '#FFFFFF',
  },
  nextButton: {
    backgroundColor: '#333333',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonActive: {
    backgroundColor: '#00E6C3',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PhoneNumberScreen;
