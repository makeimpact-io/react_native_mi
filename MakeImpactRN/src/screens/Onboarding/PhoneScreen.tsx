import * as React from 'react';
import { StyleSheet } from 'react-native';
import { MainTextWhite, OnboardingBackgroundColors } from '../../assets/styles';

import LinearGradient from 'react-native-linear-gradient';
import { Header } from '../../components/Text/Header';
import { SecondaryText } from '../../components/Text/SecondaryText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OnboardingBottomNavigation } from '../../components/NavigationBars/OnboardingBottomNavigation';
import { connect } from 'react-redux';
import { AppState } from '../../state/store';
import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types';
import { setPhoneNumber } from '../../state/tempUser/tempUserSlice';

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    route: any;
    navigation: NativeStackNavigationHelpers;
  };

const PhoneScreen = (props: Props) => {
  return (
    <LinearGradient
      colors={OnboardingBackgroundColors}
      style={styles.background}>
      <SafeAreaView style={styles.container}>
        <Header text={"What's your phone number?"} />
        <SecondaryText
          text={'Tell us a bit more about how to get in touch with you'}
        />
      </SafeAreaView>
      <OnboardingBottomNavigation
        navigation={props.navigation}
        nextPage={props.route.params.nextScreen}
      />
    </LinearGradient>
  );
};

const mapStateToProps = (state: AppState) => ({
  firstName: state.tempUserReducer.firstName,
  lastName: state.tempUserReducer.lastName,
  email: state.tempUserReducer.email,
});

const mapDispatchToProps = {
  setPhoneNumber,
};

const PhoneScreenConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PhoneScreen);

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
  inputsContainer: {
    height: 350,
    width: '100%',
    paddingTop: 160,
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  agreementContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  agreementText: {
    color: MainTextWhite,
  },
});

export { PhoneScreenConnected as PhoneScreen };
