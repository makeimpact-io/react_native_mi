import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TopNavigationBar } from '../../components';
import { MenuScreen } from '../../screens/Menu/MenuScreen';

const Stack = createNativeStackNavigator();

function MenuNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: navigation => {
          return <TopNavigationBar navigation={navigation} />;
        },
      }}>
      <Stack.Screen name="Home" component={MenuScreen} />
    </Stack.Navigator>
  );
}

export default MenuNavigation;
