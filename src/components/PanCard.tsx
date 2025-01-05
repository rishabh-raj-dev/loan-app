import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface PanCardProps {
  name?: string;
  panNumber?: string;
}

const PanCard: React.FC<PanCardProps> = ({ name = '', panNumber = '' }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.topSection}>
        <View>
          <View style={styles.horizontalBar} />
          <View style={[styles.horizontalBar, { marginTop: 8 }]} />
        </View>
        <Image
          source={require('../../assets/images/coat.png')}
          style={styles.emblem}
        />
        <View>
          <View style={styles.horizontalBar} />
          <View style={[styles.horizontalBar, { marginTop: 8 }]} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>{name.toUpperCase()}</Text>
        <Text style={styles.label}>Permanent Account Number</Text>
        <Text style={styles.panNumber}>72737327327</Text>
      </View>

      <View style={styles.placeholderImage}>
        <Image
          source={require('../../assets/images/person.png')}
          style={styles.profileIcon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#1b1b1b',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    height: 220,
    position: 'relative',
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,
  },
  horizontalBar: {
    backgroundColor: '#333333',
    height: 8,
    width: 80,
    borderRadius: 4,
  },
  emblem: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    tintColor: '#999999',
  },
  content: {
    marginLeft: 8,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  label: {
    color: '#999999',
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'System',
  },
  panNumber: {
    color: '#6FE6CF',
    fontFamily: 'Gilroy-Medium',
    fontSize: 28,
    fontWeight: '400',
    lineHeight: 33.96,
    textAlign: 'left',
    textDecorationLine: 'none',
  },
  placeholderImage: {
    position: 'absolute',
    right: 24,
    bottom: 30,
  },
  profileIcon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    tintColor: '#333333',
  },
});

export default PanCard;
