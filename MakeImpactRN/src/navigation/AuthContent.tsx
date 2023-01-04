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

export type UnauthorizedStackParamList = {
  InitialScreen: undefined;
  Login: undefined;
  ForgottenPassword: undefined;
  Register: undefined;
};

export type AuthorizedStackParamList = {
  Names: undefined;
  Gender: undefined;
  Invested: undefined;
  Goals: undefined;
};

const UnauthorizedStack =
  createNativeStackNavigator<UnauthorizedStackParamList>();

const AuthorizedStack = createNativeStackNavigator<AuthorizedStackParamList>();

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

function AuthContent(props: Props) {
  const [showOnlyOnboarding, setShowOnlyOnboarding] = useState(false);

  useEffect(() => {
    if (
      (props.user.firstName === '' ||
        props.user.lastName === '' ||
        props.user.goals === null ||
        props.user.goals.length < 3 ||
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
    const index = navigation.options.title;
    return (
      <OnboardingNavigationBar
        navigation={navigation}
        index={index ? parseInt(index, 10) : 0}
        length={4}
      />
    );
  };
  if (showOnlyOnboarding) {
    return (
      <AuthorizedStack.Navigator>
        <AuthorizedStack.Screen
          name="Names"
          component={NamesScreen}
          options={{
            gestureDirection: 'horizontal',
            animation: 'slide_from_right',
            animationDuration: 1.2,
            header: onboardingHeader,
            headerTitle: '1',
          }}
        />
        <AuthorizedStack.Screen
          name="Gender"
          component={GenderScreen}
          options={{
            gestureDirection: 'horizontal',
            animation: 'slide_from_right',
            animationDuration: 1.2,
            header: onboardingHeader,
            headerTitle: '2',
          }}
        />
        <AuthorizedStack.Screen
          name="Invested"
          component={InvestedScreen}
          options={{
            gestureDirection: 'horizontal',
            animation: 'slide_from_right',
            animationDuration: 1.2,
            header: onboardingHeader,
            headerTitle: '3',
          }}
        />
        <AuthorizedStack.Screen
          name="Goals"
          component={GoalsScreen}
          options={{
            gestureDirection: 'horizontal',
            animation: 'slide_from_right',
            animationDuration: 1.2,
            header: onboardingHeader,
            headerTitle: '4',
          }}
        />
      </AuthorizedStack.Navigator>
    );
  } else {
    return (
      <UnauthorizedStack.Navigator
        screenOptions={{
          header: navigation => {
            if (navigation.route.name !== 'InitialScreen') {
              return <TopNavigationBar navigation={navigation} />;
            }
          },
        }}>
        <UnauthorizedStack.Screen
          name="InitialScreen"
          component={InitialScreen}
        />
        <UnauthorizedStack.Screen name="Login" component={LoginScreen} />
        <UnauthorizedStack.Screen
          name="ForgottenPassword"
          component={ForgottenPasswordScreen}
          options={{
            gestureDirection: 'horizontal',
            animation: 'slide_from_right',
            animationDuration: 1.2,
          }}
        />
        <UnauthorizedStack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            gestureDirection: 'horizontal',
            animation: 'slide_from_right',
            animationDuration: 1.2,
          }}
        />
      </UnauthorizedStack.Navigator>
    );
  }
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
