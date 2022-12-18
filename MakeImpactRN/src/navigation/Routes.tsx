import * as React from 'react';
import { useState, useEffect } from 'react';

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { LoadingScreen } from '../screens/Utils/LoadingScreen';
import AppContent from './App/AppContent';
import AuthContent from './AuthContent';
import { SafeAreaView } from 'react-native-safe-area-context';
import store from '../state/store';
import { setRegistering } from '../state/app/appSlice';
import { subscribeUserData } from '../api/firebase/user';

export function Routes() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
  const [initializing, setInitializing] = useState(true);

  async function onAuthStateChanged(
    firebaseUser: React.SetStateAction<
      FirebaseAuthTypes.User | null | undefined
    >,
  ) {
    setUser(firebaseUser);
    if (initializing) {
      setInitializing(false);
    }
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  });

  useEffect(() => {
    if (user?.uid !== undefined) {
      subscribeUserData(user?.uid);
    }
  }, [user?.uid]);

  useEffect(() => {
    const stateUser = store.getState().userReducer;
    if (
      !stateUser.invested == null ||
      stateUser.goals.length < 3 ||
      !stateUser.gender == null
    ) {
      store.dispatch(setRegistering(true));
    } else {
      store.dispatch(setRegistering(false));
    }
  }, []);

  if (initializing) {
    return <LoadingScreen />;
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      {user && !store.getState().appReducer.registering ? (
        <AppContent />
      ) : (
        <AuthContent />
      )}
    </SafeAreaView>
  );
}
