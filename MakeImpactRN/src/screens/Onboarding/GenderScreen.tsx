import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  MainTextWhite,
  MIGreen,
  OnboardingBackgroundColors,
  Black,
} from '../../assets/styles/RegularTheme';

import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import {
  OnboardingBottomNavigation,
  Header,
  SecondaryText,
  SelectionButton,
} from '../../components';
import Gender from '../../utils/enums/Gender';
import { updateGender } from '../../api/firebase/user';
import { useState } from 'react';
import { AppState } from '../../state/store';
import GenderIcon from '../../assets/icons/Onboarding/GenderIcon';
import { AuthorizedStackParamList } from '../../navigation/AuthContent';

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  NativeStackScreenProps<AuthorizedStackParamList, 'Gender'>;

const GenderScreen = (props: Props) => {
  const [gender, setGender] = useState<Gender | null>(props.gender);
  return (
    <LinearGradient
      colors={OnboardingBackgroundColors}
      style={styles.background}>
      <SafeAreaView style={styles.container}>
        <Header text={"What's your gender?"} />
        <SecondaryText
          text={'Tell us a bit more about how you define yourself.'}
        />
        <GenderIcon height={120} width={120} style={styles.genderIcon} />
        <View style={styles.selectionButton}>
          <SelectionButton
            content={Gender.Male}
            backgroundColor={MainTextWhite}
            textColor={Black}
            backgroundColorSelected={MIGreen}
            textColorSelected={MainTextWhite}
            onClick={() => setGender(Gender.Male)}
            selected={gender === Gender.Male}
          />
        </View>
        <View style={styles.selectionButton}>
          <SelectionButton
            content={Gender.Female}
            backgroundColor={MainTextWhite}
            textColor={Black}
            backgroundColorSelected={MIGreen}
            textColorSelected={MainTextWhite}
            onClick={() => setGender(Gender.Female)}
            selected={gender === Gender.Female}
          />
        </View>
        <View style={styles.selectionButton}>
          <SelectionButton
            content={Gender.NonBinary}
            backgroundColor={MainTextWhite}
            textColor={Black}
            backgroundColorSelected={MIGreen}
            textColorSelected={MainTextWhite}
            onClick={() => setGender(Gender.NonBinary)}
            selected={gender === Gender.NonBinary}
          />
        </View>
        <View style={styles.selectionButton}>
          <SelectionButton
            content={Gender.PreferNotToSay}
            backgroundColor={MainTextWhite}
            textColor={Black}
            backgroundColorSelected={MIGreen}
            textColorSelected={MainTextWhite}
            onClick={() => setGender(Gender.PreferNotToSay)}
            selected={gender === Gender.PreferNotToSay}
          />
        </View>
      </SafeAreaView>
      <OnboardingBottomNavigation
        goBack={props.navigation.goBack}
        goNextPage={() => props.navigation.navigate('Invested')}
        onClick={() =>
          updateGender(gender !== null ? gender : Gender.PreferNotToSay)
        }
        disabled={gender === null}
      />
    </LinearGradient>
  );
};

const mapStateToProps = (state: AppState) => ({
  gender: state.userReducer.gender,
});

const mapDispatchToProps = {};

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
    marginVertical: 5,
  },
  genderIcon: {
    marginVertical: 15,
  },
});

export { GenderScreenConnected as GenderScreen };
