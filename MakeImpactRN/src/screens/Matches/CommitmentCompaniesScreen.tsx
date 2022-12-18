import * as React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import { AppBackgroundColors } from '../../assets/styles';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { AppState } from '../../state/store';
import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types';
import { AcademyHeadline, CompanyListItem } from '../../components';
import { Commitment, Company } from '../../types';
import { useEffect, useState } from 'react';

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    route: any;
    navigation: NativeStackNavigationHelpers;
  };

const CommitmentCompaniesScreen = (props: Props) => {
  const commitment = props.route.params.commitment as Commitment;
  const [commitmentCompanies, setCommitmentCompanies] = useState<Company[]>([]);

  useEffect(() => {
    setCommitmentCompanies(
      props.companies.filter(company =>
        company.commitments.includes(commitment.id),
      ),
    );
  }, [commitment.id, props.companies]);

  const companiesToRender = commitmentCompanies.map(company => {
    return (
      <View style={styles.companyContainer} key={company.id}>
        <CompanyListItem
          company={company}
          sector={
            props.sectors.filter(sector => sector.id === company.sectorId)[0]
          }
          onClick={() =>
            props.navigation.navigate('CompanyDetails', { company: company })
          }
        />
      </View>
    );
  });

  return (
    <LinearGradient colors={AppBackgroundColors} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.headerContainer}>
            <AcademyHeadline text={commitment.title} style={styles.header} />
          </View>
          <View style={styles.companiesContainer}>{companiesToRender}</View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const mapStateToProps = (state: AppState) => ({
  companies: state.dataReducer.companies,
  sectors: state.dataReducer.sectors,
});

const mapDispatchToProps = {};

const CommitmentCompaniesScreenConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommitmentCompaniesScreen);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    paddingTop: 30,
  },
  container: {
    flex: 1,
    width: '90%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 10,
  },
  header: {
    fontSize: 28,
  },
  companiesContainer: {},
  scroll: {
    width: '100%',
  },
  companyContainer: {
    marginVertical: 6,
  },
});

export { CommitmentCompaniesScreenConnected as CommitmentCompaniesScreen };
