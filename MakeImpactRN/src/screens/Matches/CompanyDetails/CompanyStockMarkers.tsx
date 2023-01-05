import * as React from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView, Text } from 'react-native';
import {
  AppBackgroundColors,
  MainText,
  MIPink,
  White,
} from '../../../assets/styles/RegularTheme';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { AppState } from '../../../state/store';

import {
  CommitmentCard,
  CompanyDetailsHeader,
  SASBCard,
  SDGCard,
} from '../../../components';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { CompanyDetailsNavigationParamList } from '../../../navigation/App/SubNavigations/CompanyDetailsNavigation';
import { ImpactMarkersAccordion } from '../../../components/ImpactMarkersAccordion/ImpactMarkersAccordion';
import Commitments from '../../../assets/icons/ImpactMarkersIcons/Commitments';
import SDGs from '../../../assets/icons/ImpactMarkersIcons/SDGs';
import Flags from '../../../assets/icons/ImpactMarkersIcons/Flags';
import { useEffect, useState } from 'react';

type Props = ReturnType<typeof mapStateToProps> &
  MaterialTopTabScreenProps<CompanyDetailsNavigationParamList, 'Markers'>;

const CompanyStockMarkers = (props: Props) => {
  const company = props.route.params.company;
  const sector = props.sectors.filter(s => s.id === company?.sectorId)[0];

  const [renderedCommitments, setRenderedCommitments] = useState<any>();
  const [renderedSDGs, setRenderedSDGs] = useState<any>();

  const [renderedEnvFlags, setRenderedEnvFlags] = useState<any>();
  const [renderedSocialFlags, setRenderedSocialFlags] = useState<any>();
  const [renderedGovFlags, setRenderedGovFlags] = useState<any>();

  useEffect(() => {
    const commitments = props.commitments
      .filter(c => company.commitments.includes(c.id))
      .sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));
    setRenderedCommitments(
      commitments.map(c => <CommitmentCard commitment={c} key={c.id} />),
    );
  }, [company, props.commitments]);

  useEffect(() => {
    const goals = props.sdgs
      .filter(g => company.sdgs.includes(g.id))
      .sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));
    setRenderedSDGs(goals.map(g => <SDGCard sdg={g} key={g.id} />));
  }, [company, props.sdgs]);

  useEffect(() => {
    const goals = props.sdgs
      .filter(g => company.sdgs.includes(g.id))
      .sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));
    setRenderedSDGs(goals.map(g => <SDGCard sdg={g} key={g.id} />));
  }, [company, props.sdgs]);

  useEffect(() => {
    const sasbs = props.sasbs.filter(sasb => sector.sasbIds.includes(sasb.id));
    const envSASBs = sasbs.filter(sasb => sasb.category === 'Environmental 🌍');
    const govSASBs = sasbs.filter(sasb => sasb.category === 'Governance ⚖️');
    const socialSASBs = sasbs.filter(sasb => sasb.category === 'Social ❤️');
    setRenderedEnvFlags(
      envSASBs.map(sasb => <SASBCard flag={sasb} key={sasb.id} />),
    );
    setRenderedSocialFlags(
      socialSASBs.map(sasb => <SASBCard flag={sasb} key={sasb.id} />),
    );
    setRenderedGovFlags(
      govSASBs.map(sasb => <SASBCard flag={sasb} key={sasb.id} />),
    );
  }, [props.sasbs, sector.sasbIds]);

  return (
    <LinearGradient colors={AppBackgroundColors} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <CompanyDetailsHeader company={company} sector={sector} />
        <View style={styles.bufferZone} />
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <ImpactMarkersAccordion title={'Commitments'} icon={<Commitments />}>
            <View style={styles.markerContainer}>
              <Text style={styles.markerTitle}>
                {company.name} supports the following commitments.
              </Text>
              <Text style={styles.markerDescription}>
                The commitments are 14 different publicly available data
                commitments within sustainability. They can be seen as
                additional sustainable commitments from the companies besides
                the 17 Sustainable Development Goals.
              </Text>
              {renderedCommitments && renderedCommitments.length !== 0 ? (
                <ScrollView
                  horizontal={true}
                  style={styles.markerScroll}
                  showsHorizontalScrollIndicator={false}>
                  {renderedCommitments}
                </ScrollView>
              ) : (
                <Text style={styles.noItemsMsg}>
                  {company.name} doesn't support any commitments at this moment
                </Text>
              )}
            </View>
          </ImpactMarkersAccordion>
          <ImpactMarkersAccordion title={'SDGs'} icon={<SDGs />}>
            <View style={styles.markerContainer}>
              <Text style={styles.markerTitle}>
                {company.name} supports the following SDGs.
              </Text>
              <Text style={styles.markerDescription}>
                The Sustainable Development Goals are a blueprint to achieve a
                better and more sustainable future. They are also known as the
                Global Goals and were adopted by all the UN Member States in
                2015.
              </Text>
              {renderedSDGs && renderedSDGs.length !== 0 ? (
                <ScrollView
                  horizontal={true}
                  style={styles.markerScroll}
                  showsHorizontalScrollIndicator={false}>
                  {renderedSDGs}
                </ScrollView>
              ) : (
                <Text style={styles.noItemsMsg}>
                  {company.name} doesn't support any SDGs at this moment.
                </Text>
              )}
            </View>
          </ImpactMarkersAccordion>
          <ImpactMarkersAccordion title={'Flags'} icon={<Flags />}>
            <View style={styles.markerContainer}>
              <Text style={styles.markerTitle}>
                {company.name} red Flags 🚩
              </Text>
              <Text style={styles.markerDescription}>
                Encompass a broad range of sustainable issues, based on the SASB
                framework linked the sector of the company.
              </Text>
              <Text style={styles.markerTitle}>Environmental 🌍</Text>
              {renderedEnvFlags && renderedEnvFlags.length !== 0 ? (
                <ScrollView
                  horizontal={true}
                  style={styles.markerScroll}
                  showsHorizontalScrollIndicator={false}>
                  {renderedEnvFlags}
                </ScrollView>
              ) : (
                <Text style={styles.noItemsMsg}>
                  {sector.name} sector doesn't have any environmental red flags
                  at this moment.
                </Text>
              )}
              <Text style={styles.markerTitle}>Social ❤️</Text>
              {renderedSocialFlags && renderedSocialFlags.length !== 0 ? (
                <ScrollView
                  horizontal={true}
                  style={styles.markerScroll}
                  showsHorizontalScrollIndicator={false}>
                  {renderedSocialFlags}
                </ScrollView>
              ) : (
                <Text style={styles.noItemsMsg}>
                  {sector.name} sector doesn't have any Social red flags at this
                  moment.
                </Text>
              )}

              <Text style={styles.markerTitle}>Governance ⚖️</Text>
              {renderedGovFlags && renderedGovFlags.length !== 0 ? (
                <ScrollView
                  horizontal={true}
                  style={styles.markerScroll}
                  showsHorizontalScrollIndicator={false}>
                  {renderedGovFlags}
                </ScrollView>
              ) : (
                <Text style={styles.noItemsMsg}>
                  {sector.name} sector doesn't have any Governance red flags at
                  this moment.
                </Text>
              )}
            </View>
          </ImpactMarkersAccordion>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const mapStateToProps = (state: AppState) => ({
  companies: state.dataReducer.companies,
  sectors: state.dataReducer.sectors,
  commitments: state.dataReducer.commitments,
  sdgs: state.dataReducer.sdgs,
  sasbs: state.dataReducer.sasbs,
});

const mapDispatchToProps = {};

const CompanyStockMarkersConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompanyStockMarkers);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  bufferZone: {
    height: 40,
  },
  container: {
    flex: 1,
    width: '90%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  scroll: {
    width: '100%',
  },
  scrollContainer: {
    paddingTop: 40,
  },
  markerContainer: {},
  markerTitle: {
    color: White,
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Barlow',
    marginVertical: 5,
  },
  markerDescription: {
    color: White,
    fontSize: 12,
    fontFamily: 'Inter',
  },
  markerScroll: {
    marginTop: 10,
  },
  noItemsMsg: {
    marginTop: 10,
    color: MainText,
    backgroundColor: MIPink,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Barlow',
  },
});

export { CompanyStockMarkersConnected as CompanyStockMarkers };
