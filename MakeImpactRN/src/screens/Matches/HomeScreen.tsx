import * as React from 'react';
import { StyleSheet, SafeAreaView, View, FlatList, Text } from 'react-native';
import { AppBackgroundColors } from '../../assets/styles';
import LinearGradient from 'react-native-linear-gradient';
import { SecondaryHeader } from '../../components';
import { connect } from 'react-redux';
import { AppState } from '../../state/store';
import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types';
import { Company } from '../../types';
import { CompanyListItem } from '../../components/Company/CompanyListItem';
import { Black, MIPink } from '../../assets/styles/RegularTheme';
import { useEffect, useState } from 'react';

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    route: any;
    navigation: NativeStackNavigationHelpers;
  };

const HomeScreen = (props: Props) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const renderMatches = ({ item }: { item: any }) => {
    const company = item as Company;
    const sector = props.sectors.filter(s => s.id === company.sectorId)[0];
    return (
      <View style={styles.companyContainer}>
        <CompanyListItem
          company={company}
          sector={sector}
          match={company.match ? company.match.toFixed(0) : 'Nah'}
        />
      </View>
    );
  };

  useEffect(() => {
    let companiesToEdit = props.companies.map(company => {
      let newCompany = company;
      let match = 0;
      for (let i = 0; i < props.userGoals.length; i++) {
        const userGoalId = props.userGoals[i];
        if (newCompany.sdgs.includes(userGoalId)) {
          match += (1 / props.userGoals.length) * 100;
        }
      }
      newCompany.match = match;
      console.log(newCompany.match);
      return newCompany;
    });
    setCompanies(companiesToEdit);
  }, [props.companies, props.userGoals]);

  return (
    <LinearGradient colors={AppBackgroundColors} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <View style={styles.navbarContainer} />
        <FlatList
          style={styles.scrollStyle}
          nestedScrollEnabled={true}
          data={companies}
          renderItem={renderMatches}
          keyExtractor={company => company.id}
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
  userGoals: state.userReducer.goals,
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
  navbarContainer: {
    height: 50,
  },
  scrollStyle: {
    width: '100%',
  },
  companyContainer: {
    paddingVertical: 5,
  },
});

export { HomeScreenConnected as HomeScreen };
