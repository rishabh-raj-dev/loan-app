/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

// Screens
import PhoneNumberScreen from './src/screens/PhoneNumberScreen';
import OtpVerificationScreen from './src/screens/OtpVerificationScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: '#000000',
            },
          }}>
          <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen} />
          <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
