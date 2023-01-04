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
  MIPink,
  Black,
  White,
} from '../../assets/styles/RegularTheme';

import LinearGradient from 'react-native-linear-gradient';
import {
  InputField,
  DefaultButton,
  Header,
  SecondaryText,
  ErrorModal,
} from '../../components/';
import { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import {
  validateEmail,
  validatePassword,
} from '../../utils/validation/InputValidator';
import { login } from '../../api/firebase/auth';
import { UnauthorizedStackParamList } from '../../navigation/AuthContent';

type Props = NativeStackScreenProps<UnauthorizedStackParamList, 'Login'>;

export const LoginScreen = (props: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Invalid attempt');

  const singIn = async function () {
    if (
      validatePassword(password) &&
      validateEmail(email) &&
      password !== '' &&
      email !== ''
    ) {
      const result = await login(email, password);
      if (result) {
        setErrorMsg('The email address or password is incorrect!');
        setError(true);
      }
    } else {
      setErrorMsg('Invalid data, please check your email and password again!');
      setError(true);
    }
  };

  return (
    <LinearGradient colors={AppBackgroundColors} style={styles.background}>
      <ErrorModal
        errorMsg={errorMsg}
        hideModalText={'TRY AGAIN'}
        toggleModal={() => setError(!error)}
        showModal={error}
      />
      <View style={styles.screenHeader}>
        <Header text={'Welcome impactor!'} />
        <SecondaryText text={'Please enter your email and password.'} />
      </View>
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          <InputField
            placeholder={'Email'}
            value={email}
            onChangeText={text => setEmail(text)}
            error={!(validateEmail(email) || email === '')}
            errorText={'Invalid Email'}
          />
          <InputField
            placeholder={'Password'}
            value={password}
            onChangeText={text => setPassword(text)}
            isPassword={true}
            error={!(validatePassword(password) || password === '')}
            errorText={'Invalid Password'}
          />
        </View>
        <View style={styles.forgottenPasswordContainer}>
          <TouchableWithoutFeedback
            onPress={() => {
              props.navigation.navigate('ForgottenPassword');
            }}>
            <Text style={styles.forgottenPassword}>
              I've forgotten my password
            </Text>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.button}>
          <DefaultButton
            content={'LOG IN'}
            backgroundColor={MIPink}
            textColor={Black}
            action={singIn}
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
    height: '10%',
    marginTop: 80,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    width: '70%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputContainer: {
    height: '50%',
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
    color: White,
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
