import * as React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import {
  AppBackgroundColors,
  Black,
  MIPink,
} from '../../assets/styles/RegularTheme';

import LinearGradient from 'react-native-linear-gradient';
import {
  InputField,
  DefaultButton,
  SecondaryText,
  Header,
  ErrorModal,
  SuccessfulOrderModal,
} from '../../components';
import { validateEmail } from '../../utils/validation/InputValidator';
import { useState } from 'react';
import { passwordReset } from '../../api/firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UnauthorizedStackParamList } from '../../navigation/AuthContent';

type Props = NativeStackScreenProps<
  UnauthorizedStackParamList,
  'ForgottenPassword'
>;

export const ForgottenPasswordScreen = (props: Props) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const resetPassword = async () => {
    const result = await passwordReset(email);
    if (result) {
      setError(true);
    } else {
      setSuccess(true);
    }
  };

  return (
    <LinearGradient colors={AppBackgroundColors} style={styles.background}>
      <ErrorModal
        errorMsg={
          "It looks like we don't have such email, please check it again!"
        }
        hideModalText={'TRY AGAIN'}
        toggleModal={() => setError(!error)}
        showModal={error}
      />
      <SuccessfulOrderModal
        text={
          'You will receive an email shortly with information how to reset your password.'
        }
        showModal={success}
        buttonText={'Go to Login.'}
        onClick={() => props.navigation.navigate('Login')}
      />
      <View style={styles.screenHeader}>
        <Header text={'Forgot your password?'} />
        <SecondaryText
          text={
            "No worries, we've got you! Enter your email address and we'll send you a reset link"
          }
        />
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
        </View>
        <View style={styles.button}>
          <DefaultButton
            content={'RESET PASSWORD'}
            backgroundColor={MIPink}
            textColor={Black}
            action={resetPassword}
            disabled={email === ''}
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
    width: '90%',
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
  button: {
    width: '100%',
    height: 50,
  },
});
