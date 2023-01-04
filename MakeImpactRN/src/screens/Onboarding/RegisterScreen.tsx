import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Linking,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useEffect, useState } from 'react';
import {
  Black,
  MainTextWhite,
  MIPink,
  OnboardingBackgroundColors,
} from '../../assets/styles/RegularTheme';

import {
  Header,
  SecondaryText,
  InputField,
  DefaultButton,
  ErrorModal,
} from '../../components/';
import {
  validateEmail,
  validatePassword,
} from '../../utils/validation/InputValidator';
import TickedCircle from '../../assets/icons/Utils/TickedCircle';
import Circle from '../../assets/icons/Utils/Circle';
import { register } from '../../api/firebase/auth';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [agreement, setAgreement] = useState(false);

  const [error, setError] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

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

  const singUp = async function () {
    const result = await register(email, repeatPassword);
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
            errorText={'Invalid email!'}
          />
          <InputField
            placeholder={'Password'}
            value={password}
            onChangeText={(text: string) => setPassword(text)}
            error={!(validatePassword(password) || password === '')}
            isPassword={true}
            errorText={'Invalid password!'}
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
            errorText={'Password is not the same!'}
          />
        </View>
        <View style={styles.agreementContainer}>
          <TouchableWithoutFeedback onPress={() => setAgreement(!agreement)}>
            {agreement ? (
              <TickedCircle height={25} width={25} />
            ) : (
              <Circle height={25} width={25} />
            )}
          </TouchableWithoutFeedback>
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
          <DefaultButton
            content={'Register'}
            backgroundColor={MIPink}
            textColor={Black}
            action={singUp}
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
    width: '90%',
    paddingBottom: 50,
    paddingTop: 30,
  },
  agreementTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 10,
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
