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
import {Provider} from 'react-redux';
import {store} from './src/store/store';

// Screens
import SplashScreen from './src/screens/SplashScreen';
import PhoneNumberScreen from './src/screens/PhoneNumberScreen';
import OtpVerificationScreen from './src/screens/OtpVerificationScreen';
import PanVerificationScreen from './src/screens/PanVerificationScreen';
import PanConfirmationScreen from './src/screens/PanConfirmationScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';

export type RootStackParamList = {
  Splash: undefined;
  PhoneNumber: undefined;
  OtpVerification: {phoneNumber: string};
  PanVerification: undefined;
  PanConfirmation: {
    name: string;
    panNumber: string;
  };
  Onboarding: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: '#000000',
              },
            }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen} />
            <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
            <Stack.Screen name="PanVerification" component={PanVerificationScreen} />
            <Stack.Screen
              name="PanConfirmation"
              component={PanConfirmationScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
