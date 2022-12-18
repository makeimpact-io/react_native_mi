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
import { useContext, useEffect, useState } from 'react';
import { InputField } from '../../components/InputField/InputField';
import {
  validateEmail,
  validatePassword,
} from '../../utils/validation/InputValidator';
import { CheckBox } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OnboardingBottomNavigation } from '../../components/NavigationBars/OnboardingBottomNavigation';
import { connect } from 'react-redux';
import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types';
import { setRegistering } from '../../state/app/appSlice';
import { AuthContext } from '../../navigation/AuthProvider';

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    route: any;
    navigation: NativeStackNavigationHelpers;
  };

const RegisterScreen = (props: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [agreement, setAgreement] = useState(false);

  const [formIsValid, setFormIsValid] = useState(false);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (
      (validateEmail(email) || email !== '') &&
      (validatePassword(password) || password !== '') &&
      (validatePassword(repeatPassword) ||
        (repeatPassword !== '' && password === repeatPassword)) &&
      agreement
    ) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [agreement, email, password, repeatPassword]);

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
            authContext?.register(email, repeatPassword);
          }}
          goBack={true}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = { setRegistering };

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
