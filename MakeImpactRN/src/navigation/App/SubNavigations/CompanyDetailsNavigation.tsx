import * as React from 'react';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import { TabNavigationBar } from '../../../components';
import { CompanyStockDetails } from '../../../screens/Matches/CompanyDetails/CompanyStockDetails';
import { Company } from '../../../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackNavigationParamList } from '../AppContent';
import { CompanyStockMarkers } from '../../../screens/Matches/CompanyDetails/CompanyStockMarkers';

export type CompanyDetailsNavigationParamList = {
  Stocks: { company: Company };
  Markers: { company: Company };
};

const Tab = createMaterialTopTabNavigator<CompanyDetailsNavigationParamList>();

type Props = NativeStackScreenProps<
  RootStackNavigationParamList,
  'CompanyDetails'
>;

function CompanyDetailsNavigation(_props: Props) {
  const company = _props.route.params.company;
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
            isOnCompanyDetails={true}
          />
        );
      }}>
      <Tab.Screen
        name="Stocks"
        component={CompanyStockDetails}
        initialParams={{ company: company }}
        options={{ tabBarLabel: 'Stock info' }}
      />
      <Tab.Screen
        name="Markers"
        component={CompanyStockMarkers}
        initialParams={{ company: company }}
        options={{ tabBarLabel: '!mpact Markers' }}
      />
    </Tab.Navigator>
  );
}

export default CompanyDetailsNavigation;
