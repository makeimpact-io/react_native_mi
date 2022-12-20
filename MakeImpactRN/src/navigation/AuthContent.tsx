import * as React from 'react';

import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import {
  LoginScreen,
  ForgottenPasswordScreen,
  GenderScreen,
  GoalsScreen,
  InvestedScreen,
  RegisterScreen,
} from '../screens';
import { InitialScreen } from '../screens/Onboarding/InitialScreen';
import { OnboardingNavigationBar, TopNavigationBar } from '../components';
import { AppState } from '../state/store';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { NamesScreen } from '../screens/Onboarding/NamesScreen';

const Stack = createNativeStackNavigator();

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

function AuthContent(props: Props) {
  const [showOnlyOnboarding, setShowOnlyOnboarding] = useState(false);

  useEffect(() => {
    if (
      (props.user.firstName === '' ||
        props.user.lastName === '' ||
        props.user.goals === null ||
        props.user.goals.length < 3 ||
        props.user.goals.length !== 0 ||
        props.user.invested == null ||
        props.user.gender == null) &&
      props.user.email !== '' &&
      props.user.uid !== ''
    ) {
      setShowOnlyOnboarding(true);
    } else {
      setShowOnlyOnboarding(false);
    }
  }, [props.user]);

  const onboardingHeader = (navigation: NativeStackHeaderProps) => {
    return (
      <OnboardingNavigationBar navigation={navigation} index={0} length={5} />
    );
  };
  return (
    <Stack.Navigator
      screenOptions={{
        header: navigation => {
          if (navigation.route.name !== 'InitialScreen') {
            return <TopNavigationBar navigation={navigation} />;
          }
        },
      }}>
      {!showOnlyOnboarding ? (
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
            name="Register"
            component={RegisterScreen}
            options={{
              gestureDirection: 'horizontal',
              animation: 'slide_from_right',
              animationDuration: 1.2,
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Names"
            component={NamesScreen}
            options={{
              gestureDirection: 'horizontal',
              animation: 'slide_from_right',
              animationDuration: 1.2,
              header: onboardingHeader,
            }}
            initialParams={{ nextScreen: 'Gender', index: 1 }}
          />
          <Stack.Screen
            name="Gender"
            component={GenderScreen}
            options={{
              gestureDirection: 'horizontal',
              animation: 'slide_from_right',
              animationDuration: 1.2,
              header: onboardingHeader,
            }}
            initialParams={{ nextScreen: 'Invested', index: 1 }}
          />
          <Stack.Screen
            name="Invested"
            component={InvestedScreen}
            options={{
              gestureDirection: 'horizontal',
              animation: 'slide_from_right',
              animationDuration: 1.2,
              header: onboardingHeader,
            }}
            initialParams={{ nextScreen: 'Goals', index: 2 }}
          />
          <Stack.Screen
            name="Goals"
            component={GoalsScreen}
            options={{
              gestureDirection: 'horizontal',
              animation: 'slide_from_right',
              animationDuration: 1.2,
              header: onboardingHeader,
            }}
            initialParams={{ index: 3 }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
const mapStateToProps = (state: AppState) => ({
  user: state.userReducer,
});

const mapDispatchToProps = {};

const AuthContentConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthContent);

export { AuthContentConnected as AuthContent };
