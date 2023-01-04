import * as React from 'react';
import { StyleSheet, SafeAreaView, View, FlatList, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SecondaryHeader, CompanyListItem } from '../../components';
import { connect } from 'react-redux';
import { AppState } from '../../state/store';
import { Company } from '../../types';
import {
  Black,
  MIPink,
  AppBackgroundColors,
} from '../../assets/styles/RegularTheme';
import { useEffect, useState } from 'react';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { MatchesNavigationParamList } from '../../navigation/App/SubNavigations/MatchesNavigation';

type Props = ReturnType<typeof mapStateToProps> &
  MaterialTopTabScreenProps<MatchesNavigationParamList, 'Home'>;

const HomeScreen = (props: Props) => {
  const [matchingCompanies, setMatchingCompanies] = useState<Company[]>([]);

  useEffect(() => {
    setMatchingCompanies(
      props.companies
        .filter(c => c.match !== 0)
        .sort((a, b) => b.match - a.match),
    );
  }, [props.companies]);
  const renderMatches = ({ item }: { item: any }) => {
    const company = item as Company;
    const sector = props.sectors.filter(s => s.id === company.sectorId)[0];
    return (
      <View style={styles.companyContainer}>
        <CompanyListItem
          company={company}
          sector={sector}
          match={company.match >= 0 ? company.match.toFixed(0) : 'Nah'}
          onClick={() =>
            props.navigation
              .getParent()
              ?.navigate('CompanyDetails', { company: company })
          }
        />
      </View>
    );
  };
  return (
    <LinearGradient colors={AppBackgroundColors} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.scrollStyle}
          nestedScrollEnabled={true}
          data={matchingCompanies}
          renderItem={renderMatches}
          keyExtractor={company => company.id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <View style={styles.headerContainer}>
                <Text style={styles.headerPink}>We are the</Text>
                <Text style={styles.headerBlack}>new generation</Text>
                <Text style={styles.headerPink}>of investors</Text>
              </View>
              <View style={styles.matchesHeaderContainer}>
                <SecondaryHeader text={'My matches'} />
              </View>
            </>
          }
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const mapStateToProps = (state: AppState) => ({
  companies: state.dataReducer.companies,
  sectors: state.dataReducer.sectors,
});

const mapDispatchToProps = {};

const HomeScreenConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    paddingTop: 80,
  },
  container: {
    flex: 1,
    width: '90%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  matchesHeaderContainer: {
    alignSelf: 'flex-start',
  },
  headerContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    paddingVertical: 10,
  },
  headerBlack: {
    fontFamily: 'Barlow',
    fontSize: 35,
    fontWeight: 'bold',
    color: Black,
    backgroundColor: MIPink,
    textAlign: 'center',
  },
  headerPink: {
    fontFamily: 'Barlow',
    fontSize: 35,
    fontWeight: 'bold',
    color: MIPink,
    textAlign: 'center',
  },
  scrollStyle: {
    width: '100%',
  },
  companyContainer: {
    paddingVertical: 5,
  },
});

export { HomeScreenConnected as HomeScreen };
