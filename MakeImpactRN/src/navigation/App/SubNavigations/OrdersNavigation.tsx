import * as React from 'react';

import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import { OrdersNavigationBar } from '../../../components/NavigationBars/OrdersNavigationBar';
import ActiveOrders from '../../../assets/icons/OrderIcons/ActiveOrders';
import TradesIcon from '../../../assets/icons/OrderIcons/TradesIcon';
import { ActiveOrdersScreen } from '../../../screens/Investing/Orders/ActiveOrdersScreen';
import { OrderHistoryScreen } from '../../../screens/Investing/Orders/OrderHistoryScreen';

export type OrdersNavigationParamList = {
  ActiveOrders: undefined;
  Trades: undefined;
};

const Tab = createMaterialTopTabNavigator<OrdersNavigationParamList>();

function OrdersNavigation() {
  return (
    <Tab.Navigator
      tabBar={(props: MaterialTopTabBarProps) => {
        return (
          <OrdersNavigationBar
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
        name="ActiveOrders"
        component={ActiveOrdersScreen}
        options={{
          tabBarIcon: ({ color }) => <ActiveOrders fill={color} />,
          title: 'Active Orders',
        }}
      />
      <Tab.Screen
        name="Trades"
        component={OrderHistoryScreen}
        options={{
          tabBarIcon: ({ color }) => <TradesIcon fill={color} />,
          title: 'Trades & Transactions',
        }}
      />
    </Tab.Navigator>
  );
}

export default OrdersNavigation;
