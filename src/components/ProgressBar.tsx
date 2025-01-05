import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface ProgressBarProps {
  style?: object;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ style }) => {
  const { currentStep, totalSteps } = useSelector(
    (state: RootState) => state.progress
  );

  const progress = (currentStep / totalSteps) * 100;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.background}>
        <View style={[styles.fill, { width: `${progress}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 4,
  },
  background: {
    flex: 1,
    backgroundColor: '#333333',
    borderRadius: 2,
  },
  fill: {
    height: '100%',
    backgroundColor: '#6FDBD4',
    borderRadius: 2,
  },
});

export default ProgressBar;
