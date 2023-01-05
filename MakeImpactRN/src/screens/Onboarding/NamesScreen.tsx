import * as React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { OnboardingBackgroundColors } from '../../assets/styles/RegularTheme';

import LinearGradient from 'react-native-linear-gradient';
import {
  Header,
  SecondaryText,
  OnboardingBottomNavigation,
  InputField,
} from '../../components/';

import { connect } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import { updateNames } from '../../api/firebase/user';
import { setRegistering } from '../../state/app/appSlice';
import { useState } from 'react';
import { AppState } from '../../state/store';
import { validateName } from '../../utils/validation/InputValidator';
import { AuthorizedStackParamList } from '../../navigation/AuthContent';

type Props = ReturnType<typeof mapStateToProps> &
  NativeStackScreenProps<AuthorizedStackParamList, 'Names'>;

const NamesScreen = (props: Props) => {
  const [firstName, setFirstName] = useState<string>(props.firstName);
  const [lastName, setLastName] = useState<string>(props.lastName);
  return (
    <LinearGradient
      colors={OnboardingBackgroundColors}
      style={styles.background}>
      <SafeAreaView style={styles.container}>
        <Header text={"What's your name?"} />
        <SecondaryText text={'Tell us a bit more about yourself.'} />
        <View style={styles.inputContainer}>
          <InputField
            placeholder={'First Name'}
            value={firstName}
            onChangeText={text => setFirstName(text)}
            error={!(validateName(firstName) && firstName !== '')}
            errorText={'Invalid Name!'}
          />
          <InputField
            placeholder={'Last Name'}
            value={lastName}
            onChangeText={text => setLastName(text)}
            error={!(validateName(lastName) && lastName !== '')}
            errorText={'Invalid Name!'}
          />
        </View>
      </SafeAreaView>
      <OnboardingBottomNavigation
        goNextPage={() => props.navigation.navigate('Gender')}
        disabled={
          firstName === '' ||
          lastName === '' ||
          !validateName(lastName) ||
          !validateName(firstName)
        }
        onClick={() => {
          updateNames(firstName, lastName);
        }}
      />
    </LinearGradient>
  );
};

const mapStateToProps = (state: AppState) => ({
  firstName: state.userReducer.firstName,
  lastName: state.userReducer.lastName,
});

const mapDispatchToProps = {
  setRegistering,
};

const NamesScreenConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NamesScreen);

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
  selectionButton: {
    width: '90%',
    height: 50,
    marginVertical: 10,
  },
  inputContainer: {
    height: 150,
    width: '70%',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export { NamesScreenConnected as NamesScreen };
