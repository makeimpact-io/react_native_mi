import * as React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Pressable,
  Text,
} from 'react-native';
import {
  AppBackgroundColors,
  MainTextWhite,
} from '../../../assets/styles/RegularTheme';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { AppState } from '../../../state/store';
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import { AcademyHeadline, CompanyListItem } from '../../../components';
import { Company } from '../../../types';
import { useEffect, useState } from 'react';
import { DescriptionModal } from '../../../components/Modals/DescriptionModal';
import QuestionMark from '../../../assets/icons/Utils/QuestionMark';
import PinkWaveHeader from '../../../assets/icons/PinkWaves/PinkWaveHeader';
import { RootStackNavigationParamList } from '../../../navigation/App/AppContent';

type Props = ReturnType<typeof mapStateToProps> &
  NativeStackScreenProps<
    RootStackNavigationParamList,
    'InvestingCommitmentCompanies'
  >;

const InvestingCommitmentCompanies = (props: Props) => {
  const commitment = props.route.params.commitment;
  const [commitmentCompanies, setCommitmentCompanies] = useState<Company[]>([]);
  const [showModal, setShowModal] = useState(false);

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
            props.navigation.navigate('CompanyDetailsStocks', {
              company: company,
            })
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
            <AcademyHeadline text={commitment.title} style={styles.title} />
            <DescriptionModal
              header={commitment.title}
              content={commitment.description}
              toggleModal={() => setShowModal(!showModal)}
              showModal={showModal}
            />
          </View>
          {commitmentCompanies.length !== 0 ? (
            <View style={styles.companiesContainer}>{companiesToRender}</View>
          ) : (
            <Text style={styles.noCompaniesText}>
              There are currently no companies belonging to this commitment.
            </Text>
          )}
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

const InvestingCommitmentCompaniesConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InvestingCommitmentCompanies);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
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
  noCompaniesText: {
    fontSize: 15,
    marginTop: 10,
    marginHorizontal: 15,
    textAlign: 'center',
    color: MainTextWhite,
  },
});

export { InvestingCommitmentCompaniesConnected as InvestingCommitmentCompanies };
