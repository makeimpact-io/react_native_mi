import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { HeaderColor, MainTextWhite } from '../../assets/styles';

export const TopNavigationBar = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.goBackIcon}>//</Text>
      <Text style={styles.miLogo}>m!</Text>
      <Text style={styles.profilePicture}>CT</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 35,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: HeaderColor,
  },
  goBackIcon: {
    paddingLeft: 10,
    color: MainTextWhite,
  },
  profilePicture: {
    paddingRight: 10,
    color: MainTextWhite,
  },
  miLogo: {
    color: MainTextWhite,
    fontFamily: 'Inter',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
