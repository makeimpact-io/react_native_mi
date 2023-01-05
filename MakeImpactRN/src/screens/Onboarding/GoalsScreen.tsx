import * as React from 'react';
import { ScrollView, StyleSheet, View, SafeAreaView } from 'react-native';
import { OnboardingBackgroundColors } from '../../assets/styles/RegularTheme';

import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { AppState } from '../../state/store';
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import {
  OnboardingBottomNavigation,
  SecondaryText,
  Header,
  SDGActionButton,
} from '../../components';
import { updateGoals } from '../../api/firebase/user';
import { setRegistering } from '../../state/app/appSlice';
import { useState } from 'react';
import { LoadingScreen } from '../Utils/LoadingScreen';
import { AuthorizedStackParamList } from '../../navigation/AuthContent';

type Props = ReturnType<typeof mapStateToProps> &
  NativeStackScreenProps<AuthorizedStackParamList, 'Goals'>;

const GoalsScreen = (props: Props) => {
  const [userGoals, setUserGoals] = useState<string[]>(
    props.userGoals === null ? [] : props.userGoals,
  );
  const [loading, setLoading] = useState(false);

  const toggleGoal = (id: string) => {
    if (userGoals.includes(id)) {
      setUserGoals(userGoals.filter(g => g !== id));
    } else {
      setUserGoals(userGoals.concat(id));
    }
  };

  let sdgs = props.sdgs
    .concat()
    .sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10))
    .map(sdg => {
      return (
        <View style={styles.sdg} key={sdg.id}>
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
        {loading && <LoadingScreen />}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContainer}
          showsVerticalScrollIndicator={false}>
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
        goBack={() => props.navigation.goBack()}
        disabled={userGoals.length < 3}
        onClick={() => {
          updateGoals(userGoals);
          setLoading(true);
        }}
      />
    </LinearGradient>
  );
};

const mapStateToProps = (state: AppState) => ({
  sdgs: state.dataReducer.sdgs,
  userGoals: state.userReducer.goals,
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
  sdg: { padding: '1%' },
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
