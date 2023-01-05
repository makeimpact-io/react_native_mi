import * as React from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView } from 'react-native';
import { AppBackgroundColors } from '../../assets/styles/RegularTheme';
import LinearGradient from 'react-native-linear-gradient';
import { AcademyHeadline, SDGActionButton } from '../../components';
import { connect } from 'react-redux';
import { AppState } from '../../state/store';
import { useEffect, useState } from 'react';
import { updateGoals } from '../../api/firebase/user';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { MenuNavigationParamList } from '../../navigation/App/SubNavigations/MenuNavigation';

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  MaterialTopTabScreenProps<MenuNavigationParamList, 'Goals'>;

const UserGoalsScreen = (props: Props) => {
  const [userGoals, setUserGoals] = useState<string[]>(props.userGoals);

  const toggleGoal = (id: string) => {
    if (userGoals.includes(id) && userGoals.length > 3) {
      setUserGoals(userGoals.filter(g => g !== id));
    } else if (!userGoals.includes(id)) {
      setUserGoals(userGoals.concat([id]));
    }
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('beforeRemove', () => {
      updateGoals(userGoals);
    });
    return unsubscribe;
  }, [props.navigation, userGoals]);

  let goals = props.goals
    .map(sdg => {
      return {
        id: parseInt(sdg.id, 10),
        component: (
          <View style={styles.goal} key={sdg.id}>
            <SDGActionButton
              key={sdg.id}
              onClick={() => toggleGoal(sdg.id)}
              active={userGoals.includes(sdg.id)}
              activeImage={sdg.greenImageLink}
              inactiveImage={sdg.blackImageLink}
            />
          </View>
        ),
      };
    })
    .sort((a, b) => a.id - b.id);
  return (
    <LinearGradient colors={AppBackgroundColors} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <AcademyHeadline text={'My Values'} />
          <View style={styles.goalsContainer}>
            {goals.map(a => a.component)}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const mapStateToProps = (state: AppState) => ({
  userGoals: state.userReducer.goals,
  goals: state.dataReducer.sdgs,
});

const mapDispatchToProps = {};

const UserGoalsScreenConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserGoalsScreen);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    paddingTop: 120,
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
  goal: { padding: '1%' },
  goalsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export { UserGoalsScreenConnected as UserGoalsScreen };
