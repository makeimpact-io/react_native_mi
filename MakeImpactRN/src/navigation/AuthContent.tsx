import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, ForgottenPasswordScreen } from '../screens';
import OnboardingNavigation from './OnboardingNavigation';
import { InitialScreen } from '../screens/Onboarding/InitialScreen';
import { TopNavigationBar } from '../components';

const Stack = createNativeStackNavigator();

function AuthContent() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: navigation => {
          if (navigation.route.name !== 'InitialScreen') {
            return <TopNavigationBar navigation={navigation} />;
          }
        },
      }}>
      <>
        <Stack.Screen name="InitialScreen" component={InitialScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="ForgottenPassword"
          component={ForgottenPasswordScreen}
          options={{
            gestureDirection: 'horizontal',
            animation: 'slide_from_right',
            animationDuration: 1.2,
          }}
        />
        <Stack.Screen
          name="Onboarding"
          component={OnboardingNavigation}
          options={{
            gestureDirection: 'horizontal',
            animation: 'slide_from_right',
            animationDuration: 1.2,
          }}
        />
      </>
    </Stack.Navigator>
  );
}

export default AuthContent;
