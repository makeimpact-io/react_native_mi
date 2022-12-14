import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TopNavigationBar } from '../components';
import { UnderConstruction } from '../screens/Construction/UnderConstruction';

const Stack = createNativeStackNavigator();

function AcademyNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: navigation => {
          return <TopNavigationBar navigation={navigation} />;
        },
      }}>
      <Stack.Screen name="Home" component={UnderConstruction} />
    </Stack.Navigator>
  );
}

export default AcademyNavigation;
