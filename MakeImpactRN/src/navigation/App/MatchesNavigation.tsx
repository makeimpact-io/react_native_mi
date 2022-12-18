import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../../screens/Matches/HomeScreen';
import { TabNavigationBar, TopNavigationBar } from '../../components';
import { CompanyDetails } from '../../screens/Matches/CompanyDetails';
import { UnderConstruction } from '../../screens/Construction/UnderConstruction';
import { ExploreScreen } from '../../screens/Matches/ExploreScreen';
import { AllCommitmentsScreen } from '../../screens/Matches/AllCommitmentsScreen';
import { AllSectorsScreen } from '../../screens/Matches/AllSectorsScreen';
import { CommitmentCompaniesScreen } from '../../screens/Matches/CommitmentCompaniesScreen';
import { SectorCompaniesScreen } from '../../screens/Matches/SectorCompaniesScreen';

const Stack = createNativeStackNavigator();

function MatchesNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: navigation => {
          return ['Home', 'Explore', 'WatchList'].includes(
            navigation.route.name,
          ) ? (
            <>
              <TopNavigationBar navigation={navigation} hideGoBack={true} />
              <TabNavigationBar
                navigation={navigation}
                endPoints={[
                  { name: 'Matches', route: 'Home' },
                  { name: 'Explore', route: 'Explore' },
                  { name: 'Watch List', route: 'WatchList' },
                ]}
              />
            </>
          ) : (
            <TopNavigationBar navigation={navigation} />
          );
        },
        headerTransparent: true,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Explore" component={ExploreScreen} />
      <Stack.Screen name="WatchList" component={UnderConstruction} />
      <Stack.Screen name="CompanyDetails" component={CompanyDetails} />
      <Stack.Screen name="Commitments" component={AllCommitmentsScreen} />
      <Stack.Screen
        name="CommitmentCompanies"
        component={CommitmentCompaniesScreen}
      />
      <Stack.Screen name="SectorCompanies" component={SectorCompaniesScreen} />
      <Stack.Screen name="Sectors" component={AllSectorsScreen} />
    </Stack.Navigator>
  );
}

export default MatchesNavigation;
