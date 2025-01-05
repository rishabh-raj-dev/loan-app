import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface BackButtonProps {
  onPress: () => void;
  buttonStyle?: object;
}

const BackButton: React.FC<BackButtonProps> = ({ onPress, buttonStyle }) => {
  return (
    <TouchableOpacity style={[styles.backButton, buttonStyle]} onPress={onPress}>
      <Icon name="chevron-back" size={24} color="#FFFFFF" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    marginBottom: 24,
  },
});

export default BackButton;
