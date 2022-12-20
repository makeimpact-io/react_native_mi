import * as React from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
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
import PinkWaveWelcome from '../../assets/icons/PinkWaves/PinkWaveWelcome';

export const InitialScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationHelpers;
}) => {
  return (
    <LinearGradient colors={AppBackgroundColors} style={styles.background}>
      <View style={styles.headerContainer}>
        <PinkWaveWelcome style={styles.headerBackground} />
        <Text style={styles.headerSmallText}>Welcome to</Text>
        <Text style={styles.headerLargeText}>m!</Text>
      </View>
      <SafeAreaView style={styles.container}>
        <View style={styles.secondaryHeaderContainer}>
          <Header text={'Hey impactor!'} />
        </View>
        <View style={styles.button}>
          <ActionButton
            content={'CREATE MY ACCOUNT'}
            backgroundColor={MIGreen}
            textColor={MIPink}
            action={() => {
              navigation.navigate('Register');
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
  container: {
    flex: 1,
    width: '70%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    width: '100%',
    height: 50,
    marginVertical: 10,
  },
  headerContainer: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  headerSmallText: {
    fontSize: 36,
    fontFamily: 'Barlow',
    fontWeight: '600',
    textAlign: 'center',
    color: Black,
    letterSpacing: -1,
  },
  headerLargeText: {
    fontSize: 124,
    fontFamily: 'Inter',
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: -30,
    color: Black,
  },
  secondaryHeaderContainer: {
    marginBottom: 50,
  },
});
