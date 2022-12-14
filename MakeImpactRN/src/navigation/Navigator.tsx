import * as React from 'react';
import { useState, useEffect } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { LoginScreen } from '../screens';
import { TopNavigationBar } from '../components/NavigationBars/TopNavigationBar';
import { ForgottenPasswordScreen } from '../screens/Onboarding/ForgottenPasswordScreen';
import OnboardingNavigation from './OnboardingNavigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeIcon from '../assets/icons/BottomNavigationBarIcons/HomeIcon';
import InvestIcon from '../assets/icons/BottomNavigationBarIcons/InvestIcon';
import NewsIcon from '../assets/icons/BottomNavigationBarIcons/NewsIcon';
import AcademyIcon from '../assets/icons/BottomNavigationBarIcons/AcademyIcon';
import { MIPink } from '../assets/styles';
import { Black } from '../assets/styles/RegularTheme';
import NewsNavigation from './NewsNavigation';
import InvestNavigation from './InvestNavigation';
import AcademyNavigation from './AcademyNavigation';
import MatchesNavigation from './MatchesNavigation';
import { subscribeUserData, addInitialUser } from '../api/firebase/user';
import { AppState } from '../state/store';
import { LoadingScreen } from '../screens/Utils/LoadingScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { setInitializing, setLoggedIn } from '../state/app/appSlice';
import { connect } from 'react-redux';
import { setFbUser } from '../state/user/userSlice';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

function Navigator(props: Props) {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  async function onAuthStateChanged(
    firebaseUser: React.SetStateAction<
      FirebaseAuthTypes.User | null | undefined
    >,
  ) {
    setUser(firebaseUser);
    props.setFbUser(user);

    if (user?.uid) {
      props.setLoggedIn(true);
      if (props.registering && !props.initialUserAdded) {
        await addInitialUser(user?.uid);
      }
      if (props.subscribedForUserData) {
        await subscribeUserData(user?.uid);
      }
    }

    props.setLoggedIn(false);

    if (props.initializing) {
      props.setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  });

  if (props.initializing) {
    return <LoadingScreen />;
  }
  if (props.loggedIn && !props.registering) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <Tab.Navigator
          screenOptions={() => ({
            headerShown: false,
            tabBarActiveTintColor: MIPink,
            tabBarLabelPosition: 'below-icon',
            tabBarLabelStyle: { fontSize: 12, fontFamily: 'Barlow' },
            tabBarStyle: {
              backgroundColor: Black,
              height: 60,
              opacity: 0.95,
            },
          })}>
          <Tab.Screen
            name="Matches"
            component={MatchesNavigation}
            options={{ tabBarIcon: HomeIcon }}
          />
          <Tab.Screen
            name="News"
            component={NewsNavigation}
            options={{ tabBarIcon: NewsIcon }}
          />
          <Tab.Screen
            name="Invest"
            component={InvestNavigation}
            options={{ tabBarIcon: InvestIcon }}
          />
          <Tab.Screen
            name="Academy"
            component={AcademyNavigation}
            options={{ tabBarIcon: AcademyIcon }}
          />
        </Tab.Navigator>
      </SafeAreaView>
    );
  } else {
    return (
      <Stack.Navigator
        screenOptions={{
          header: navigation => {
            if (
              navigation.route.name === 'Login' ||
              navigation.route.name === 'Onboarding'
            ) {
              return null;
            }
            return <TopNavigationBar navigation={navigation} />;
          },
        }}>
        {props.registering ? (
          <Stack.Screen
            name="Onboarding"
            component={OnboardingNavigation}
            initialParams={{ removeRegister: true }}
            options={{
              gestureDirection: 'horizontal',
              animation: 'slide_from_right',
              animationDuration: 1.2,
            }}
          />
        ) : (
          <>
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
        )}
      </Stack.Navigator>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  initializing: state.appReducer.initializing,
  loggedIn: state.appReducer.loggedIn,
  registering: state.appReducer.registering,
  initialUserAdded: state.appReducer.initialUserAdded,
  subscribedForUserData: state.appReducer.subscribedForUserData,
});

const mapDispatchToProps = {
  setInitializing,
  setLoggedIn,
  setFbUser,
};

const NavigatorConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navigator);

export { NavigatorConnected as Navigator };
