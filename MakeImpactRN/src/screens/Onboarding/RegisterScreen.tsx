import * as React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import {
  MainTextWhite,
  MIPink,
  OnboardingBackgroundColors,
} from '../../assets/styles';

import LinearGradient from 'react-native-linear-gradient';
import { Header } from '../../components/Text/Header';
import { SecondaryText } from '../../components/Text/SecondaryText';
import { useEffect, useState } from 'react';
import { InputField } from '../../components/InputField/InputField';
import {
  validateEmail,
  validateName,
  validatePassword,
} from '../../utils/validation/InputValidator';
import { CheckBox } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OnboardingBottomNavigation } from '../../components/NavigationBars/OnboardingBottomNavigation';
import { connect } from 'react-redux';
import {
  setConfirmedPassword,
  setEmail,
  setFirstName,
  setLastName,
  setPassword,
} from '../../state/tempUser/tempUserSlice';
import { AppState } from '../../state/store';
import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types';
import { signupWithEmail } from '../../api/firebase/auth';
import { setRegistering } from '../../state/app/appSlice';

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    route: any;
    navigation: NativeStackNavigationHelpers;
  };

const RegisterScreen = (props: Props) => {
  const [agreement, setAgreement] = useState(false);

  const [firstNameIsValid, setFirstNameIsValid] = useState(true);
  const [lastNameIsValid, setLastNameIsValid] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [repeatPasswordIsValid, setRepeatPasswordIsValid] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false);

  function verifyFirstName(text: string) {
    props.setFirstName(text);
    if (validateName(text) || text === '') {
      setFirstNameIsValid(true);
    } else {
      setFirstNameIsValid(false);
    }
  }

  function verifyLastName(text: string) {
    props.setLastName(text);
    if (validateName(text) || text === '') {
      setLastNameIsValid(true);
    } else {
      setLastNameIsValid(false);
    }
  }

  function verifyEmail(text: string) {
    props.setEmail(text);
    if (validateEmail(text) || text === '') {
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }
  }

  function verifyPassword(text: string) {
    props.setPassword(text);
    if (validatePassword(text) || text === '') {
      setPasswordIsValid(true);
    } else {
      setPasswordIsValid(false);
    }
  }

  function verifyRepeatPassword(text: string) {
    props.setConfirmedPassword(text);
    if (
      validatePassword(text) ||
      (text === '' && props.password === props.confirmedPassword)
    ) {
      setRepeatPasswordIsValid(true);
    } else {
      setRepeatPasswordIsValid(false);
    }
  }

  useEffect(() => {
    if (
      firstNameIsValid &&
      lastNameIsValid &&
      emailIsValid &&
      passwordIsValid &&
      repeatPasswordIsValid &&
      props.firstName !== '' &&
      props.lastName !== '' &&
      props.email !== '' &&
      props.password !== '' &&
      props.confirmedPassword !== '' &&
      agreement
    ) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [
    props,
    agreement,
    firstNameIsValid,
    lastNameIsValid,
    emailIsValid,
    passwordIsValid,
    repeatPasswordIsValid,
  ]);
  return (
    <LinearGradient
      colors={OnboardingBackgroundColors}
      style={styles.background}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}>
          <Header text={'Welcome new impactor!'} />
          <SecondaryText text={"Let's create your account."} />
          <View style={styles.inputsContainer}>
            <InputField
              placeholder={'First name'}
              value={props.firstName}
              onChangeText={(text: string) => verifyFirstName(text)}
              error={!firstNameIsValid}
              errorText={'Invalid name'}
            />
            <InputField
              placeholder={'Last name'}
              value={props.lastName}
              onChangeText={(text: string) => verifyLastName(text)}
              error={!lastNameIsValid}
              errorText={'Invalid name'}
            />
            <InputField
              placeholder={'E-mail'}
              value={props.email}
              onChangeText={(text: string) => verifyEmail(text)}
              error={!emailIsValid}
              errorText={'Invalid email'}
            />
            <InputField
              placeholder={'Password'}
              value={props.password}
              onChangeText={(text: string) => verifyPassword(text)}
              error={!passwordIsValid}
              isPassword={true}
              errorText={'Invalid password'}
            />
            <InputField
              placeholder={'Confirm Password'}
              value={props.confirmedPassword}
              onChangeText={(text: string) => verifyRepeatPassword(text)}
              error={!repeatPasswordIsValid}
              isPassword={true}
              errorText={'Invalid password'}
            />
            <View style={styles.agreementContainer}>
              <CheckBox
                checked={agreement}
                iconType="font-awesome"
                checkedIcon="check-square-o"
                uncheckedIcon="square-o"
                checkedColor={MIPink}
                uncheckedColor={MIPink}
                onPress={() => setAgreement(!agreement)}
              />
              <Text style={styles.agreementText}>
                By ticking this box you agree to the MakeImpact Legal Terms and
                Privacy Policy
              </Text>
            </View>
          </View>
        </ScrollView>
        <OnboardingBottomNavigation
          navigation={props.navigation}
          nextPage={props.route.params.nextScreen}
          disabled={!formIsValid}
          onClick={async () => {
            props.setRegistering(true);
            await signupWithEmail(props.email, props.confirmedPassword);
          }}
          goBack={true}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const mapStateToProps = (state: AppState) => ({
  firstName: state.tempUserReducer.firstName,
  lastName: state.tempUserReducer.lastName,
  email: state.tempUserReducer.email,
  password: state.tempUserReducer.password,
  confirmedPassword: state.tempUserReducer.confirmedPassword,
});

const mapDispatchToProps = {
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  setConfirmedPassword,
  setRegistering,
};

const RegisterScreenConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterScreen);

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
  scrollView: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputsContainer: {
    height: '90%',
    width: '70%',
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

export { RegisterScreenConnected as RegisterScreen };
