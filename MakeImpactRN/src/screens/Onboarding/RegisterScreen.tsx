import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';
import {
  Black,
  MainTextWhite,
  MIPink,
  OnboardingBackgroundColors,
} from '../../assets/styles';

import LinearGradient from 'react-native-linear-gradient';
import { Header } from '../../components/Text/Header';
import { SecondaryText } from '../../components/Text/SecondaryText';
import { useContext, useEffect, useState } from 'react';
import { InputField } from '../../components/InputField/InputField';
import {
  validateEmail,
  validatePassword,
} from '../../utils/validation/InputValidator';
import { CheckBox } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../navigation/AuthProvider';
import { ActionButton } from '../../components';
import { ErrorModal } from '../../components/Modals/ErrorModal';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [agreement, setAgreement] = useState(false);

  const [error, setError] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (
      (validateEmail(email) || email !== '') &&
      (validatePassword(password) || password !== '') &&
      validatePassword(repeatPassword) &&
      repeatPassword !== '' &&
      password === repeatPassword &&
      agreement
    ) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [agreement, email, password, repeatPassword]);

  const register = async function () {
    console.log('opa');
    const result = await authContext?.register(email, repeatPassword);
    if (result) {
      setError(true);
    }
  };

  return (
    <LinearGradient
      colors={OnboardingBackgroundColors}
      style={styles.background}>
      <SafeAreaView style={styles.container}>
        <ErrorModal
          errorMsg={
            'There has been an Error during the creation of your profile, please try again.'
          }
          hideModalText={'TRY AGAIN'}
          toggleModal={() => setError(!error)}
          showModal={error}
        />
        <Header text={'Welcome new impactor!'} />
        <SecondaryText text={"Let's create your account."} />
        <View style={styles.inputsContainer}>
          <InputField
            placeholder={'E-mail'}
            value={email}
            onChangeText={(text: string) => setEmail(text)}
            error={!(validateEmail(email) || email === '')}
            errorText={'Invalid email'}
          />
          <InputField
            placeholder={'Password'}
            value={password}
            onChangeText={(text: string) => setPassword(text)}
            error={!(validatePassword(password) || password === '')}
            isPassword={true}
            errorText={'Invalid password'}
          />
          <InputField
            placeholder={'Confirm Password'}
            value={repeatPassword}
            onChangeText={(text: string) => setRepeatPassword(text)}
            error={
              !(
                validatePassword(repeatPassword) ||
                (repeatPassword === '' && password === repeatPassword)
              )
            }
            isPassword={true}
            errorText={'Invalid password'}
          />
        </View>
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
          <View style={styles.agreementTextContainer}>
            <Text style={styles.agreementText}>
              By ticking this box you agree to the MakeImpact
            </Text>
            <TouchableWithoutFeedback
              onPress={() =>
                Linking.openURL('https://makeimpact.io/site/terms/')
              }>
              <Text style={styles.agreementText}>Legal Terms</Text>
            </TouchableWithoutFeedback>
            <Text style={styles.agreementText}> and </Text>
            <TouchableWithoutFeedback
              onPress={() =>
                Linking.openURL('https://makeimpact.io/site/privacy-policy/')
              }>
              <Text style={styles.agreementText}>Privacy Policy</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={styles.registerButtonContainer}>
          <ActionButton
            content={'Register'}
            backgroundColor={MIPink}
            textColor={Black}
            action={register}
            disabled={!formIsValid}
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
  container: {
    flex: 1,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 30,
  },
  inputsContainer: {
    height: '50%',
    width: '70%',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  agreementContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '80%',
    paddingBottom: 50,
    paddingTop: 30,
  },
  agreementTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '90%',
  },
  agreementText: {
    color: MainTextWhite,
  },
  registerButtonContainer: {
    height: 50,
    width: '90%',
  },
});

export { RegisterScreen };
