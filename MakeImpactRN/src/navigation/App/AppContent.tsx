import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import * as React from 'react';
import { SafeAreaView } from 'react-native';
import AcademyIcon from '../../assets/icons/BottomNavigationBarIcons/AcademyIcon';
import HomeIcon from '../../assets/icons/BottomNavigationBarIcons/HomeIcon';
import InvestIcon from '../../assets/icons/BottomNavigationBarIcons/InvestIcon';
import NewsIcon from '../../assets/icons/BottomNavigationBarIcons/NewsIcon';
import { Black, MIPink } from '../../assets/styles/RegularTheme';
import { TopNavigationBar } from '../../components';
import { ArticleScreen } from '../../screens/Academy/ArticleScreen';
import { CategoryScreen } from '../../screens/Academy/CategoryScreen';
import { HomeScreen } from '../../screens/Academy/HomeScreen';
import { BuyStocksScreen } from '../../screens/Investing/TradeStocks/BuyStocksScreen';
import { CompanyStockDataScreen } from '../../screens/Investing/CompanyStockDataScreen';
import { SellStocksScreen } from '../../screens/Investing/TradeStocks/SellStocksScreen';
import { AllCommitmentsScreen } from '../../screens/Matches/AllCommitmentsScreen';
import { AllSectorsScreen } from '../../screens/Matches/AllSectorsScreen';
import { CommitmentCompaniesScreen } from '../../screens/Matches/CommitmentCompaniesScreen';
import { SectorCompaniesScreen } from '../../screens/Matches/SectorCompaniesScreen';
import { PrivacyPolicyScreen } from '../../screens/Menu/AboutScreens/PrivacyPolicyScreen';
import { SDGsScreen } from '../../screens/Menu/AboutScreens/SDGsScreen';
import InvestNavigation from './SubNavigations/InvestNavigation';
import MatchesNavigation from './SubNavigations/MatchesNavigation';
import MenuNavigation from './SubNavigations/MenuNavigation';
import { UnderConstruction } from '../../screens/Construction/UnderConstruction';
import {
  AcademyArticle,
  AcademyCategory,
  Commitment,
  Company,
  Sector,
} from '../../types';
import CompanyDetailsNavigation from './SubNavigations/CompanyDetailsNavigation';
import { InvestingCompanyDetailsScreen } from '../../screens/Investing/Explore/InvestingCompanyDetailsScreen';
import { InvestingCommitmentsScreen } from '../../screens/Investing/Explore/InvestingCommitmentsScreen';
import { InvestingSectorsScreen } from '../../screens/Investing/Explore/InvestingSectorsScreen';
import { InvestingCommitmentCompanies } from '../../screens/Investing/Explore/InvestingCommitmentCompanies';
import { InvestingSectorCompanies } from '../../screens/Investing/Explore/InvestingSectorCompanies';

export type BottomTabNavigationParamList = {
  Matches: undefined;
  News: undefined;
  Invest: undefined;
  Academy: undefined;
};

export type RootStackNavigationParamList = {
  Tabs: { screen?: string; params?: { screen?: string } };
  Commitments: undefined;
  CompanyDetails: { company: Company };
  CommitmentCompanies: { commitment: Commitment };
  SectorCompanies: { sector: Sector };
  Sectors: undefined;
  CompanyPositions: {
    company: Company;
    stocks: number;
    singleStockPrice: string;
    marketValue: string;
    totalReturn: string;
    positionChange: string;
    currency: string;
  };
  BuyStock: { company: Company; sector: Sector };
  SellStock: { company: Company; sector: Sector; availableStocks: number };
  PrivacyPolicy: undefined;
  SDGS: undefined;
  Menu: undefined;
  Article: { article: AcademyArticle };
  Category: { category: AcademyCategory };
  CompanyDetailsStocks: { company: Company };
  InvestingCommitments: undefined;
  InvestingCommitmentCompanies: { commitment: Commitment };
  InvestingSectors: undefined;
  InvestingSectorCompanies: { sector: Sector };
};

const Stack = createNativeStackNavigator<RootStackNavigationParamList>();
const Tab = createBottomTabNavigator<BottomTabNavigationParamList>();

function AppContent() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <Stack.Navigator
        screenOptions={{
          header: (props: NativeStackHeaderProps) => {
            return <TopNavigationBar navigation={props} />;
          },
        }}>
        <Stack.Screen name="Tabs" component={MainTabsNavigator} />
        <Stack.Group key={'Matches'}>
          <Stack.Screen name="Commitments" component={AllCommitmentsScreen} />
          <Stack.Screen
            name="CompanyDetails"
            component={CompanyDetailsNavigation}
          />
          <Stack.Screen
            name="CommitmentCompanies"
            component={CommitmentCompaniesScreen}
          />
          <Stack.Screen
            name="SectorCompanies"
            component={SectorCompaniesScreen}
          />
          <Stack.Screen name="Sectors" component={AllSectorsScreen} />
        </Stack.Group>
        <Stack.Group key={'Investing'}>
          <Stack.Screen
            name="CompanyPositions"
            component={CompanyStockDataScreen}
          />
          <Stack.Screen name="BuyStock" component={BuyStocksScreen} />
          <Stack.Screen name="SellStock" component={SellStocksScreen} />
          <Stack.Screen
            name="CompanyDetailsStocks"
            component={InvestingCompanyDetailsScreen}
          />
          <Stack.Screen
            name="InvestingCommitments"
            component={InvestingCommitmentsScreen}
          />
          <Stack.Screen
            name="InvestingCommitmentCompanies"
            component={InvestingCommitmentCompanies}
          />
          <Stack.Screen
            name="InvestingSectors"
            component={InvestingSectorsScreen}
          />
          <Stack.Screen
            name="InvestingSectorCompanies"
            component={InvestingSectorCompanies}
          />
        </Stack.Group>
        <Stack.Group key={'Menu'}>
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
          <Stack.Screen name="SDGS" component={SDGsScreen} />
          <Stack.Screen name="Menu" component={MenuNavigation} />
        </Stack.Group>
        <Stack.Group key={'Academy'}>
          <Stack.Screen name="Article" component={ArticleScreen} />
          <Stack.Screen name="Category" component={CategoryScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </SafeAreaView>
  );
}

const MainTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,
        tabBarActiveTintColor: MIPink,
        tabBarLabelPosition: 'below-icon',
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Barlow',
        },
        tabBarStyle: {
          backgroundColor: Black,
          height: 60,
          opacity: 0.95,
          borderWidth: 0,
          shadowColor: Black,
          borderColor: Black,
        },
      })}>
      <Tab.Screen
        name="Matches"
        component={MatchesNavigation}
        options={{ tabBarIcon: HomeIcon }}
      />
      <Tab.Screen
        name="News"
        component={UnderConstruction}
        options={{ tabBarIcon: NewsIcon }}
      />
      <Tab.Screen
        name="Invest"
        component={InvestNavigation}
        options={{ tabBarIcon: InvestIcon }}
      />
      <Tab.Screen
        name="Academy"
        component={HomeScreen}
        options={{ tabBarIcon: AcademyIcon }}
      />
    </Tab.Navigator>
  );
};

export default AppContent;
