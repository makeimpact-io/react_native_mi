import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/Matches/HomeScreen';
import { TopNavigationBar } from '../components';

const Stack = createNativeStackNavigator();

function MatchesNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: navigation => {
          return <TopNavigationBar navigation={navigation} />;
        },
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

export default MatchesNavigation;
