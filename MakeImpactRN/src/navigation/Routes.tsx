import * as React from 'react';
import { useState, useEffect } from 'react';

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { LoadingScreen } from '../screens/Utils/LoadingScreen';
import AppContent from './App/AppContent';
import { AuthContent } from './AuthContent';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppState } from '../state/store';
import { subscribeUserData } from '../api/firebase/user';
import { resetUser } from '../state/user/userSlice';
import { connect } from 'react-redux';

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

function Routes(props: Props) {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
  const [initializing, setInitializing] = useState(true);
  const [authenticating, setAuthenticating] = useState<boolean | undefined>();
  const resetUserState = props.resetUser;
  async function onAuthStateChanged(
    firebaseUser: React.SetStateAction<
      FirebaseAuthTypes.User | null | undefined
    >,
  ) {
    setUser(firebaseUser);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  });

  useEffect(() => {
    if (user?.uid !== undefined) {
      subscribeUserData(user?.uid);
    } else {
      resetUserState();
    }
  }, [resetUserState, user?.uid]);

  useEffect(() => {
    if (user !== null) {
      if (
        props.user.uid !== '' &&
        props.user.firstName !== '' &&
        props.user.lastName !== '' &&
        props.user.goals !== null &&
        props.user.goals.length >= 3 &&
        props.user.invested !== null &&
        props.user.gender !== null
      ) {
        setAuthenticating(false);
        setInitializing(false);
      } else {
      }
    } else if (user !== null) {
      setAuthenticating(false);
      setInitializing(false);
    } else {
      setAuthenticating(true);
      setInitializing(false);
    }
  }, [user, props.user]);

  if (initializing || authenticating === undefined) {
    return <LoadingScreen />;
  } else {
    return (
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        {!authenticating ? <AppContent /> : <AuthContent />}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  user: state.userReducer,
});

const mapDispatchToProps = {
  resetUser,
};

const RoutesConnected = connect(mapStateToProps, mapDispatchToProps)(Routes);

export { RoutesConnected as Routes };
