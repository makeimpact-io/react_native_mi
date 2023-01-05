import * as React from 'react';

import { HomeScreen } from '../../../screens/Matches/HomeScreen';
import { ExploreScreen } from '../../../screens/Matches/ExploreScreen';
import { MatchesSearchScreen } from '../../../screens/Matches/MatchesSearchScreen';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import { TabNavigationBar } from '../../../components';

export type MatchesNavigationParamList = {
  Home: undefined;
  Explore: undefined;
  MatchesSearch: undefined;
};

const Tab = createMaterialTopTabNavigator<MatchesNavigationParamList>();

function MatchesNavigation() {
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
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: 'Matches' }}
      />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen
        name="MatchesSearch"
        component={MatchesSearchScreen}
        options={{ tabBarLabel: 'Search' }}
      />
    </Tab.Navigator>
  );
}

export default MatchesNavigation;
