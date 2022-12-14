import * as React from 'react';
import { StyleSheet } from 'react-native';
import { AppBackgroundColors } from '../../assets/styles';
import LinearGradient from 'react-native-linear-gradient';

export const LoadingScreen = () => {
  return (
    <LinearGradient colors={AppBackgroundColors} style={styles.background} />
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
});
