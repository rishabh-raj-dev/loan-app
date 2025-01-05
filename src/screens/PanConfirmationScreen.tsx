import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import PanCard from '../components/PanCard';
import { useDispatch } from 'react-redux';
import { setCurrentStep, completeStep } from '../store/slices/progressSlice';
import ProgressBar from '../components/ProgressBar'; 

type RootStackParamList = {
  PanVerification: undefined;
  PanConfirmation: {
    name: string;
    panNumber: string;
  };
  OtpVerification: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'PanConfirmation'>;

const PanConfirmationScreen: React.FC<Props> = ({ navigation, route }) => {
  const { name, panNumber } = route.params;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentStep(4));
  }, [dispatch]);

  const handleYes = () => {
    dispatch(completeStep('pledgeMutualFunds'));
    navigation.navigate('OtpVerification'); // Navigate to next screen (Bank Account)
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <View style={styles.backButtonCircle}>
            <Text style={styles.backButtonText}>‹</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.progressBarContainer}>
          <ProgressBar style={styles.progressBar} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Is this your PAN?</Text>
        <View style={styles.cardWrapper}>
          <PanCard name={name} panNumber={panNumber} />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.noButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.buttonText, styles.noButtonText]}>No</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.yesButton]}
          onPress={handleYes}
        >
          <Text style={[styles.buttonText, styles.yesButtonText]}>Yes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
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
    alignItems: 'center',
    justifyContent: 'center',
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
  progressBarContainer: {
    paddingHorizontal: 4,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#333333',
    marginTop: 24,
    marginHorizontal: 20,
    borderRadius: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 32,
  },
  cardWrapper: {
    width: '100%',
    paddingHorizontal: 4,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 34,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noButton: {
    backgroundColor: '#333333',
  },
  yesButton: {
    backgroundColor: '#6FDBD4',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Gilroy-SemiBold',
    color: '#191919',
  },
  noButtonText: {
    color: '#FFFFFF',
  },
  yesButtonText: {
    color: '#000000',
  },
});

export default PanConfirmationScreen;
