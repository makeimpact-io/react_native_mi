import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { OnboardingBackgroundColors } from '../../assets/styles';

import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { AppState } from '../../state/store';
import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types';
import {
  OnboardingBottomNavigation,
  SecondaryText,
  Header,
  SDGActionButton,
} from '../../components';
import { updateGoals } from '../../api/firebase/user';
import { setRegistering } from '../../state/app/appSlice';
import { useState } from 'react';

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    route: any;
    navigation: NativeStackNavigationHelpers;
  };

const GoalsScreen = (props: Props) => {
  const [userGoals, setUserGoals] = useState<string[]>([]);
  const toggleGoal = (id: string) => {
    if (userGoals.includes(id)) {
      setUserGoals(userGoals.filter(g => g !== id));
    } else {
      setUserGoals(userGoals.concat(id));
    }
  };
  let sdgs = props.sdgs
    .sort(a => parseInt(a.id))
    .map(sdg => {
      return (
        <View style={styles.sdg}>
          <SDGActionButton
            key={sdg.id}
            onClick={() => toggleGoal(sdg.id)}
            active={userGoals.includes(sdg.id)}
            activeImage={sdg.greenImageLink}
            inactiveImage={sdg.blackImageLink}
          />
        </View>
      );
    });
  return (
    <LinearGradient
      colors={OnboardingBackgroundColors}
      style={styles.background}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.contentContainer}>
            <Header text={'Which values matter most to you?'} />
            <SecondaryText
              text={'Select at least 3 values which matter most to you.'}
            />
            <View style={styles.sdgsContainer}>{sdgs}</View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <OnboardingBottomNavigation
        navigation={props.navigation}
        nextPage={props.route.params.nextScreen}
        disabled={userGoals.length < 3}
        onClick={() => {
          updateGoals(userGoals);
          setRegistering(false);
        }}
        goBack={true}
      />
    </LinearGradient>
  );
};

const mapStateToProps = (state: AppState) => ({
  sdgs: state.dataReducer.sdgs,
});

const mapDispatchToProps = {
  setRegistering,
};

const GoalsScreenConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GoalsScreen);

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
  scrollView: {},
  scrollViewContainer: {},
  contentContainer: {
    display: 'flex',
  },
  sdg: {
    padding: 5,
  },
  sdgsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export { GoalsScreenConnected as GoalsScreen };
