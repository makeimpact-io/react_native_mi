import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TopNavigationBar } from '../../components';
import { HomeScreen } from '../../screens/Academy/HomeScreen';
import { ArticleScreen } from '../../screens/Academy/ArticleScreen';
import { CategoryScreen } from '../../screens/Academy/CategoryScreen';

const Stack = createNativeStackNavigator();

function AcademyNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: navigation => {
          return <TopNavigationBar navigation={navigation} />;
        },
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Article" component={ArticleScreen} />
      <Stack.Screen name="Category" component={CategoryScreen} />
    </Stack.Navigator>
  );
}

export default AcademyNavigation;
