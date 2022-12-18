import * as React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import { AppBackgroundColors } from '../../assets/styles';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { AppState } from '../../state/store';
import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types';
import { AcademyHeadline, CompanyListItem } from '../../components';
import { Company, Sector } from '../../types';
import { useEffect, useState } from 'react';

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    route: any;
    navigation: NativeStackNavigationHelpers;
  };

const SectorCompaniesScreen = (props: Props) => {
  const sector = props.route.params.sector as Sector;
  const [sectorCompanies, setSectorCompanies] = useState<Company[]>([]);

  useEffect(() => {
    setSectorCompanies(
      props.companies.filter(company => company.sectorId === sector.id),
    );
  }, [props.companies, sector.id]);

  const companiesToRender = sectorCompanies.map(company => {
    return (
      <View style={styles.companyContainer} key={company.id}>
        <CompanyListItem
          company={company}
          sector={sector}
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
            <AcademyHeadline text={sector.name} style={styles.header} />
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

const SectorCompaniesScreenConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SectorCompaniesScreen);

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

export { SectorCompaniesScreenConnected as SectorCompaniesScreen };
