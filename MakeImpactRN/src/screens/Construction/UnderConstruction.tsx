import * as React from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import { AppBackgroundColors, MIPink } from '../../assets/styles/RegularTheme';
import LinearGradient from 'react-native-linear-gradient';
import Construction from '../../assets/icons/Utils/Construction';

export const UnderConstruction = () => {
  return (
    <LinearGradient colors={AppBackgroundColors} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <Construction />
        <Text style={styles.text}>Under Construction</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: MIPink,
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Barlow',
  },
});
