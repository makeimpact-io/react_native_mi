import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { OnboardingBackgroundColors } from '../../assets/styles';

import LinearGradient from 'react-native-linear-gradient';
import { Header } from '../../components/Text/Header';
import { SecondaryText } from '../../components/Text/SecondaryText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OnboardingBottomNavigation } from '../../components/NavigationBars/OnboardingBottomNavigation';
import { connect } from 'react-redux';
import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types';
import { updateNames } from '../../api/firebase/user';
import { setRegistering } from '../../state/app/appSlice';
import { useState } from 'react';
import { AppState } from '../../state/store';
import { InputField } from '../../components';
import { validateName } from '../../utils/validation/InputValidator';

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    route: any;
    navigation: NativeStackNavigationHelpers;
  };

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
            errorText={'Opas'}
          />
          <InputField
            placeholder={'Last Name'}
            value={lastName}
            onChangeText={text => setLastName(text)}
            error={!(validateName(lastName) && lastName !== '')}
            errorText={'Opas'}
          />
        </View>
      </SafeAreaView>
      <OnboardingBottomNavigation
        navigation={props.navigation}
        nextPage={props.route.params.nextScreen}
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
