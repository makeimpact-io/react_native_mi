import * as React from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';
import { AppBackgroundColors } from '../../assets/styles';

import LinearGradient from 'react-native-linear-gradient';

export const ForgottenPasswordScreen = () => {
  return (
    <LinearGradient colors={AppBackgroundColors} style={styles.background}>
      <SafeAreaView>
        <Text>Forgotten password</Text>
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
});
