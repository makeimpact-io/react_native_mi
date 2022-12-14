import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  MainTextWhite,
  MIGreen,
  OnboardingBackgroundColors,
} from '../../assets/styles';

import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OnboardingBottomNavigation } from '../../components/NavigationBars/OnboardingBottomNavigation';
import { connect } from 'react-redux';
import { setGender } from '../../state/tempUser/tempUserSlice';
import { AppState } from '../../state/store';
import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types';
import { Header, SecondaryText, SelectionButton } from '../../components';
import { Black } from '../../assets/styles/RegularTheme';
import Gender from '../../utils/enums/Gender';
import { updateGender } from '../../api/firebase/user';

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    route: any;
    navigation: NativeStackNavigationHelpers;
  };

const GenderScreen = (props: Props) => {
  return (
    <LinearGradient
      colors={OnboardingBackgroundColors}
      style={styles.background}>
      <SafeAreaView style={styles.container}>
        <Header text={"What's your gender?"} />
        <SecondaryText
          text={'Tell us a bit more about how you define yourself.'}
        />
        <View style={styles.selectionButton}>
          <SelectionButton
            content={Gender.Male}
            backgroundColor={MainTextWhite}
            textColor={Black}
            backgroundColorSelected={MIGreen}
            textColorSelected={MainTextWhite}
            onClick={() => props.setGender(Gender.Male)}
            selected={props.gender === Gender.Male}
          />
        </View>
        <View style={styles.selectionButton}>
          <SelectionButton
            content={Gender.Female}
            backgroundColor={MainTextWhite}
            textColor={Black}
            backgroundColorSelected={MIGreen}
            textColorSelected={MainTextWhite}
            onClick={() => props.setGender(Gender.Female)}
            selected={props.gender === Gender.Female}
          />
        </View>
        <View style={styles.selectionButton}>
          <SelectionButton
            content={Gender.NonBinary}
            backgroundColor={MainTextWhite}
            textColor={Black}
            backgroundColorSelected={MIGreen}
            textColorSelected={MainTextWhite}
            onClick={() => props.setGender(Gender.NonBinary)}
            selected={props.gender === Gender.NonBinary}
          />
        </View>
        <View style={styles.selectionButton}>
          <SelectionButton
            content={Gender.PreferNotToSay}
            backgroundColor={MainTextWhite}
            textColor={Black}
            backgroundColorSelected={MIGreen}
            textColorSelected={MainTextWhite}
            onClick={() => props.setGender(Gender.PreferNotToSay)}
            selected={props.gender === Gender.PreferNotToSay}
          />
        </View>
      </SafeAreaView>
      <OnboardingBottomNavigation
        navigation={props.navigation}
        nextPage={props.route.params.nextScreen}
        onClick={() =>
          updateGender(props.gender ? props.gender : Gender.PreferNotToSay)
        }
        disabled={props.gender === null}
      />
    </LinearGradient>
  );
};

const mapStateToProps = (state: AppState) => ({
  gender: state.tempUserReducer.gender,
});

const mapDispatchToProps = {
  setGender,
};

const GenderScreenConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GenderScreen);

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
  selectionButton: {
    width: '90%',
    height: 50,
    marginVertical: 10,
  },
});

export { GenderScreenConnected as GenderScreen };
