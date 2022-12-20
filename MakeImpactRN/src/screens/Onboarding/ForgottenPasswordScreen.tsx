import * as React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { AppBackgroundColors, Black, MIPink } from '../../assets/styles';

import LinearGradient from 'react-native-linear-gradient';
import {
  InputField,
  ActionButton,
  SecondaryText,
  Header,
} from '../../components';
import { validateEmail } from '../../utils/validation/InputValidator';
import { useContext, useState } from 'react';
import { AuthContext } from '../../navigation/AuthProvider';
import { ErrorModal } from '../../components/Modals/ErrorModal';
import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types';

export const ForgottenPasswordScreen = (props: {
  navigation: NativeStackNavigationHelpers;
}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);

  const authContext = useContext(AuthContext);

  const resetPassword = async () => {
    const result = await authContext?.passwordReset(email);
    if (result) {
      setError(true);
    } else {
      alert(
        'You will receive an email shortly with information how to reset your password.',
      );
      props.navigation.navigate('Login');
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
          <ActionButton
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
