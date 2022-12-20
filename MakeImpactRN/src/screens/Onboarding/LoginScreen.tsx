import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import { AppBackgroundColors, MIPink } from '../../assets/styles';

import LinearGradient from 'react-native-linear-gradient';
import { InputField } from '../../components/InputField/InputField';
import { useContext, useState } from 'react';
import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types';
import { ActionButton } from '../../components/Button/ActionButton/ActionButton';
import { Black, White } from '../../assets/styles/RegularTheme';
import {
  validateEmail,
  validatePassword,
} from '../../utils/validation/InputValidator';
import { AuthContext } from '../../navigation/AuthProvider';
import { Header, SecondaryText } from '../../components';
import { ErrorModal } from '../../components/Modals/ErrorModal';

export const LoginScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationHelpers;
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Invalid attempt');

  const authContext = useContext(AuthContext);

  const login = async function () {
    if (
      validatePassword(password) &&
      validateEmail(email) &&
      password !== '' &&
      email !== ''
    ) {
      const result = await authContext?.login(email, password);
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
            action={login}
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
    paddingTop: 100,
  },
  container: {
    flex: 1,
    width: '70%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputContainer: {
    height: 200,
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
