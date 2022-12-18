import * as React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import {
  AppBackgroundColors,
  Black,
  MIGreen,
  MIPink,
} from '../../assets/styles';

import LinearGradient from 'react-native-linear-gradient';
import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types';
import { ActionButton } from '../../components/Button/ActionButton/ActionButton';
import { Header } from '../../components/Text/Header';

export const InitialScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationHelpers;
}) => {
  return (
    <LinearGradient colors={AppBackgroundColors} style={styles.background}>
      <View style={styles.screenHeader} />
      <SafeAreaView style={styles.container}>
        <Header text={'Hey impactor!'} />
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
        <View style={styles.button}>
          <ActionButton
            content={'LOG IN'}
            backgroundColor={MIPink}
            textColor={Black}
            action={() => {
              navigation.navigate('Login');
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
  button: {
    width: '100%',
    height: 50,
    marginVertical: 10,
  },
});
