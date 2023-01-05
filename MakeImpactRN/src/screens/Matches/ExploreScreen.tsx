import * as React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { AppState } from '../../state/store';
import {
  AcademyHeadline,
  DefaultButton,
  CompanyExtendedListItem,
  ImpactChampion,
  SecondaryHeader,
} from '../../components';
import { Company } from '../../types';
import { useEffect, useState } from 'react';
import {
  AppBackgroundColors,
  Black,
  CompanyDetailsGrey,
  LimeGreen,
  MainText,
  MIGreen,
  MIPink,
  White,
} from '../../assets/styles/RegularTheme';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { MatchesNavigationParamList } from '../../navigation/App/SubNavigations/MatchesNavigation';
import {
  getImpactChampions,
  getScienceBasedCompanies,
  getTop100Companies,
} from './helpers/exploreHelper';

type Props = ReturnType<typeof mapStateToProps> &
  MaterialTopTabScreenProps<MatchesNavigationParamList, 'Explore'>;

const ExploreScreen = (props: Props) => {
  const [impactChampions, setImpactChampions] = useState<Company[]>([]);
  const [top100Companies, setTop100Companies] = useState<Company[]>([]);
  const [scienceBasedCompanies, setScienceBasedCompanies] = useState<Company[]>(
    [],
  );
  const buttonStyles = [
    { background: White, text: MainText },
    { background: LimeGreen, text: MIGreen },
    { background: MainText, text: MIPink },
  ];

  useEffect(() => {
    setImpactChampions(getImpactChampions(props.companies));
    setTop100Companies(getTop100Companies(props.companies));
    setScienceBasedCompanies(getScienceBasedCompanies(props.companies));
  }, [props.companies]);

  const impactChampionsRendered = impactChampions.map(company => {
    return (
      <View style={styles.horizontalScrollItem} key={company.id}>
        <ImpactChampion
          company={company}
          sector={
            props.sectors.filter(sector => sector.id === company.sectorId)[0]
          }
          onClick={() =>
            props.navigation
              .getParent()
              ?.navigate('CompanyDetails', { company: company })
          }
        />
      </View>
    );
  });
  const top100CompaniesRendered = top100Companies.map(company => {
    return (
      <View style={styles.horizontalScrollItem} key={company.id}>
        <CompanyExtendedListItem
          company={company}
          sector={
            props.sectors.filter(sector => sector.id === company.sectorId)[0]
          }
          onClick={() =>
            props.navigation
              .getParent()
              ?.navigate('CompanyDetails', { company: company })
          }
        />
      </View>
    );
  });
  const scienceBasedCompaniesRendered = scienceBasedCompanies.map(company => {
    return (
      <View style={styles.horizontalScrollItem} key={company.id}>
        <CompanyExtendedListItem
          company={company}
          sector={
            props.sectors.filter(sector => sector.id === company.sectorId)[0]
          }
          onClick={() =>
            props.navigation
              .getParent()
              ?.navigate('CompanyDetails', { company: company })
          }
        />
      </View>
    );
  });
  const sectorsToRender = props.sectors.map(sector => {
    let index = parseInt(sector.id, 10) % 3;
    return (
      <View style={styles.sectorLinkContainer} key={sector.id}>
        <DefaultButton
          style={styles.sectorLink}
          content={sector.name}
          backgroundColor={buttonStyles[index].background}
          textColor={buttonStyles[index].text}
          action={() =>
            props.navigation
              .getParent()
              ?.navigate('SectorCompanies', { sector: sector })
          }
        />
      </View>
    );
  });

  return (
    <LinearGradient colors={AppBackgroundColors} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <AcademyHeadline text={'!MPACT CHAMPIONS'} style={styles.headline} />
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {impactChampionsRendered}
          </ScrollView>
          <View style={styles.commitmentsCompaniesContainer}>
            <SecondaryHeader
              text={'Explore by Commitments'}
              style={styles.commitmentsHeader}
            />
            <View style={styles.sectorHeadlineContainer}>
              <AcademyHeadline
                text={'Global Top 100'}
                style={styles.sectorHeadline}
              />
              <TouchableWithoutFeedback
                onPress={() =>
                  props.navigation
                    .getParent()
                    ?.navigate('CommitmentCompanies', {
                      commitment: props.commitments.find(a => a.id === '1'),
                    })
                }>
                <Text style={styles.viewAllButton}>View All</Text>
              </TouchableWithoutFeedback>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {top100CompaniesRendered}
            </ScrollView>
            <View style={styles.sectorHeadlineContainer}>
              <AcademyHeadline
                text={'Science Based Targets'}
                style={styles.sectorHeadline}
              />
              <TouchableWithoutFeedback
                onPress={() =>
                  props.navigation
                    .getParent()
                    ?.navigate('CommitmentCompanies', {
                      commitment: props.commitments.find(a => a.id === '2'),
                    })
                }>
                <Text style={styles.viewAllButton}>View All</Text>
              </TouchableWithoutFeedback>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {scienceBasedCompaniesRendered}
            </ScrollView>
          </View>
          <View style={styles.viewAllButtonContainer}>
            <DefaultButton
              content={'VIEW ALL COMMITMENTS'}
              backgroundColor={MIPink}
              textColor={Black}
              allCaps={true}
              action={() =>
                props.navigation.getParent()?.navigate('Commitments')
              }
            />
          </View>
          <View style={styles.sectorHeadlineContainer}>
            <AcademyHeadline
              text={'Explore By Sectors'}
              style={styles.sectorHeadline}
            />
            <TouchableWithoutFeedback
              onPress={() => props.navigation.getParent()?.navigate('Sectors')}>
              <Text style={styles.viewAllButton}>View All</Text>
            </TouchableWithoutFeedback>
          </View>
          <View>
            <ScrollView
              style={styles.sectorScroll}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {sectorsToRender.slice(0, sectorsToRender.length / 4)}
            </ScrollView>
            <ScrollView
              style={styles.sectorScroll}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {sectorsToRender.slice(
                sectorsToRender.length / 4,
                (sectorsToRender.length / 4) * 2,
              )}
            </ScrollView>
            <ScrollView
              style={styles.sectorScroll}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {sectorsToRender.slice(
                (sectorsToRender.length / 4) * 2,
                (sectorsToRender.length / 4) * 3,
              )}
            </ScrollView>
            <ScrollView
              style={styles.sectorScroll}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {sectorsToRender.slice(
                (sectorsToRender.length / 4) * 3,
                (sectorsToRender.length / 4) * 4,
              )}
            </ScrollView>
          </View>
          <View style={styles.viewAllButtonContainer}>
            <DefaultButton
              content={'VIEW ALL SECTORS'}
              backgroundColor={MIPink}
              textColor={Black}
              allCaps={true}
              action={() => props.navigation.getParent()?.navigate('Sectors')}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const mapStateToProps = (state: AppState) => ({
  companies: state.dataReducer.companies,
  sectors: state.dataReducer.sectors,
  commitments: state.dataReducer.commitments,
});

const mapDispatchToProps = {};

const ExploreScreenConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExploreScreen);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    paddingTop: 80,
  },
  container: {
    flex: 1,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headline: {
    fontSize: 28,
    marginBottom: 14,
    paddingLeft: 15,
  },
  horizontalScrollItem: {
    paddingHorizontal: 10,
  },
  scrollView: {
    width: '100%',
  },
  sectorHeadline: {
    fontSize: 22,
    paddingLeft: 15,
  },
  sectorHeadlineContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingVertical: 10,
  },
  viewAllButton: {
    fontSize: 11,
    fontWeight: '500',
    fontFamily: 'Barlow',
    color: CompanyDetailsGrey,
    paddingRight: 15,
  },
  commitmentsHeader: {
    textAlign: 'left',
    paddingLeft: 15,
  },
  commitmentsCompaniesContainer: {
    paddingTop: 30,
  },
  viewAllButtonContainer: {
    width: 200,
    height: 50,
    marginVertical: 20,
    alignSelf: 'center',
  },
  sectorLinkContainer: {
    flex: 1,
    height: 35,
    marginHorizontal: 6,
  },
  sectorScroll: {
    marginVertical: 8,
  },
  sectorLink: {
    paddingHorizontal: 20,
  },
});

export { ExploreScreenConnected as ExploreScreen };
