import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import PanCard from '../components/PanCard';

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Is this your PAN?</Text>
        <View style={styles.cardWrapper}>
          <PanCard name={name} panNumber={panNumber} />
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, styles.noButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.buttonText, styles.noButtonText]}>No</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.yesButton]}
          onPress={() => navigation.navigate('OtpVerification')}
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  progressBarContainer: {
    paddingHorizontal: 4,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#333333',
    borderRadius: 2,
  },
  progressFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '33%',
    backgroundColor: '#6FE6CF',
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
  footer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  button: {
    flex: 1,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noButton: {
    backgroundColor: '#FFFFFF',
  },
  yesButton: {
    backgroundColor: '#6FE6CF',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  noButtonText: {
    color: '#FF0000',
  },
  yesButtonText: {
    color: '#000000',
  },
});

export default PanConfirmationScreen;
