import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { SafeAreaView } from 'react-native';
import AcademyIcon from '../../assets/icons/BottomNavigationBarIcons/AcademyIcon';
import HomeIcon from '../../assets/icons/BottomNavigationBarIcons/HomeIcon';
import InvestIcon from '../../assets/icons/BottomNavigationBarIcons/InvestIcon';
import NewsIcon from '../../assets/icons/BottomNavigationBarIcons/NewsIcon';
import { MIPink } from '../../assets/styles';
import { Black } from '../../assets/styles/RegularTheme';
import AcademyNavigation from './AcademyNavigation';
import InvestNavigation from './InvestNavigation';
import MatchesNavigation from './MatchesNavigation';
import MenuNavigation from './MenuNavigation';
import NewsNavigation from './NewsNavigation';

const Tab = createBottomTabNavigator();

function AppContent() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <Tab.Navigator
        screenOptions={() => ({
          headerShown: false,
          tabBarActiveTintColor: MIPink,
          tabBarLabelPosition: 'below-icon',
          tabBarLabelStyle: { fontSize: 12, fontFamily: 'Barlow' },
          tabBarStyle: {
            backgroundColor: Black,
            height: 60,
            opacity: 0.95,
          },
        })}>
        <Tab.Screen
          name="Matches"
          component={MatchesNavigation}
          options={{ tabBarIcon: HomeIcon }}
        />
        <Tab.Screen
          name="News"
          component={NewsNavigation}
          options={{ tabBarIcon: NewsIcon }}
        />
        <Tab.Screen
          name="Invest"
          component={InvestNavigation}
          options={{ tabBarIcon: InvestIcon }}
        />
        <Tab.Screen
          name="Academy"
          component={AcademyNavigation}
          options={{ tabBarIcon: AcademyIcon }}
        />
        <Tab.Screen
          name="Menu"
          component={MenuNavigation}
          options={{
            tabBarItemStyle: { display: 'none' },
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

export default AppContent;
