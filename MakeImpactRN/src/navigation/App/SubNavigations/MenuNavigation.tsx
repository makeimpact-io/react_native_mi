import * as React from 'react';

import { MenuScreen } from '../../../screens/Menu/ProfileScreen';
import { UserGoalsScreen } from '../../../screens/Menu/UserGoalsScreen';
import { AboutScreen } from '../../../screens/Menu/AboutScreen';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import { TabNavigationBar } from '../../../components';

export type MenuNavigationParamList = {
  Profile: undefined;
  Goals: undefined;
  About: undefined;
};

const Tab = createMaterialTopTabNavigator<MenuNavigationParamList>();

function MenuNavigation() {
  return (
    <Tab.Navigator
      tabBar={(props: MaterialTopTabBarProps) => {
        return (
          <TabNavigationBar
            descriptors={props.descriptors}
            layout={props.layout}
            position={props.position}
            jumpTo={props.jumpTo}
            state={props.state}
            navigation={props.navigation}
          />
        );
      }}>
      <Tab.Screen name="Profile" component={MenuScreen} />
      <Tab.Screen
        name="Goals"
        component={UserGoalsScreen}
        options={{ tabBarLabel: 'My values' }}
      />
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{ tabBarLabel: 'About m!' }}
      />
    </Tab.Navigator>
  );
}

export default MenuNavigation;
