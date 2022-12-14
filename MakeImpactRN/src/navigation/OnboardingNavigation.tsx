import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingNavigationBar } from '../components/NavigationBars/OnboardingNavigationBar';
import {
  RegisterScreen,
  GenderScreen,
  InvestedScreen,
  GoalsScreen,
} from '../screens';

const Stack = createNativeStackNavigator();

function OnboardingNavigation({ route }: { route: any }) {
  let onboardingList = [
    {
      name: 'Register',
      screen: RegisterScreen,
    },
    //To be created
    // {
    //   name: 'PhoneNumber',
    //   screen: PhoneScreen,
    // },
    {
      name: 'Gender',
      screen: GenderScreen,
    },
    {
      name: 'Invested',
      screen: InvestedScreen,
    },
    {
      name: 'Goals',
      screen: GoalsScreen,
    },
  ];
  if (route && route.params && route.params.removeRegister) {
    onboardingList = onboardingList.filter(
      screen => screen.name !== 'Register',
    );
  }
  const onboardingScreens = onboardingList.map((onboardingScreen, index) => {
    return (
      <Stack.Screen
        name={onboardingScreen.name}
        component={onboardingScreen.screen}
        key={index}
        navigationKey={onboardingScreen.name}
        initialParams={
          index !== onboardingList.length - 1
            ? {
                nextScreen: onboardingList[index + 1].name,
              }
            : {}
        }
        options={{
          gestureDirection: 'horizontal',
          animation: 'slide_from_right',
          animationDuration: 1.2,
          header: navigation => {
            return (
              <OnboardingNavigationBar
                navigation={navigation}
                index={
                  route && route.params && route.params.removeRegister
                    ? index + 1
                    : index
                }
                length={
                  route && route.params && route.params.removeRegister
                    ? onboardingList.length + 1
                    : onboardingList.length
                }
              />
            );
          },
        }}
      />
    );
  });
  return (
    <Stack.Navigator
      screenOptions={{
        navigationBarHidden: true,
      }}>
      {onboardingScreens}
    </Stack.Navigator>
  );
}

export default OnboardingNavigation;
