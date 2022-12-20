import * as React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Pressable,
} from 'react-native';
import { AppBackgroundColors } from '../../assets/styles';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { AppState } from '../../state/store';
import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types';
import { AcademyHeadline, CompanyListItem } from '../../components';
import { Company, Sector } from '../../types';
import { useEffect, useState } from 'react';
import PinkWaveHeader from '../../assets/icons/PinkWaves/PinkWaveHeader';
import QuestionMark from '../../assets/icons/Utils/QuestionMark';
import { DescriptionModal } from '../../components/Modals/DescriptionModal';

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    route: any;
    navigation: NativeStackNavigationHelpers;
  };

const SectorCompaniesScreen = (props: Props) => {
  const sector = props.route.params.sector as Sector;
  const [sectorCompanies, setSectorCompanies] = useState<Company[]>([]);
  const [showModal, setShowModal] = useState(false);

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
            <PinkWaveHeader style={styles.pinkWave} />
            <View style={styles.headerContent}>
              <View />
              <Pressable
                onPress={() => setShowModal(!showModal)}
                style={styles.questionMarkContainer}>
                <QuestionMark />
              </Pressable>
            </View>
            <AcademyHeadline text={sector.name} style={styles.title} />
            <DescriptionModal
              header={sector.name}
              content={sector.description}
              toggleModal={() => setShowModal(!showModal)}
              showModal={showModal}
            />
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
  pinkWave: {
    position: 'absolute',
  },
  container: {
    flex: 1,
    width: '100%',
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
  headerContent: {
    width: '100%',
    height: 80,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    marginTop: 10,
    marginLeft: 20,
  },
  companiesContainer: {
    alignItems: 'center',
  },
  scroll: {
    width: '100%',
  },
  companyContainer: {
    marginVertical: 6,
    width: '90%',
  },
  questionMarkContainer: {
    marginRight: 20,
  },
});

export { SectorCompaniesScreenConnected as SectorCompaniesScreen };
