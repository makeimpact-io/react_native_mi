import * as React from 'react';
import { useState, useEffect } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { LoginScreen } from '../screens';
import { TopNavigationBar } from '../components/TopNavigationBar/TopNavigationBar';
import { View, Text } from 'react-native';

const Stack = createNativeStackNavigator();

function Navigator() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  function onAuthStateChanged(
    user: React.SetStateAction<FirebaseAuthTypes.User | null | undefined>,
  ) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  });

  if (initializing) {
    return null;
  }

  if (!user) {
    return (
      <Stack.Navigator
        screenOptions={{
          header: () => <TopNavigationBar />,
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <View>
      <Text>Welcome</Text>
    </View>
  );
}

export default Navigator;
