import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const isFormValid = firstName.trim() !== '' && lastName.trim() !== '';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <View style={styles.backButtonCircle}>
          <Icon name="chevron-back" size={24} color="#FFFFFF" />
        </View>
      </TouchableOpacity>

      <View style={styles.progressBar}>
        <View style={styles.progressFill} />
      </View>

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
        style={[styles.continueButton, isFormValid && styles.continueButtonActive]}
        disabled={!isFormValid}
        onPress={() =>
          navigation.navigate('PanConfirmation', {
            name: `${firstName} ${lastName}`,
            panNumber: '',
          })
        }>
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
    marginTop: 8,
    marginLeft: 16,
  },
  backButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    height: 2,
    backgroundColor: '#333333',
    marginTop: 24,
    marginHorizontal: 16,
  },
  progressFill: {
    width: '33%',
    height: '100%',
    backgroundColor: '#00E6C3',
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
    color: '#00E6C3',
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
    backgroundColor: '#1A1A1A',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonActive: {
    backgroundColor: '#00E6C3',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Gilroy-SemiBold',
  },
  continueButtonTextActive: {
    color: '#000000',
  },
});

export default PanVerificationScreen;
