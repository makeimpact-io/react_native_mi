import * as React from 'react';
import { StyleSheet } from 'react-native';
import { AppBackgroundColors, MIPink } from '../../assets/styles/RegularTheme';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';

export const LoadingScreen = () => {
  return (
    <LinearGradient colors={AppBackgroundColors} style={styles.background}>
      <Spinner
        visible={true}
        cancelable={false}
        textContent="Loading..."
        textStyle={styles.loadingText}
        color={MIPink}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: { color: MIPink },
});
