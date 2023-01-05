import * as React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Image,
  TouchableNativeFeedback,
} from 'react-native';
import { AppBackgroundColors } from '../../../assets/styles/RegularTheme';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { AppState } from '../../../state/store';
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import { AcademyHeadline } from '../../../components';
import PinkWaveHeader from '../../../assets/icons/PinkWaves/PinkWaveHeader';
import { RootStackNavigationParamList } from '../../../navigation/App/AppContent';

type Props = ReturnType<typeof mapStateToProps> &
  NativeStackScreenProps<RootStackNavigationParamList, 'InvestingSectors'>;

const InvestingSectorsScreen = (props: Props) => {
  const renderedSectors = props.sectors.map(sector => {
    return (
      <TouchableNativeFeedback
        key={sector.id}
        onPress={() =>
          props.navigation.navigate('InvestingSectorCompanies', {
            sector: sector,
          })
        }>
        <Image style={styles.sectorIcon} source={{ uri: sector.iconLink }} />
      </TouchableNativeFeedback>
    );
  });

  return (
    <LinearGradient colors={AppBackgroundColors} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scroll}
          contentContainerStyle={styles.scrollContainer}>
          <PinkWaveHeader style={styles.pinkWave} />
          <View style={styles.headerContainer}>
            <AcademyHeadline text={'Sectors'} style={styles.header} />
          </View>
          <View style={styles.sectorIconsContainer}>{renderedSectors}</View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const mapStateToProps = (state: AppState) => ({
  sectors: state.dataReducer.sectors,
});

const mapDispatchToProps = {};

const InvestingSectorsScreenConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InvestingSectorsScreen);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  pinkWave: {
    width: '100%',
    marginTop: -30,
  },
  header: {
    fontSize: 28,
    paddingLeft: 30,
    paddingTop: 10,
  },
  sectorIcon: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 10,
  },
  sectorIconsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    flex: 1,
  },
  scroll: {
    width: '100%',
    height: '100%',
  },
  scrollContentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { InvestingSectorsScreenConnected as InvestingSectorsScreen };
