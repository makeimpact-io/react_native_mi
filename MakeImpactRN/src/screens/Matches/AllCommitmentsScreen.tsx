import * as React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Image,
  TouchableNativeFeedback,
} from 'react-native';
import { AppBackgroundColors } from '../../assets/styles';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { AppState } from '../../state/store';
import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types';
import { AcademyHeadline } from '../../components';

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    route: any;
    navigation: NativeStackNavigationHelpers;
  };

const AllCommitmentsScreen = (props: Props) => {
  const renderedCommitments = props.commitments.map(commitment => {
    return (
      <TouchableNativeFeedback
        onPress={() =>
          props.navigation.navigate('CommitmentCompanies', {
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
        <ScrollView showsVerticalScrollIndicator={false}>
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
  },
  header: {
    fontSize: 28,
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
    paddingVertical: 10,
  },
});

export { AllCommitmentsScreenConnected as AllCommitmentsScreen };
