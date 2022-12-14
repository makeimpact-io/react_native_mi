import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import {
  AppBackgroundColors,
  MIGreen,
  MIPink,
  SecondaryText,
} from '../../assets/styles';

import LinearGradient from 'react-native-linear-gradient';
import { InputField } from '../../components/InputField/InputField';
import { useState } from 'react';
import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types';
import { ActionButton } from '../../components/Button/ActionButton/ActionButton';
import { Black } from '../../assets/styles/RegularTheme';
import { signInWithEmail } from '../../api/firebase/auth';
import {
  validateEmail,
  validatePassword,
} from '../../utils/validation/InputValidator';
import { Header } from '../../components/Text/Header';

export const LoginScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationHelpers;
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);

  const [emailError, setEmailError] = useState('Invalid Email');
  const [passwordError, setPasswordError] = useState('Invalid Password');

  function verifyEmail(text: string) {
    setEmail(text);
    if (validateEmail(text) || text === '') {
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }
  }
  function verifyPassword(text: string) {
    setPassword(text);
    if (validatePassword(text) || text === '') {
      setPasswordIsValid(true);
    } else {
      setPasswordIsValid(false);
    }
  }
  return (
    <LinearGradient colors={AppBackgroundColors} style={styles.background}>
      <View style={styles.screenHeader} />
      <SafeAreaView style={styles.container}>
        <Header text={'Hey impactor!'} />
        <View style={styles.inputContainer}>
          <InputField
            placeholder={'Email'}
            value={email}
            onChangeText={text => verifyEmail(text)}
            error={!emailIsValid}
            errorText={emailError}
          />
          <InputField
            placeholder={'Password'}
            value={password}
            onChangeText={text => verifyPassword(text)}
            isPassword={true}
            error={!passwordIsValid}
            errorText={passwordError}
          />
        </View>
        <View style={styles.forgottenPasswordContainer}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('ForgottenPassword');
            }}>
            <Text style={styles.forgottenPassword}>
              I've forgotten my password
            </Text>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.button}>
          <ActionButton
            content={'LOG IN'}
            backgroundColor={MIPink}
            textColor={Black}
            action={() => {
              if (
                passwordIsValid &&
                emailIsValid &&
                password !== '' &&
                email !== ''
              ) {
                signInWithEmail(email, password);
              }
            }}
          />
        </View>
        <View style={styles.button}>
          <ActionButton
            content={'CREATE MY ACCOUNT'}
            backgroundColor={MIGreen}
            textColor={MIPink}
            action={() => {
              navigation.navigate('Onboarding');
            }}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  screenHeader: {
    height: 200,
  },
  container: {
    flex: 1,
    width: '70%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputContainer: {
    height: 100,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  forgottenPasswordContainer: {
    height: 50,
    justifyContent: 'center',
  },
  forgottenPassword: {
    fontSize: 12,
    color: SecondaryText,
  },
  errorContainer: {
    width: '100%',
  },
  errorContent: {
    width: '100%',
  },
  button: {
    width: '100%',
    height: 50,
    marginVertical: 10,
  },
});
