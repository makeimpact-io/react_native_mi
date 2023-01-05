import { NativeStackHeaderProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  MainTextWhite,
  MIPink,
  OnboardingBackgroundColors,
  TertiaryText,
} from '../../assets/styles/RegularTheme';

export const OnboardingNavigationBar = (props: {
  navigation: NativeStackHeaderProps;
  index: Number;
  length: Number;
}) => {
  let progressBar = [];
  for (let i = 0; i < props.length; i++) {
    if (i > props.index) {
      progressBar.push(<View style={styles.unfilledProgress} key={i} />);
    } else {
      progressBar.push(<View style={styles.filledProgress} key={i} />);
    }
  }

  return (
    <LinearGradient
      colors={[OnboardingBackgroundColors[0], OnboardingBackgroundColors[0]]}
      style={styles.container}>
      <View style={styles.progressContainer}>{progressBar}</View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: MainTextWhite,
  },
  progressContainer: {
    width: '40%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  unfilledProgress: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: TertiaryText,
  },
  filledProgress: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: MIPink,
  },
  background: {
    width: '100%',
    height: 80,
  },
});
