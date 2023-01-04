import * as React from 'react';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import { TabNavigationBar } from '../../../components';
import { PortfolioScreen } from '../../../screens/Investing/PortfolioScreen';
import { ExploreScreen } from '../../../screens/Matches/ExploreScreen';
import OrdersNavigation from './OrdersNavigation';

export type InvestsNavigationParamList = {
  Portfolio: undefined;
  ExploreStocks: undefined;
  StockOrders: undefined;
};

const Tab = createMaterialTopTabNavigator<InvestsNavigationParamList>();

function InvestNavigation() {
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
      <Tab.Screen name="Portfolio" component={PortfolioScreen} />
      <Tab.Screen
        name="ExploreStocks"
        component={ExploreScreen}
        options={{ tabBarLabel: 'Explore' }}
      />
      <Tab.Screen
        name="StockOrders"
        component={OrdersNavigation}
        options={{ tabBarLabel: 'Orders' }}
      />
    </Tab.Navigator>
  );
}

export default InvestNavigation;
