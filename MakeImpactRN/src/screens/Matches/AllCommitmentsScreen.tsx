import * as React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Image,
  TouchableNativeFeedback,
} from 'react-native';
import { AppBackgroundColors } from '../../assets/styles/RegularTheme';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { AppState } from '../../state/store';
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import { AcademyHeadline } from '../../components';
import PinkWaveHeader from '../../assets/icons/PinkWaves/PinkWaveHeader';
import { RootStackNavigationParamList } from '../../navigation/App/AppContent';

type Props = ReturnType<typeof mapStateToProps> &
  NativeStackScreenProps<RootStackNavigationParamList, 'Commitments'>;

const AllCommitmentsScreen = (props: Props) => {
  const renderedCommitments = props.commitments.map(commitment => {
    return (
      <TouchableNativeFeedback
        onPress={() =>
          props.navigation.getParent()?.navigate('CommitmentCompanies', {
            commitment: commitment,
          })
        }
        key={commitment.id}>
        <Image
          style={styles.commitmentIcon}
          source={{ uri: commitment.iconLink }}
        />
      </TouchableNativeFeedback>
    );
  });

  return (
    <LinearGradient colors={AppBackgroundColors} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scroll}
          contentContainerStyle={styles.scrollContentContainer}>
          <PinkWaveHeader style={styles.pinkWave} />
          <View style={styles.headerContainer}>
            <AcademyHeadline text={'Commitments'} style={styles.header} />
          </View>
          <View style={styles.commitmentIconsContainer}>
            {renderedCommitments}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const mapStateToProps = (state: AppState) => ({
  commitments: state.dataReducer.commitments,
});

const mapDispatchToProps = {};

const AllCommitmentsScreenConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllCommitmentsScreen);

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
  commitmentIcon: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 10,
  },
  commitmentIconsContainer: {
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

export { AllCommitmentsScreenConnected as AllCommitmentsScreen };
